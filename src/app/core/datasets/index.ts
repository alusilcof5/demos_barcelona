/**
 * Definició dels datasets d'Open Data BCN
 * Aquestes dades permeten la trazabilitat completa del projecte
 */

export interface DatasetSource {
  id: string;
  name: string;
  url: string;
  format: 'CSV' | 'JSON' | 'GeoJSON';
  lastUpdate: string;
  description: string;
  license: string;
}

/**
 * Fonts de dades oficials d'Open Data BCN
 * Cada dataset inclou la URL de la font original per garantir la transparència
 */
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
    id: 'atur',
    name: 'Atur Registrat per Barri',
    url: 'https://opendata-ajuntament.barcelona.cat/data/dataset/atur-registrat',
    format: 'CSV',
    lastUpdate: '2026-01-31',
    description: 'Percentatge d\'atur registrat sobre població activa',
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
  }
];

/**
 * Descripció de cada indicador utilitzat en el càlcul de vulnerabilitat
 * Aquesta transparència permet entendre i replicar la metodologia
 */
export const INDICADORS_INFO = {
  renda: {
    name: 'Renda Mitjana',
    unit: '€/any',
    description: 'Renda familiar disponible bruta per capita',
    interpretation: 'Menor renda → major vulnerabilitat',
    source: 'renda-familiar'
  },
  atur: {
    name: 'Taxa d\'Atur',
    unit: '%',
    description: 'Percentatge de població activa en situació d\'atur registrat',
    interpretation: 'Major atur → major vulnerabilitat',
    source: 'atur'
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

/**
 * Pesos per defecte en el càlcul de l'índex de vulnerabilitat
 * Aquests pesos són configurables per permetre diferents anàlisis
 */
export const DEFAULT_WEIGHTS = {
  renda: 0.35,
  atur: 0.30,
  envelliment: 0.20,
  immigracio: 0.15
};
