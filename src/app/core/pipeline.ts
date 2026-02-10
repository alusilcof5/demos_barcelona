/**
 * Pipeline de processament de dades
 * Aquest mòdul coordina la càrrega, transformació i enriquiment de dades
 */

import type { BarriData } from './vulnerability';

/**
 * Carrega les dades del GeoJSON dels barris
 */
export async function fetchBarrisGeoJSON() {
  try {
    const response = await fetch('/geojson/bcn-barris.geojson');
    if (!response.ok) {
      throw new Error(`Error carregant GeoJSON: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en fetchBarrisGeoJSON:', error);
    throw error;
  }
}

/**
 * Extreu les dades tabulars del GeoJSON
 */
export function extractBarriData(geojson: any): BarriData[] {
  if (!geojson?.features) {
    throw new Error('Format GeoJSON invàlid');
  }

  return geojson.features.map((feature: any) => {
    const props = feature.properties;
    return {
      id: props.id,
      nom: props.nom,
      districte: props.districte,
      poblacio: props.poblacio,
      renda_mitjana: props.renda_mitjana,
      atur: props.atur,
      envelliment: props.envelliment,
      immigracio: props.immigracio
    };
  });
}

/**
 * Pipeline complet: carrega i processa les dades
 */
export async function loadBarrisData(): Promise<{
  geojson: any;
  barris: BarriData[];
}> {
  const geojson = await fetchBarrisGeoJSON();
  const barris = extractBarriData(geojson);
  
  console.log(`✅ Pipeline completat: ${barris.length} barris carregats`);
  
  return { geojson, barris };
}

/**
 * Valida la integritat de les dades
 */
export function validateBarriData(barri: BarriData): boolean {
  return !!(
    barri.id &&
    barri.nom &&
    barri.districte &&
    typeof barri.poblacio === 'number' &&
    typeof barri.renda_mitjana === 'number' &&
    typeof barri.atur === 'number' &&
    typeof barri.envelliment === 'number' &&
    typeof barri.immigracio === 'number'
  );
}
