import { useState, useEffect } from 'react';
import { Search, Filter, Users, Euro, TrendingUp, TrendingDown, Calendar, Globe, X, ChevronRight, Download, FileSpreadsheet, FileJson, File } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as XLSX from 'xlsx';

export function DemografPage() {
  const [barris, setBarris] = useState<any[]>([]);
  const [selectedBarri, setSelectedBarri] = useState<string | null>(null);
  const [selectedDistrito, setSelectedDistrito] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [distritosList, setDistritosList] = useState<{ codigo: string; nombre: string }[]>([]);
  const [scrollY, setScrollY] = useState(0);

  const normalizeName = (name: string | undefined) => {
    if (!name) return '';
    return name.trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('/data/data-demografic/data-barri.csv').then(r => r.json()),
      fetch('/data/data-demografic/poblacio-extranjera.csv').then(r => r.text()),
      fetch('/data/data-demografic/envejecimiento.csv').then(r => r.text()),
      fetch('/data/2022_renda.csv').then(r => r.text())
    ])
      .then(([barriJson, extranjeraText, envejecimientoText, rendaText]) => {
        const barriMap: Record<string, any> = {};
        const normalizedToOriginal: Record<string, string> = {};
        const paroValues: number[] = [];
        const extrValues: number[] = [];

        // 1. CARGAR DATOS BASE DE BARRIOS (población, tasa de paro, coordenadas)
        barriJson.barrios.forEach((b: any) => {
          const nombre = b.nombre?.trim();
          if (!nombre) return;
          const normalized = normalizeName(nombre);
          barriMap[nombre] = {
            nom: nombre,
            distrito_codigo: b.distrito_codigo,
            centroide: { lat: b.centroide.lat, lon: b.centroide.lon },
            poblacio: b.poblacion?.actual || 0,
            atur: b.tasa_paro || null,
            immigracio: null,
            renda_mitjana: null,
            envelliment: null
          };
          normalizedToOriginal[normalized] = nombre;
          if (b.tasa_paro) paroValues.push(b.tasa_paro);
        });

        // 2. CARGAR POBLACIÓN EXTRANJERA (poblacio-extranjera.csv)
        // Formato: Territorio,Tipo de territorio,1997,1998,...,2024,2025
        const extLines = extranjeraText.split('\n');
        const extHeaders = extLines[0].trim().split(',');
        const year2025Index = extHeaders.indexOf('2025');
        
        if (year2025Index === -1) {
          console.error('Columna 2025 no encontrada en poblacio-extranjera.csv');
        } else {
          extLines.slice(1).forEach(line => {
            const row = line.trim().split(',');
            if (row.length < extHeaders.length) return;

            const territorio = row[0]?.trim();
            const tipoTerritorio = row[1]?.trim();
            
            if (!territorio || tipoTerritorio !== 'Barri') return;
            
            const normalized = normalizeName(territorio);
            const originalName = normalizedToOriginal[normalized];
            if (!originalName) return;

            const percentExtr = parseFloat(row[year2025Index]?.trim() || '0') || 0;
            
            if (percentExtr > 0) {
              barriMap[originalName].immigracio = Math.round(percentExtr * 10) / 10;
              extrValues.push(percentExtr);
            }
          });
        }

        // 3. CARGAR ÍNDICE DE ENVEJECIMIENTO (envejecimiento.csv)
        // Formato: Territorio,Tipo de territorio,1997,1998,...,2024,2025
        const envLines = envejecimientoText.split('\n');
        const envHeaders = envLines[0].trim().split(',');
        
        // Buscar la columna de 2024
        const year2024Index = envHeaders.indexOf('2024');
        
        if (year2024Index === -1) {
          console.error('Columna 2024 no encontrada en envejecimiento.csv');
        } else {
          envLines.slice(1).forEach(line => {
            const row = line.trim().split(',');
            if (row.length < envHeaders.length) return;

            const territorio = row[0]?.trim();
            const tipoTerritorio = row[1]?.trim();
            
            if (!territorio || tipoTerritorio !== 'Barri') return;
            
            const normalized = normalizeName(territorio);
            const originalName = normalizedToOriginal[normalized];
            if (!originalName) return;

            const valorEnv = parseFloat(row[year2024Index]?.trim() || '0') || 0;
            
            if (valorEnv > 0) {
              barriMap[originalName].envelliment = Math.round(valorEnv * 10) / 10;
            }
          });
        }

        // 4. CARGAR RENTA MEDIA 2022 (2022_renda.csv)
        // Asumiendo formato: Any,Nom_Barri,Import_Euros
        const rendaLines = rendaText.split('\n');
        if (rendaLines.length > 0) {
          const rendaHeaders = rendaLines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
          const anyIndex = rendaHeaders.findIndex(h => h === 'Any');
          const nomBarriIndex = rendaHeaders.findIndex(h => h === 'Nom_Barri');
          const importIndex = rendaHeaders.findIndex(h => h === 'Import_Euros');

          if (anyIndex !== -1 && nomBarriIndex !== -1 && importIndex !== -1) {
            const rentaByBarri: Record<string, { sum: number; count: number }> = {};

            rendaLines.slice(1).forEach(line => {
              const row = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
              if (row[anyIndex] !== '2022') return;

              const nomBarri = row[nomBarriIndex];
              if (!nomBarri) return;
              const normalized = normalizeName(nomBarri);
              const originalName = normalizedToOriginal[normalized];
              if (!originalName) return;

              const importVal = parseFloat(row[importIndex] || '0') || 0;

              if (!rentaByBarri[originalName]) rentaByBarri[originalName] = { sum: 0, count: 0 };
              rentaByBarri[originalName].sum += importVal;
              rentaByBarri[originalName].count += 1;
            });

            Object.keys(rentaByBarri).forEach(name => {
              const avg = rentaByBarri[name].count > 0 
                ? Math.round(rentaByBarri[name].sum / rentaByBarri[name].count) 
                : null;
              barriMap[name].renda_mitjana = avg;
            });
          }
        }

        // 5. CALCULAR PUNTUACIÓN DE VULNERABILIDAD
        const minParo = Math.min(...paroValues.filter(v => v !== null && !isNaN(v)));
        const maxParo = Math.max(...paroValues.filter(v => v !== null && !isNaN(v)));
        const minExtr = Math.min(...extrValues.filter(v => v !== null && !isNaN(v)));
        const maxExtr = Math.max(...extrValues.filter(v => v !== null && !isNaN(v)));

        const processed = Object.values(barriMap).map((b: any) => {
          let vulnerability_score = null;
          let count = 0;
          let sum = 0;
          
          if (b.atur !== null && !isNaN(b.atur)) {
            const norm = maxParo > minParo ? (b.atur - minParo) / (maxParo - minParo) : 0.5;
            sum += norm;
            count++;
          }
          
          if (b.immigracio !== null && !isNaN(b.immigracio)) {
            const norm = maxExtr > minExtr ? (b.immigracio - minExtr) / (maxExtr - minExtr) : 0.5;
            sum += norm;
            count++;
          }
          
          if (count > 0) vulnerability_score = sum / count;

          return {
            ...b,
            vulnerability_score,
            districte: `Distrito ${b.distrito_codigo}`
          };
        });

        // 6. ORDENAR POR VULNERABILIDAD Y ASIGNAR RANKING
        processed.sort((a: any, b: any) => (b.vulnerability_score || 0) - (a.vulnerability_score || 0));
        processed.forEach((b: any, i: number) => b.rank = i + 1);

        setBarris(processed);

        // 7. CREAR LISTA DE DISTRITOS
        const distritos = [...new Set(processed.map((b: any) => b.distrito_codigo))].sort();
        setDistritosList(distritos.map(c => ({ codigo: c, nombre: `Distrito ${c}` })));
      })
      .catch(err => console.error('Error cargando datos:', err));
  }, []);

  // FUNCIONES DE DESCARGA
  const prepareDataForExport = () => {
    return barris.map(barri => ({
      'Ranking': barri.rank,
      'Barrio': barri.nom,
      'Distrito': barri.distrito_codigo,
      'Población': barri.poblacio,
      'Tasa de Paro (%)': barri.atur !== null ? barri.atur.toFixed(1) : 'N/A',
      'Población Extranjera (%)': barri.immigracio !== null ? barri.immigracio.toFixed(1) : 'N/A',
      'Índice de Envejecimiento': barri.envelliment !== null ? barri.envelliment.toFixed(1) : 'N/A',
      'Renta Media (€/año)': barri.renda_mitjana !== null ? barri.renda_mitjana : 'N/A',
      'Índice de Vulnerabilidad (0-100)': barri.vulnerability_score !== null ? (barri.vulnerability_score * 100).toFixed(1) : 'N/A',
      'Nivel de Vulnerabilidad': getVulnerabilityLabel(barri.vulnerability_score),
      'Latitud': barri.centroide.lat,
      'Longitud': barri.centroide.lon
    }));
  };

  const downloadExcel = () => {
    const data = prepareDataForExport();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vulnerabilidad Barcelona');
    
    // Ajustar ancho de columnas
    const maxWidth = data.reduce((w, r) => Math.max(w, r.Barrio.length), 10);
    worksheet['!cols'] = [
      { wch: 8 },  // Ranking
      { wch: Math.min(maxWidth + 2, 30) },  // Barrio
      { wch: 10 }, // Distrito
      { wch: 12 }, // Población
      { wch: 16 }, // Tasa de Paro
      { wch: 22 }, // Población Extranjera
      { wch: 24 }, // Envejecimiento
      { wch: 18 }, // Renta Media
      { wch: 28 }, // Índice Vulnerabilidad
      { wch: 22 }, // Nivel Vulnerabilidad
      { wch: 12 }, // Latitud
      { wch: 12 }  // Longitud
    ];
    
    XLSX.writeFile(workbook, 'vulnerabilidad_barcelona_2025.xlsx');
  };

  const downloadCSV = () => {
    const data = prepareDataForExport();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'vulnerabilidad_barcelona_2025.csv';
    link.click();
  };

  const downloadJSON = () => {
    const data = barris.map(barri => ({
      ranking: barri.rank,
      barrio: barri.nom,
      distrito_codigo: barri.distrito_codigo,
      distrito_nombre: barri.districte,
      poblacion: barri.poblacio,
      tasa_paro: barri.atur,
      poblacion_extranjera_porcentaje: barri.immigracio,
      indice_envejecimiento: barri.envelliment,
      renta_media_euros: barri.renda_mitjana,
      indice_vulnerabilidad: barri.vulnerability_score !== null ? parseFloat((barri.vulnerability_score * 100).toFixed(1)) : null,
      nivel_vulnerabilidad: getVulnerabilityLabel(barri.vulnerability_score),
      coordenadas: {
        latitud: barri.centroide.lat,
        longitud: barri.centroide.lon
      }
    }));
    
    const jsonData = {
      metadata: {
        titulo: "Vulnerabilidad de los Barrios de Barcelona",
        fecha_actualizacion: "Enero 2025",
        total_barrios: barris.length,
        fuente: "Idescat - Institut d'Estadística de Catalunya",
        descripcion: "Dataset completo con indicadores sociodemográficos y de vulnerabilidad de los 73 barrios de Barcelona"
      },
      barrios: data
    };
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'vulnerabilidad_barcelona_2025.json';
    link.click();
  };

  const getVulnerabilityColor = (score: number | null) => {
    if (!score) return { border: 'border-slate-400', bg: 'bg-slate-50', dot: 'bg-slate-400', text: 'text-slate-600' };
    if (score > 0.7) return { border: 'border-red-500', bg: 'bg-red-50', dot: 'bg-red-500', text: 'text-red-700' };
    if (score > 0.6) return { border: 'border-red-400', bg: 'bg-red-50', dot: 'bg-red-400', text: 'text-red-600' };
    if (score > 0.5) return { border: 'border-orange-500', bg: 'bg-orange-50', dot: 'bg-orange-500', text: 'text-orange-700' };
    if (score > 0.4) return { border: 'border-yellow-500', bg: 'bg-yellow-50', dot: 'bg-yellow-500', text: 'text-yellow-700' };
    if (score > 0.3) return { border: 'border-lime-500', bg: 'bg-lime-50', dot: 'bg-lime-500', text: 'text-lime-700' };
    return { border: 'border-green-500', bg: 'bg-green-50', dot: 'bg-green-500', text: 'text-green-700' };
  };

  const getVulnerabilityLabel = (score: number | null) => {
    if (!score) return 'Datos insuficientes';
    if (score > 0.7) return 'Muy Alta';
    if (score > 0.6) return 'Alta';
    if (score > 0.5) return 'Media-Alta';
    if (score > 0.4) return 'Media';
    if (score > 0.3) return 'Baja';
    return 'Muy Baja';
  };

  const getHexColor = (score: number | null) => {
    if (!score) return '#94a3b8';
    if (score > 0.7) return '#dc2626';
    if (score > 0.6) return '#f97316';
    if (score > 0.5) return '#eab308';
    if (score > 0.4) return '#84cc16';
    if (score > 0.3) return '#22c55e';
    return '#16a34a';
  };

  const getLevelLower = (score: number | null) => getVulnerabilityLabel(score).toLowerCase().replace('-', ' ');

  const displayedBarris = barris.filter(b => {
    const matchesDistrict = !selectedDistrito || b.distrito_codigo === selectedDistrito;
    const matchesBarrio = !selectedBarri || b.nom === selectedBarri;
    const matchesSearch = !searchTerm || b.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || getLevelLower(b.vulnerability_score) === filterLevel;
    return matchesDistrict && matchesBarrio && matchesSearch && matchesLevel;
  });

  const barriosDelDistrito = selectedDistrito 
    ? barris.filter(b => b.distrito_codigo === selectedDistrito)
    : [];

  const selectedBarriData = selectedBarri ? barris.find(b => b.nom === selectedBarri) : null;

  const handleMapClick = (barri: any) => {
    setSelectedBarri(barri.nom);
    setSelectedDistrito(barri.distrito_codigo);
  };

  // Función para obtener la imagen del barrio
  const getBarrioImage = (nombreBarrio: string) => {
    // Normalizar el nombre del barrio para el nombre del archivo
    const normalizedName = nombreBarrio
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
      .replace(/[^a-z0-9]/g, '-') // Reemplazar caracteres especiales por guiones
      .replace(/-+/g, '-') // Reemplazar múltiples guiones por uno solo
      .replace(/^-|-$/g, ''); // Eliminar guiones al inicio y final
    
    return `/images/barrios/${normalizedName}.jpg`;
  };

  // Manejar error de carga de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/placeholder-barrio.jpg';
  };

  // Descargar imagen del barrio
  const downloadBarrioImage = (nombreBarrio: string) => {
    const imageUrl = getBarrioImage(nombreBarrio);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `barrio-${nombreBarrio.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Estilo profesional con imagen de fondo */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Fondo con imagen */}
        <div className="absolute inset-0 z-0">
          <img 
            src="../images/2.webp" 
            alt="Barcelona background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
        </div>

        {/* Patrón de puntos animado */}
        <div 
          className="absolute inset-0 opacity-10 z-0"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div 
          className="container mx-auto px-4 md:px-8 relative z-10"
          style={{
            transform: `translateY(${scrollY * -0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 600)
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Mapa de Vulnerabilidad de Barcelona
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Haz clic en los círculos para ver los detalles del barrio debajo del mapa.<br />
              <strong className="text-white">Los colores indican el nivel de vulnerabilidad</strong> (calculado con tasa de paro y población extranjera 2025 - datos reales de Idescat).
            </p>
          </div>
        </div>

        {/* Ola decorativa */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,40 L1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Sección de filtros - Estilo profesional */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Explora los Datos
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600">
                Filtra y busca barrios para analizar su vulnerabilidad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Distrito</label>
                <select
                  value={selectedDistrito || ''}
                  onChange={(e) => {
                    setSelectedDistrito(e.target.value);
                    setSelectedBarri(null);
                  }}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all shadow-sm hover:border-slate-300"
                >
                  <option value="">Todos los distritos</option>
                  {distritosList.map(d => (
                    <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Barrio</label>
                <select
                  value={selectedBarri || ''}
                  onChange={(e) => setSelectedBarri(e.target.value || null)}
                  disabled={!selectedDistrito}
                  className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all shadow-sm hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Todos los barrios</option>
                  {barriosDelDistrito.map(b => (
                    <option key={b.nom} value={b.nom}>{b.nom}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Buscar barrio</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all shadow-sm hover:border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Nivel de vulnerabilidad</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full pl-10 p-3 border-2 border-slate-200 rounded-lg appearance-none focus:border-blue-500 focus:outline-none transition-all shadow-sm hover:border-slate-300"
                  >
                    <option value="all">Todos los niveles</option>
                    <option value="muy alta">Muy Alta</option>
                    <option value="alta">Alta</option>
                    <option value="media alta">Media-Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                    <option value="muy baja">Muy Baja</option>
                    <option value="datos insuficientes">Datos insuficientes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección del mapa - Diseño mejorado */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200" style={{ height: '700px' }}>
              {barris.length > 0 ? (
                <MapContainer center={[41.3851, 2.1734]} zoom={12} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  {displayedBarris.map((barri) => (
                    <CircleMarker
                      key={barri.nom}
                      center={[barri.centroide.lat, barri.centroide.lon]}
                      radius={barri.nom === selectedBarri ? 25 : 15}
                      pathOptions={{
                        fillColor: getHexColor(barri.vulnerability_score),
                        fillOpacity: barri.nom === selectedBarri ? 1 : 0.85,
                        color: barri.nom === selectedBarri ? '#000' : '#1e293b',
                        weight: barri.nom === selectedBarri ? 4 : 2
                      }}
                      eventHandlers={{
                        click: () => handleMapClick(barri)
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                        <div className="text-center p-1">
                          <strong className="text-sm">{barri.nom}</strong><br />
                          {barri.vulnerability_score !== null ? (
                            <>
                              <span className="text-xs">Vulnerabilidad: {(barri.vulnerability_score * 100).toFixed(1)}%</span><br />
                              <span className="text-xs font-medium">{getVulnerabilityLabel(barri.vulnerability_score)}</span>
                            </>
                          ) : (
                            <span className="text-xs">Datos insuficientes</span>
                          )}
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p>Cargando mapa y datos reales...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedBarriData && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className={`rounded-2xl border-2 ${getVulnerabilityColor(selectedBarriData.vulnerability_score).border} ${getVulnerabilityColor(selectedBarriData.vulnerability_score).bg} shadow-xl overflow-hidden`}>
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-5 h-5 rounded-full ${getVulnerabilityColor(selectedBarriData.vulnerability_score).dot}`}></div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{selectedBarriData.nom}</h2>
                        <p className="text-lg text-slate-600 mt-1">{selectedBarriData.districte}</p>
                        <p className="text-sm text-slate-500 mt-2">
                          Ranking: <strong>#{selectedBarriData.rank}</strong> de {barris.length} barrios
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBarri(null);
                        setSelectedDistrito(null);
                      }}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Cerrar panel"
                    >
                      <X className="w-6 h-6 text-slate-400" />
                    </button>
                  </div>

                  {/* Imagen del barrio */}
                  <div className="mb-8">
                    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg group">
                      <img 
                        src={getBarrioImage(selectedBarriData.nom)}
                        onError={handleImageError}
                        alt={`Vista del barrio ${selectedBarriData.nom}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Botón de descarga */}
                      <button
                        onClick={() => downloadBarrioImage(selectedBarriData.nom)}
                        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-lg shadow-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
                        title="Descargar imagen del barrio"
                      >
                        <Download className="w-5 h-5" />
                        <span className="text-sm font-medium">Descargar</span>
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <p className="text-sm font-medium opacity-90">Vista representativa del barrio</p>
                          <p className="text-xs opacity-75 mt-1">{selectedBarriData.nom}, Barcelona</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Score de vulnerabilidad */}
                    <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-slate-200">
                      {selectedBarriData.vulnerability_score !== null ? (
                        <>
                          <div className="text-6xl font-bold text-slate-900 mb-2">
                            {(selectedBarriData.vulnerability_score * 100).toFixed(1)}
                          </div>
                          <div className="text-2xl text-slate-600 mb-4">/100</div>
                          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${getVulnerabilityColor(selectedBarriData.vulnerability_score).bg} border-2 ${getVulnerabilityColor(selectedBarriData.vulnerability_score).border}`}>
                            <div className={`w-3 h-3 rounded-full ${getVulnerabilityColor(selectedBarriData.vulnerability_score).dot}`}></div>
                            <span className={`font-semibold ${getVulnerabilityColor(selectedBarriData.vulnerability_score).text}`}>
                              Vulnerabilidad {getVulnerabilityLabel(selectedBarriData.vulnerability_score)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl text-slate-500">Datos insuficientes para vulnerabilidad</div>
                      )}
                    </div>

                    {/* Indicadores */}
                    <div className="space-y-6">
                      {/* Población */}
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-600 font-medium">Población</div>
                          <div className="text-2xl font-bold text-slate-900">{selectedBarriData.poblacio.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">habitantes (2025)</div>
                        </div>
                      </div>

                      {/* Renta */}
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Euro className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-600 font-medium">Renta media</div>
                          <div className="text-2xl font-bold text-slate-900">
                            {selectedBarriData.renda_mitjana !== null ? `${selectedBarriData.renda_mitjana.toLocaleString()}€` : 'No disponible'}
                          </div>
                          <div className="text-xs text-slate-500">por persona/año (2022)</div>
                        </div>
                      </div>

                      {/* Paro */}
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          {selectedBarriData.atur !== null && selectedBarriData.atur > 10 ? 
                            <TrendingUp className="w-7 h-7 text-white" /> : 
                            <TrendingDown className="w-7 h-7 text-white" />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-600 font-medium">Tasa de paro</div>
                          <div className="text-2xl font-bold text-slate-900">
                            {selectedBarriData.atur !== null ? `${selectedBarriData.atur.toFixed(1)}%` : 'No disponible'}
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                            <div
                              className={`h-2 rounded-full ${selectedBarriData.atur > 15 ? 'bg-red-500' : selectedBarriData.atur > 8 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: selectedBarriData.atur !== null ? `${Math.min(selectedBarriData.atur * 4, 100)}%` : '0%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Más indicadores */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Envejecimiento */}
                    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-600 font-medium">Índice de envejecimiento</div>
                        <div className="text-2xl font-bold text-slate-900">
                          {selectedBarriData.envelliment !== null ? selectedBarriData.envelliment.toFixed(1) : 'No disponible'}
                        </div>
                        <div className="text-xs text-slate-500">índice año 2024</div>
                      </div>
                    </div>

                    {/* Población extranjera */}
                    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Globe className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-600 font-medium">Población extranjera</div>
                        <div className="text-2xl font-bold text-slate-900">
                          {selectedBarriData.immigracio !== null ? `${selectedBarriData.immigracio.toFixed(1)}%` : 'No disponible'}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: selectedBarriData.immigracio !== null ? `${Math.min(selectedBarriData.immigracio * 2, 100)}%` : '0%' }}></div>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">porcentaje 2025 (Idescat)</div>
                      </div>
                    </div>
                  </div>

                  {/* Botón de cerrar */}
                  <div className="text-center">
                    <button 
                      onClick={() => {
                        setSelectedBarri(null);
                        setSelectedDistrito(null);
                      }}
                      className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
                    >
                      Limpiar selección
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Descarga de Datos */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Descarga los Datos
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Todos los datos de vulnerabilidad por barrio disponibles en múltiples formatos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Excel */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-green-200 hover:border-green-400">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <FileSpreadsheet className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 text-center">
                  Excel (.xlsx)
                </h3>
                <p className="text-slate-600 text-sm mb-4 text-center leading-relaxed">
                  Dataset completo con todos los barrios y sus indicadores
                </p>
                <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="block mb-2 text-green-900">Contenido:</strong>
                    • 73 barrios de Barcelona<br />
                    • Índice de vulnerabilidad<br />
                    • Tasa de paro<br />
                    • Población extranjera<br />
                    • Índice de envejecimiento<br />
                    • Renta media por barrio
                  </p>
                </div>
                <button 
                  onClick={downloadExcel}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-5 h-5" />
                  Descargar Excel
                </button>
              </div>

              {/* CSV */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-blue-200 hover:border-blue-400">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <File className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 text-center">
                  CSV (.csv)
                </h3>
                <p className="text-slate-600 text-sm mb-4 text-center leading-relaxed">
                  Datos separados por comas para importar a cualquier programa
                </p>
                <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="block mb-2 text-blue-900">Ideal para:</strong>
                    • Análisis en Python/R<br />
                    • Importar a bases de datos<br />
                    • Procesamiento automático<br />
                    • Integración con otras apps<br />
                    • Machine Learning<br />
                    • Visualizaciones personalizadas
                  </p>
                </div>
                <button 
                  onClick={downloadCSV}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-5 h-5" />
                  Descargar CSV
                </button>
              </div>

              {/* JSON */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-slate-200 hover:border-slate-400">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <FileJson className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 text-center">
                  JSON (.json)
                </h3>
                <p className="text-slate-600 text-sm mb-4 text-center leading-relaxed">
                  Formato estructurado para desarrollo web y APIs
                </p>
                <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-200">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="block mb-2 text-slate-900">Perfecto para:</strong>
                    • Aplicaciones web<br />
                    • APIs REST<br />
                    • Desarrollo JavaScript<br />
                    • Mapas interactivos<br />
                    • Dashboards<br />
                    • Integraciones modernas
                  </p>
                </div>
                <button 
                  onClick={downloadJSON}
                  className="w-full px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-5 h-5" />
                  Descargar JSON
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3">Información de los Datos</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-100">
                    <div>
                      <strong className="text-white block mb-1">Actualización:</strong>
                      Datos actualizados en enero 2025
                    </div>
                    <div>
                      <strong className="text-white block mb-1">Total de barrios:</strong>
                      73 barrios de Barcelona
                    </div>
                    <div>
                      <strong className="text-white block mb-1">Indicadores:</strong>
                      6 métricas por barrio
                    </div>
                    <div>
                      <strong className="text-white block mb-1">Licencia:</strong>
                      Open Data - Uso libre con atribución
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ayuda para elegir */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
              <h3 className="font-bold text-xl text-slate-900 mb-4 text-center">
                ¿No sabes cuál descargar?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="block mb-2 text-green-900">Excel</strong>
                    Si quieres hacer análisis en hojas de cálculo o filtros rápidos
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <File className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="block mb-2 text-blue-900">CSV</strong>
                    Si necesitas importar a programas o hacer análisis estadístico
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileJson className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="block mb-2 text-slate-900">JSON</strong>
                    Si eres desarrollador web o necesitas integrar los datos en una app
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}