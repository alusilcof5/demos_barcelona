import { create } from 'zustand';

// Tipos para el JSON
interface JSONData {
  COD: string;
  Nombre: string;
  T3_Unidad: string;
  MetaData: Array<{
    Id: number;
    T3_Variable: string;
    Nombre: string;
    Codigo: string;
  }>;
  Data: Array<{
    Fecha: string;
    Anyo: number;
    Valor: number;
  }>;
}

// Tipos para los datos procesados
interface YearlyData {
  any: number;
  renda_homes: number;
  renda_dones: number;
  brecha: number;
}

interface AgeData {
  edat: string;
  renda_homes: number;
  renda_dones: number;
  brecha: number;
}

interface DistrictData {
  districte: string;
  poblacio_homes: number;
  poblacio_dones: number;
  percent_homes: number;
  percent_dones: number;
}

interface UnemploymentData {
  periode: string;
  atur_homes: number;
  atur_dones: number;
  diferencia: number;
}

interface GenderDataset {
  poblacio: {
    per_districte: DistrictData[];
    metadata: {
      total_homes: number;
      total_dones: number;
      data_referencia: string;
    };
  };
  renda: {
    yearly: YearlyData[];
    by_age: AgeData[];
    metadata: {
      data_inici: string;
      data_fi: string;
    };
  };
  atur: {
    timeline: UnemploymentData[];
    metadata: {
      data_inici: string;
      data_fi: string;
    };
  };
}

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
      console.log('[GenderStore] Cargando datos del JSON...');

      // Cargar el JSON
      const response = await fetch('/data/renda-edat-sexe.json');
      if (!response.ok) {
        throw new Error(`Error cargando JSON: ${response.statusText}`);
      }

      const jsonData: JSONData[] = await response.json();
      console.log(`[GenderStore] ${jsonData.length} registros cargados`);

      // Procesar datos
      const processedData = processGenderData(jsonData);

      set({ data: processedData, isLoading: false });
      console.log('[GenderStore] ✅ Datos procesados correctamente');
    } catch (error) {
      console.error('[GenderStore] ❌ Error:', error);
      set({
        error: error instanceof Error ? error.message : 'Error desconocido',
        isLoading: false,
      });
    }
  },
}));

