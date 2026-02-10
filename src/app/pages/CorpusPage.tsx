import { CorpusStats } from '../features/corpuscat/CorpusStats';
import { CorpusExplorer } from '../features/corpuscat/CorpusExplorer';
import { RecordViewer } from '../features/corpuscat/RecordViewer';
import { ExportCorpus } from '../features/corpuscat/ExportCorpus';
import { Database, Sparkles, Info } from 'lucide-react';

export function CorpusPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Database className="w-8 h-8 text-purple-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              CORPUS·CAT
            </h1>
            <p className="text-gray-600">
              Dataset etiquetat per IA responsable sobre vulnerabilitat urbana
            </p>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-700 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-purple-900 mb-1">Base de dades per IA responsable</p>
              <p>
                Aquest corpus permet entrenar models d'IA amb dades obertes i verificables sobre desigualtats urbanes.
                Cada registre combina <strong>text descriptiu</strong> amb <strong>indicadors quantitatius</strong> i 
                <strong> categories de vulnerabilitat</strong>, garantint la traçabilitat de les fonts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contingut */}
      <div className="space-y-6">
        {/* Estadístiques */}
        <CorpusStats />

        {/* Exportar */}
        <ExportCorpus />

        {/* Explorador */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Explorador de Registres</h2>
          </div>
          <CorpusExplorer />
        </div>

        {/* Informació metodològica */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700 space-y-2">
              <p className="font-medium text-gray-900">Com es genera el corpus?</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Des de la vista <strong>DemoGràfic</strong>, selecciona un barri del mapa o la taula</li>
                <li>Fes clic al botó "Afegir al Corpus" per generar un registre</li>
                <li>El sistema crea automàticament:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-0.5">
                    <li>Text descriptiu amb tots els indicadors</li>
                    <li>Dades estructurades (renda, atur, envelliment, immigració)</li>
                    <li>Índex de vulnerabilitat calculat</li>
                    <li>Categoria (alta/mitjana/baixa)</li>
                    <li>Timestamp i metadades</li>
                  </ul>
                </li>
                <li>Exporta el corpus complet en format JSON per utilitzar-lo en entrenament d'IA</li>
              </ol>
              <p className="mt-3 pt-3 border-t border-gray-300">
                <strong>Trazabilitat:</strong> Tots els indicadors provenen de datasets oficials d'Open Data BCN 
                (Barcelona Open Data), garantint la reproducibilitat i auditabilitat del corpus.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Viewer (modal) */}
      <RecordViewer />
    </div>
  );
}
