import { create } from 'zustand';
import Papa from 'papaparse';
import type { GenderDataset } from './types';

interface GenderStoreState {
  data: GenderDataset | null;
  isLoading: boolean;
  error: string | null;
  selectedDistrict: string | null;
  selectedYear: number;
  setData: (data: GenderDataset) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedDistrict: (district: string | null) => void;
  setSelectedYear: (year: number) => void;
  fetchGenderData: () => Promise<void>;
}

export const useGenderStore = create<GenderStoreState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  selectedDistrict: null,
  selectedYear: 2025,
  
  setData: (data) => set({ data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedDistrict: (selectedDistrict) => set({ selectedDistrict }),
  setSelectedYear: (selectedYear) => set({ selectedYear }),
  
  fetchGenderData: async () => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('[GenderStore] Starting to load CSVs...');
      
      // Cargar los 3 CSVs en paralelo
      const [poblacioData, rendaData, aturData] = await Promise.all([
        loadCSV('/geojson/poblacio-sexe.csv', ','),
        loadCSV('/geojson/renda-sexe.csv', ';'),
        loadCSV('/geojson/atur-sexe.csv', ','),
        loadCSV('/geojson/renda-edat.csv', ','),
        loadCSV('/geojson/renda-edat-sexe.csv', ',')
      ]);

      console.log('[GenderStore] CSVs loaded:', {
        poblacio: poblacioData.length,
        renda: rendaData.length,
        atur: aturData.length
      });

    //població
      const poblacio = processPopulationData(poblacioData);
      console.log('[GenderStore] Population processed:', poblacio.per_districte.length, 'districts');
      
     //renta
      const renda = processIncomeData(rendaData);
      console.log('[GenderStore] Income processed:', {
        yearly: renda.yearly.length,
        by_age: renda.by_age.length
      });
      
      // desempleo
      const atur = processUnemploymentData(aturData);
      console.log('[GenderStore] Unemployment processed:', atur.timeline.length, 'quarters');

      const dataset: GenderDataset = {
        poblacio,
        renda,
        atur
      };

      console.log('[GenderStore] Final dataset:', dataset);

      set({ data: dataset, isLoading: false });
    } catch (error) {
      console.error('[GenderStore] Error loading gender data:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error desconocido al cargar los datos',
        isLoading: false 
      });
    }
  },
}));

function loadCSV(url: string, delimiter: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    console.log(`[CSV] Loading ${url} with delimiter "${delimiter}"`);
    Papa.parse(url, {
      download: true,
      header: true,
      delimiter,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn(`[CSV] Warnings parsing ${url}:`, results.errors);
        }
        console.log(`[CSV] Successfully loaded ${url}: ${results.data.length} rows`);
        if (results.data.length > 0) {
          console.log(`[CSV] Sample row from ${url}:`, results.data[0]);
        }
        resolve(results.data);
      },
      error: (error) => {
        console.error(`[CSV] Error loading ${url}:`, error);
        reject(new Error(`Error loading ${url}: ${error.message}`));
      }
    });
  });
}


function processPopulationData(data: any[]) {
  console.log('[Population] Processing', data.length, 'rows');
  const districtMap = new Map<string, { men: number; women: number }>();
  
  data.forEach((row) => {
    const district = row.Nom_Districte;
    const value = parseInt(row.Valor) || 0;
    const sex = parseInt(row.SEXE); // 1=hombre, 2=mujer
    
    if (!district) return;
    
    if (!districtMap.has(district)) {
      districtMap.set(district, { men: 0, women: 0 });
    }
    
    const districtData = districtMap.get(district)!;
    if (sex === 1) {
      districtData.men += value;
    } else if (sex === 2) {
      districtData.women += value;
    }
  });
  
  // Calcular totales
  let total_homes = 0;
  let total_dones = 0;
  
  const per_districte = Array.from(districtMap.entries()).map(([district, { men, women }]) => {
    total_homes += men;
    total_dones += women;
    const total = men + women;
    
    return {
      districte: district,
      poblacio_homes: men,
      poblacio_dones: women,
      percent_homes: (men / total) * 100,
      percent_dones: (women / total) * 100
    };
  });
  
  console.log('[Population] Processed', per_districte.length, 'districts. Total:', total_homes + total_dones);
  
  return {
    per_districte,
    metadata: {
      total_homes,
      total_dones,
      data_referencia: '2025-01-01'
    }
  };
}

function parseIncome(value: string | undefined): number {
  if (!value) return 0;

  return parseInt(value.replace('.', '')) || 0;
}


