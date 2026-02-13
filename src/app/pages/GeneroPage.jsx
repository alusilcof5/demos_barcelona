import { useMemo } from 'react';
import { useBarris } from '../hooks/useBarris';
import { getGenderInequalityStats } from '../core/vulnerability';
import { TrendingUp, TrendingDown, Users, DollarSign, Briefcase, AlertCircle, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

export function GeneroPage() {
  const { barrisWithVulnerability, isLoading } = useBarris();

  // Calcular estadísticas de género
  const genderStats = useMemo(() => {
    if (barrisWithVulnerability.length === 0) return null;
    return getGenderInequalityStats(barrisWithVulnerability);
  }, [barrisWithVulnerability]);

  // Preparar datos para gráficos
  const topBrechasSalariales = useMemo(() => {
    return [...barrisWithVulnerability]
      .sort((a, b) => b.renda_per_sexe.brecha_percentual - a.renda_per_sexe.brecha_percentual)
      .slice(0, 10)
      .map(b => ({
        barri: b.nom.length > 20 ? b.nom.substring(0, 17) + '...' : b.nom,
        brecha: b.renda_per_sexe.brecha_percentual,
        renda_dones: b.renda_per_sexe.dones,
        renda_homes: b.renda_per_sexe.homes
      }));
  }, [barrisWithVulnerability]);

  const scatterData = useMemo(() => {
    return barrisWithVulnerability.map(b => ({
      nom: b.nom,
      brecha_salarial: b.renda_per_sexe.brecha_percentual,
      brecha_empleo: Math.abs(b.atur_per_sexe.diferencia_puntos),
      vulnerability: b.vulnerability_score * 100
    }));
  }, [barrisWithVulnerability]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregant dades de gènere...</p>
        </div>
      </div>
    );
  }

  if (!genderStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Error carregant les dades</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <section 
        className="py-16"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(219, 39, 119, 0.9), rgba(147, 51, 234, 0.9)), url(../images/4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Perspectiva de Gènere</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Bretxa de Gènere a Barcelona
            </h1>
            <p className="text-xl text-pink-100 text-center mb-8">
              Dades desagregades per sexe per combatre la desinformació i visibilitzar desigualtats
            </p>

            {/* Badges de transparencia */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Dades Verificables</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Open Data BCN</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-sm text-white">CC BY 4.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas clave */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Desigualtats a Barcelona en Xifres
              </h2>
              <p className="text-gray-600">
                Dades objectives per una democràcia transparent
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Brecha Salarial */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-red-700 font-medium">BRETXA SALARIAL MITJANA</div>
                  </div>
                </div>
                <div className="text-5xl font-bold text-red-700 mb-2">
                  {genderStats.brecha_salarial.media.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Les dones guanyen de mitjana un <strong>{genderStats.brecha_salarial.media.toFixed(1)}%</strong> menys que els homes a Barcelona
                </p>
                <div className="mt-4 pt-4 border-t border-red-200">
                  <div className="text-xs text-red-600 font-medium mb-1">RANG</div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Mín: {genderStats.brecha_salarial.min.toFixed(1)}%</span>
                    <span>Màx: {genderStats.brecha_salarial.max.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Brecha Empleo */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-orange-700 font-medium">BRETXA D'OCUPACIÓ</div>
                  </div>
                </div>
                <div className="text-5xl font-bold text-orange-700 mb-2">
                  +{genderStats.brecha_empleo.media.toFixed(1)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Punts percentuals més d'atur femení respecte al masculí
                </p>
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <div className="text-xs text-orange-600 font-medium mb-1">RANG</div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Mín: {genderStats.brecha_empleo.min.toFixed(1)}pp</span>
                    <span>Màx: {genderStats.brecha_empleo.max.toFixed(1)}pp</span>
                  </div>
                </div>
              </div>

              {/* Barrios con mayor desigualdad */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-700 font-medium">BARRIS CRÍTICS</div>
                  </div>
                </div>
                <div className="text-5xl font-bold text-purple-700 mb-2">
                  {barrisWithVulnerability.filter(b => b.renda_per_sexe.brecha_percentual > 20).length}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Barris amb bretxa salarial superior al 20%
                </p>
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <div className="text-xs text-purple-600 font-medium mb-2">BARRIS AMB MÉS BRETXA</div>
                  <div className="space-y-1">
                    {genderStats.brecha_salarial.barrios_mayor_brecha.slice(0, 3).map((b, idx) => (
                      <div key={idx} className="text-xs text-gray-700 flex justify-between">
                        <span className="truncate">{b.nom}</span>
                        <span className="font-medium text-purple-700">{b.brecha.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gráfico: Top 10 Brechas Salariales */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Barris amb Major Bretxa Salarial
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Diferència percentual entre renda d'homes i dones
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700 font-medium">Dades Verificables</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topBrechasSalariales} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Bretxa (%)', position: 'insideBottom', offset: -5 }} />
                  <YAxis dataKey="barri" type="category" width={150} />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'brecha') return [`${value.toFixed(1)}%`, 'Bretxa Salarial'];
                      return [value, name];
                    }}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="brecha" fill="#dc2626" name="Bretxa Salarial (%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">💡 Com s'interpreta?</p>
                    <p>
                      Una bretxa del {topBrechasSalariales[0]?.brecha.toFixed(1)}% significa que a {topBrechasSalariales[0]?.barri}, 
                      les dones guanyen {topBrechasSalariales[0]?.brecha.toFixed(1)}€ menys per cada 100€ que guanyen els homes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gráfico de Dispersión: Brecha Salarial vs Brecha de Empleo */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Relació entre Bretxa Salarial i Bretxa d'Ocupació
              </h3>

              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="brecha_salarial" 
                    name="Bretxa Salarial (%)" 
                    label={{ value: 'Bretxa Salarial (%)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="brecha_empleo" 
                    name="Bretxa Ocupació (pp)" 
                    label={{ value: 'Bretxa Ocupació (pp)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                            <p className="font-bold text-gray-900 mb-2">{data.nom}</p>
                            <p className="text-sm text-gray-700">Bretxa Salarial: <strong>{data.brecha_salarial.toFixed(1)}%</strong></p>
                            <p className="text-sm text-gray-700">Bretxa Ocupació: <strong>{data.brecha_empleo.toFixed(1)}pp</strong></p>
                            <p className="text-sm text-gray-700">Vulnerabilitat: <strong>{data.vulnerability.toFixed(1)}%</strong></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    name="Barris" 
                    data={scatterData} 
                    fill="#ec4899"
                    fillOpacity={0.6}
                  />
                </ScatterChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-900">
                  <strong>Interpretació:</strong> Aquest gràfic mostra si hi ha relació entre les desigualtats salarials 
                  i les desigualtats en l'accés a l'ocupació. Cada punt representa un barri de Barcelona.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metodología y Fuentes */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
                Metodologia i Fonts de Dades
              </h3>

              <div className="space-y-6">
                
                {/* Fuentes */}
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-3">📊 Fonts Oficials</h4>
                  <div className="space-y-3">
                    <a 
                      href="https://opendata-ajuntament.barcelona.cat/data/dataset/renda-sexe-barri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-all group"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                      <div>
                        <div className="font-medium text-gray-900">Renda Familiar per Sexe</div>
                        <div className="text-sm text-gray-600">Open Data BCN - Actualitzat 15/12/2024</div>
                      </div>
                    </a>

                    <a 
                      href="https://opendata-ajuntament.barcelona.cat/data/dataset/atur-sexe-barri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-all group"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                      <div>
                        <div className="font-medium text-gray-900">Atur Registrat per Sexe</div>
                        <div className="text-sm text-gray-600">Open Data BCN - Actualitzat 31/01/2026</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Cálculos */}
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-3">🧮 Càlculs</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 font-mono text-sm">
                    <div>
                      <strong className="text-gray-900">Bretxa Salarial:</strong>
                      <code className="block mt-1 text-purple-700 ml-4">
                        (Renda_Homes - Renda_Dones) / Renda_Homes × 100
                      </code>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <strong className="text-gray-900">Bretxa d'Ocupació:</strong>
                      <code className="block mt-1 text-purple-700 ml-4">
                        Atur_Dones - Atur_Homes
                      </code>
                    </div>
                  </div>
                </div>

                {/* Licencia */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <strong className="text-green-900">Dades Obertes - CC BY 4.0</strong>
                  </div>
                  <p className="text-sm text-green-800">
                    Tots els càlculs són verificables i reproduïbles. Les dades són públiques i 
                    poden ser utilitzades lliurement amb atribució.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Exportar datos */}
      <section className="py-12 bg-gradient-to-br from-pink-600 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Descarrega les Dades
            </h3>
            <p className="text-xl mb-8 text-pink-100">
              Dataset complet amb tots els indicadors de gènere per barri
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl">
              <Download className="w-5 h-5" />
              Exportar Dataset de Gènere (JSON)
            </button>
            <p className="text-sm text-pink-200 mt-4">
              Format obert per entrenar models d'IA responsables
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}