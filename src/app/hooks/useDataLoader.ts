import { useEffect } from 'react';
import { useDemografStore } from '../demos.stores';
import { loadBarrisData } from '../core/pipeline';
import { calculateVulnerability } from '../core/vulnerability';

export function useDataLoader() {
  const { setBarris, setBarrisWithVulnerability, setGeoJSON, setLoading, setError, weights } = useDemografStore();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('🔄 Cargando datos de Barcelona...');
        const data = await loadBarrisData();
        
        console.log('✅ Datos cargados:', data.barris.length, 'barris');
        setBarris(data.barris);
        setGeoJSON(data.geojson);

        const calculated = calculateVulnerability(data.barris, weights);
        setBarrisWithVulnerability(calculated);

        setLoading(false);
        console.log('✅ Pipeline completado correctamente');
      } catch (error) {
        console.error('❌ Error cargando datos:', error);
        setError(error instanceof Error ? error.message : 'Error desconegut');
        setLoading(false);
      }
    };

    loadData();
  }, []); // Solo cargar una vez al inicio
}