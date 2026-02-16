import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Globe, Calendar, ArrowRight, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useLanguage } from '../../i18n/LanguageContext';
import { generoTranslations } from '../../i18n/GeneroTranslations';

interface SalarioAnual {
  año: string;
  mujer: number;
  hombre: number;
  brecha: number;
  brechaPercentual: number;
}

interface SalarioPorEdad {
  edad: string;
  mujer: number;
  hombre: number;
  brecha: number;
}

interface SalarioExtranjeros {
  origen: string;
  mujer: number;
  hombre: number;
  brecha: number;
}

export function GeneroPage() {
  const { language } = useLanguage();
  const t = generoTranslations[language];
  
  const [scrollY, setScrollY] = useState(0);
  const [salarioAnual, setSalarioAnual] = useState<SalarioAnual[]>([]);
  const [salarioPorEdad, setSalarioPorEdad] = useState<SalarioPorEdad[]>([]);
  const [salarioExtranjeros, setSalarioExtranjeros] = useState<SalarioExtranjeros[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Cargar datos de salarios anuales
    fetch('/data/genero/sal-res-sex.csv')
      .then(r => r.text())
      .then(text => {
        const lines = text.split('\n');
        const años = lines[0].split(',').slice(1);
        const mujeres = lines[1].split(',').slice(1).map(v => parseFloat(v));
        const hombres = lines[2].split(',').slice(1).map(v => parseFloat(v));
        
        const datos: SalarioAnual[] = años.map((año, i) => {
          const mujer = mujeres[i];
          const hombre = hombres[i];
          const brecha = hombre - mujer;
          const brechaPercentual = ((brecha / hombre) * 100);
          
          return {
            año,
            mujer: Math.round(mujer),
            hombre: Math.round(hombre),
            brecha: Math.round(brecha),
            brechaPercentual: Math.round(brechaPercentual * 10) / 10
          };
        });
        
        setSalarioAnual(datos);
      })
      .catch(err => console.error('Error cargando sal-res-sex.csv:', err));

    // Cargar datos por edad (último año disponible - 2024)
    fetch('/data/genero/sal-sex-edad.csv')
      .then(r => r.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim());
        
        // La primera fila tiene años repetidos
        const añosFila = lines[0].split(',');
        // La segunda fila tiene rangos de edad
        const edadesFila = lines[1].split(',');
        // Tercera fila: mujeres
        const mujeresFila = lines[2].split(',');
        // Cuarta fila: hombres
        const hombresFila = lines[3].split(',');
        
        // Encontrar índices donde el año es 2024
        const indices2024: number[] = [];
        añosFila.forEach((año, i) => {
          if (año.trim() === '2024') {
            indices2024.push(i);
          }
        });
        
       // console.log('Índices 2024 encontrados:', indices2024);
        
        const datosPorEdad: SalarioPorEdad[] = [];
        
        indices2024.forEach(idx => {
          const edad = edadesFila[idx]?.trim() || '';
          const mujerSalario = parseFloat(mujeresFila[idx]?.trim() || '0');
          const hombreSalario = parseFloat(hombresFila[idx]?.trim() || '0');
          
          if (edad && edad !== 'Sexo' && !isNaN(mujerSalario) && !isNaN(hombreSalario)) {
            datosPorEdad.push({
              edad: edad.replace(' años', '').replace('años', ''),
              mujer: Math.round(mujerSalario),
              hombre: Math.round(hombreSalario),
              brecha: Math.round(hombreSalario - mujerSalario)
            });
          }
        });
        
        // console.log('Datos por edad procesados:', datosPorEdad);
        setSalarioPorEdad(datosPorEdad);
      })
      .catch(err => console.error('Error cargando sal-sex-edad.csv:', err));

    // Cargar datos de extranjeros (2024)
    fetch('/data/genero/Sal-ext-sexo-nac.csv')
      .then(r => r.text())
      .then(text => {
        const lines = text.split('\n');
        const headers = lines[1].split(',');
        const mujeres = lines[2].split(',');
        const hombres = lines[3].split(',');
        
        // Obtener últimos 4 valores (2024: UE, Resto Europa, América Latina, Resto mundo)
        const origenes = ['UE', 'Resto Europa', 'América Latina', 'Resto del mundo'];
        const datosExtranjeros: SalarioExtranjeros[] = origenes.map((origen, idx) => {
          const offset = headers.length - 4;
          const mujer = parseFloat(mujeres[offset + idx]);
          const hombre = parseFloat(hombres[offset + idx]);
          
          return {
            origen,
            mujer: Math.round(mujer),
            hombre: Math.round(hombre),
            brecha: Math.round(hombre - mujer)
          };
        });
        
        setSalarioExtranjeros(datosExtranjeros);
      })
      .catch(err => console.error('Error cargando Sal-ext-sexo-nac.csv:', err));
  }, []);

  const ultimoDato = salarioAnual[salarioAnual.length - 1];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">{payload[0].payload.año || payload[0].payload.edad}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <strong>{entry.name}:</strong> {entry.value.toLocaleString()}€
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="../images/2.webp" 
            alt="Barcelona background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-pink-800/85 to-purple-900/90"></div>
        </div>

        <div 
          className="absolute inset-0 opacity-10 z-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div 
          className="container mx-auto px-4 md:px-8 relative z-10"
          style={{
            transform: `translateY(${scrollY * -0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 600)
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed mb-8">
              {t.hero.subtitle}
            </p>
            
            {ultimoDato && (
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="text-pink-200 text-sm font-semibold mb-2">{t.hero.womenSalary}</div>
                  <div className="text-3xl font-bold text-white">{ultimoDato.mujer.toLocaleString()}€</div>
                  <div className="text-xs text-pink-100 mt-1">{t.hero.year}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="text-blue-200 text-sm font-semibold mb-2">{t.hero.menSalary}</div>
                  <div className="text-3xl font-bold text-white">{ultimoDato.hombre.toLocaleString()}€</div>
                  <div className="text-xs text-blue-100 mt-1">{t.hero.year}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="text-red-200 text-sm font-semibold mb-2">{t.hero.wageGap}</div>
                  <div className="text-3xl font-bold text-white">{ultimoDato.brechaPercentual}%</div>
                  <div className="text-xs text-red-100 mt-1">{ultimoDato.brecha.toLocaleString()}€ {t.hero.lessPerYear}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,40 L1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Evolución Temporal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.evolution.title}
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600">
                {t.evolution.subtitle}
              </p>
            </div>

            {salarioAnual.length > 0 && (
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="mb-8">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={salarioAnual}>
                      <defs>
                        <linearGradient id="colorMujer" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#992bc0" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#992bc0" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorHombre" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="año" stroke="#64748b" />
                      <YAxis stroke="#64748b" tickFormatter={(value) => `${value.toLocaleString()}€`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area type="monotone" dataKey="mujer" stroke="#992bc0" fillOpacity={1} fill="url(#colorMujer)" name="Mujeres" strokeWidth={3} />
                      <Area type="monotone" dataKey="hombre" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHombre)" name="Hombres" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 font-medium">{t.evolution.insights.gapEvolution.title}</div>
                        <div className="text-2xl font-bold text-slate-900">
                          {ultimoDato && `${ultimoDato.brechaPercentual}%`}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t.evolution.insights.gapEvolution.text}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 font-medium">{t.evolution.insights.annualDifference.title}</div>
                        <div className="text-2xl font-bold text-slate-900">
                          {ultimoDato && `${ultimoDato.brecha.toLocaleString()}€`}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {ultimoDato && t.evolution.insights.annualDifference.text
                        .replace('{amount}', ultimoDato.brecha.toLocaleString())
                        .replace('{monthly}', Math.round(ultimoDato.brecha / 12).toLocaleString())}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Brecha por Edad */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.byAge.title}
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600">
                {t.byAge.subtitle}
              </p>
            </div>

            {salarioPorEdad.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart data={salarioPorEdad}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="edad" stroke="#64748b" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `${value.toLocaleString()}€`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="mujer" fill="#992bc0" name="Mujeres" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="hombre" fill="#3b82f6" name="Hombres" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                    <div className="text-sm text-slate-600 font-medium mb-2">{t.byAge.stats.highest.title}</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {salarioPorEdad.reduce((max, item) => item.brecha > max.brecha ? item : max).edad}
                    </div>
                    <div className="text-sm text-slate-600">
                      {Math.round(salarioPorEdad.reduce((max, item) => item.brecha > max.brecha ? item : max).brecha).toLocaleString()}€ {t.byAge.stats.highest.difference}
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <div className="text-sm text-slate-600 font-medium mb-2">{t.byAge.stats.lowest.title}</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {salarioPorEdad.reduce((min, item) => item.brecha < min.brecha ? item : min).edad}
                    </div>
                    <div className="text-sm text-slate-600">
                      {Math.round(salarioPorEdad.reduce((min, item) => item.brecha < min.brecha ? item : min).brecha).toLocaleString()}€ {t.byAge.stats.lowest.difference}
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                    <div className="text-sm text-slate-600 font-medium mb-2">{t.byAge.stats.average.title}</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {Math.round(salarioPorEdad.reduce((sum, item) => sum + item.brecha, 0) / salarioPorEdad.length).toLocaleString()}€
                    </div>
                    <div className="text-sm text-slate-600">
                      {t.byAge.stats.average.allRanges}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <strong className="text-blue-900">{t.byAge.insight.title}</strong> {t.byAge.insight.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Salarios de Extranjeros */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.foreign.title}
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600">
                {t.foreign.subtitle}
              </p>
            </div>

            {salarioExtranjeros.length > 0 && (
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={salarioExtranjeros} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" tickFormatter={(value) => `${value.toLocaleString()}€`} />
                    <YAxis dataKey="origen" type="category" stroke="#64748b" width={150} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="mujer" fill="#992bc0" name="Mujeres" radius={[0, 8, 8, 0]} />
                    <Bar dataKey="hombre" fill="#3b82f6" name="Hombres" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-8 h-8 text-amber-600" />
                      <div className="text-lg font-bold text-slate-900">{t.foreign.insights.intersectionality.title}</div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t.foreign.insights.intersectionality.text}
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-8 h-8 text-cyan-600" />
                      <div className="text-lg font-bold text-slate-900">{t.foreign.insights.multipleInequality.title}</div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t.foreign.insights.multipleInequality.text}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conclusiones y Llamada a la Acción */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.conclusions.title}
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed mb-8">
              {t.conclusions.description}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <Calendar className="w-10 h-10 text-pink-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-2">{t.conclusions.stats.years.value}</div>
                <div className="text-sm text-purple-200">{t.conclusions.stats.years.label}</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <TrendingDown className="w-10 h-10 text-red-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-2">{t.conclusions.stats.gap.value}</div>
                <div className="text-sm text-purple-200">{t.conclusions.stats.gap.label}</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <Users className="w-10 h-10 text-blue-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-2">{t.conclusions.stats.affected.value}</div>
                <div className="text-sm text-purple-200">{t.conclusions.stats.affected.label}</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">{t.conclusions.actions.title}</h3>
              <div className="text-left space-y-3 text-purple-100">
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-300" />
                  <p>{t.conclusions.actions.transparency}</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-300" />
                  <p>{t.conclusions.actions.reconciliation}</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-300" />
                  <p>{t.conclusions.actions.sectors}</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-300" />
                  <p>{t.conclusions.actions.audits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}