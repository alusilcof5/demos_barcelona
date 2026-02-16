import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGenderStore } from './store';
import { useLanguage } from '../../i18n/LanguageContext';
import { generoTranslations } from '../../i18n/GeneroTranslations';

export function IncomeByAgeChart() {
  const { data } = useGenderStore();
  const { language } = useLanguage();
  const t = generoTranslations[language];

  if (!data) return null;

  const chartData = data.renda.by_age.map(item => ({
    edat: item.edat,
    [t.charts.wageGap.men]: item.renda_homes,
    [t.charts.wageGap.women]: item.renda_dones,
    [t.charts.wageGap.gap]: item.brecha
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t.charts.incomeByAge.title}
          </h3>
          <p className="text-sm text-gray-600">
            {t.charts.incomeByAge.subtitle}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">{t.charts.incomeByAge.noData}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t.charts.incomeByAge.title}
        </h3>
        <p className="text-sm text-gray-600">
          {t.charts.incomeByAge.subtitle}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart 
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="2 2" stroke="#e5e7eb" />
          
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
              if (name === t.charts.wageGap.gap) {
                return [`${value.toFixed(1)}%`, name];
              }
              return [`${value.toLocaleString()}€`, name];
            }}
          />

          <Legend wrapperStyle={{ paddingTop: '10px' }} />

          {/* 🔵 HOMBRES */}
          <Bar
            dataKey={t.charts.wageGap.men}
            fill="#1e40af"
            radius={[6, 6, 0, 0]}
          />

          {/* 🟣 MUJERES */}
          <Bar
            dataKey={t.charts.wageGap.women}
            fill="#7c3aed"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* LISTADO DETALLADO */}
      <div className="mt-6 space-y-3">
        {chartData.map((item, index) => {
          const brecha = item[t.charts.wageGap.gap];
          const brechaColor = brecha > 5 ? 'orange' : brecha > 3 ? 'yellow' : 'green';

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
                <span className="text-blue-800 font-medium">
                  ♂ {item[t.charts.wageGap.men].toLocaleString()}€
                </span>

                <span className="text-purple-800 font-medium">
                  ♀ {item[t.charts.wageGap.women].toLocaleString()}€
                </span>

                <span className="font-bold">
                  {t.charts.incomeByAge.gap}: {brecha.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-300">
        <div className="flex items-start gap-3">
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              {t.charts.incomeByAge.analysisTitle}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t.charts.incomeByAge.analysisText}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
