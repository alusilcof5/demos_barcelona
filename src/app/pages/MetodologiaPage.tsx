import { useState, useEffect } from 'react';
import { BookOpen, BarChart3, Microscope, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { metodologiaTranslations } from '../i18n/MetodlogiaTranslations';

type NivelExplicacion = 'simple' | 'intermedio' | 'tecnico';

export function MetodologiaPage() {
  const { language } = useLanguage();
  const t = metodologiaTranslations[language];
  
  const [nivelActivo, setNivelActivo] = useState<NivelExplicacion>('simple');
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>('que-hacemos');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSeccion = (seccion: string) => {
    setSeccionExpandida(seccionExpandida === seccion ? null : seccion);
  };

  return (
    <div className="min-h-screen bg-white">
      
    
      <section className="relative py-20 md:py-28 overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img 
            src="../images/4.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
        </div>

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
              {t.header.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {t.header.subtitle}<br/>
              <strong className="text-white">{t.header.subtitleBold}</strong>
            </p>
          </div>
        </div>

  
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,40 L1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.levelSelector.title}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600">
                {t.levelSelector.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
             
              <button
                onClick={() => setNivelActivo('simple')}
                className={`p-8 rounded-xl border-2 transition-all text-left shadow-lg hover:shadow-xl ${
                  nivelActivo === 'simple'
                    ? 'bg-green-50 border-green-500 scale-105'
                    : 'bg-white border-slate-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
                    nivelActivo === 'simple' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-slate-100'
                  }`}>
                    <BookOpen className={`w-8 h-8 ${nivelActivo === 'simple' ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-slate-900 mb-1">{t.levelSelector.simple.title}</h3>
                    <p className="text-sm text-slate-600">{t.levelSelector.simple.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {t.levelSelector.simple.description}
                </p>
              </button>

              
              <button
                onClick={() => setNivelActivo('intermedio')}
                className={`p-8 rounded-xl border-2 transition-all text-left shadow-lg hover:shadow-xl ${
                  nivelActivo === 'intermedio'
                    ? 'bg-blue-50 border-blue-500 scale-105'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
                    nivelActivo === 'intermedio' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-slate-100'
                  }`}>
                    <BarChart3 className={`w-8 h-8 ${nivelActivo === 'intermedio' ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-slate-900 mb-1">{t.levelSelector.intermediate.title}</h3>
                    <p className="text-sm text-slate-600">{t.levelSelector.intermediate.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {t.levelSelector.intermediate.description}
                </p>
              </button>

           
              <button
                onClick={() => setNivelActivo('tecnico')}
                className={`p-8 rounded-xl border-2 transition-all text-left shadow-lg hover:shadow-xl ${
                  nivelActivo === 'tecnico'
                    ? 'bg-slate-50 border-slate-500 scale-105'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
                    nivelActivo === 'tecnico' ? 'bg-gradient-to-br from-slate-700 to-slate-800' : 'bg-slate-100'
                  }`}>
                    <Microscope className={`w-8 h-8 ${nivelActivo === 'tecnico' ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-slate-900 mb-1">{t.levelSelector.technical.title}</h3>
                    <p className="text-sm text-slate-600">{t.levelSelector.technical.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {t.levelSelector.technical.description}
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

     
      {nivelActivo === 'simple' && (
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
              
           
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('que-hacemos')}
                  className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-slate-900">{t.simple.whatWeDo.title}</h3>
                  {seccionExpandida === 'que-hacemos' ? (
                    <ChevronUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                
                {seccionExpandida === 'que-hacemos' && (
                  <div className="p-6 pt-0 border-t border-green-100">
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      {t.simple.whatWeDo.text}
                    </p>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                      <p className="text-slate-700 leading-relaxed">
                        <strong className="text-slate-900">{t.simple.whatWeDo.summary}</strong> {t.simple.whatWeDo.summaryText}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('de-donde-salen')}
                  className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-slate-900">{t.simple.dataSource.title}</h3>
                  {seccionExpandida === 'de-donde-salen' ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                
                {seccionExpandida === 'de-donde-salen' && (
                  <div className="p-6 pt-0 border-t border-blue-100">
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      {t.simple.dataSource.intro} <strong className="text-slate-900">{t.simple.dataSource.introOrg}</strong>.<br/>
                      {t.simple.dataSource.introExtra}
                    </p>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 mb-6">
                      <h4 className="font-bold text-xl text-slate-900 mb-4">
                        {t.simple.dataSource.typesTitle}
                      </h4>
                      
                      <div className="space-y-4">
                        {t.simple.dataSource.types.map((type, index) => (
                          <div key={index} className="flex items-start gap-3 bg-white/50 rounded-lg p-4">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <div className="font-semibold text-slate-900">{type.title}</div>
                              <div className="text-slate-700 text-sm mt-1">{type.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a 
                      href="https://opendata-ajuntament.barcelona.cat/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg"
                    >
                      {t.simple.dataSource.viewSources}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-500 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('fiabilidad')}
                  className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-slate-900">{t.simple.reliability.title}</h3>
                  {seccionExpandida === 'fiabilidad' ? (
                    <ChevronUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                
                {seccionExpandida === 'fiabilidad' && (
                  <div className="p-6 pt-0 border-t border-green-100">
                    <div className="grid md:grid-cols-2 gap-4">
                      {t.simple.reliability.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                          <div>
                            <div className="font-semibold text-slate-900 mb-2">{item.title}</div>
                            <div className="text-sm text-slate-700 leading-relaxed">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('calculo-necesidad')}
                  className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-slate-900">{t.simple.needCalculation.title}</h3>
                  {seccionExpandida === 'calculo-necesidad' ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                
                {seccionExpandida === 'calculo-necesidad' && (
                  <div className="p-6 pt-0 border-t border-blue-100">
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      {t.simple.needCalculation.intro} <strong className="text-slate-900">{t.simple.needCalculation.introNumbers}</strong>
                    </p>

                    <div className="space-y-4 mb-6">
                      {t.simple.needCalculation.factors.map((factor, index) => (
                        <div key={index} className="flex items-start gap-3 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-slate-900">{factor.title}</div>
                            <div className="text-slate-700 mt-1">{factor.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
                      <h4 className="font-bold text-xl mb-4 text-slate-900">{t.simple.needCalculation.resultTitle}</h4>
                      <div className="space-y-3">
                        {t.simple.needCalculation.ranges.map((range, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                            <div className={`w-20 h-10 bg-${range.color}-500 rounded shadow-sm`}></div>
                            <span className="font-semibold text-slate-900">{range.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                        <h4 className="font-bold text-xl text-slate-900 mb-4">
                          {t.simple.needCalculation.exampleHigh.title}
                        </h4>
                        <ul className="space-y-3 text-slate-700">
                          {t.simple.needCalculation.exampleHigh.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-600 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                        <h4 className="font-bold text-xl text-slate-900 mb-4">
                          {t.simple.needCalculation.exampleLow.title}
                        </h4>
                        <ul className="space-y-3 text-slate-700">
                          {t.simple.needCalculation.exampleLow.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-16 max-w-5xl mx-auto">
              <div className="relative rounded-2xl p-8 md:p-12 text-white overflow-hidden shadow-xl">
                {/* Fondo */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="../images/2.png" 
                    alt="Background" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.simple.moreDetails.title}</h3>
                  <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                    {t.simple.moreDetails.text}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setNivelActivo('intermedio')}
                      className="px-8 py-4 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-semibold transition-all shadow-lg"
                    >
                      {t.simple.moreDetails.buttonIntermediate}
                    </button>
                    <button
                      onClick={() => setNivelActivo('tecnico')}
                      className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-white/30 hover:border-white/50 text-white rounded-lg font-semibold transition-all backdrop-blur-sm"
                    >
                      {t.simple.moreDetails.buttonTechnical}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

 
      {nivelActivo === 'intermedio' && (
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-l-4 border-blue-500">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {t.intermediate.title}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {t.intermediate.text}
                </p>
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <p className="text-slate-600 italic">
                    {t.intermediate.development}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {nivelActivo === 'tecnico' && (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-l-4 border-slate-700">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {t.technical.title}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {t.technical.text}
                </p>
                <div className="bg-slate-100 rounded-lg p-6 border border-slate-300">
                  <p className="text-slate-600 italic">
                    {t.technical.development}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}