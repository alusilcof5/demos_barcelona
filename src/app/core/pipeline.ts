import type { BarriData } from './vulnerability';
import Papa from 'papaparse';

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


async function fetchBarrisGeoJSON() {
  const response = await fetch('/data/bcn-barris.geojson');
  if (!response.ok) throw new Error(`Error cargando GeoJSON`);
  return await response.json();
}


export async function loadBarrisData(): Promise<{ geojson: any; barris: BarriData[] }> {

  const geojson = await fetchBarrisGeoJSON();
  if (!geojson?.features) throw new Error('GeoJSON inválido');


  const barrisMap: Record<string, BarriData> = {};
  geojson.features.forEach((f: any) => {
    const p = f.properties;
    barrisMap[p.id] = {
      id: p.id,
      nom: p.nom,
      districte: p.districte,
      poblacio: p.poblacio || 0,
      
     
      poblacio_per_sexe: {
        dones: 0,
        homes: 0,
        total: p.poblacio || 0
      },
      
      renda_mitjana: 0,
      renda_per_sexe: {
        dones: 0,
        homes: 0,
        brecha_percentual: 0
      },
      
      atur: 0,
      atur_per_sexe: {
        dones: 0,
        homes: 0,
        diferencia_puntos: 0
      },
      
      envelliment: 0,
      immigracio: 0,
    };
  });

 
  const [
    rendaCSV, 
    aturCSV, 
    emigrantsCSV, 
    envellimentCSV,
   
    rendaSexeCSV,
    aturSexeCSV,
    poblacioSexeCSV
  ] = await Promise.all([
    fetchCSV('/data/renda.csv'),
    fetchCSV('/data/atur.csv'),
    fetchCSV('/data/emigrants.csv'),
    fetchCSV('/data/envelliment.csv'),
  
    fetchCSV('/data/renda-sexe.csv'),
    fetchCSV('/data/atur-sexe.csv'),
    fetchCSV('/data/poblacio-sexe.csv')
  ]);


  rendaCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) barrisMap[id].renda_mitjana = row.Import_Euros || 0;
  });


  rendaSexeCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) {
      barrisMap[id].renda_per_sexe = {
        dones: row.Import_Dones || 0,
        homes: row.Import_Homes || 0,
        brecha_percentual: 0 
      };
      
   
      if (barrisMap[id].renda_per_sexe.homes > 0) {
        const dones = barrisMap[id].renda_per_sexe.dones;
        const homes = barrisMap[id].renda_per_sexe.homes;
        barrisMap[id].renda_per_sexe.brecha_percentual = 
          ((homes - dones) / homes) * 100;
      }
    }
  });

 
  aturCSV.forEach((row: any) => {
    const id = row.Territori;
    if (barrisMap[id]) {
      const fechas = Object.keys(row).filter(k => k.match(/^\d{2} .+ \d{4}$/));
      const lastFecha = fechas[fechas.length - 1];
      barrisMap[id].atur = row[lastFecha] || 0;
    }
  });

  
  aturSexeCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) {
      barrisMap[id].atur_per_sexe = {
        dones: row.Atur_Dones || 0,
        homes: row.Atur_Homes || 0,
        diferencia_puntos: 0 // Se calculará después
      };
      
     
      barrisMap[id].atur_per_sexe.diferencia_puntos = 
        barrisMap[id].atur_per_sexe.dones - barrisMap[id].atur_per_sexe.homes;
    }
  });

  
  emigrantsCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) {
      const fechas = Object.keys(row).filter(k => k.match(/^\d{2} .+ \d{4}$/));
      const lastFecha = fechas[fechas.length - 1];
      barrisMap[id].immigracio = row[lastFecha] || 0;
    }
  });


  envellimentCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) {
      const fechas = Object.keys(row).filter(k => k.match(/^\d{2} .+ \d{4}$/));
      const lastFecha = fechas[fechas.length - 1];
      barrisMap[id].envelliment = row[lastFecha] || 0;
    }
  });

  
  poblacioSexeCSV.forEach((row: any) => {
    const id = row.Codi_Barri;
    if (barrisMap[id]) {
      barrisMap[id].poblacio_per_sexe = {
        dones: row.Poblacio_Dones || 0,
        homes: row.Poblacio_Homes || 0,
        total: (row.Poblacio_Dones || 0) + (row.Poblacio_Homes || 0)
      };
    }
  });

 
  const barris = Object.values(barrisMap);

  console.log(`✅ Pipeline completado: ${barris.length} barrios cargados`);
  console.log(`✅ Datos de género incluidos: renta, empleo y población por sexo`);

  return { geojson, barris };
}