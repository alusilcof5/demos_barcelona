export interface DatasetSource {
  id: string;
  name: string;
  url: string;
  format: 'CSV' | 'JSON' | 'GeoJSON';
  lastUpdate: string;
  description: string;
  license: string;
}


export const OPENDATA_SOURCES: DatasetSource[] = [
  {
    id: 'barris-geojson',
    name: 'Barris de Barcelona (GeoJSON)',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/barris/resource/barris.geojson',
    format: 'GeoJSON',
    lastUpdate: '2026-02-10',
    description: 'Geometries dels barris de Barcelona amb límits administratius',
    license: 'CC BY 4.0'
  },
  {
    id: 'renda-familiar',
    name: 'Renda Familiar Disponible per Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/renda-familiar-disponible',
    format: 'CSV',
    lastUpdate: '2024-12-15',
    description: 'Renda familiar disponible bruta per capita en euros',
    license: 'CC BY 4.0'
  },
  

  {
    id: 'renda-per-sexe',
    name: 'Renda Familiar per Sexe i Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/renda-sexe-barri',
    format: 'CSV',
    lastUpdate: '2024-12-15',
    description: 'Renda familiar disponible bruta per capita desagregada per sexe',
    license: 'CC BY 4.0'
  },
  
  {
    id: 'atur',
    name: 'Atur Registrat per Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/atur-registrat',
    format: 'CSV',
    lastUpdate: '2026-01-31',
    description: 'Percentatge d\'atur registrat sobre població activa',
    license: 'CC BY 4.0'
  },
  

  {
    id: 'atur-per-sexe',
    name: 'Atur Registrat per Sexe i Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/atur-sexe-barri',
    format: 'CSV',
    lastUpdate: '2026-01-31',
    description: 'Percentatge d\'atur registrat desagregat per sexe',
    license: 'CC BY 4.0'
  },
  
  {
    id: 'envelliment',
    name: 'Índex d\'Envelliment per Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/index-envelliment',
    format: 'CSV',
    lastUpdate: '2025-06-30',
    description: 'Ratio entre població >65 anys i població <15 anys (×100)',
    license: 'CC BY 4.0'
  },
  {
    id: 'immigracio',
    name: 'Població Estrangera per Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/poblacio-estrangera',
    format: 'CSV',
    lastUpdate: '2025-12-31',
    description: 'Percentatge de població amb nacionalitat estrangera',
    license: 'CC BY 4.0'
  },
  {
    id: 'poblacio',
    name: 'Població Total per Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/poblacio',
    format: 'CSV',
    lastUpdate: '2025-12-31',
    description: 'Població empadronada total per barri',
    license: 'CC BY 4.0'
  },
  
  {
    id: 'poblacio-per-sexe',
    name: 'Població per Sexe i Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/poblacio-sexe-barri',
    format: 'CSV',
    lastUpdate: '2025-12-31',
    description: 'Població empadronada desagregada per sexe',
    license: 'CC BY 4.0'
  }
];


export const INDICADORS_INFO = {
  renda: {
    name: 'Renda Mitjana',
    unit: '€/any',
    description: 'Renda familiar disponible bruta per capita',
    interpretation: 'Menor renda → major vulnerabilitat',
    source: 'renda-familiar'
  },

  renda_dones: {
    name: 'Renda Mitjana Dones',
    unit: '€/any',
    description: 'Renda familiar disponible bruta per capita - Dones',
    interpretation: 'Menor renda → major vulnerabilitat',
    source: 'renda-per-sexe'
  },
  renda_homes: {
    name: 'Renda Mitjana Homes',
    unit: '€/any',
    description: 'Renda familiar disponible bruta per capita - Homes',
    interpretation: 'Menor renda → major vulnerabilitat',
    source: 'renda-per-sexe'
  },
  brecha_salarial: {
    name: 'Brecha Salarial de Gènere',
    unit: '%',
    description: 'Diferència percentual entre renda d\'homes i dones',
    interpretation: 'Major brecha → major desigualtat',
    source: 'renda-per-sexe',
    formula: '(Renda_Homes - Renda_Dones) / Renda_Homes × 100'
  },
  
  atur: {
    name: 'Taxa d\'Atur',
    unit: '%',
    description: 'Percentatge de població activa en situació d\'atur registrat',
    interpretation: 'Major atur → major vulnerabilitat',
    source: 'atur'
  },
 
  atur_dones: {
    name: 'Taxa d\'Atur Dones',
    unit: '%',
    description: 'Percentatge d\'atur registrat - Dones',
    interpretation: 'Major atur → major vulnerabilitat',
    source: 'atur-per-sexe'
  },
  atur_homes: {
    name: 'Taxa d\'Atur Homes',
    unit: '%',
    description: 'Percentatge d\'atur registrat - Homes',
    interpretation: 'Major atur → major vulnerabilitat',
    source: 'atur-per-sexe'
  },
  brecha_empleo: {
    name: 'Brecha d\'Ocupació de Gènere',
    unit: 'punts percentuals',
    description: 'Diferència en punts entre taxa d\'atur de dones i homes',
    interpretation: 'Major diferència → major desigualtat',
    source: 'atur-per-sexe',
    formula: 'Atur_Dones - Atur_Homes'
  },
  
  envelliment: {
    name: 'Índex d\'Envelliment',
    unit: 'ràtio',
    description: 'Relació entre població major de 65 anys i menor de 15',
    interpretation: 'Major envelliment → major vulnerabilitat',
    source: 'envelliment'
  },
  immigracio: {
    name: 'Taxa de Població Estrangera',
    unit: '%',
    description: 'Percentatge de població amb nacionalitat estrangera',
    interpretation: 'Major immigració → possible vulnerabilitat administrativa',
    source: 'immigracio'
  }
};


export const DEFAULT_WEIGHTS = {
  renda: 0.35,
  atur: 0.30,
  envelliment: 0.20,
  immigracio: 0.15
};

export const GENDER_WEIGHTS = {
  renda: 0.25,
  atur: 0.20,
  envelliment: 0.15,
  immigracio: 0.15,
  brecha_genero: 0.25  
};