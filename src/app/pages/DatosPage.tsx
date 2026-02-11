import { Download, CheckCircle, Users, Newspaper, GraduationCap, Building2, Bot, FileSpreadsheet, FileJson, File } from 'lucide-react';

export function DatosPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              💾 Datos para Todos
            </h1>
            <p className="text-xl text-purple-100">
              Información verificada y descargable sobre Barcelona.<br/>
              <strong className="text-white">Gratis, abierta y para todos.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ¿Qué son estos datos? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                📊 ¿Qué encontrarás aquí?
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Todos los datos que ves en esta web, listos para descargar.<br/>
                En formatos fáciles de usar (Excel, CSV, JSON).
              </p>

              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  📈 Incluye:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Información de los 73 barrios de Barcelona</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Datos de renta, empleo, población, envejecimiento</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Actualizaciones mensuales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Fuentes oficiales del Ayuntamiento de Barcelona</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">🆓 GRATIS Y PARA TODOS</h3>
                </div>
                <p className="text-gray-700">
                  No hace falta registro. No hay restricciones.<br/>
                  <strong>Úsalos para lo que quieras</strong> (estudios, proyectos, reportajes...).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Para qué puedes usar estos datos? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🎯 ¿Para qué puedes usar estos datos?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Periodismo */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  📰 Periodismo
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Escribir artículos con datos reales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Contrastar información</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Hacer visualizaciones</span>
                  </li>
                </ul>
              </div>

              {/* Educación */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-200">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🎓 Educación
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Proyectos de clase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Trabajos de investigación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Aprender análisis de datos</span>
                  </li>
                </ul>
              </div>

              {/* Decisiones Públicas */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border-2 border-purple-200">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🏛️ Decisiones Públicas
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Planificación urbana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Asignación de presupuestos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Evaluación de políticas</span>
                  </li>
                </ul>
              </div>

              {/* IA */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 border-2 border-orange-200">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🤖 Inteligencia Artificial
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Entrenar modelos con datos reales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Crear chatbots informativos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Sistemas de recomendación</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garantía de calidad */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ✅ Garantía de Calidad
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Todos nuestros datos están:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Verificados con fuentes oficiales</div>
                    <div className="text-sm text-gray-600">Ayuntamiento de Barcelona</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Actualizados regularmente</div>
                    <div className="text-sm text-gray-600">Datos frescos cada mes</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Documentados</div>
                    <div className="text-sm text-gray-600">Sabes de dónde vienen</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Sin manipulaciones ni sesgos</div>
                    <div className="text-sm text-gray-600">Datos tal como son</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uso en IA explicado simple */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold">
                  🤖 Uso Responsable en Inteligencia Artificial
                </h2>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-3">¿Qué es esto?</h3>
                <p className="text-blue-100 leading-relaxed">
                  La inteligencia artificial (IA) aprende de datos. Si los datos son malos o falsos, 
                  la IA aprende cosas incorrectas.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Por eso es importante:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                    <span>Usar datos verificados (como estos)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                    <span>Saber de dónde vienen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                    <span>Poder comprobarlos</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Nuestros datos son perfectos para entrenar IA porque:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Son 100% reales (de fuentes oficiales)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Están bien explicados</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>No tienen sesgos políticos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Se actualizan regularmente</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/20 border-2 border-yellow-400/50 rounded-xl p-6">
                <h3 className="font-bold text-xl mb-3">💡 Ejemplo de uso en IA:</h3>
                <p className="text-blue-100">
                  Puedes crear un chatbot que responda preguntas como:<br/>
                  <em className="text-yellow-200">"¿Qué barrio de Barcelona necesita más ayuda con el empleo?"</em><br/><br/>
                  Y la respuesta se basará en <strong className="text-white">datos reales, no en opiniones.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Descargas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              📥 Descarga los Datos
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Excel */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <FileSpreadsheet className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 text-center">
                  Formato Excel
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  .xlsx<br/>
                  Para análisis en Excel
                </p>
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Descargar
                </button>
              </div>

              {/* CSV */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <File className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 text-center">
                  Formato CSV
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  .csv<br/>
                  Para importar a programas
                </p>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Descargar
                </button>
              </div>

              {/* JSON */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <FileJson className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 text-center">
                  Formato JSON
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  .json<br/>
                  Para desarrolladores
                </p>
                <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Descargar
                </button>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <p className="text-gray-700">
                💡 <strong>¿No sabes cuál elegir?</strong><br/>
                Usa Excel si trabajas con hojas de cálculo.<br/>
                Usa CSV si necesitas importar a otros programas.<br/>
                Usa JSON si eres desarrollador.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}