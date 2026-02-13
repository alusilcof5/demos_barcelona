import { useState } from 'react';
<BookOpen className="w-6 h-6 text-white" />
import { BookOpen, BarChart3, Microscope, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

type NivelExplicacion = 'simple' | 'intermedio' | 'tecnico';

export function MetodologiaPage() {
  const [nivelActivo, setNivelActivo] = useState<NivelExplicacion>('simple');
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>('que-hacemos');

  const toggleSeccion = (seccion: string) => {
    setSeccionExpandida(seccionExpandida === seccion ? null : seccion);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
       {/* Header */}
<section 
  className="py-16"
  style={{
    backgroundImage: 'linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/4.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Cómo funciona todo esto?
            </h1>
            <p className="text-xl text-green-100">
              Te explicamos de dónde salen los datos y cómo los calculamos.<br/>
              <strong className="text-white">Todo transparente y verificable.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Selector de nivel */}
      <section className="py-8 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Elige tu nivel de detalle:
              </h2>
              <p className="text-gray-600">
                Tenemos tres explicaciones según cuánto quieras profundizar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              
              {/* Simple */}
              <button
                onClick={() => setNivelActivo('simple')}
                className={`p-6 rounded-xl border-3 transition-all text-left ${
                  nivelActivo === 'simple'
                    ? 'bg-green-50 border-green-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    nivelActivo === 'simple' ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <BookOpen className={`w-6 h-6 ${nivelActivo === 'simple' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Simple</h3>
                    <p className="text-sm text-gray-600">Para ciudadanos</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Explicación básica sin tecnicismos. Perfecto si solo quieres entender cómo funciona.
                </p>
              </button>

              {/* Intermedio */}
              <button
                onClick={() => setNivelActivo('intermedio')}
                className={`p-6 rounded-xl border-3 transition-all text-left ${
                  nivelActivo === 'intermedio'
                    ? 'bg-blue-50 border-blue-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    nivelActivo === 'intermedio' ? 'bg-blue-500' : 'bg-gray-200'
                  }`}>
                    <BarChart3 className={`w-6 h-6 ${nivelActivo === 'intermedio' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Intermedio</h3>
                    <p className="text-sm text-gray-600">Para estudiantes/periodistas</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Más detalles sobre fuentes y cálculos. Para quien quiera profundizar un poco más.
                </p>
              </button>

              {/* Técnico */}
              <button
                onClick={() => setNivelActivo('tecnico')}
                className={`p-6 rounded-xl border-3 transition-all text-left ${
                  nivelActivo === 'tecnico'
                    ? 'bg-purple-50 border-purple-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    nivelActivo === 'tecnico' ? 'bg-purple-500' : 'bg-gray-200'
                  }`}>
                    <Microscope className={`w-6 h-6 ${nivelActivo === 'tecnico' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Técnico</h3>
                    <p className="text-sm text-gray-600">Para investigadores</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Metodología completa con fórmulas y referencias. Para reproducir el análisis.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido SIMPLE */}
      {nivelActivo === 'simple' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* ¿Qué hacemos? */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('que-hacemos')}
                  className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">¿Qué hacemos?</h3>
                  {seccionExpandida === 'que-hacemos' ? (
                    <ChevronUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'que-hacemos' && (
                  <div className="p-6 pt-0 border-t border-green-100">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Recopilamos información oficial sobre los barrios de Barcelona y la mostramos de forma fácil de entender.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-gray-700">
                        <strong>En pocas palabras:</strong> Tomamos datos del Ayuntamiento, los organizamos y te los mostramos 
                        con gráficos y explicaciones sencillas.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ¿De dónde salen los datos? */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('de-donde-salen')}
                  className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">¿De dónde salen los datos?</h3>
                  {seccionExpandida === 'de-donde-salen' ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'de-donde-salen' && (
                  <div className="p-6 pt-0 border-t border-blue-100">
                    <p className="text-lg text-gray-700 mb-6">
                      Todos los datos vienen del <strong>Ayuntamiento de Barcelona</strong>.<br/>
                      Son públicos y cualquiera puede consultarlos.
                    </p>

                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                      <h4 className="font-bold text-lg text-gray-900 mb-4">
                        Usamos 4 tipos de información:
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div>
                            <div className="font-semibold text-gray-900">1. INGRESOS</div>
                            <div className="text-gray-700 text-sm">Cuánto dinero ganan las familias</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div>
                            <div className="font-semibold text-gray-900">2. EMPLEO</div>
                            <div className="text-gray-700 text-sm">Cuántas personas tienen trabajo</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div>
                            <div className="font-semibold text-gray-900">3. EDAD</div>
                            <div className="text-gray-700 text-sm">Cuántas personas mayores y jóvenes hay</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div>
                            <div className="font-semibold text-gray-900">4. ORIGEN</div>
                            <div className="text-gray-700 text-sm">Cuántas personas vienen de otros países</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a 
                      href="https://opendata-ajuntament.barcelona.cat/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      Ver fuentes originales
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              {/* ¿Cómo sabemos que son fiables? */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('fiabilidad')}
                  className="w-full p-6 flex items-center justify-between hover:bg-purple-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">¿Cómo sabemos que son fiables?</h3>
                  {seccionExpandida === 'fiabilidad' ? (
                    <ChevronUp className="w-6 h-6 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'fiabilidad' && (
                  <div className="p-6 pt-0 border-t border-purple-100">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Fuente oficial</div>
                          <div className="text-sm text-gray-700">Todos vienen del Ayuntamiento de Barcelona</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Verificables</div>
                          <div className="text-sm text-gray-700">Puedes ver la fuente original de cada dato</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Actualizados</div>
                          <div className="text-sm text-gray-700">Se actualizan regularmente</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Sin manipulación</div>
                          <div className="text-sm text-gray-700">No los modificamos, solo los mostramos claramente</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ¿Cómo calculamos "necesidad"? */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('calculo-necesidad')}
                  className="w-full p-6 flex items-center justify-between hover:bg-orange-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">¿Cómo calculamos "necesidad"?</h3>
                  {seccionExpandida === 'calculo-necesidad' ? (
                    <ChevronUp className="w-6 h-6 text-orange-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'calculo-necesidad' && (
                  <div className="p-6 pt-0 border-t border-orange-100">
                    <p className="text-lg text-gray-700 mb-6">
                      Combinamos los 4 tipos de información para crear un número del <strong>0 al 100</strong>:
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">Si los ingresos son bajos</div>
                          <div className="text-gray-700">→ Más necesidad (las familias tienen menos recursos)</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">

                        <div>
                          <div className="font-semibold text-gray-900">Si el paro es alto</div>
                          <div className="text-gray-700">→ Más necesidad (más gente sin trabajo)</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">Si hay muchos mayores</div>
                          <div className="text-gray-700">→ Más necesidad de servicios (salud, accesibilidad...)</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                        <span className="text-2xl"></span>
                        <div>
                          <div className="font-semibold text-gray-900">Si hay muchos extranjeros</div>
                          <div className="text-gray-700">→ Más necesidad de integración (idioma, papeles...)</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-lg mb-4 text-gray-900">El resultado es un número:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-8 bg-green-500 rounded"></div>
                          <span className="font-semibold text-gray-900">0-30: Poca necesidad</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-8 bg-yellow-500 rounded"></div>
                          <span className="font-semibold text-gray-900">30-60: Necesidad media</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-8 bg-red-500 rounded"></div>
                          <span className="font-semibold text-gray-900">60-100: Mucha necesidad</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                        <h4 className="font-bold text-lg text-gray-900 mb-3">
                          💡 Ejemplo: El Raval = 82/100
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            <span>Ingresos muy bajos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            <span>Paro muy alto</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            <span>Muchas personas extranjeras</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                        <h4 className="font-bold text-lg text-gray-900 mb-3">
                          💡 Ejemplo: Pedralbes = 15/100
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>Ingresos muy altos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>Paro muy bajo</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>Población más homogénea</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botón para ver más detalles */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div 
  className="rounded-2xl p-8 text-white"
  style={{
    backgroundImage: 'linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
                <h3 className="text-2xl font-bold mb-4">¿Quieres más detalles?</h3>
                <p className="text-blue-100 mb-6">
                  Si eres estudiante, periodista o investigador, tenemos explicaciones más detalladas
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setNivelActivo('intermedio')}
                    className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                  >
                    Ver explicación intermedia →
                  </button>
                  <button
                    onClick={() => setNivelActivo('tecnico')}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    Ver explicación técnica →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenido INTERMEDIO */}
      {nivelActivo === 'intermedio' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Nivel Intermedio
                </h3>
                <p className="text-gray-700">
                  Esta sección contendrá información más técnica sobre fuentes de datos, metodología estadística, 
                  y referencias bibliográficas para estudiantes y periodistas.
                </p>
                <p className="text-gray-600 mt-4 italic">
                  (Contenido en desarrollo)
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenido TÉCNICO */}
      {nivelActivo === 'tecnico' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Nivel Técnico
                </h3>
                <p className="text-gray-700">
                  Esta sección contendrá la metodología completa con fórmulas matemáticas, ponderaciones, 
                  normalización de datos, y toda la información necesaria para reproducir el análisis.
                </p>
                <p className="text-gray-600 mt-4 italic">
                  (Contenido en desarrollo)
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}