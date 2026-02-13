const ENDPOINTS = {
  barris: 'https://opendata-ajuntament.barcelona.cat/data/dataset/20170706-districtes-barris/resource/0a0f7c75-e9f9-4f5c-81f5-0dde2ee388bd',
  poblacio: 'https://opendata-ajuntament.barcelona.cat/data/dataset/est-demo-nacio-edat-any-barri',
  renda: 'https://opendata-ajuntament.barcelona.cat/data/dataset/renda-familiar-disponible-capita',
  atur: 'https://opendata-ajuntament.barcelona.cat/data/dataset/atur-registrat-demandempl-barri'
};

console.log(`
Script de descàrrega de dades Open Data BCN

Endpoints disponibles:
- Barris i districtes: ${ENDPOINTS.barris}
- Població: ${ENDPOINTS.poblacio}
- Renda familiar: ${ENDPOINTS.renda}
- Atur registrat: ${ENDPOINTS.atur}

Per implementar aquest script:
1. Instal·la les dependències necessàries
2. Configura les transformacions de dades
3. Genera el fitxer GeoJSON consolidat

Actualment el projecte utilitza dades mock per a la demo.
`);

export {};
