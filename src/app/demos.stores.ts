import { create } from 'zustand';
import type { BarriData, BarriVulnerability, Weights } from './core/vulnerability';
import { DEFAULT_WEIGHTS } from './core/datasets';

interface DemografState {
  // Dades
  barris: BarriData[];
  barrisWithVulnerability: BarriVulnerability[];
  geojson: any;
  
  // Configuració
  weights: Weights;
  selectedBarri: string | null;
  
  // Loading ← IMPORTANTE
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setBarris: (barris: BarriData[]) => void;
  setBarrisWithVulnerability: (barris: BarriVulnerability[]) => void;
  setGeoJSON: (geojson: any) => void;
  setWeights: (weights: Weights) => void;
  setSelectedBarri: (barriId: string | null) => void;
  setLoading: (loading: boolean) => void; // ← IMPORTANTE
  setError: (error: string | null) => void; // ← IMPORTANTE
  resetWeights: () => void;
}

export const useDemografStore = create<DemografState>((set) => ({
  // Estat inicial
  barris: [],
  barrisWithVulnerability: [],
  geojson: null,
  weights: DEFAULT_WEIGHTS,
  selectedBarri: null,
  isLoading: true,
  error: null,

  // Actions
  setBarris: (barris) => set({ barris }),
  setBarrisWithVulnerability: (barrisWithVulnerability) => set({ barrisWithVulnerability }),
  setGeoJSON: (geojson) => set({ geojson }),
  setWeights: (weights) => set({ weights }),
  setSelectedBarri: (selectedBarri) => set({ selectedBarri }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetWeights: () => set({ weights: DEFAULT_WEIGHTS })
}));

// Store per CORPUS·CAT
interface CorpusRecord {
  id: string;
  barri: string;
  districte: string;
  text: string;
  indicators: {
    renda: number;
    atur: number;
    envelliment: number;
    immigracio: number;
  };
  vulnerability_score: number;
  category: 'alta' | 'mitjana' | 'baixa';
  timestamp: string;
}

interface CorpusState {
  records: CorpusRecord[];
  selectedRecord: string | null;
  filterCategory: 'all' | 'alta' | 'mitjana' | 'baixa';
  
  addRecord: (record: CorpusRecord) => void;
  setSelectedRecord: (id: string | null) => void;
  setFilterCategory: (category: 'all' | 'alta' | 'mitjana' | 'baixa') => void;
  exportCorpus: () => string;
  getStats: () => { total: number; byCategory: Record<string, number> };
}

export const useCorpusStore = create<CorpusState>((set, get) => ({
  records: [],
  selectedRecord: null,
  filterCategory: 'all',

  addRecord: (record) => set((state) => ({
    records: [...state.records, record]
  })),

  setSelectedRecord: (id) => set({ selectedRecord: id }),

  setFilterCategory: (category) => set({ filterCategory: category }),

  exportCorpus: () => {
    const { records } = get();
    return JSON.stringify(records, null, 2);
  },

  getStats: () => {
    const { records } = get();
    return {
      total: records.length,
      byCategory: {
        alta: records.filter(r => r.category === 'alta').length,
        mitjana: records.filter(r => r.category === 'mitjana').length,
        baixa: records.filter(r => r.category === 'baixa').length
      }
    };
  }
}));
