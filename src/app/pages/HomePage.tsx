import { Link } from 'react-router-dom';
import { Search, Database, Lightbulb, Users, CheckCircle, AlertCircle, TrendingUp, TrendingDown, ArrowRight, ExternalLink } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Pregunta directa */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              🏘️ ¿Tu barrio tiene todo lo que necesita?
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              En Barcelona, <strong className="text-white">no todos los barrios son iguales.</strong><br/>
              Algunos tienen mejores servicios, más oportunidades y menos problemas.
            </p>

            <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 mb-8">
              <p className="text-lg text-white font-medium">
                👉 Descubre cómo está tu barrio comparado con el resto de la ciudad<br/>
                <span className="text-blue-100">(y qué podemos hacer para mejorarlo)</span>
              </p>
            </div>

            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/demograf"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl flex items-center gap-2 group text-lg"
              >
                <Search className="w-5 h-5" />
                Busca tu barrio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/metodologia"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                ¿Cómo funciona?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Datos en vivo - Números impactantes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📊 Barcelona en números
            </h2>
            <p className="text-lg text-gray-600">
              Datos oficiales, actualizados y verificables
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all">
              <div className="text-5xl font-bold text-blue-600 mb-2">73</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Barrios analizados</div>
              <div className="text-gray-600">
                Desde El Raval hasta Pedralbes<br/>
                Toda la ciudad cubierta
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all">
              <div className="text-5xl font-bold text-purple-600 mb-2">4</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Indicadores clave</div>
              <div className="text-gray-600">
                💰 Ingresos · 💼 Empleo<br/>
                👴 Edad · 🌍 Población
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all">
              <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Datos oficiales</div>
              <div className="text-gray-600">
                Ayuntamiento de Barcelona<br/>
                Actualizados en feb 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buscador de Barrio */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🔍 Empieza aquí: ¿Dónde vives?
              </h2>
              <p className="text-lg text-gray-600">
                Busca tu barrio para ver cómo está
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200">
              <div className="flex gap-3 mb-4">
                <input 
                  type="text" 
                  placeholder='Ej: "Gràcia", "El Raval", "Sants"...'
                  className="flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscar
                </button>
              </div>
              
              <p className="text-center text-gray-600">
                O explora el <Link to="/demograf" className="text-blue-600 font-semibold hover:underline">mapa interactivo →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ejemplo visual - Comparación de barrios */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                💡 Un ejemplo: No todos los barrios son iguales
              </h2>
              <p className="text-lg text-gray-600">
                Mira la diferencia entre dos barrios de Barcelona
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Barrio con necesidades */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-3 border-red-200 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">El Raval</h3>
                    <p className="text-red-700 font-semibold">🔴 Necesita atención</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">💰 Ingresos anuales</span>
                    <strong className="text-gray-900 text-lg">9.847€</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">💼 Personas sin trabajo</span>
                    <strong className="text-red-700 text-lg">18.5%</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">👥 Población</span>
                    <strong className="text-gray-900 text-lg">47.838</strong>
                  </div>
                </div>
              </div>

              {/* Barrio sin necesidades */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-3 border-green-200 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pedralbes</h3>
                    <p className="text-green-700 font-semibold">🟢 Bien cubierto</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">💰 Ingresos anuales</span>
                    <strong className="text-gray-900 text-lg">58.934€</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">💼 Personas sin trabajo</span>
                    <strong className="text-green-700 text-lg">3.2%</strong>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">👥 Población</span>
                    <strong className="text-gray-900 text-lg">13.956</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <p className="text-gray-800 leading-relaxed">
                <strong className="text-blue-900">💡 ¿Por qué es importante?</strong><br/>
                Las personas en Pedralbes ganan <strong>6 veces más</strong> que en El Raval.<br/>
                Estas diferencias nos ayudan a saber <strong>dónde invertir recursos públicos</strong><br/>
                para que todos los barrios tengan las mismas oportunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué puedes hacer? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🚀 ¿Qué puedes hacer aquí?
            </h2>
            <p className="text-lg text-gray-600">
              Tres herramientas sencillas para entender mejor Barcelona
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 1. Mapa */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                1. Explora el Mapa
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Busca tu barrio en el mapa interactivo. Los colores te muestran qué barrios necesitan más ayuda.<br/><br/>
                <strong>Haz clic</strong> en cualquier barrio para ver todos sus datos.
              </p>
              <Link 
                to="/demograf"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2 group"
              >
                Ver el mapa
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 2. Datos */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Descarga los Datos
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Todos los datos están disponibles para descargar gratis.<br/><br/>
                <strong>Úsalos</strong> para tus proyectos, estudios o reportajes. Son 100% verificados.
              </p>
              <Link 
                to="/corpus"
                className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center gap-2 group"
              >
                Ver los datos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3. Metodología */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-green-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                3. Entiende cómo funciona
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Te explicamos de dónde salen los datos y cómo los calculamos.<br/><br/>
                <strong>Todo transparente.</strong> Puedes verificarlo tú mismo.
              </p>
              <Link 
                to="/metodologia"
                className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-2 group"
              >
                Ver metodología
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué importa */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ❓ ¿Por qué necesitamos esta información?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Para ti (ciudadano)</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Entender tu ciudad, saber qué barrios necesitan más ayuda y participar en decisiones informadas sobre tu barrio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Para el Ayuntamiento</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Identificar dónde invertir recursos públicos para reducir desigualdades y mejorar la calidad de vida de todos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Para investigadores</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Datos abiertos y verificables para estudiar la ciudad. Todo es reproducible y auditable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Para periodistas</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Información verificable para hacer periodismo de calidad. Sin fake news, con fuentes trazables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action final */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              🏛️ Datos abiertos al servicio de todos
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Utilizamos <strong className="text-white">Open Data BCN</strong>, el portal de datos abiertos del Ayuntamiento de Barcelona.<br/>
              Cualquier persona puede acceder y verificar esta información.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://opendata-ajuntament.barcelona.cat/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all inline-flex items-center gap-2 justify-center shadow-xl"
              >
                Ver Open Data BCN
                <ExternalLink className="w-5 h-5" />
              </a>
              <Link
                to="/metodologia"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                Cómo usamos los datos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}