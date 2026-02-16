import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGenderStore } from './store';
import { useLanguage } from '../../i18n/LanguageContext';
import { generoTranslations } from '../../i18n/GeneroTranslations';

export function WageGapChart() {
  const { data } = useGenderStore();
  const { language } = useLanguage();
  const t = generoTranslations[language];

  if (!data) return null;

  const chartData = data.renda.yearly
    .slice(-10)
    .map(item => ({
      any: item.any.toString(),
      [t.charts.wageGap.men]: item.renda_homes,
      [t.charts.wageGap.women]: item.renda_dones,
      [t.charts.wageGap.gap]: item.brecha
    }));

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t.charts.wageGap.title}
        </h3>
        <p className="text-sm text-gray-600">
          {t.charts.wageGap.subtitle}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="2 2" stroke="#e5e7eb" />
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
              if (name === t.charts.wageGap.gap) {
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
            dataKey={t.charts.wageGap.men}
            stroke="#1e40af"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey={t.charts.wageGap.women}
            stroke="#7c3aed"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-blue-700 font-medium mb-1">
            {t.charts.wageGap.maleIncome} {chartData[chartData.length - 1].any}
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {chartData[chartData.length - 1][t.charts.wageGap.men].toLocaleString()}€
          </div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
          <div className="text-sm text-pink-700 font-medium mb-1">
            {t.charts.wageGap.femaleIncome} {chartData[chartData.length - 1].any}
          </div>
          <div className="text-2xl font-bold text-pink-900">
            {chartData[chartData.length - 1][t.charts.wageGap.women].toLocaleString()}€
          </div>
        </div>
      </div>
    </div>
  );
}