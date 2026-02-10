import { OPENDATA_SOURCES, INDICADORS_INFO, DEFAULT_WEIGHTS } from '../core/datasets';
import { DataBadge } from '../shared/components/DataBadge';
import { BookOpen, Database, Calculator, Scale, ExternalLink, CheckCircle } from 'lucide-react';

export function MetodologiaPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <BookOpen className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Metodologia i Fonts
            </h1>
            <p className="text-gray-600">
              Transparència, reproducibilitat i auditabilitat
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Introducció */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            🎯 Objectiu del Projecte
          </h2>
          <p className="text-gray-700 leading-relaxed">
            L'<strong>Observatori de Vulnerabilitat BCN</strong> és una eina de codi obert per visualitzar 
            i analitzar desigualtats urbanes a Barcelona utilitzant dades públiques. El projecte:
          </p>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Combat la desinformació amb dades verificables</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Dóna suport a la presa de decisions basada en evidències</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Millora la qualitat de la informació pública</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Genera datasets fiables per IA responsable</span>
            </li>
          </ul>
        </div>

        {/* Fonts de dades */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Fonts de Dades</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Tots els indicadors provenen de datasets oficials d'<strong>Open Data BCN</strong>, 
            publicats per l'Ajuntament de Barcelona amb llicència <strong>CC BY 4.0</strong>.
          </p>
          <div className="space-y-3">
            {OPENDATA_SOURCES.map((source) => (
              <DataBadge key={source.id} source={source} />
            ))}
          </div>
        </section>

        {/* Indicadors */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Indicadors Utilitzats</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(INDICADORS_INFO).map(([key, info]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4 bg-white">
                <h3 className="font-semibold text-gray-900 mb-1">{info.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                <div className="text-xs space-y-1">
                  <p className="text-gray-500">
                    <strong>Unitat:</strong> {info.unit}
                  </p>
                  <p className="text-gray-500">
                    <strong>Interpretació:</strong> {info.interpretation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Càlcul de l'índex */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Càlcul de l'Índex de Vulnerabilitat</h2>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Normalització</h3>
              <p className="text-sm text-gray-700">
                Cada indicador es normalitza entre 0 i 1 utilitzant la fórmula:
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded font-mono text-sm">
                valor_normalitzat = (valor - min) / (max - min)
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Per a la renda, s'inverteix la normalització (menor renda = major vulnerabilitat)
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Ponderació</h3>
              <p className="text-sm text-gray-700 mb-2">
                Els pesos per defecte són:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                  <strong>Renda:</strong> {(DEFAULT_WEIGHTS.renda * 100).toFixed(0)}%
                </div>
                <div className="p-2 bg-orange-50 border border-orange-200 rounded text-sm">
                  <strong>Atur:</strong> {(DEFAULT_WEIGHTS.atur * 100).toFixed(0)}%
                </div>
                <div className="p-2 bg-purple-50 border border-purple-200 rounded text-sm">
                  <strong>Envelliment:</strong> {(DEFAULT_WEIGHTS.envelliment * 100).toFixed(0)}%
                </div>
                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                  <strong>Immigració:</strong> {(DEFAULT_WEIGHTS.immigracio * 100).toFixed(0)}%
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Els pesos són configurables des de la interfície per explorar diferents perspectives
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Suma Ponderada</h3>
              <p className="text-sm text-gray-700">
                L'índex final és la suma dels indicadors normalitzats multiplicats pels seus pesos:
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded font-mono text-xs">
                vulnerabilitat = (renda_norm × 0.35) + (atur_norm × 0.30) + 
                (envelliment_norm × 0.20) + (immigracio_norm × 0.15)
              </div>
            </div>
          </div>
        </section>

        {/* Transparència */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            🔍 Garanties de Transparència
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span><strong>Codi obert:</strong> Tot el codi font és accessible i auditable</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span><strong>Fonts trazables:</strong> Cada indicador enllaça amb el dataset original</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span><strong>Metodologia reproducible:</strong> Qualsevol pot recalcular l'índex amb les mateixes dades</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span><strong>Pesos configurables:</strong> Permet explorar diferents definicions de vulnerabilitat</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span><strong>Exportació de dades:</strong> El corpus generat és descargable en format obert (JSON)</span>
            </li>
          </ul>
        </section>

        {/* Limitacions */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            ⚠️ Limitacions i Consideracions
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Aquest índex és una <strong>simplificació</strong> de la realitat complexa de la vulnerabilitat urbana</li>
            <li>• La selecció d'indicadors i pesos comporta decisions <strong>valoratives</strong></li>
            <li>• Les dades tenen diferents dates d'actualització (veure fonts per a cada dataset)</li>
            <li>• No substitueix anàlisis professionals o avaluacions institucionals</li>
            <li>• És una eina de <strong>divulgació i exploració</strong>, no un instrument oficial de planificació</li>
          </ul>
        </section>

        {/* Crèdits */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            🙏 Crèdits
          </h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Dades:</strong>{' '}
              <a 
                href="https://opendata-ajuntament.barcelona.cat/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                Open Data BCN (Ajuntament de Barcelona)
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            <p>
              <strong>Projecte creat per:</strong> Open Data Day 2026
            </p>
            <p className="text-xs text-gray-500">
              Llicència: CC BY 4.0 · Codi obert · Contribucions benvingudes
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
