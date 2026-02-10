/**
 * Hook per gestionar les dades dels barris
 */

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDemografStore } from '../demos.stores';
import { loadBarrisData } from '../core/pipeline';
import { calculateVulnerability } from '../core/vulnerability';

export function useBarris() {
  const {
    barris,
    barrisWithVulnerability,
    geojson,
    weights,
    isLoading,
    error,
    setBarris,
    setBarrisWithVulnerability,
    setGeoJSON,
    setLoading,
    setError
  } = useDemografStore();

  // Carrega les dades inicials
  const { data, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ['barris'],
    queryFn: loadBarrisData,
    staleTime: Infinity, // Les dades no canvien sovint
  });

  useEffect(() => {
    if (data) {
      setBarris(data.barris);
      setGeoJSON(data.geojson);
      setLoading(false);
    }
  }, [data, setBarris, setGeoJSON, setLoading]);

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
      setLoading(false);
    }
  }, [queryError, setError, setLoading]);

  // Recalcula la vulnerabilitat quan canvien els pesos
  useEffect(() => {
    if (barris.length > 0) {
      const calculated = calculateVulnerability(barris, weights);
      setBarrisWithVulnerability(calculated);
    }
  }, [barris, weights, setBarrisWithVulnerability]);

  return {
    barris,
    barrisWithVulnerability,
    geojson,
    isLoading: queryLoading || isLoading,
    error: queryError?.message || error
  };
}
