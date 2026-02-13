import { Link } from 'react-router-dom';
import { Search, ArrowRight, MapPin, Database, BookOpen, TrendingUp, Check } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Minimalista y directo */}
<section 
  className="relative py-24 md:py-32"
  style={{
    backgroundImage: 'linear-gradient(to bottom, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/1.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      {/* Badge superior */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-blue-400 font-medium">Open Data Day 2026</span>
        </div>
      </div>

      {/* Título principal */}
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 leading-tight">
        Desigualdad urbana en Barcelona
      </h1>
      
      {/* Subtítulo */}
      <p className="text-xl md:text-2xl text-slate-300 text-center mb-12 leading-relaxed max-w-3xl mx-auto">
        Visualiza y analiza las diferencias socioeconómicas entre barrios 
        con datos verificados y transparentes
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/demograf"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          <Search className="w-5 h-5" />
          Explorar mapa
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link
          to="/metodologia"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold transition-all"
        >
          Ver metodología
        </Link>
            </div>
          </div>
        </div>

        {/* Decoración sutil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </section>

      {/* Métricas clave - Grid limpio */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="text-center p-8">
                <div className="text-5xl font-bold text-slate-900 mb-2">73</div>
                <div className="text-slate-600 font-medium">Barrios analizados</div>
                <div className="text-sm text-slate-500 mt-2">Cobertura completa de la ciudad</div>
              </div>

              <div className="text-center p-8 border-x border-slate-200">
                <div className="text-5xl font-bold text-slate-900 mb-2">4</div>
                <div className="text-slate-600 font-medium">Indicadores principales</div>
                <div className="text-sm text-slate-500 mt-2">Renta, empleo, edad, migración</div>
              </div>

              <div className="text-center p-8">
                <div className="text-5xl font-bold text-blue-500 mb-2">100%</div>
                <div className="text-slate-600 font-medium">Datos oficiales</div>
                <div className="text-sm text-slate-500 mt-2">Open Data Barcelona</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Problema vs Solución - Diseño limpio */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Header de sección */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Por qué es importante
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Las desigualdades urbanas afectan la calidad de vida de miles de personas
              </p>
            </div>

            {/* Comparación lado a lado */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* El Raval - Vulnerabilidad alta */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-900">El Raval</h3>
                  <span className="ml-auto text-sm text-slate-500">Alta vulnerabilidad</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">Renta anual</span>
                    <span className="font-bold text-slate-900">9.847€</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">Tasa de paro</span>
                    <span className="font-bold text-red-600">18.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Población</span>
                    <span className="font-bold text-slate-900">47.838</span>
                  </div>
                </div>
              </div>

              {/* Pedralbes - Vulnerabilidad baja */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-900">Pedralbes</h3>
                  <span className="ml-auto text-sm text-slate-500">Baja vulnerabilidad</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">Renta anual</span>
                    <span className="font-bold text-slate-900">58.934€</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">Tasa de paro</span>
                    <span className="font-bold text-green-600">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Población</span>
                    <span className="font-bold text-slate-900">13.956</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Insight */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
              <p className="text-slate-700 text-center">
                <span className="font-bold text-slate-900">6 veces más</span> de diferencia en ingresos. 
                Estos datos ayudan a identificar dónde invertir recursos públicos.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Características - Grid moderno */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Herramientas disponibles
              </h2>
              <p className="text-lg text-slate-600">
                Tres formas de explorar los datos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Mapa */}
              <div className="group">
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500 transition-all h-full">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Mapa interactivo
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Visualiza las diferencias entre barrios con colores y datos en tiempo real
                  </p>
                  <Link 
                    to="/demograf"
                    className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all"
                  >
                    Explorar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Datos */}
              <div className="group">
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500 transition-all h-full">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Datos abiertos
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Descarga datasets completos en múltiples formatos para tu análisis
                  </p>
                  <Link 
                    to="/corpus"
                    className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all"
                  >
                    Descargar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Metodología */}
              <div className="group">
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500 transition-all h-full">
                  <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Metodología
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Comprende cómo se calculan los índices y de dónde vienen los datos
                  </p>
                  <Link 
                    to="/metodologia"
                    className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all"
                  >
                    Leer más
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Transparencia y confianza */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transparencia total
            </h2>
            
            <p className="text-xl text-slate-300 mb-12">
              Todos los datos provienen de fuentes oficiales verificables
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              
              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Datos oficiales</div>
                  <div className="text-slate-400 text-sm">
                    Open Data Barcelona y fuentes municipales
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Código abierto</div>
                  <div className="text-slate-400 text-sm">
                    Metodología documentada y reproducible
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Actualización continua</div>
                  <div className="text-slate-400 text-sm">
                    Datos actualizados mensualmente
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Licencia abierta</div>
                  <div className="text-slate-400 text-sm">
                    CC BY 4.0 - Libre uso con atribución
                  </div>
                </div>
              </div>

            </div>

            <Link
              to="/metodologia"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-semibold transition-all"
            >
              Ver metodología completa
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </section>

      {/* CTA Final - Simple y directo */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Empieza a explorar
            </h2>
            
            <p className="text-xl text-slate-600 mb-8">
              Descubre cómo está tu barrio o explora toda Barcelona
            </p>

            <Link
              to="/demograf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              Ver mapa interactivo
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </section>

      {/* Estilos para el patrón de grid */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

    </div>
  );
}