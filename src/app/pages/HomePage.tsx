import { Link } from 'react-router-dom';
import { Search, ArrowRight, MapPin, Database, BookOpen, Check, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useState, useEffect } from 'react';

export function HomePage() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      
      <section className="relative py-20 md:py-32 overflow-hidden">
        
       
        <div className="absolute inset-0 z-0">
         
           <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/data.webm" type="video/webm" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
        </div>

       
        <div 
          className="absolute inset-0 opacity-10 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
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
            transform: `translateY(${scrollY * -0.4}px)`,
            opacity: Math.max(0, 1 - scrollY / 400)
          }}
        >
          <div className="max-w-6xl mx-auto">
        
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-100 font-medium">{t('home.hero.badge')}</span>
              </div>
            </div>

    
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            
     
            <p className="text-lg md:text-xl text-blue-100 text-center mb-10 leading-relaxed max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>

    
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/demograf"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-semibold transition-all shadow-xl hover:shadow-2xl"
              >
                <Search className="w-5 h-5" />
                {t('home.hero.exploreCTA')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/metodologia"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 rounded-lg font-semibold transition-all backdrop-blur-sm"
              >
                {t('home.hero.methodologyCTA')}
              </Link>
            </div>
          </div>
        </div>


        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,40 L1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              
              <div 
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 transition-transform duration-300"
                style={{
                  transform: `translateY(${Math.max(-100, (scrollY - 400) * -0.2)}px)`
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-900 mb-2">73</div>
                <div className="text-blue-900 font-semibold mb-1">{t('home.metrics.neighborhoods')}</div>
                <div className="text-sm text-blue-600">{t('home.metrics.neighborhoodsSub')}</div>
              </div>

              <div 
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 transition-transform duration-300"
                style={{
                  transform: `translateY(${Math.max(-150, (scrollY - 400) * -0.3)}px)`
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-900 mb-2">4</div>
                <div className="text-blue-900 font-semibold mb-1">{t('home.metrics.indicators')}</div>
                <div className="text-sm text-blue-600">{t('home.metrics.indicatorsSub')}</div>
              </div>

              <div 
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 transition-transform duration-300"
                style={{
                  transform: `translateY(${Math.max(-100, (scrollY - 400) * -0.2)}px)`
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
                <div className="text-blue-900 font-semibold mb-1">{t('home.metrics.dataQuality')}</div>
                <div className="text-sm text-blue-600">{t('home.metrics.dataQualitySub')}</div>
              </div>

            </div>
          </div>
        </div>
      </section>

  
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
         
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('home.problem.title')}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t('home.problem.subtitle')}
              </p>
            </div>

            {/* Comparación lado a lado */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
             
              <div 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-red-500"
                style={{
                  transform: `translateX(${Math.max(-150, (scrollY - 900) * -0.15)}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - 700) / 200))
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">{t('home.problem.raval.title')}</h3>
                    <span className="text-sm text-red-600 font-medium">{t('home.problem.raval.tag')}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">{t('home.problem.raval.income')}</span>
                    <span className="font-bold text-slate-900 text-xl">9.847€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="text-slate-600 font-medium">{t('home.problem.raval.unemployment')}</span>
                    <span className="font-bold text-red-600 text-xl">18.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">{t('home.problem.raval.population')}</span>
                    <span className="font-bold text-slate-900 text-xl">47.838</span>
                  </div>
                </div>
              </div>

              {/* Pedralbes - Vulnerabilidad baja */}
              <div 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500"
                style={{
                  transform: `translateX(${Math.min(150, (scrollY - 900) * 0.15)}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - 700) / 200))
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">{t('home.problem.pedralbes.title')}</h3>
                    <span className="text-sm text-green-600 font-medium">{t('home.problem.pedralbes.tag')}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">{t('home.problem.raval.income')}</span>
                    <span className="font-bold text-slate-900 text-xl">58.934€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-slate-600 font-medium">{t('home.problem.raval.unemployment')}</span>
                    <span className="font-bold text-green-600 text-xl">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">{t('home.problem.raval.population')}</span>
                    <span className="font-bold text-slate-900 text-xl">13.956</span>
                  </div>
                </div>
              </div>

            </div>

            <div 
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg transition-transform duration-300"
              style={{
                transform: `scale(${Math.min(1.05, Math.max(0.85, 0.85 + (scrollY - 1100) / 1000))})`,
                opacity: Math.min(1, Math.max(0, (scrollY - 900) / 200))
              }}
            >
              <div className="flex items-center gap-4">
                <TrendingUp className="w-12 h-12" />
                <p className="text-lg">
                  <span className="font-bold">6 {t('home.problem.insight')}</span> 
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('home.features.title')}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600">
                {t('home.features.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              

              <div 
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-blue-300"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.03)}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - 1100) / 300))
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t('home.features.map.title')}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {t('home.features.map.description')}
                </p>
                <Link 
                  to="/demograf"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
                >
                  {t('home.features.map.cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Datos */}
              <div 
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-blue-300"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.05)}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - 1100) / 300))
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t('home.features.data.title')}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {t('home.features.data.description')}
                </p>
                <Link 
                  to="/corpus"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
                >
                  {t('home.features.data.cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div 
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-blue-300"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.03)}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - 1100) / 300))
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t('home.features.methodology.title')}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {t('home.features.methodology.description')}
                </p>
                <Link 
                  to="/metodologia"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
                >
                  {t('home.features.methodology.cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section 
        className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden"
        style={{
          backgroundPosition: `center ${scrollY * 0.1}px`
        }}
      >
   
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl top-10 left-10"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl bottom-10 right-10"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.transparency.title')}
            </h2>
            
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-6"></div>
            
            <p className="text-xl text-blue-100 mb-12">
              {t('home.transparency.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              
              <div className="flex items-start gap-4 text-left p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-2">{t('home.transparency.items.official.title')}</div>
                  <div className="text-blue-200 text-sm leading-relaxed">
                    {t('home.transparency.items.official.description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-2">{t('home.transparency.items.openSource.title')}</div>
                  <div className="text-blue-200 text-sm leading-relaxed">
                    {t('home.transparency.items.openSource.description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-2">{t('home.transparency.items.updates.title')}</div>
                  <div className="text-blue-200 text-sm leading-relaxed">
                    {t('home.transparency.items.updates.description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-2">{t('home.transparency.items.license.title')}</div>
                  <div className="text-blue-200 text-sm leading-relaxed">
                    {t('home.transparency.items.license.description')}
                  </div>
                </div>
              </div>

            </div>

            <Link
              to="/metodologia"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-semibold transition-all shadow-xl"
            >
              {t('home.transparency.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div 
          className="container mx-auto px-4 md:px-8"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 2000) / 400)),
            transform: `translateY(${Math.max(0, 50 - (scrollY - 2000) * 0.05)}px)`
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t('home.finalCta.title')}
            </h2>
            
            <p className="text-xl text-slate-600 mb-8">
              {t('home.finalCta.subtitle')}
            </p>

            <Link
              to="/demograf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              {t('home.finalCta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}

/* import { Link } from 'react-router-dom';
import { Search, ArrowRight, MapPin, Database, BookOpen, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext'; 

export function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      

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
       
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-400 font-medium">{t('home.hero.badge')}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 text-center mb-12 leading-relaxed max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/demograf"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5" />
                {t('home.hero.exploreCTA')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/metodologia"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold transition-all"
              >
                {t('home.hero.methodologyCTA')}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </section>

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="text-center p-8">
                <div className="text-5xl font-bold text-slate-900 mb-2">73</div>
                <div className="text-slate-600 font-medium">{t('home.metrics.neighborhoods')}</div>
                <div className="text-sm text-slate-500 mt-2">{t('home.metrics.neighborhoodsSub')}</div>
              </div>

              <div className="text-center p-8 border-x border-slate-200">
                <div className="text-5xl font-bold text-slate-900 mb-2">4</div>
                <div className="text-slate-600 font-medium">{t('home.metrics.indicators')}</div>
                <div className="text-sm text-slate-500 mt-2">{t('home.metrics.indicatorsSub')}</div>
              </div>

              <div className="text-center p-8">
                <div className="text-5xl font-bold text-blue-500 mb-2">100%</div>
                <div className="text-slate-600 font-medium">{t('home.metrics.dataQuality')}</div>
                <div className="text-sm text-slate-500 mt-2">{t('home.metrics.dataQualitySub')}</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('home.problem.title')}
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t('home.problem.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-900">{t('home.problem.raval.title')}</h3>
                  <span className="ml-auto text-sm text-slate-500">{t('home.problem.raval.tag')}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">{t('home.problem.raval.income')}</span>
                    <span className="font-bold text-slate-900">9.847€</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">{t('home.problem.raval.unemployment')}</span>
                    <span className="font-bold text-red-600">18.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">{t('home.problem.raval.population')}</span>
                    <span className="font-bold text-slate-900">47.838</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-900">{t('home.problem.pedralbes.title')}</h3>
                  <span className="ml-auto text-sm text-slate-500">{t('home.problem.pedralbes.tag')}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">{t('home.problem.raval.income')}</span>
                    <span className="font-bold text-slate-900">58.934€</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600">{t('home.problem.raval.unemployment')}</span>
                    <span className="font-bold text-green-600">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">{t('home.problem.raval.population')}</span>
                    <span className="font-bold text-slate-900">13.956</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
              <p className="text-slate-700 text-center">
                <span className="font-bold text-slate-900">6 {t('home.problem.insight')}</span> 
              </p>
            </div>

          </div>
        </div>
      </section>


      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('home.features.title')}
              </h2>
              <p className="text-lg text-slate-600">
                {t('home.features.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="group">
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500 transition-all h-full">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {t('home.features.map.title')}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {t('home.features.map.description')}
                  </p>
                  <Link 
                    to="/demograf"
                    className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all"
                  >
                    {t('home.features.map.cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="group">
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500 transition-all h-full">
                  <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mb-6">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {t('home.features.data.title')}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {t('home.features.data.description')}
                  </p>
                  <Link 
                    to="/corpus"
                    className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all"
                  >
                    {t('home.features.data.cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="group">
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500 transition-all h-full">
                  <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {t('home.features.methodology.title')}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {t('home.features.methodology.description')}
                  </p>
                  <Link 
                    to="/metodologia"
                    className="inline-flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all"
                  >
                    {t('home.features.methodology.cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('home.transparency.title')}
            </h2>
            
            <p className="text-xl text-slate-300 mb-12">
              {t('home.transparency.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              
              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{t('home.transparency.items.official.title')}</div>
                  <div className="text-slate-400 text-sm">
                    {t('home.transparency.items.official.description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{t('home.transparency.items.openSource.title')}</div>
                  <div className="text-slate-400 text-sm">
                    {t('home.transparency.items.openSource.description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{t('home.transparency.items.updates.title')}</div>
                  <div className="text-slate-400 text-sm">
                    {t('home.transparency.items.updates.description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{t('home.transparency.items.license.title')}</div>
                  <div className="text-slate-400 text-sm">
                    {t('home.transparency.items.license.description')}
                  </div>
                </div>
              </div>

            </div>

            <Link
              to="/metodologia"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-semibold transition-all"
            >
              {t('home.transparency.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t('home.finalCta.title')}
            </h2>
            
            <p className="text-xl text-slate-600 mb-8">
              {t('home.finalCta.subtitle')}
            </p>

            <Link
              to="/demograf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              {t('home.finalCta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </section>

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
} */