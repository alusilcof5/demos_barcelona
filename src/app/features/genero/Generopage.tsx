/* import { useEffect } from 'react';
import { AlertCircle, Users } from 'lucide-react';
import { useGenderStore } from './store';
import { GenderStatsCards } from './GenderStatsCards';
import { WageGapChart } from './Wage.GapCahart';
import { PopulationByDistrictChart } from './PopulationByDistrictChart';
import { IncomeByAgeChart } from './IncomeByAgeChart';

export function GeneroPage() {
  const { data, isLoading, error, fetchGenderData } = useGenderStore();

  useEffect(() => {
    fetchGenderData();
  }, [fetchGenderData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregant dades de gènere...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">Error</h2>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchGenderData}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Tornar a intentar
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
    
      <section 
        className="py-16"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-12 h-12 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Análisis de Género
              </h1>
            </div>
            <p className="text-xl text-purple-100">
              Desagregación de datos por género en Barcelona<br/>
              <strong className="text-white">Renta, empleo y demografía</strong>
            </p>
          </div>
        </div>
      </section>

      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <GenderStatsCards />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
           
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Análisis Temporal y Demográfico
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Evolución de las diferencias de género en ingresos, empleo y distribución poblacional
              </p>
            </div>

          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WageGapChart />
              <IncomeByAgeChart />
            </div>

            <PopulationByDistrictChart />
          </div>
        </div>
      </section>

     
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="rounded-2xl p-8 text-white"
              style={{
                backgroundImage: 'linear-gradient(to bottom right, rgba(63, 80, 107, 0.9), rgba(118, 120, 124, 0.9)), url(../images/2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Conclusiones Clave</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-2">📊 Brecha Salarial Persistente</div>
                  <p className="text-blue-100">
                    Aunque ha disminuido en los últimos años, la brecha salarial sigue siendo 
                    significativa, especialmente en grupos de edad entre 35-54 años.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-2">👥 Distribución Equilibrada</div>
                  <p className="text-blue-100">
                    La distribución de población por género es relativamente equilibrada en todos 
                    los distritos de Barcelona, con ligera mayoría femenina.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="font-semibold mb-2">💼 Empleo y Género</div>
                  <p className="text-blue-100">
                    Las diferencias en tasas de desempleo entre géneros varían según la coyuntura 
                    económica, pero históricamente afectan más a las mujeres.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-blue-200">
                  <strong className="text-white">Fuentes:</strong> Open Data Barcelona - 
                  Datos de renta, población y empleo desagregados por sexo (2000-2025)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
} */