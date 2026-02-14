import { TrendingDown, TrendingUp, Users, Euro } from 'lucide-react';
import { useGenderStore } from './store';
import { useLanguage } from '../../i18n/LanguageContext';
import { generoTranslations } from '../../i18n/GeneroTranslations';

export function GenderStatsCards() {
  const { data } = useGenderStore();
  const { language } = useLanguage();
  const t = generoTranslations[language];

  if (!data) return null;

  const lastYearData = data.renda.yearly[data.renda.yearly.length - 1];
  const lastUnemployment = data.atur.timeline[data.atur.timeline.length - 1];
  
  const brechaSalarial = lastYearData.brecha;
  const diferenciaAtur = lastUnemployment.diferencia;

  const stats = [
    {
      title: t.stats.population.title,
      homes: data.poblacio.metadata.total_homes.toLocaleString(),
      dones: data.poblacio.metadata.total_dones.toLocaleString(),
      icon: Users,
      color: 'blue',
      label: t.stats.population.label,
      menLabel: t.stats.population.men,
      womenLabel: t.stats.population.women
    },
    {
      title: t.stats.wageGap.title,
      value: `${brechaSalarial.toFixed(1)}%`,
      icon: brechaSalarial > 0 ? TrendingUp : TrendingDown,
      color: 'purple',
      subtitle: t.stats.wageGap.subtitle,
      trend: brechaSalarial > 0 ? 'up' : 'down'
    },
    {
      title: t.stats.income.title,
      homes: `${lastYearData.renda_homes.toLocaleString()}€`,
      dones: `${lastYearData.renda_dones.toLocaleString()}€`,
      icon: Euro,
      color: 'blue',
      label: t.stats.income.label,
      menLabel: t.stats.population.men,
      womenLabel: t.stats.population.women
    },
    {
      title: t.stats.unemployment.title,
      value: `${Math.abs(diferenciaAtur).toFixed(1)} pp`,
      icon: TrendingUp,
      color: 'purple',
      subtitle: diferenciaAtur > 0 ? t.stats.unemployment.higherFemale : t.stats.unemployment.higherMale,
      trend: diferenciaAtur > 0 ? 'up' : 'down'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        const colorClasses = {
          blue: 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-200',
          purple: 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-200'
        }[stat.color];

        const iconColorClasses = {
          blue: 'bg-blue-300',
          purple: 'bg-purple-300'
        }[stat.color];

        return (
          <div
            key={index}
            className={`rounded-xl p-6 border-2 ${colorClasses} transition-all hover:shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{stat.title}</h3>
              <div className={`w-10 h-10 rounded-lg ${iconColorClasses} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>

            {stat.homes && stat.dones && (
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">♂ {stat.menLabel}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.homes}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">♀ {stat.womenLabel}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.dones}</div>
                </div>
                {stat.label && (
                  <div className="text-xs text-gray-500 pt-2 border-t">{stat.label}</div>
                )}
              </div>
            )}

            {stat.value && (
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                {stat.subtitle && (
                  <div className="text-sm text-gray-600">{stat.subtitle}</div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
