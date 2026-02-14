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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section
        className="py-16"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.header.title}
            </h1>
            <p className="text-xl text-purple-100">
              {t.header.subtitle}
              <br />
              <strong className="text-white">
                {t.header.subtitleBold}
              </strong>
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
                {t.whatYouFind.title}
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t.whatYouFind.description}
                <br />
                {t.whatYouFind.descriptionExtra}
              </p>

              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  {t.whatYouFind.includesTitle}
                </h3>
                <ul className="space-y-3">
                  {t.whatYouFind.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {t.whatYouFind.freeTitle}
                  </h3>
                </div>
                <p className="text-gray-700">
                  {t.whatYouFind.freeDescription}
                  <br />
                  <strong>{t.whatYouFind.freeDescriptionBold}</strong> {t.whatYouFind.freeDescriptionExtra}
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
              {t.uses.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Periodismo */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.uses.journalism.title}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {t.uses.journalism.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Educación */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-200">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.uses.education.title}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {t.uses.education.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decisiones Públicas */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border-2 border-purple-200">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.uses.publicDecisions.title}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {t.uses.publicDecisions.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* IA */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 border-2 border-orange-200">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.uses.ai.title}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {t.uses.ai.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
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
                {t.quality.title}
              </h2>

              <p className="text-lg text-gray-700 mb-6">
                {t.quality.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {t.quality.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-900 mb-1">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600">
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

      {/* Uso en IA explicado simple */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 text-white"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/2.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold">
                  {t.aiUsage.title}
                </h2>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-3">{t.aiUsage.whatIsThis.title}</h3>
                <p className="text-blue-100 leading-relaxed">
                  {t.aiUsage.whatIsThis.text}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">
                  {t.aiUsage.whyImportant.title}
                </h3>
                <ul className="space-y-3">
                  {t.aiUsage.whyImportant.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">
                  {t.aiUsage.perfectFor.title}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {t.aiUsage.perfectFor.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500/20 border-2 border-yellow-400/50 rounded-xl p-6">
                <h3 className="font-bold text-xl mb-3">
                  {t.aiUsage.example.title}
                </h3>
                <p className="text-blue-100">
                  {t.aiUsage.example.text}
                  <br />
                  <em className="text-yellow-200">
                    {t.aiUsage.example.question}
                  </em>
                  <br />
                  <br />{t.aiUsage.example.answer}{" "}
                  <strong className="text-white">
                    {t.aiUsage.example.answerBold}
                  </strong>
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
              {t.downloads.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Excel */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <FileSpreadsheet className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 text-center">
                  {t.downloads.excel.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {t.downloads.excel.format}
                  <br />
                  {t.downloads.excel.description}
                </p>
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {t.downloads.excel.button}
                </button>
              </div>

              {/* CSV */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <File className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 text-center">
                  {t.downloads.csv.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {t.downloads.csv.format}
                  <br />
                  {t.downloads.csv.description}
                </p>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {t.downloads.csv.button}
                </button>
              </div>

              {/* JSON */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="w-16 h-16 bg-gray-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <FileJson className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 text-center">
                  {t.downloads.json.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {t.downloads.json.format}
                  <br />
                  {t.downloads.json.description}
                </p>
                <button className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {t.downloads.json.button}
                </button>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <p className="text-gray-700">
                <strong>{t.downloads.help.title}</strong>
                <br />
                {t.downloads.help.excel}
                <br />
                {t.downloads.help.csv}
                <br />
                {t.downloads.help.json}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}