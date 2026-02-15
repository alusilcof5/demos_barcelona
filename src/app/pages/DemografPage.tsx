import { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Users, DollarSign, Briefcase, User } from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../i18n/LanguageContext';

export function DemografPage() {
  const { t } = useLanguage();
  const [selectedBarrio, setSelectedBarrio] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const barriosData = {
    'El Raval': {
      necesidad: 82,
      nivel: 'Muy Alta',
      color: 'red',
      ingresos: 9847,
      paro: 18.5,
      envejecimiento: 145,
      extranjeros: 43.2,
      poblacion: 47838,
      coordinates: [[41.380, 2.170], [41.385, 2.170], [41.385, 2.175], [41.380, 2.175]]
    },
    'Pedralbes': {
      necesidad: 15,
      nivel: 'Baja',
      color: 'green',
      ingresos: 58934,
      paro: 3.2,
      envejecimiento: 98,
      extranjeros: 15.3,
      poblacion: 13956,
      coordinates: [[41.390, 2.110], [41.395, 2.110], [41.395, 2.115], [41.390, 2.115]]
    },
    'Gràcia': {
      necesidad: 45,
      nivel: 'Media',
      color: 'yellow',
      ingresos: 25000,
      paro: 8.1,
      envejecimiento: 120,
      extranjeros: 25.5,
      poblacion: 52134,
      coordinates: [[41.400, 2.150], [41.405, 2.150], [41.405, 2.155], [41.400, 2.155]]
    },
    'Eixample': {
      necesidad: 30,
      nivel: 'Media',
      color: 'yellow',
      ingresos: 32000,
      paro: 6.5,
      envejecimiento: 110,
      extranjeros: 22.0,
      poblacion: 262485,
      coordinates: [[41.385, 2.155], [41.390, 2.155], [41.390, 2.160], [41.385, 2.160]]
    },
    'Ciutat Vella': {
      necesidad: 70,
      nivel: 'Alta',
      color: 'orange',
      ingresos: 15000,
      paro: 12.3,
      envejecimiento: 135,
      extranjeros: 35.0,
      poblacion: 101387,
      coordinates: [[41.375, 2.165], [41.380, 2.165], [41.380, 2.170], [41.375, 2.170]]
    },
    'Sants-Montjuïc': {
      necesidad: 55,
      nivel: 'Media',
      color: 'yellow',
      ingresos: 22000,
      paro: 9.8,
      envejecimiento: 125,
      extranjeros: 28.5,
      poblacion: 183645,
      coordinates: [[41.370, 2.140], [41.375, 2.140], [41.375, 2.145], [41.370, 2.145]]
    },
    'Sarrià-Sant Gervasi': {
      necesidad: 20,
      nivel: 'Baja',
      color: 'green',
      ingresos: 45000,
      paro: 4.5,
      envejecimiento: 105,
      extranjeros: 18.0,
      poblacion: 148089,
      coordinates: [[41.395, 2.130], [41.400, 2.130], [41.400, 2.135], [41.395, 2.135]]
    },
    'Horta-Guinardó': {
      necesidad: 60,
      nivel: 'Alta',
      color: 'orange',
      ingresos: 18000,
      paro: 11.2,
      envejecimiento: 130,
      extranjeros: 30.0,
      poblacion: 169920,
      coordinates: [[41.410, 2.160], [41.415, 2.160], [41.415, 2.165], [41.410, 2.165]]
    },
    'Nou Barris': {
      necesidad: 75,
      nivel: 'Muy Alta',
      color: 'red',
      ingresos: 12000,
      paro: 15.0,
      envejecimiento: 140,
      extranjeros: 40.0,
      poblacion: 167276,
      coordinates: [[41.430, 2.170], [41.435, 2.170], [41.435, 2.175], [41.430, 2.175]]
    },
    'Sant Andreu': {
      necesidad: 50,
      nivel: 'Media',
      color: 'yellow',
      ingresos: 24000,
      paro: 8.9,
      envejecimiento: 115,
      extranjeros: 26.0,
      poblacion: 148026,
      coordinates: [[41.420, 2.180], [41.425, 2.180], [41.425, 2.185], [41.420, 2.185]]
    }
  };

  const barrioSeleccionado = selectedBarrio ? barriosData[selectedBarrio as keyof typeof barriosData] : null;
  const mediaBarcelona = {
    ingresos: 17300,
    paro: 7.2,
    envejecimiento: 138,
    extranjeros: 21.0
  };

  const getColor = (necesidad: number) => {
    if (necesidad <= 25) return 'green';
    if (necesidad <= 50) return 'yellow';
    if (necesidad <= 75) return 'orange';
    return 'red';
  };

  const handleBarrioClick = (barrio: string) => {
    setSelectedBarrio(barrio);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Estilo azul profesional */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Fondo con imagen */}
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/2.webp" 
            alt="Barcelona background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
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
              {t('demograf.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {t('demograf.hero.subtitle')}
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

      {/* Legend Section - Estilo profesional */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('demograf.legend.title')}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600">
                {t('demograf.legend.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {/* Verde - Baja */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🟢</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{t('demograf.legend.low.title')}</h3>
                </div>
                <p className="text-sm text-slate-600">{t('demograf.legend.low.description')}</p>
              </div>

              {/* Amarillo - Media */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🟡</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{t('demograf.legend.medium.title')}</h3>
                </div>
                <p className="text-sm text-slate-600">{t('demograf.legend.medium.description')}</p>
              </div>

              {/* Naranja - Alta */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🟠</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{t('demograf.legend.high.title')}</h3>
                </div>
                <p className="text-sm text-slate-600">{t('demograf.legend.high.description')}</p>
              </div>

              {/* Rojo - Muy Alta */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-red-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔴</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{t('demograf.legend.veryHigh.title')}</h3>
                </div>
                <p className="text-sm text-slate-600">{t('demograf.legend.veryHigh.description')}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg mb-6">
              <p className="font-medium text-center text-lg">
                💡 {t('demograf.legend.info')}
              </p>
            </div>

            <div className="text-center">
              <p className="text-slate-700 font-medium text-lg">
                👆 {t('demograf.legend.tip')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Con estilo profesional */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <MapContainer center={[41.385, 2.173]} zoom={12} style={{ height: '700px', width: '100%', borderRadius: '12px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.entries(barriosData).map(([barrio, data]) => (
                  <Polygon
                    key={barrio}
                    positions={data.coordinates as [number, number][]}
                    pathOptions={{
                      color: getColor(data.necesidad),
                      fillColor: getColor(data.necesidad),
                      fillOpacity: 0.6,
                      weight: 2
                    }}
                    eventHandlers={{
                      click: () => handleBarrioClick(barrio)
                    }}
                  >
                    <Popup>
                      <strong>{barrio}</strong><br />
                      Necesidad: {data.necesidad}/100 ({data.nivel})<br />
                      Haz clic para ver detalles.
                    </Popup>
                  </Polygon>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Barrio Details */}
      {barrioSeleccionado && selectedBarrio && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              {(() => {
                const color = getColor(barrioSeleccionado.necesidad);
                const borderClass = color === 'green' ? 'border-green-500' : 
                                   color === 'yellow' ? 'border-yellow-500' : 
                                   color === 'orange' ? 'border-orange-500' : 
                                   'border-red-600';
                const bgClass = color === 'green' ? 'bg-green-50' : 
                               color === 'yellow' ? 'bg-yellow-50' : 
                               color === 'orange' ? 'bg-orange-50' : 
                               'bg-red-50';
                const iconBgClass = color === 'green' ? 'bg-green-500' : 
                                   color === 'yellow' ? 'bg-yellow-500' : 
                                   color === 'orange' ? 'bg-orange-500' : 
                                   'bg-red-600';
                const emoji = color === 'green' ? '🟢' : 
                             color === 'yellow' ? '🟡' : 
                             color === 'orange' ? '🟠' : 
                             '🔴';
                
                return (
                  <div className={`rounded-xl p-8 mb-8 shadow-lg border-l-4 ${borderClass} ${bgClass}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${iconBgClass} rounded-xl flex items-center justify-center`}>
                        <span className="text-3xl">{emoji}</span>
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{selectedBarrio}</h2>
                        <p className="text-xl font-semibold text-slate-700 mt-1">
                          {t('demograf.barrio.needLevel')} {barrioSeleccionado.nivel.toUpperCase()}
                        </p>
                        <p className="text-slate-600 mt-1">
                          Nivel: <strong>{barrioSeleccionado.necesidad}/100</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                {t('demograf.barrio.inNumbers')}
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
              
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-blue-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-slate-900">{t('demograf.barrio.income.title')}</h4>
                      <div className="text-4xl font-bold text-slate-900 mt-2">
                        {barrioSeleccionado.ingresos.toLocaleString()}€
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{t('demograf.barrio.income.unit')}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 mb-4 ${
                    barrioSeleccionado.ingresos < mediaBarcelona.ingresos ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {barrioSeleccionado.ingresos < mediaBarcelona.ingresos ? (
                      <TrendingDown className="w-5 h-5" />
                    ) : (
                      <TrendingUp className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {Math.abs(Math.round(((barrioSeleccionado.ingresos - mediaBarcelona.ingresos) / mediaBarcelona.ingresos) * 100))}% 
                      {barrioSeleccionado.ingresos < mediaBarcelona.ingresos ? ' menos' : ' más'} {t('demograf.barrio.income.comparison')} ({mediaBarcelona.ingresos.toLocaleString()}€)
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2">{t('demograf.barrio.income.whatMeans')}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {barrioSeleccionado.ingresos < mediaBarcelona.ingresos 
                        ? t('demograf.barrio.income.low')
                        : t('demograf.barrio.income.high')
                      }
                    </p>
                  </div>
                </div>

                {/* Employment Card */}
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-blue-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-slate-900">{t('demograf.barrio.employment.title')}</h4>
                      <div className="text-4xl font-bold text-slate-900 mt-2">
                        {barrioSeleccionado.paro}%
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{t('demograf.barrio.employment.unit')}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 mb-4 ${
                    barrioSeleccionado.paro > mediaBarcelona.paro ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {barrioSeleccionado.paro > mediaBarcelona.paro ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {barrioSeleccionado.paro > mediaBarcelona.paro 
                        ? `${(barrioSeleccionado.paro / mediaBarcelona.paro).toFixed(1)}x más` 
                        : `${Math.round(((mediaBarcelona.paro - barrioSeleccionado.paro) / mediaBarcelona.paro) * 100)}% menos`
                      } {t('demograf.barrio.income.comparison')} ({mediaBarcelona.paro}%)
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2">{t('demograf.barrio.employment.whatMeans')}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {barrioSeleccionado.paro > mediaBarcelona.paro 
                        ? `${Math.round(100/barrioSeleccionado.paro)} ${t('demograf.barrio.employment.high')}`
                        : t('demograf.barrio.employment.low')
                      }
                    </p>
                  </div>
                </div>

                {/* Aging Card */}
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-blue-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-slate-900">{t('demograf.barrio.aging.title')}</h4>
                      <div className="text-4xl font-bold text-slate-900 mt-2">
                        {barrioSeleccionado.envejecimiento}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{t('demograf.barrio.aging.unit')}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 mb-4 ${
                    barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento ? 'text-orange-700' : 'text-blue-700'
                  }`}>
                    {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento ? 'Más' : 'Menos'} {t('demograf.barrio.income.comparison')} ({mediaBarcelona.envejecimiento})
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2">{t('demograf.barrio.aging.whatMeans')}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento 
                        ? t('demograf.barrio.aging.high')
                        : t('demograf.barrio.aging.low')
                      }
                    </p>
                  </div>
                </div>

                {/* Foreign Population Card */}
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-blue-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-slate-900">{t('demograf.barrio.foreign.title')}</h4>
                      <div className="text-4xl font-bold text-slate-900 mt-2">
                        {barrioSeleccionado.extranjeros}%
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{t('demograf.barrio.foreign.unit')}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 mb-4 ${
                    barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros ? 'text-blue-700' : 'text-slate-700'
                  }`}>
                    {barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros 
                        ? `${(barrioSeleccionado.extranjeros / mediaBarcelona.extranjeros).toFixed(1)}x más` 
                        : `${Math.round(((mediaBarcelona.extranjeros - barrioSeleccionado.extranjeros) / mediaBarcelona.extranjeros) * 100)}% menos`
                      } {t('demograf.barrio.income.comparison')} ({mediaBarcelona.extranjeros}%)
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2">💬 {t('demograf.barrio.foreign.whatMeans')}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros 
                        ? t('demograf.barrio.foreign.high')
                        : t('demograf.barrio.foreign.low')
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Conclusion Section - Azul profesional */}
              <div className="relative rounded-2xl p-8 text-white overflow-hidden shadow-xl">
                {/* Fondo */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="../images/2.webp" 
                    alt="Background" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('demograf.barrio.conclusion.title')}</h3>
                  <p className="text-lg mb-8 text-blue-100">
                    {t('demograf.barrio.conclusion.intro').replace('{barrio}', selectedBarrio)}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {barrioSeleccionado.paro > mediaBarcelona.paro && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <span>{t('demograf.barrio.conclusion.employment')}</span>
                      </div>
                    )}
                    {barrioSeleccionado.ingresos < mediaBarcelona.ingresos && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <span>{t('demograf.barrio.conclusion.economic')}</span>
                      </div>
                    )}
                    {barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <span>{t('demograf.barrio.conclusion.integration')}</span>
                      </div>
                    )}
                    {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-white/20">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <span>{t('demograf.barrio.conclusion.elderly')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-semibold transition-all shadow-lg">
                      {t('demograf.barrio.conclusion.compare')}
                    </button>
                    <button className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-white/30 hover:border-white/50 text-white rounded-lg font-semibold transition-all backdrop-blur-sm">
                      {t('demograf.barrio.conclusion.downloadReport')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Selection Message */}
      {!barrioSeleccionado && (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                👆 {t('demograf.noSelection.title')}
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                {t('demograf.noSelection.subtitle')}
              </p>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
                <p className="text-lg">
                  💡 <strong>Consejo:</strong> {t('demograf.noSelection.tip')}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}