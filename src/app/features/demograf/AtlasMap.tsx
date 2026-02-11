import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useDemografStore } from '../../demos.stores';
import 'leaflet/dist/leaflet.css';

// Fix per al problema dels marcadors de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: true
      });

      // Capa base d'OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
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
          // Popup accessible
          layer.bindPopup(`
            <div class="p-3" role="dialog" aria-label="Informació del barri ${barri.nom}">
              <h3 class="font-bold text-lg mb-1">${barri.nom}</h3>
              <p class="text-sm text-gray-600 mb-2">${barri.districte}</p>
              <div class="space-y-1 text-sm">
                <div><strong>Vulnerabilitat:</strong> ${(barri.vulnerability_score * 100).toFixed(1)}%</div>
                <div><strong>Ranking:</strong> #${barri.rank} de ${barrisWithVulnerability.length}</div>
                <div><strong>Població:</strong> ${barri.poblacio.toLocaleString()} habitants</div>
                <div><strong>Renda mitjana:</strong> ${barri.renda_mitjana.toLocaleString()}€</div>
                <div><strong>Atur:</strong> ${barri.atur.toFixed(1)}%</div>
              </div>
            </div>
          `);

          // Events accessibles
          layer.on('click', () => {
            setSelectedBarri(barriId);
            // Anuncia la selecció per a lectors de pantalla
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = `Barri seleccionat: ${barri.nom}, vulnerabilitat ${(barri.vulnerability_score * 100).toFixed(1)}%`;
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
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

          // Afegeix atributs accessibles al layer
          const element = (layer as any)._path;
          if (element) {
            element.setAttribute('role', 'button');
            element.setAttribute('aria-label', `Barri ${barri.nom}, vulnerabilitat ${(barri.vulnerability_score * 100).toFixed(1)}%`);
            element.setAttribute('tabindex', '0');
            
            // Suport per teclat
            element.addEventListener('keydown', (e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedBarri(barriId);
              }
            });
          }
        }
      }
    }).addTo(mapRef.current);

    geoJsonLayerRef.current = layer;

    // Ajusta el zoom al contingut
    if (mapRef.current) {
      mapRef.current.fitBounds(layer.getBounds(), {
        padding: [20, 20]
      });
    }
  }, [geojson, barrisWithVulnerability, selectedBarri, setSelectedBarri]);

  return (
    <div className="relative" role="region" aria-label="Mapa interactiu de vulnerabilitat urbana">
      <div 
        id="atlas-map" 
        className="w-full h-[600px] rounded-lg border-2 border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        role="application"
        aria-label="Mapa interactiu dels barris de Barcelona amb índex de vulnerabilitat"
        tabIndex={0}
      />
      
      {/* Llegenda accessible */}
      <div 
        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-200 z-[1000]"
        role="region"
        aria-label="Llegenda del mapa"
      >
        <h4 className="font-medium text-sm mb-3 text-gray-900" id="legend-title">
          Índex de Vulnerabilitat
        </h4>
        <div className="space-y-2 text-xs" role="list" aria-labelledby="legend-title">
          <div className="flex items-center gap-2" role="listitem">
            <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#dc2626' }} aria-hidden="true" />
            <span>Molt Alta (&gt;70%)</span>
          </div>
          <div className="flex items-center gap-2" role="listitem">
            <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#ef4444' }} aria-hidden="true" />
            <span>Alta (60-70%)</span>
          </div>
          <div className="flex items-center gap-2" role="listitem">
            <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#f97316' }} aria-hidden="true" />
            <span>Mitjana-Alta (50-60%)</span>
          </div>
          <div className="flex items-center gap-2" role="listitem">
            <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#facc15' }} aria-hidden="true" />
            <span>Mitjana (40-50%)</span>
          </div>
          <div className="flex items-center gap-2" role="listitem">
            <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#a3e635' }} aria-hidden="true" />
            <span>Baixa (30-40%)</span>
          </div>
          <div className="flex items-center gap-2" role="listitem">
            <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: '#22c55e' }} aria-hidden="true" />
            <span>Molt Baixa (&lt;30%)</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-600 mt-3 border-t border-gray-200 pt-2">
          <strong>Consell:</strong> Fes clic o prem Enter sobre un barri per veure'n els detalls
        </p>
      </div>
    </div>
  );
}