import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGenderStore } from './store';
import { useLanguage } from '../../i18n/LanguageContext';
import { generoTranslations } from '../../i18n/GeneroTranslations';

export function PopulationByDistrictChart() {
  const { data } = useGenderStore();
  const { language } = useLanguage();
  const t = generoTranslations[language];

  if (!data) return null;

  const chartData = [...data.poblacio.per_districte]
    .sort((a, b) => (b.poblacio_homes + b.poblacio_dones) - (a.poblacio_homes + a.poblacio_dones))
    .map(item => ({
      districte: item.districte,
      [t.charts.wageGap.men]: item.poblacio_homes,
      [t.charts.wageGap.women]: item.poblacio_dones,
      Total: item.poblacio_homes + item.poblacio_dones
    }));

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t.charts.populationByDistrict.title}
        </h3>
        <p className="text-sm text-gray-600">
          {t.charts.populationByDistrict.subtitle}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={chartData}
          layout="vertical"
          margin={{ left: 120, right: 20 }}
        >
          <CartesianGrid strokeDasharray="2 2" stroke="#e5e7eb" />
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
              value.toLocaleString() + ' ' + t.charts.populationByDistrict.inhabitants,
              name
            ]}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Bar
            dataKey={t.charts.wageGap.men}
            stackId="a"
            fill="#3943B7"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey={t.charts.wageGap.women}
            stackId="a"
            fill="#A35DD5"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <div>
            <div className="font-semibold text-gray-900 mb-1">{t.charts.populationByDistrict.contextTitle}</div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t.charts.populationByDistrict.contextText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}