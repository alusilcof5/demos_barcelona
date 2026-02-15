import { useCorpus } from '../../hooks/useCorpus';
import { Search, Filter, ChevronRight } from 'lucide-react';

export function CorpusExplorer() {
  const { filteredRecords, filterCategory, setFilterCategory, setSelectedRecord, selectedRecord } = useCorpus();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'mitjana': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'baixa': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      {/* Filtres */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtrar:</span>
          </div>
          <div className="flex gap-2">
            {['all', 'alta', 'mitjana', 'baixa'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'Tots' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

   
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No hi ha registres en aquesta categoria</p>
            <p className="text-sm mt-1">Genera registres des de la vista DemoGràfic</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              onClick={() => setSelectedRecord(record.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedRecord === record.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{record.barri}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(record.category)}`}>
                      {record.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{record.districte}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{record.text}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Vulnerabilitat: <strong>{(record.vulnerability_score * 100).toFixed(1)}%</strong></span>
                    <span>Renda: <strong>{record.indicators.renda.toLocaleString()}€</strong></span>
                    <span>Atur: <strong>{record.indicators.atur.toFixed(1)}%</strong></span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
