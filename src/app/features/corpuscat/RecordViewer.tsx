import { useCorpus } from '../../hooks/useCorpus';
import { X, Calendar, MapPin, TrendingUp } from 'lucide-react';

export function RecordViewer() {
  const { records, selectedRecord, setSelectedRecord } = useCorpus();

  if (!selectedRecord) return null;

  const record = records.find(r => r.id === selectedRecord);
  if (!record) return null;

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'alta':
        return {
          label: 'Vulnerabilitat Alta',
          color: 'bg-red-600',
          description: 'Barri amb indicadors de vulnerabilitat elevats'
        };
      case 'mitjana':
        return {
          label: 'Vulnerabilitat Mitjana',
          color: 'bg-orange-500',
          description: 'Barri amb indicadors de vulnerabilitat moderats'
        };
      case 'baixa':
        return {
          label: 'Vulnerabilitat Baixa',
          color: 'bg-green-600',
          description: 'Barri amb indicadors de vulnerabilitat baixos'
        };
      default:
        return {
          label: 'No classificat',
          color: 'bg-gray-500',
          description: ''
        };
    }
  };

  const categoryInfo = getCategoryInfo(record.category);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
     
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{record.barri}</h2>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{record.districte}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedRecord(null)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

     
        <div className="p-6 space-y-6">
        
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1.5 rounded-full text-sm text-white font-medium ${categoryInfo.color}`}>
                {categoryInfo.label}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {(record.vulnerability_score * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-sm text-gray-600">{categoryInfo.description}</p>
          </div>

     
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Descripció</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {record.text}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Indicadors</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium mb-1">Renda Mitjana</p>
                <p className="text-2xl font-bold text-green-700">
                  {record.indicators.renda.toLocaleString()}€
                </p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700 font-medium mb-1">Taxa d'Atur</p>
                <p className="text-2xl font-bold text-orange-700">
                  {record.indicators.atur.toFixed(1)}%
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-700 font-medium mb-1">Envelliment</p>
                <p className="text-2xl font-bold text-purple-700">
                  {record.indicators.envelliment.toFixed(1)}
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 font-medium mb-1">Immigració</p>
                <p className="text-2xl font-bold text-blue-700">
                  {record.indicators.immigracio.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Generat: {new Date(record.timestamp).toLocaleString('ca-ES')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ID: <code className="bg-gray-100 px-2 py-1 rounded">{record.id}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
