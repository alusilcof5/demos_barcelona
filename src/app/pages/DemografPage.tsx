import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Users, DollarSign, Briefcase, User } from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function DemografPage() {
  const [selectedBarrio, setSelectedBarrio] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Función para obtener color basado en necesidad
  const getColor = (necesidad: number) => {
    if (necesidad <= 25) return 'green';
    if (necesidad <= 50) return 'yellow';
    if (necesidad <= 75) return 'orange';
    return 'red';
  };

  // Función para manejar clic en barrio del mapa
  const handleBarrioClick = (barrio: string) => {
    setSelectedBarrio(barrio);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header con buscador */}
<section 
  className="py-12"
  style={{
    backgroundImage: 'linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(./images/2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <br />
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
        Explora tu Barrio
      </h1>
      <p className="text-xl text-blue-100 mb-8">
        Descubre cómo está tu barrio comparado con el resto de Barcelona
      </p>

      {/* Buscador prominente */}
      
    </div>
  </div>
</section>

      {/* Leyenda del mapa - Super clara */}
      <section className="py-8 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Mapa de Necesidades de Barcelona
            </h2>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)' }}>
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                LEYENDA - Nivel de Necesidad:
              </h3>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-2 border-green-300">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="font-bold text-green-900">🟢 Baja</div>
                    <div className="text-sm text-gray-700">El barrio tiene buenos servicios y oportunidades</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="font-bold text-yellow-900">🟡 Media</div>
                    <div className="text-sm text-gray-700">Algunas áreas necesitan mejora</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-300">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="font-bold text-orange-900">🟠 Alta</div>
                    <div className="text-sm text-gray-700">Necesita atención prioritaria</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-2 border-red-300">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="font-bold text-red-900">🔴 Muy Alta</div>
                    <div className="text-sm text-gray-700">Requiere intervención urgente</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-100 rounded-lg border-2 border-blue-300">
                <p className="text-blue-900 font-medium text-center">
                  💡 Cuanto más oscuro el color, más atención necesita el barrio
                </p>
              </div>

              <div className="mt-4 text-center">
                <p className="text-gray-700 font-medium">
                  👆 HAZ CLIC EN UN BARRIO DEL MAPA PARA VER MÁS DETALLES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa interactivo */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <MapContainer center={[41.385, 2.173]} zoom={12} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.entries(barriosData).map(([barrio, data]) => (
                  <Polygon
                    key={barrio}
                    positions={data.coordinates}
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

      {/* Panel de Barrio Detallado */}
{barrioSeleccionado && selectedBarrio && (
  <section className="py-12 bg-blue-50 border border-blue-100" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)' }}>
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Alerta de necesidad */}
        {(() => {
          const color = getColor(barrioSeleccionado.necesidad);
          const bgClass = color === 'green' ? 'bg-green-50 border-green-300' : 
                          color === 'yellow' ? 'bg-yellow-50 border-yellow-300' : 
                          color === 'orange' ? 'bg-orange-50 border-orange-300' : 
                          'bg-red-50 border-red-300';
          const textClass = color === 'green' ? 'text-green-700' : 
                            color === 'yellow' ? 'text-yellow-700' : 
                            color === 'orange' ? 'text-orange-700' : 
                            'text-red-700';
          const emoji = color === 'green' ? '🟢' : 
                        color === 'yellow' ? '🟡' : 
                        color === 'orange' ? '🟠' : 
                        '🔴';
          const icon = color === 'green' ? <CheckCircle className="w-12 h-12 text-green-600" /> : 
                      <AlertCircle className={`w-12 h-12 ${color === 'yellow' ? 'text-yellow-600' : color === 'orange' ? 'text-orange-600' : 'text-red-600'}`} />;
          
          return (
            <div className={`rounded-2xl p-6 mb-8 border-3 ${bgClass}`}>
              <div className="flex items-center gap-4">
                {icon}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedBarrio}</h2>
                  <p className={`text-xl font-semibold ${textClass}`}>
                    {emoji} NIVEL DE NECESIDAD {barrioSeleccionado.nivel.toUpperCase()}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Nivel: <strong>{barrioSeleccionado.necesidad}/100</strong>
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
        
        {/* Resto del panel permanece igual */}
        
        {/* TU BARRIO EN 4 NÚMEROS */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          📊 Tu barrio en 4 números
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* 1. INGRESOS */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900">💰 INGRESOS</h4>
                <div className="text-3xl font-bold text-gray-900 mt-2">
                  {barrioSeleccionado.ingresos.toLocaleString()}€
                </div>
                <p className="text-sm text-gray-600">al año por persona</p>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 mb-3 ${
              barrioSeleccionado.ingresos < mediaBarcelona.ingresos ? 'text-red-700' : 'text-green-700'
            }`}>
              {barrioSeleccionado.ingresos < mediaBarcelona.ingresos ? (
                <TrendingDown className="w-5 h-5" />
              ) : (
                <TrendingUp className="w-5 h-5" />
              )}
              <span className="font-semibold">
                {Math.abs(Math.round(((barrioSeleccionado.ingresos - mediaBarcelona.ingresos) / mediaBarcelona.ingresos) * 100))}% 
                {barrioSeleccionado.ingresos < mediaBarcelona.ingresos ? ' menos' : ' más'} que la media ({mediaBarcelona.ingresos.toLocaleString()}€)
              </span>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-blue-300">
              <p className="text-sm font-semibold text-gray-900 mb-2">💬 ¿Qué significa?</p>
              <p className="text-sm text-gray-700">
                {barrioSeleccionado.ingresos < mediaBarcelona.ingresos 
                  ? `Las familias de ${selectedBarrio} tienen menos dinero disponible para cubrir necesidades básicas.`
                  : `Las familias de ${selectedBarrio} tienen más recursos económicos disponibles.`
                }
              </p>
            </div>
          </div>

          {/* 2. EMPLEO */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900">💼 EMPLEO</h4>
                <div className="text-3xl font-bold text-gray-900 mt-2">
                  {barrioSeleccionado.paro}%
                </div>
                <p className="text-sm text-gray-600">de paro</p>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 mb-3 ${
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
                } que la media ({mediaBarcelona.paro}%)
              </span>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-purple-300">
              <p className="text-sm font-semibold text-gray-900 mb-2">💬 ¿Qué significa?</p>
              <p className="text-sm text-gray-700">
                {barrioSeleccionado.paro > mediaBarcelona.paro 
                  ? `Casi 1 de cada ${Math.round(100/barrioSeleccionado.paro)} personas que busca trabajo no lo encuentra.`
                  : `La mayoría de personas que buscan trabajo lo encuentran.`
                }
              </p>
            </div>
          </div>

          {/* 3. ENVEJECIMIENTO */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900">👴 POBLACIÓN MAYOR</h4>
                <div className="text-3xl font-bold text-gray-900 mt-2">
                  {barrioSeleccionado.envejecimiento}
                </div>
                <p className="text-sm text-gray-600">índice de envejecimiento</p>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 mb-3 ${
              barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento ? 'text-orange-700' : 'text-blue-700'
            }`}>
              {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="font-semibold">
                {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento ? 'Más' : 'Menos'} que la media ({mediaBarcelona.envejecimiento})
              </span>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-orange-300">
              <p className="text-sm font-semibold text-gray-900 mb-2">💬 ¿Qué significa?</p>
              <p className="text-sm text-gray-700">
                Hay {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento ? 'más' : 'menos'} personas mayores que jóvenes. 
                {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento 
                  ? ' Necesitan servicios específicos (salud, accesibilidad...).'
                  : ' Población más equilibrada entre edades.'
                }
              </p>
            </div>
          </div>

          {/* 4. POBLACIÓN EXTRANJERA */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900">🌍 POBLACIÓN EXTRANJERA</h4>
                <div className="text-3xl font-bold text-gray-900 mt-2">
                  {barrioSeleccionado.extranjeros}%
                </div>
                <p className="text-sm text-gray-600">de la población</p>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 mb-3 ${
              barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros ? 'text-blue-700' : 'text-gray-700'
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
                } que la media ({mediaBarcelona.extranjeros}%)
              </span>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-green-300">
              <p className="text-sm font-semibold text-gray-900 mb-2">💬 ¿Qué significa?</p>
              <p className="text-sm text-gray-700">
                {barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros 
                  ? 'Muchas personas vienen de otros países. Pueden necesitar apoyo con idioma, papeles, integración...'
                  : 'Población más homogénea en cuanto a origen.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* CONCLUSIÓN */}
<div 
  className="rounded-2xl p-8 text-white"
  style={{
    backgroundImage: 'linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <h3 className="text-2xl font-bold mb-4">¿QUÉ NECESITA ESTE BARRIO?</h3>
  <p className="text-lg mb-6">
    Basándonos en estos datos, <strong>{selectedBarrio}</strong> necesita especialmente:
  </p>
  
  <div className="grid md:grid-cols-2 gap-4">
    {barrioSeleccionado.paro > mediaBarcelona.paro && (
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="w-6 h-6 flex-shrink-0" />
        <span>Programas de empleo y formación</span>
      </div>
    )}
    {barrioSeleccionado.ingresos < mediaBarcelona.ingresos && (
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="w-6 h-6 flex-shrink-0" />
        <span>Ayudas económicas para familias</span>
      </div>
    )}
    {barrioSeleccionado.extranjeros > mediaBarcelona.extranjeros && (
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="w-6 h-6 flex-shrink-0" />
        <span>Servicios de integración</span>
      </div>
    )}
    {barrioSeleccionado.envejecimiento > mediaBarcelona.envejecimiento && (
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="w-6 h-6 flex-shrink-0" />
        <span>Servicios para personas mayores</span>
      </div>
    )}
  </div>

  <div className="mt-6 flex gap-4">
    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all">
      Comparar con otro barrio
    </button>
    <button className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
      Descargar informe
    </button>
  </div>
</div>
      </div>
    </div>
  </section>
)}

  {/* Call to action si no hay barrio seleccionado */}
  {!barrioSeleccionado && (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            👆 Selecciona un barrio en el mapa
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Haz clic en cualquier barrio del mapa o usa el buscador para ver información detallada
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <p className="text-gray-700">
              💡 <strong>Consejo:</strong> Los barrios más rojos necesitan más atención.<br/>
              Los barrios más verdes están mejor cubiertos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )}
</div>
);
}