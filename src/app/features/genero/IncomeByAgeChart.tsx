import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGenderStore } from './store';

export function IncomeByAgeChart() {
  const { data } = useGenderStore();

  if (!data) return null;

  const chartData = data.renda.by_age.map(item => ({
    edat: item.edat,
    'Hombres': item.renda_homes,
    'Mujeres': item.renda_dones,
    'Brecha %': item.brecha
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Brecha Salarial por Grupo de Edad
          </h3>
          <p className="text-sm text-gray-600">
            Comparación de ingresos anuales entre hombres y mujeres según edad
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">No hay datos disponibles por edad</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Brecha Salarial por Grupo de Edad
        </h3>
        <p className="text-sm text-gray-600">
          Comparación de ingresos anuales entre hombres y mujeres según edad
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart 
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="edat" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={80}
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
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar
            dataKey="Hombres"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Mujeres"
            fill="#ec4899"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-3">
        {chartData.map((item, index) => {
          const brechaColor = item['Brecha %'] > 5 ? 'orange' : item['Brecha %'] > 3 ? 'yellow' : 'green';
          const colorClasses = {
            orange: 'bg-orange-50 border-orange-300 text-orange-700',
            yellow: 'bg-yellow-50 border-yellow-300 text-yellow-700',
            green: 'bg-green-50 border-green-300 text-green-700'
          }[brechaColor];

          return (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${colorClasses}`}
            >
              <div className="font-semibold">{item.edat}</div>
              <div className="flex items-center gap-4 text-sm">
                <span>♂ {item.Hombres.toLocaleString()}€</span>
                <span>♀ {item.Mujeres.toLocaleString()}€</span>
                <span className="font-bold">
                  Brecha: {item['Brecha %'].toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">📊</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Análisis</div>
            <p className="text-sm text-gray-700 leading-relaxed">
              La brecha salarial varía según el grupo de edad. El grupo de 30-44 años 
              tiende a mostrar las mayores diferencias, coincidiendo con la edad de mayor 
              responsabilidad familiar y desarrollo profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}