function processIncomeData(data: any[]) {
  console.log('[Income] Processing', data.length, 'rows');
  console.log('[Income] Sample row:', data[0]);

  // Filtrar datos de Barcelona
  const barcelonaData = data.filter((row) => {
    const rentaField = row['Renta anual neta media por persona y por unidad de consumo'];
    return rentaField === 'Renta neta media por persona';
  });
  
  console.log('[Income] Filtered to', barcelonaData.length, 'rows with "Renta neta media por persona"');
  
  // Procesar evolución anual
  const years = Array.from({ length: 10 }, (_, i) => 2025 - i).reverse(); // Últimos 10 años
  const yearly = years.map((year) => {
    const menData = barcelonaData.find((row) => 
      row.Sexo === 'Hombres' && row.Edad === 'Total' && row.Periodo === year.toString()
    );
    const womenData = barcelonaData.find((row) => 
      row.Sexo === 'Mujeres' && row.Edad === 'Total' && row.Periodo === year.toString()
    );
    
    const renda_homes = parseIncome(menData?.Total);
    const renda_dones = parseIncome(womenData?.Total);
    const brecha = renda_homes > 0 ? ((renda_homes - renda_dones) / renda_homes) * 100 : 0;
    
    if (year === 2025 || year === 2024) {
      console.log(`[Income] Year ${year}:`, { 
        men: menData ? menData.Total : 'N/A', 
        women: womenData ? womenData.Total : 'N/A',
        renda_homes,
        renda_dones,
        brecha
      });
    }
    
    return {
      any: year,
      renda_homes,
      renda_dones,
      brecha
    };
  }).filter(item => item.renda_homes > 0); 
  
  console.log('[Income] Processed', yearly.length, 'years of data');
  
 
  const ageGroups = [
    { original: 'Menores de 16 años', short: 'Menores de 16' },
    { original: 'De 16 a 29 años', short: '16-29' },
    { original: 'De 30 a 44 años', short: '30-44' },
    { original: 'De 45 a 64 años', short: '45-64' },
    { original: '65 y más años', short: '65+' }
  ];
  
  const by_age = ageGroups.map(({ original, short }) => {
    const menData = barcelonaData.find((row) => 
      row.Sexo === 'Hombres' && row.Edad === original && row.Periodo === '2025'
    );
    const womenData = barcelonaData.find((row) => 
      row.Sexo === 'Mujeres' && row.Edad === original && row.Periodo === '2025'
    );
    
    const renda_homes = parseIncome(menData?.Total);
    const renda_dones = parseIncome(womenData?.Total);
    const brecha = renda_homes > 0 ? ((renda_homes - renda_dones) / renda_homes) * 100 : 0;
    
    console.log(`[Income] Age ${short}:`, { 
      men: menData ? menData.Total : 'N/A',
      women: womenData ? womenData.Total : 'N/A',
      renda_homes, 
      renda_dones, 
      brecha: brecha.toFixed(2) + '%'
    });
    
    return {
      edat: short,
      renda_homes,
      renda_dones,
      brecha
    };
  });
  
  console.log('[Income] Processed', by_age.length, 'age groups');
  
  return {
    yearly,
    by_age,
    metadata: {
      data_inici: '2016',
      data_fi: '2025'
    }
  };
}


function processUnemploymentData(data: any[]) {
  console.log('[Unemployment] Processing', data.length, 'rows');
  

  const barcelonaData = data.filter((row) => row.Territorio === 'Barcelona (Municipio)');
  
  console.log('[Unemployment] Filtered to', barcelonaData.length, 'Barcelona rows');
  
  const menRow = barcelonaData.find((row) => row.Sexo === 'Hombre');
  const womenRow = barcelonaData.find((row) => row.Sexo === 'Mujer');
  
  if (!menRow || !womenRow) {
    console.warn('[Unemployment] Could not find men or women data');
    return {
      timeline: [],
      metadata: {
        data_inici: '2000',
        data_fi: '2025'
      }
    };
  }
  

  const timeline: any[] = [];
  const keys = Object.keys(menRow);
  
  for (let i = 3; i < keys.length; i++) {
    const key = keys[i];
    if (key.includes('tr')) {
      const atur_homes = parseFloat(menRow[key]) || 0;
      const atur_dones = parseFloat(womenRow[key]) || 0;
      
  
      if (atur_homes > 0 || atur_dones > 0) {
        timeline.push({
          periode: key.replace(' ', ' '), 
          atur_homes,
          atur_dones,
          diferencia: atur_dones - atur_homes
        });
      }
    }
  }
  
  console.log('[Unemployment] Processed', timeline.length, 'quarters');
  

  return {
    timeline,
    metadata: {
      data_inici: timeline.length > 0 ? timeline[0].periode : '2000',
      data_fi: timeline.length > 0 ? timeline[timeline.length - 1].periode : '2025'
    }
  };
}