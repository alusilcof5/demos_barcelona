export interface DistrictGenderData {
  districte: string;
  poblacio_homes: number;
  poblacio_dones: number;
  percent_homes: number;
  percent_dones: number;
}

export interface WageGapByAge {
  edat: string;
  renda_homes: number;
  renda_dones: number;
  brecha: number;
}

export interface UnemploymentTimeSeries {
  periode: string;
  atur_homes: number;
  atur_dones: number;
  diferencia: number;
}

export interface GenderDataset {
  poblacio: {
    per_districte: DistrictGenderData[];
    metadata: {
      total_homes: number;
      total_dones: number;
      data_referencia: string;
    };
  };
  
  renda: {
    yearly: Array<{
      any: number;
      renda_homes: number;
      renda_dones: number;
      brecha: number;
    }>;
    by_age: WageGapByAge[];
    metadata: {
      data_inici: string;
      data_fi: string;
    };
  };
  
  atur: {
    timeline: UnemploymentTimeSeries[];
    metadata: {
      data_inici: string;
      data_fi: string;
    };
  };
}