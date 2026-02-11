import { Link } from 'react-router';
import { Map, Database, BookOpen, Users, Home as HomeIcon, TrendingDown, Heart, Lightbulb, ArrowRight, MessageCircle } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Més humà i directe */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24 overflow-hidden">
        {/* Pattern de fons subtil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                Fet amb dades públiques de Barcelona
              </div>
            </div>
            
            {/* Títol més proper */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center leading-tight">
              Coneix la vulnerabilitat
              <span className="block text-blue-600 mt-2">del teu barri</span>
            </h1>
            
            {/* Descripció més directa */}
            <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
              Un mapa interactiu que mostra quins barris de Barcelona necessiten més atenció. 
              <strong className="text-gray-900"> Dades reals, informació clara, sense manipulacions.</strong>
            </p>
            
            {/* CTAs més directes */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/demograf"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group text-lg"
              >
                <Map className="w-5 h-5" />
                Veure el Mapa
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/metodologia"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Com funciona?
              </Link>
            </div>

            {/* Exemple visual simple */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Exemple: Comparem dos barris
                </h3>
                <p className="text-sm text-gray-600">
                  Veure les diferències ens ajuda a entendre millor la ciutat
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Barri 1 */}
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">El Raval</h4>
                      <p className="text-sm text-red-700">Vulnerabilitat Alta</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Renda mitjana:</span>
                      <strong className="text-gray-900">9.847€</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Atur:</span>
                      <strong className="text-red-700">18.5%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Població:</span>
                      <strong className="text-gray-900">47.838</strong>
                    </div>
                  </div>
                </div>

                {/* Barri 2 */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Pedralbes</h4>
                      <p className="text-sm text-green-700">Vulnerabilitat Baixa</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Renda mitjana:</span>
                      <strong className="text-gray-900">58.934€</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Atur:</span>
                      <strong className="text-green-700">3.2%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Població:</span>
                      <strong className="text-gray-900">13.956</strong>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Per què és important?</strong> Aquestes diferències ens ajuden a identificar 
                  on cal invertir més recursos públics per garantir l'equitat a la ciutat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Què pots fer aquí? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Què pots fer aquí?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tres eines senzilles per entendre millor Barcelona
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 1. Mapa */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Map className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Explora el Mapa
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Veu el teu barri al mapa. Cada color mostra el nivell de vulnerabilitat. 
                Fes clic per veure més detalls.
              </p>
              <Link 
                to="/demograf"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1"
              >
                Veure mapa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 2. Dades */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Genera Dades per IA
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Crea un dataset de text amb informació verificable. 
                Per entrenar IA sense fake news.
              </p>
              <Link 
                to="/corpus"
                className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center gap-1"
              >
                Entendre CORPUS·CAT
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3. Aprèn */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Entén com Funciona
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Tota la metodologia és transparent. Pots veure d'on surten les dades 
                i com es calculen els indicadors.
              </p>
              <Link 
                to="/metodologia"
                className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1"
              >
                Veure metodologia
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Per què importa? */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Per què importa aquesta informació?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Per a ciutadans</h3>
                    <p className="text-sm text-gray-600">
                      Entendre la teva ciutat, saber quins barris necessiten més suport, 
                      i participar en decisions informades.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HomeIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Per a l'Ajuntament</h3>
                    <p className="text-sm text-gray-600">
                      Identificar on invertir recursos públics per reduir desigualtats 
                      i millorar la qualitat de vida.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Per a investigadors</h3>
                    <p className="text-sm text-gray-600">
                      Dades obertes i verificables per estudiar la ciutat. 
                      Tot és reproducible i auditable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Per a periodistes</h3>
                    <p className="text-sm text-gray-600">
                      Informació contrastada per fer periodisme de qualitat. 
                      Sense fake news, amb fonts trazables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dades Obertes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tot amb dades públiques de Barcelona
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              Utilitzem <strong>Open Data BCN</strong>, el portal de dades obertes de l'Ajuntament de Barcelona. 
              Tothom pot accedir-hi i verificar-ho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://opendata-ajuntament.barcelona.cat/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all inline-flex items-center gap-2 justify-center"
              >
                Veure Open Data BCN
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/metodologia"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                Com utilitzem les dades
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}