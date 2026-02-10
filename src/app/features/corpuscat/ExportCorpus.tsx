import { useCorpus } from '../../hooks/useCorpus';
import { Download, FileJson, Info } from 'lucide-react';
import { toast } from 'sonner';

export function ExportCorpus() {
  const { records, exportCorpus } = useCorpus();

  const handleExport = () => {
    if (records.length === 0) {
      toast.error('No hi ha registres per exportar');
      return;
    }

    const jsonData = exportCorpus();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `corpus-bcn-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Corpus exportat: ${records.length} registres`);
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-purple-100 rounded-lg">
          <FileJson className="w-6 h-6 text-purple-700" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            Exportar Corpus
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Descarrega el corpus complet en format JSON per entrenar models d'IA o fer anàlisis externes.
            Cada registre inclou el text descriptiu, els indicadors originals i la categoria de vulnerabilitat.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-900">
                <p className="font-medium mb-1">ℹ️ Format de sortida</p>
                <p>El fitxer JSON conté un array d'objectes amb l'estructura:</p>
                <code className="block mt-2 bg-white p-2 rounded text-[10px] font-mono">
                  {`{ id, barri, districte, text, indicators, vulnerability_score, category, timestamp }`}
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              disabled={records.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar {records.length > 0 && `(${records.length} registres)`}
            </button>

            <div className="text-sm text-gray-600">
              Format: <span className="font-medium">JSON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
