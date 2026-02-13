import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGenderStore } from './store';

export function WageGapChart() {
  const { data } = useGenderStore();

  if (!data) return null;

  const chartData = data.renda.yearly
    .slice(-10)
    .map(item => ({
      any: item.any.toString(),
      'Hombres': item.renda_homes,
      'Mujeres': item.renda_dones,
      'Brecha %': item.brecha
    }));

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Evolución de la Brecha Salarial
        </h3>
        <p className="text-sm text-gray-600">
          Comparación de ingresos anuales por género (últimos 10 años)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="any" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value: number, name: string) => {
              if (name === 'Brecha %') {
                return [`${value.toFixed(1)}%`, name];
              }
              return [`${value.toLocaleString()}€`, name];
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="Hombres"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Mujeres"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ fill: '#ec4899', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-blue-700 font-medium mb-1">Renta Masculina 2024</div>
          <div className="text-2xl font-bold text-blue-900">
            {chartData[chartData.length - 1]['Hombres'].toLocaleString()}€
          </div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
          <div className="text-sm text-pink-700 font-medium mb-1">Renta Femenina 2024</div>
          <div className="text-2xl font-bold text-pink-900">
            {chartData[chartData.length - 1]['Mujeres'].toLocaleString()}€
          </div>
        </div>
      </div>
    </div>
  );
}