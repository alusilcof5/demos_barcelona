import { useDemografStore } from '../../demos.stores';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

type SortKey = 'rank' | 'nom' | 'vulnerability_score' | 'renda_mitjana' | 'atur';

export function RankingTable() {
  const { barrisWithVulnerability, setSelectedBarri, selectedBarri } = useDemografStore();
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedBarris = [...barrisWithVulnerability].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
    }

    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const getVulnerabilityColor = (score: number) => {
    if (score > 0.7) return 'text-red-700 bg-red-50';
    if (score > 0.6) return 'text-red-600 bg-red-50';
    if (score > 0.5) return 'text-orange-600 bg-orange-50';
    if (score > 0.4) return 'text-yellow-600 bg-yellow-50';
    if (score > 0.3) return 'text-lime-600 bg-lime-50';
    return 'text-green-600 bg-green-50';
  };

  const getVulnerabilityIcon = (score: number) => {
    return score > 0.5 ? (
      <TrendingUp className="w-4 h-4 text-red-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-green-600" />
    );
  };

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th 
              className="px-4 py-3 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('rank')}
            >
              <div className="flex items-center gap-2">
                Ranking
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('nom')}
            >
              <div className="flex items-center gap-2">
                Barri
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Districte
            </th>
            <th 
              className="px-4 py-3 text-right font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('vulnerability_score')}
            >
              <div className="flex items-center justify-end gap-2">
                Vulnerabilitat
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('renda_mitjana')}
            >
              <div className="flex items-center justify-end gap-2">
                Renda
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('atur')}
            >
              <div className="flex items-center justify-end gap-2">
                Atur
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedBarris.map((barri) => (
            <tr 
              key={barri.id}
              onClick={() => setSelectedBarri(barri.id)}
              className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                selectedBarri === barri.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">#{barri.rank}</span>
                  {getVulnerabilityIcon(barri.vulnerability_score)}
                </div>
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {barri.nom}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {barri.districte}
              </td>
              <td className="px-4 py-3 text-right">
                <span className={`inline-block px-2 py-1 rounded-full font-medium ${getVulnerabilityColor(barri.vulnerability_score)}`}>
                  {(barri.vulnerability_score * 100).toFixed(1)}%
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-600">
                {barri.renda_mitjana.toLocaleString()}€
              </td>
              <td className="px-4 py-3 text-right text-gray-600">
                {barri.atur.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
