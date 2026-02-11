import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Users, DollarSign, Briefcase, User } from 'lucide-react';

export function DemografPage() {
  const [selectedBarrio, setSelectedBarrio] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo (en producción vendrían de una API)
  const barriosData = {
    'El Raval': {
      necesidad: 82,
      nivel: 'Muy Alta',
      color: 'red',
      ingresos: 9847,
      paro: 18.5,
      envejecimiento: 145,
      extranjeros: 43.2,
      poblacion: 47838
    },
    'Pedralbes': {
      necesidad: 15,
      nivel: 'Baja',
      color: 'green',
      ingresos: 58934,
      paro: 3.2,
      envejecimiento: 98,
      extranjeros: 15.3,
      poblacion: 13956
    }
  };

  const barrioSeleccionado = selectedBarrio ? barriosData[selectedBarrio as keyof typeof barriosData] : null;
  const mediaBarcelona = {
    ingresos: 17300,
    paro: 7.2,
    envejecimiento: 138,
    extranjeros: 21.0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header con buscador */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              🗺️ Explora tu Barrio
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Descubre cómo está tu barrio comparado con el resto de Barcelona
            </p>

            {/* Buscador prominente */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='🔍 Escribe el nombre de tu barrio...'
                  className="flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscar
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mt-3">
                💡 Escribe el nombre de tu barrio para ver su situación<br/>
                Ej: "Gràcia", "El Raval", "Eixample"...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leyenda del mapa - Super clara */}
      <section className="py-8 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🗺️ Mapa de Necesidades de Barcelona
            </h2>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
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
              {/* Aquí iría el componente del mapa de Leaflet */}
              <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <p className="text-xl mb-4">🗺️ Mapa Interactivo de Barcelona</p>
                  <p className="text-sm">(Aquí se integraría el mapa de Leaflet con los barrios coloreados)</p>
                  
                  {/* Botones de ejemplo para seleccionar barrios */}
                  <div className="mt-6 flex gap-3 justify-center flex-wrap">
                    <button 
                      onClick={() => setSelectedBarrio('El Raval')}
                      className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                    >
                      Ver El Raval 🔴
                    </button>
                    <button 
                      onClick={() => setSelectedBarrio('Pedralbes')}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
                    >
                      Ver Pedralbes 🟢
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Panel de Barrio Detallado */}
      {barrioSeleccionado && selectedBarrio && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              
              {/* Alerta de necesidad */}
              <div className={`rounded-2xl p-6 mb-8 border-3 ${
                barrioSeleccionado.color === 'red' 
                  ? 'bg-red-50 border-red-300' 
                  : 'bg-green-50 border-green-300'
              }`}>
                <div className="flex items-center gap-4">
                  {barrioSeleccionado.color === 'red' ? (
                    <AlertCircle className="w-12 h-12 text-red-600" />
                  ) : (
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedBarrio}</h2>
                    <p className={`text-xl font-semibold ${
                      barrioSeleccionado.color === 'red' ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {barrioSeleccionado.color === 'red' ? '🔴' : '🟢'} NECESITA ATENCIÓN {barrioSeleccionado.nivel.toUpperCase()}
                    </p>
                    <p className="text-gray-600 mt-1">
                      Nivel: <strong>{barrioSeleccionado.necesidad}/100</strong>
                    </p>
                  </div>
                </div>
              </div>

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
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">🎯 ¿QUÉ NECESITA ESTE BARRIO?</h3>
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
                  <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
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