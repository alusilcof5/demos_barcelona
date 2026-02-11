import type { BarriData } from './vulnerability';
import Papa from 'papaparse';


/**
 * Función auxiliar para leer CSV desde una URL
 */
async function fetchCSV(url: string): Promise<any[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error cargando CSV: ${url}`);
  const text = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
}

/**
 * Carga el GeoJSON de los barrios
 */
async function fetchBarrisGeoJSON() {
  const response = await fetch('/geojson/bcn-barris.geojson');
  if (!response.ok) throw new Error(`Error cargando GeoJSON`);
  return await response.json();
}

/**
 * Pipeline completo: carga y combina GeoJSON + CSVs
 */
export async function loadBarrisData(): Promise<{ geojson: any; barris: BarriData[] }> {
  // 1️⃣ Cargar GeoJSON
  const geojson = await fetchBarrisGeoJSON();
  if (!geojson?.features) throw new Error('GeoJSON inválido');

  // 2️⃣ Extraer datos básicos de GeoJSON
  const barrisMap: Record<string, BarriData> = {};
  geojson.features.forEach((f: any) => {
    const p = f.properties;
    barrisMap[p.id] = {
      id: p.id,
      nom: p.nom,
      districte: p.districte,
      poblacio: p.poblacio || 0,
      renda_mitjana: 0,
      atur: 0,
      envelliment: 0,
      immigracio: 0,
    };
  });

  // 3️⃣ Cargar CSVs
  const [rendaCSV, aturCSV, emigrantsCSV, envellimentCSV] = await Promise.all([
    fetchCSV('/data/renda.csv'),
    fetchCSV('/data/atur.csv'),
    fetchCSV('/data/emigrants.csv'),
    fetchCSV('/data/envelliment.csv')
  ]);

  // 4️⃣ Unir datos de renta
  rendaCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) barrisMap[id].renda_mitjana = row.Import_Euros || 0;
  });

  // 5️⃣ Unir datos de paro
  aturCSV.forEach((row: any) => {
    const id = row.Territori; // coincidir con id del barrio
    if (barrisMap[id]) {
      // Tomamos la columna más reciente (última)
      const fechas = Object.keys(row).filter(k => k.match(/^\d{2} .+ \d{4}$/));
      const lastFecha = fechas[fechas.length - 1];
      barrisMap[id].atur = row[lastFecha] || 0;
    }
  });

  // 6️⃣ Unir datos de inmigración
  emigrantsCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) {
      const fechas = Object.keys(row).filter(k => k.match(/^\d{2} .+ \d{4}$/));
      const lastFecha = fechas[fechas.length - 1];
      barrisMap[id].immigracio = row[lastFecha] || 0;
    }
  });

  // 7️⃣ Unir datos de envejecimiento
  envellimentCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) {
      const fechas = Object.keys(row).filter(k => k.match(/^\d{2} .+ \d{4}$/));
      const lastFecha = fechas[fechas.length - 1];
      barrisMap[id].envelliment = row[lastFecha] || 0;
    }
  });

  // 8️⃣ Convertir a array final
  const barris = Object.values(barrisMap);

  console.log(`✅ Pipeline completado: ${barris.length} barrios cargados`);

  return { geojson, barris };
}
