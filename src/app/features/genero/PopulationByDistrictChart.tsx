import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGenderStore } from './store';

export function PopulationByDistrictChart() {
  const { data, selectedDistrict, setSelectedDistrict } = useGenderStore();

  if (!data) return null;

  const chartData = [...data.poblacio.per_districte]
    .sort((a, b) => (b.poblacio_homes + b.poblacio_dones) - (a.poblacio_homes + a.poblacio_dones))
    .map(item => ({
      districte: item.districte,
      'Hombres': item.poblacio_homes,
      'Mujeres': item.poblacio_dones,
      'Total': item.poblacio_homes + item.poblacio_dones
    }));

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Distribución de Población por Distrito
        </h3>
        <p className="text-sm text-gray-600">
          Población total desagregada por género en cada distrito
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={chartData}
          layout="vertical"
          margin={{ left: 120, right: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <YAxis 
            type="category"
            dataKey="districte"
            stroke="#6b7280"
            style={{ fontSize: '11px' }}
            width={110}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value: number, name: string) => [
              value.toLocaleString() + ' habitantes',
              name
            ]}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Bar
            dataKey="Hombres"
            stackId="a"
            fill="#3b82f6"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="Mujeres"
            stackId="a"
            fill="#ec4899"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">ℹ</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Contexto Demográfico</div>
            <p className="text-sm text-gray-700 leading-relaxed">
              La distribución de población por género es relativamente equilibrada en todos los 
              distritos. Los distritos más poblados (Eixample, Sant Martí) muestran patrones 
              similares al resto de la ciudad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}