import { useDemografStore } from '../../demos.stores';
import { Users, Euro, TrendingUp, Globe, X } from 'lucide-react';

export function BarriDetail() {
  const { barrisWithVulnerability, selectedBarri, setSelectedBarri } = useDemografStore();

  if (!selectedBarri) return null;

  const barri = barrisWithVulnerability.find(b => b.id === selectedBarri);
  
  if (!barri) return null;

  const getVulnerabilityLabel = (score: number) => {
    if (score > 0.7) return { label: 'Molt Alta', color: 'bg-red-600' };
    if (score > 0.6) return { label: 'Alta', color: 'bg-red-500' };
    if (score > 0.5) return { label: 'Mitjana-Alta', color: 'bg-orange-500' };
    if (score > 0.4) return { label: 'Mitjana', color: 'bg-yellow-500' };
    if (score > 0.3) return { label: 'Baixa', color: 'bg-lime-500' };
    return { label: 'Molt Baixa', color: 'bg-green-500' };
  };

  const vulnLabel = getVulnerabilityLabel(barri.vulnerability_score);

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white border border-gray-200 rounded-lg shadow-2xl z-[1001]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-xl text-gray-900">{barri.nom}</h3>
            <p className="text-sm text-gray-600">{barri.districte}</p>
            <div className="mt-2">
              <span className="text-xs text-gray-500">Ranking: </span>
              <span className="font-semibold text-gray-900">
                #{barri.rank} de {barrisWithVulnerability.length}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedBarri(null)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Vulnerabilitat:</span>
            <span className={`px-2 py-1 rounded-full text-xs text-white font-medium ${vulnLabel.color}`}>
              {vulnLabel.label}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${vulnLabel.color}`}
              style={{ width: `${barri.vulnerability_score * 100}%` }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-2xl font-bold text-gray-900">
              {(barri.vulnerability_score * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Població</p>
              <p className="text-lg font-semibold text-gray-900">
                {barri.poblacio.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">habitants</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Euro className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Renda Mitjana</p>
              <p className="text-lg font-semibold text-gray-900">
                {barri.renda_mitjana.toLocaleString()}€
              </p>
              <p className="text-xs text-gray-500">per capita/any</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Taxa d'Atur</p>
                <p className="text-lg font-semibold text-gray-900">{barri.atur.toFixed(1)}%</p>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full"
                  style={{ width: `${(barri.atur / 25) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Envelliment</p>
              <p className="text-lg font-semibold text-gray-900">
                {barri.envelliment.toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Immigració</p>
              <p className="text-lg font-semibold text-gray-900">
                {barri.immigracio.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
