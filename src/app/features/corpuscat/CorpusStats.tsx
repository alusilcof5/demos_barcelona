import { useCorpus } from '../../hooks/useCorpus';
import { Database, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function CorpusStats() {
  const { records, getStats } = useCorpus();
  const stats = getStats();

  const chartData = [
    { name: 'Alta', value: stats.byCategory.alta, color: '#dc2626' },
    { name: 'Mitjana', value: stats.byCategory.mitjana, color: '#f59e0b' },
    { name: 'Baixa', value: stats.byCategory.baixa, color: '#10b981' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
   
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8" />
            <div>
              <p className="text-blue-100 text-sm">Total de Registres</p>
              <p className="text-4xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <p className="text-xs text-red-700 font-medium">Alta</p>
            </div>
            <p className="text-2xl font-bold text-red-700">{stats.byCategory.alta}</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-orange-600" />
              <p className="text-xs text-orange-700 font-medium">Mitjana</p>
            </div>
            <p className="text-2xl font-bold text-orange-700">{stats.byCategory.mitjana}</p>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <p className="text-xs text-green-700 font-medium">Baixa</p>
            </div>
            <p className="text-2xl font-bold text-green-700">{stats.byCategory.baixa}</p>
          </div>
        </div>
      </div>

    
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Distribució per Categoria
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
