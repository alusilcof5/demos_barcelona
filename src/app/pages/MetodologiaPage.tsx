import { useState } from 'react';
import { BookOpen, BarChart3, Microscope, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { metodologiaTranslations } from '../i18n/MetodlogiaTranslations';

type NivelExplicacion = 'simple' | 'intermedio' | 'tecnico';

export function MetodologiaPage() {
  const { language } = useLanguage();
  const t = metodologiaTranslations[language];
  
  const [nivelActivo, setNivelActivo] = useState<NivelExplicacion>('simple');
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>('que-hacemos');

  const toggleSeccion = (seccion: string) => {
    setSeccionExpandida(seccionExpandida === seccion ? null : seccion);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <section 
        className="py-16"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.header.title}
            </h1>
            <p className="text-xl text-green-100">
              {t.header.subtitle}<br/>
              <strong className="text-white">{t.header.subtitleBold}</strong>
            </p>
          </div>
        </div>
      </section>

     
      <section className="py-8 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {t.levelSelector.title}
              </h2>
              <p className="text-gray-600">
                {t.levelSelector.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              
            
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
                    <h3 className="font-bold text-lg text-gray-900">{t.levelSelector.simple.title}</h3>
                    <p className="text-sm text-gray-600">{t.levelSelector.simple.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  {t.levelSelector.simple.description}
                </p>
              </button>

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
                    <h3 className="font-bold text-lg text-gray-900">{t.levelSelector.intermediate.title}</h3>
                    <p className="text-sm text-gray-600">{t.levelSelector.intermediate.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  {t.levelSelector.intermediate.description}
                </p>
              </button>

              <button
                onClick={() => setNivelActivo('tecnico')}
                className={`p-6 rounded-xl border-3 transition-all text-left ${
                  nivelActivo === 'tecnico'
                    ? 'bg-gray-50 border-gray-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    nivelActivo === 'tecnico' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <Microscope className={`w-6 h-6 ${nivelActivo === 'tecnico' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{t.levelSelector.technical.title}</h3>
                    <p className="text-sm text-gray-600">{t.levelSelector.technical.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  {t.levelSelector.technical.description}
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>


      {nivelActivo === 'simple' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              
          
              <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('que-hacemos')}
                  className="w-full p-6 flex items-center justify-between hover:bg-green-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">{t.simple.whatWeDo.title}</h3>
                  {seccionExpandida === 'que-hacemos' ? (
                    <ChevronUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'que-hacemos' && (
                  <div className="p-6 pt-0 border-t border-green-100">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      {t.simple.whatWeDo.text}
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-gray-700">
                        <strong>{t.simple.whatWeDo.summary}</strong> {t.simple.whatWeDo.summaryText}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('de-donde-salen')}
                  className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">{t.simple.dataSource.title}</h3>
                  {seccionExpandida === 'de-donde-salen' ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'de-donde-salen' && (
                  <div className="p-6 pt-0 border-t border-blue-100">
                    <p className="text-lg text-gray-700 mb-6">
                      {t.simple.dataSource.intro} <strong>{t.simple.dataSource.introOrg}</strong>.<br/>
                      {t.simple.dataSource.introExtra}
                    </p>

                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                      <h4 className="font-bold text-lg text-gray-900 mb-4">
                        {t.simple.dataSource.typesTitle}
                      </h4>
                      
                      <div className="space-y-4">
                        {t.simple.dataSource.types.map((type, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div>
                              <div className="font-semibold text-gray-900">{type.title}</div>
                              <div className="text-gray-700 text-sm">{type.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a 
                      href="https://opendata-ajuntament.barcelona.cat/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      {t.simple.dataSource.viewSources}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('fiabilidad')}
                  className="w-full p-6 flex items-center justify-between hover:bg-purple-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">{t.simple.reliability.title}</h3>
                  {seccionExpandida === 'fiabilidad' ? (
                    <ChevronUp className="w-6 h-6 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'fiabilidad' && (
                  <div className="p-6 pt-0 border-t border-purple-100">
                    <div className="grid md:grid-cols-2 gap-4">
                      {t.simple.reliability.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                            <div className="text-sm text-gray-700">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 overflow-hidden">
                <button
                  onClick={() => toggleSeccion('calculo-necesidad')}
                  className="w-full p-6 flex items-center justify-between hover:bg-orange-50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900">{t.simple.needCalculation.title}</h3>
                  {seccionExpandida === 'calculo-necesidad' ? (
                    <ChevronUp className="w-6 h-6 text-orange-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {seccionExpandida === 'calculo-necesidad' && (
                  <div className="p-6 pt-0 border-t border-orange-100">
                    <p className="text-lg text-gray-700 mb-6">
                      {t.simple.needCalculation.intro} <strong>{t.simple.needCalculation.introNumbers}</strong>
                    </p>

                    <div className="space-y-4 mb-6">
                      {t.simple.needCalculation.factors.map((factor, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{factor.title}</div>
                            <div className="text-gray-700">{factor.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-lg mb-4 text-gray-900">{t.simple.needCalculation.resultTitle}</h4>
                      <div className="space-y-3">
                        {t.simple.needCalculation.ranges.map((range, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-16 h-8 bg-${range.color}-500 rounded`}></div>
                            <span className="font-semibold text-gray-900">{range.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                        <h4 className="font-bold text-lg text-gray-900 mb-3">
                          {t.simple.needCalculation.exampleHigh.title}
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {t.simple.needCalculation.exampleHigh.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-600">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                        <h4 className="font-bold text-lg text-gray-900 mb-3">
                          {t.simple.needCalculation.exampleLow.title}
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {t.simple.needCalculation.exampleLow.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-600">•</span>
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
                <h3 className="text-2xl font-bold mb-4">{t.simple.moreDetails.title}</h3>
                <p className="text-blue-100 mb-6">
                  {t.simple.moreDetails.text}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setNivelActivo('intermedio')}
                    className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                  >
                    {t.simple.moreDetails.buttonIntermediate}
                  </button>
                  <button
                    onClick={() => setNivelActivo('tecnico')}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    {t.simple.moreDetails.buttonTechnical}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {nivelActivo === 'intermedio' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.intermediate.title}
                </h3>
                <p className="text-gray-700">
                  {t.intermediate.text}
                </p>
                <p className="text-gray-600 mt-4 italic">
                  {t.intermediate.development}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {nivelActivo === 'tecnico' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.technical.title}
                </h3>
                <p className="text-gray-700">
                  {t.technical.text}
                </p>
                <p className="text-gray-600 mt-4 italic">
                  {t.technical.development}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}