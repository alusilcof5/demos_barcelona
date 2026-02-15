import { useState, useEffect } from "react";
import {
  Download,
  CheckCircle,
  Users,
  Newspaper,
  GraduationCap,
  Building2,
  Bot,
  FileSpreadsheet,
  FileJson,
  File,
} from "lucide-react";
import { useLanguage } from '../i18n/LanguageContext';
import { datosTranslations } from '../i18n/datosTranslations';

export function DatosPage() {
  const { language } = useLanguage();
  const t = datosTranslations[language];
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
      
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="../images/5.webp" 
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
              {t.header.subtitle}
              <br />
              <strong className="text-white">
                {t.header.subtitleBold}
              </strong>
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
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-xl border-l-4 border-blue-500">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t.whatYouFind.title}
              </h2>

              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                {t.whatYouFind.description}
                <br />
                {t.whatYouFind.descriptionExtra}
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 mb-6">
                <h3 className="font-bold text-xl text-slate-900 mb-4">
                  {t.whatYouFind.includesTitle}
                </h3>
                <ul className="space-y-3">
                  {t.whatYouFind.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t.whatYouFind.freeTitle}
                  </h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {t.whatYouFind.freeDescription}
                  <br />
                  <strong className="text-slate-900">{t.whatYouFind.freeDescriptionBold}</strong> {t.whatYouFind.freeDescriptionExtra}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.uses.title}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.uses.journalism.title}
                </h3>
                <ul className="space-y-3 text-slate-700">
                  {t.uses.journalism.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.uses.education.title}
                </h3>
                <ul className="space-y-3 text-slate-700">
                  {t.uses.education.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.uses.publicDecisions.title}
                </h3>
                <ul className="space-y-3 text-slate-700">
                  {t.uses.publicDecisions.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

     
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.uses.ai.title}
                </h3>
                <ul className="space-y-3 text-slate-700">
                  {t.uses.ai.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-xl border-l-4 border-green-500">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t.quality.title}
              </h2>

              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                {t.quality.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {t.quality.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-slate-900 mb-2">
                        {item.title}
                      </div>
                      <div className="text-sm text-slate-700 leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl p-8 md:p-10 text-white overflow-hidden shadow-xl">
              
              <div className="absolute inset-0 z-0">
                <img 
                  src="../images/2.png" 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  {t.aiUsage.title}
                </h2>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                  <h3 className="font-bold text-xl mb-3">{t.aiUsage.whatIsThis.title}</h3>
                  <p className="text-blue-100 leading-relaxed">
                    {t.aiUsage.whatIsThis.text}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                  <h3 className="font-bold text-xl mb-4">
                    {t.aiUsage.whyImportant.title}
                  </h3>
                  <ul className="space-y-3">
                    {t.aiUsage.whyImportant.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                  <h3 className="font-bold text-xl mb-4">
                    {t.aiUsage.perfectFor.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {t.aiUsage.perfectFor.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-green-400 text-xl">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-400/50 rounded-xl p-6">
                  <h3 className="font-bold text-xl mb-3">
                    {t.aiUsage.example.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    {t.aiUsage.example.text}
                    <br />
                    <br />
                    <em className="text-yellow-200">
                      {t.aiUsage.example.question}
                    </em>
                    <br />
                    <br />
                    {t.aiUsage.example.answer}{" "}
                    <strong className="text-white">
                      {t.aiUsage.example.answerBold}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.downloads.title}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-green-200 hover:border-green-400">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <FileSpreadsheet className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 text-center">
                  {t.downloads.excel.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 text-center leading-relaxed">
                  {t.downloads.excel.format}
                  <br />
                  {t.downloads.excel.description}
                </p>
                <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md">
                  <Download className="w-5 h-5" />
                  {t.downloads.excel.button}
                </button>
              </div>


              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-blue-200 hover:border-blue-400">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <File className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 text-center">
                  {t.downloads.csv.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 text-center leading-relaxed">
                  {t.downloads.csv.format}
                  <br />
                  {t.downloads.csv.description}
                </p>
                <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md">
                  <Download className="w-5 h-5" />
                  {t.downloads.csv.button}
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-slate-200 hover:border-slate-400">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <FileJson className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 text-center">
                  {t.downloads.json.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 text-center leading-relaxed">
                  {t.downloads.json.format}
                  <br />
                  {t.downloads.json.description}
                </p>
                <button className="w-full px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md">
                  <Download className="w-5 h-5" />
                  {t.downloads.json.button}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
              <p className="text-center leading-relaxed">
                <strong className="text-xl">{t.downloads.help.title}</strong>
                <br />
                <span className="text-blue-100">
                  {t.downloads.help.excel}
                  <br />
                  {t.downloads.help.csv}
                  <br />
                  {t.downloads.help.json}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}