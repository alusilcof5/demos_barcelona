import { TrendingDown, TrendingUp, Users, Euro } from 'lucide-react';
import { useGenderStore } from './store';

export function GenderStatsCards() {
  const { data } = useGenderStore();

  if (!data) return null;

  const lastYearData = data.renda.yearly[data.renda.yearly.length - 1];
  const lastUnemployment = data.atur.timeline[data.atur.timeline.length - 1];
  
  const brechaSalarial = lastYearData.brecha;
  const diferenciaAtur = lastUnemployment.diferencia;

  const stats = [
    {
      title: 'Población',
      homes: data.poblacio.metadata.total_homes.toLocaleString(),
      dones: data.poblacio.metadata.total_dones.toLocaleString(),
      icon: Users,
      color: 'blue',
      label: 'habitantes'
    },
    {
      title: 'Brecha Salarial',
      value: `${brechaSalarial.toFixed(1)}%`,
      icon: brechaSalarial > 0 ? TrendingUp : TrendingDown,
      color: brechaSalarial > 15 ? 'red' : brechaSalarial > 10 ? 'orange' : 'green',
      subtitle: 'Diferencia de ingresos',
      trend: brechaSalarial > 0 ? 'up' : 'down'
    },
    {
      title: 'Renta Media (último año)',
      homes: `${lastYearData.renda_homes.toLocaleString()}€`,
      dones: `${lastYearData.renda_dones.toLocaleString()}€`,
      icon: Euro,
      color: 'green',
      label: 'al año'
    },
    {
      title: 'Diferencia en Desempleo',
      value: `${Math.abs(diferenciaAtur).toFixed(1)} pp`,
      icon: TrendingUp,
      color: Math.abs(diferenciaAtur) > 3 ? 'red' : 'orange',
      subtitle: diferenciaAtur > 0 ? 'Mayor paro femenino' : 'Mayor paro masculino',
      trend: diferenciaAtur > 0 ? 'up' : 'down'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = {
          blue: 'bg-blue-50 border-blue-200',
          green: 'bg-green-50 border-green-200',
          orange: 'bg-orange-50 border-orange-200',
          red: 'bg-red-50 border-red-200'
        }[stat.color];

        const iconColorClasses = {
          blue: 'bg-blue-500',
          green: 'bg-green-500',
          orange: 'bg-orange-500',
          red: 'bg-red-500'
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
                  <div className="text-xs text-gray-600 mb-1">♂ Hombres</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.homes}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">♀ Mujeres</div>
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