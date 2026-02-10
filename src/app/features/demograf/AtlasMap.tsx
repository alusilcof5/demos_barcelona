import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useDemografStore } from '../../demos.stores';

export function AtlasMap() {
  const mapRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const { geojson, barrisWithVulnerability, selectedBarri, setSelectedBarri } = useDemografStore();

  useEffect(() => {
    if (!mapRef.current) {
      // Inicialitza el mapa
      const map = L.map('atlas-map', {
        center: [41.3874, 2.1686],
        zoom: 12,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !geojson || barrisWithVulnerability.length === 0) return;

    // Neteja la capa anterior
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.remove();
    }

    // Crea el mapa de vulnerabilitat
    const vulnerabilityMap = new Map(
      barrisWithVulnerability.map(b => [b.id, b.vulnerability_score])
    );

    // Funció per obtenir el color segons vulnerabilitat
    const getColor = (score: number) => {
      if (score > 0.7) return '#dc2626'; // Vermell fosc
      if (score > 0.6) return '#ef4444'; // Vermell
      if (score > 0.5) return '#f97316'; // Taronja
      if (score > 0.4) return '#facc15'; // Groc
      if (score > 0.3) return '#a3e635'; // Verd clar
      return '#22c55e'; // Verd
    };

    // Afegeix la nova capa
    const layer = L.geoJSON(geojson, {
      style: (feature) => {
        const barriId = feature?.properties?.id;
        const score = vulnerabilityMap.get(barriId) || 0.5;
        
        return {
          fillColor: getColor(score),
          weight: selectedBarri === barriId ? 3 : 1,
          opacity: 1,
          color: selectedBarri === barriId ? '#1e40af' : '#6b7280',
          fillOpacity: 0.7
        };
      },
      onEachFeature: (feature, layer) => {
        const barriId = feature.properties.id;
        const barri = barrisWithVulnerability.find(b => b.id === barriId);
        
        if (barri) {
          layer.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-lg">${barri.nom}</h3>
              <p class="text-sm text-gray-600">${barri.districte}</p>
              <div class="mt-2 space-y-1 text-sm">
                <div><strong>Vulnerabilitat:</strong> ${(barri.vulnerability_score * 100).toFixed(1)}%</div>
                <div><strong>Ranking:</strong> #${barri.rank} de ${barrisWithVulnerability.length}</div>
                <div><strong>Població:</strong> ${barri.poblacio.toLocaleString()}</div>
              </div>
            </div>
          `);

          layer.on('click', () => {
            setSelectedBarri(barriId);
          });

          layer.on('mouseover', (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3,
              color: '#1e40af'
            });
          });

          layer.on('mouseout', (e) => {
            if (selectedBarri !== barriId) {
              const target = e.target;
              target.setStyle({
                weight: 1,
                color: '#6b7280'
              });
            }
          });
        }
      }
    }).addTo(mapRef.current);

    geoJsonLayerRef.current = layer;

    // Ajusta el zoom al contingut
    if (mapRef.current) {
      mapRef.current.fitBounds(layer.getBounds());
    }
  }, [geojson, barrisWithVulnerability, selectedBarri, setSelectedBarri]);

  return (
    <div className="relative">
      <div id="atlas-map" className="w-full h-[600px] rounded-lg border border-gray-200" />
      
      {/* Llegenda */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-200 z-[1000]">
        <h4 className="font-medium text-sm mb-2">Índex de Vulnerabilitat</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dc2626' }} />
            <span>Molt Alta (&gt;70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }} />
            <span>Alta (60-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f97316' }} />
            <span>Mitjana-Alta (50-60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#facc15' }} />
            <span>Mitjana (40-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#a3e635' }} />
            <span>Baixa (30-40%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }} />
            <span>Molt Baixa (&lt;30%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}