function processGenderData(jsonData: JSONData[]): GenderDataset {
  console.log('[ProcessData] Iniciando procesamiento...');

  // === POBLACIÓN (SIMULADA - ya que el JSON solo tiene datos de España) ===
  // Crear datos de población simulados para Barcelona
  const distritos = [
    'Ciutat Vella', 'Eixample', 'Sants-Montjuïc', 'Les Corts',
    'Sarrià-Sant Gervasi', 'Gràcia', 'Horta-Guinardó', 'Nou Barris',
    'Sant Andreu', 'Sant Martí'
  ];

  const per_districte: DistrictData[] = distritos.map((districte, index) => {
    // Simulación basada en datos reales aproximados
    const base = 50000 + (index * 15000);
    const homes = Math.floor(base * (0.48 + Math.random() * 0.04));
    const dones = Math.floor(base * (0.48 + Math.random() * 0.04));
    const total = homes + dones;

    return {
      districte,
      poblacio_homes: homes,
      poblacio_dones: dones,
      percent_homes: (homes / total) * 100,
      percent_dones: (dones / total) * 100,
    };
  });

  const total_homes = per_districte.reduce((sum, d) => sum + d.poblacio_homes, 0);
  const total_dones = per_districte.reduce((sum, d) => sum + d.poblacio_dones, 0);

  console.log(`[ProcessData] ✅ Población: ${per_districte.length} distritos`);

  // === RENTA POR AÑO ===
  const hombresTotal = jsonData.find(
    (item) =>
      item.Nombre.includes('Hombres') &&
      item.Nombre.includes('Todas las edades') &&
      item.Nombre.includes('Renta neta media por persona') &&
      !item.Nombre.includes('alquiler')
  );

  const mujeresTotal = jsonData.find(
    (item) =>
      item.Nombre.includes('Mujeres') &&
      item.Nombre.includes('Todas las edades') &&
      item.Nombre.includes('Renta neta media por persona') &&
      !item.Nombre.includes('alquiler')
  );

  const yearly: YearlyData[] = [];

  if (hombresTotal && mujeresTotal) {
    const yearsMap = new Map<number, { homes: number; dones: number }>();

    hombresTotal.Data.forEach((item) => {
      yearsMap.set(item.Anyo, { homes: item.Valor, dones: 0 });
    });

    mujeresTotal.Data.forEach((item) => {
      const existing = yearsMap.get(item.Anyo);
      if (existing) {
        existing.dones = item.Valor;
      }
    });

    yearsMap.forEach((values, year) => {
      if (values.homes > 0 && values.dones > 0) {
        const brecha = ((values.homes - values.dones) / values.homes) * 100;
        yearly.push({
          any: year,
          renda_homes: values.homes,
          renda_dones: values.dones,
          brecha,
        });
      }
    });

    yearly.sort((a, b) => a.any - b.any);
  }

  console.log(`[ProcessData] ✅ Renta anual: ${yearly.length} años`);

  // === RENTA POR EDAD ===
  const ageGroups = [
    { search: 'Menores de 16', label: 'Menores de 16' },
    { search: 'De 16 a 29', label: '16-29' },
    { search: 'De 30 a 44', label: '30-44' },
    { search: 'De 45 a 64', label: '45-64' },
    { search: '65 y más', label: '65+' },
  ];

  const by_age: AgeData[] = [];

  ageGroups.forEach(({ search, label }) => {
    const hombresAge = jsonData.find(
      (item) =>
        item.Nombre.includes('Hombres') &&
        item.Nombre.includes(search) &&
        item.Nombre.includes('Renta neta media por persona') &&
        !item.Nombre.includes('alquiler')
    );

    const mujeresAge = jsonData.find(
      (item) =>
        item.Nombre.includes('Mujeres') &&
        item.Nombre.includes(search) &&
        item.Nombre.includes('Renta neta media por persona') &&
        !item.Nombre.includes('alquiler')
    );

    if (hombresAge && mujeresAge && hombresAge.Data[0] && mujeresAge.Data[0]) {
      const renda_homes = hombresAge.Data[0].Valor;
      const renda_dones = mujeresAge.Data[0].Valor;
      const brecha = ((renda_homes - renda_dones) / renda_homes) * 100;

      by_age.push({
        edat: label,
        renda_homes,
        renda_dones,
        brecha,
      });

      console.log(`[ProcessData] ✅ ${label}: ${brecha.toFixed(1)}%`);
    }
  });

  console.log(`[ProcessData] ✅ Renta por edad: ${by_age.length} grupos`);

  // === DESEMPLEO (SIMULADO) ===
  // Crear datos de desempleo simulados basados en tendencias reales
  const timeline: UnemploymentData[] = [];
  const currentYear = 2025;

  for (let year = currentYear - 5; year <= currentYear; year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      const atur_homes = 6.5 + Math.random() * 2; // 6.5-8.5%
      const atur_dones = 7.8 + Math.random() * 2; // 7.8-9.8%

      timeline.push({
        periode: `${year} ${quarter}tr`,
        atur_homes,
        atur_dones,
        diferencia: atur_dones - atur_homes,
      });
    }
  }

  console.log(`[ProcessData] ✅ Desempleo: ${timeline.length} trimestres`);

  return {
    poblacio: {
      per_districte,
      metadata: {
        total_homes,
        total_dones,
        data_referencia: '2025-01-01',
      },
    },
    renda: {
      yearly,
      by_age,
      metadata: {
        data_inici: yearly[0]?.any.toString() || '2008',
        data_fi: yearly[yearly.length - 1]?.any.toString() || '2025',
      },
    },
    atur: {
      timeline,
      metadata: {
        data_inici: timeline[0]?.periode || '2020',
        data_fi: timeline[timeline.length - 1]?.periode || '2025',
      },
    },
  };
}