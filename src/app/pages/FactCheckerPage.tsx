import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, Loader2, RefreshCw, Database, TrendingUp } from 'lucide-react';

const API_BASE = 'https://opendata-ajuntament.barcelona.cat/data/api/action';
const DATASET_ID = 'renda-disponible-llars-bcn';

interface DataPoint {
  barri: string;
  valor: number;
  any: string;
}

interface Dataset {
  name: string;
  data: Map<string, DataPoint[]>;
  loaded: boolean;
  error?: string;
}

export function FactCheckerPage() {
  const [datasets, setDatasets] = useState<{
    renda: Dataset;
  }>({
    renda: { name: 'Renda familiar', data: new Map(), loaded: false }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const normalizeBarriName = (name: string): string => {
    return name
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/^el\s+|^la\s+|^els\s+|^les\s+/i, '')
      .trim() || '';
  };

  const fetchWithRetry = async (url: string, retries = 3, delay = 2000): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(url, { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          return response;
        }
        
        if (response.status === 503 || response.status === 502) {
          console.log(`Reintent ${i + 1}/${retries} després d'error ${response.status}`);
          if (i < retries - 1) {
            await new Promise(r => setTimeout(r, delay * (i + 1)));
            continue;
          }
        }
        
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log(`Timeout en intent ${i + 1}/${retries}`);
        } else {
          console.log(`Error en intent ${i + 1}/${retries}:`, err.message);
        }
        
        if (i === retries - 1) {
          throw err;
        }
        
        await new Promise(r => setTimeout(r, delay * (i + 1)));
      }
    }
    
    throw new Error('Max retries reached');
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Obtenint metadades del dataset...');
      
      // Paso 1: Obtener los metadatos del dataset para encontrar los resource_ids
      const packageUrl = `${API_BASE}/package_show?id=${DATASET_ID}`;
      const packageResponse = await fetchWithRetry(packageUrl);
      const packageData = await packageResponse.json();
      
      if (!packageData.success) {
        throw new Error('No s\'han pogut obtenir les metadades del dataset');
      }
      
      console.log('✅ Metadades obtingudes');
      
      // Buscar recursos CSV con API habilitada
      const resources = packageData.result.resources.filter((r: any) => 
        r.format?.toLowerCase() === 'csv' && 
        r.datastore_active === true
      );
      
      if (resources.length === 0) {
        throw new Error('No s\'han trobat recursos CSV amb API habilitada');
      }
      
      console.log(`📦 Trobats ${resources.length} recursos disponibles`);
      
      // Intentar cargar el recurso más reciente (último por fecha o nombre)
      const sortedResources = resources.sort((a: any, b: any) => {
        // Intentar ordenar por año en el nombre
        const yearA = a.name?.match(/\d{4}/)?.[0] || '0';
        const yearB = b.name?.match(/\d{4}/)?.[0] || '0';
        return yearB.localeCompare(yearA);
      });
      
      let rendaData = null;
      let successfulResource = null;
      
      // Intentar cargar recursos hasta encontrar uno que funcione
      for (const resource of sortedResources) {
        try {
          console.log(`📥 Intentant carregar: ${resource.name} (${resource.id})`);
          
          const dataUrl = `${API_BASE}/datastore_search?resource_id=${resource.id}&limit=10000`;
          const dataResponse = await fetchWithRetry(dataUrl, 2, 1500);
          const data = await dataResponse.json();
          
          if (data.success && data.result?.records?.length > 0) {
            rendaData = data;
            successfulResource = resource;
            console.log(`✅ Dades carregades: ${resource.name}`);
            break;
          }
        } catch (err) {
          console.log(`⚠️ Error amb recurs ${resource.name}, provant següent...`);
          continue;
        }
      }
      
      if (!rendaData || !successfulResource) {
        throw new Error('No s\'han pogut carregar dades de cap dels recursos disponibles');
      }

      // Procesar datos de renda
      const records = rendaData.result.records;
      const fields = rendaData.result.fields;
      
      console.log('📊 Processant dades...');
      console.log('Camps disponibles:', fields.map((f: any) => f.id).join(', '));
      
      if (records.length > 0) {
        console.log('Exemple de registre:', records[0]);
      }
      
      // Buscar campos relevantes con mayor flexibilidad
      // IMPORTANTE: Priorizar Nom_Barri sobre Codi_Barri
      const barriField = fields.find((f: any) => {
        const id = f.id.toLowerCase();
        return id === 'nom_barri' || id.includes('nom_barri');
      })?.id || fields.find((f: any) => {
        const id = f.id.toLowerCase();
        return id.includes('neighborhood') || id === 'nom' || id === 'name';
      })?.id;
      
      const importField = fields.find((f: any) => {
        const id = f.id.toLowerCase();
        return id.includes('import') || id.includes('renda') || 
               id.includes('rdl') || id.includes('valor') || 
               id.includes('income');
      })?.id;
      
      const anyField = fields.find((f: any) => {
        const id = f.id.toLowerCase();
        return id.includes('any') || id.includes('año') || 
               id.includes('year') || id.includes('periode');
      })?.id;

      console.log('Camp barri:', barriField);
      console.log('Camp import:', importField);
      console.log('Camp any:', anyField);

      if (!barriField || !importField) {
        console.error('Camps disponibles:', fields);
        throw new Error(`Camps necessaris no trobats. Barri: ${barriField}, Import: ${importField}`);
      }

      const dataMap = new Map<string, DataPoint[]>();
      let processedCount = 0;
      let skippedCount = 0;
      let invalidBarriCount = 0;
      let invalidValorCount = 0;
      
      records.forEach((record: any) => {
        const barriOriginal = String(record[barriField] || '').trim();
        const barriNorm = normalizeBarriName(barriOriginal);
        
        if (!barriNorm || barriNorm.length < 3) {
          invalidBarriCount++;
          return;
        }
        
        const valorStr = String(record[importField] || '0').replace(/[^\d.-]/g, '');
        const valor = parseFloat(valorStr);
        
        if (isNaN(valor) || valor <= 0) {
          invalidValorCount++;
          return;
        }
        
        if (!dataMap.has(barriNorm)) {
          dataMap.set(barriNorm, []);
        }
        
        dataMap.get(barriNorm)!.push({
          barri: barriOriginal,
          valor: valor,
          any: anyField ? String(record[anyField]) : new Date().getFullYear().toString()
        });
        
        processedCount++;
      });
      
      console.log(`📈 Estadístiques processament:
        - Total registres: ${records.length}
        - Processats correctament: ${processedCount}
        - Barris invàlids: ${invalidBarriCount}
        - Valors invàlids: ${invalidValorCount}
        - Barris únics: ${dataMap.size}
      `);

      if (dataMap.size === 0) {
        throw new Error(`No s'han pogut processar les dades correctament. Barris invàlids: ${invalidBarriCount}, Valors invàlids: ${invalidValorCount}`);
      }

      // Consolidar datos por barrio (tomar el más reciente de cada barrio)
      dataMap.forEach((dataPoints, barriNorm) => {
        const sorted = dataPoints.sort((a, b) => {
          const yearA = parseInt(a.any) || 0;
          const yearB = parseInt(b.any) || 0;
          return yearB - yearA;
        });
        dataMap.set(barriNorm, [sorted[0]]);
      });

      setDatasets({
        renda: { 
          name: 'Renda familiar', 
          data: dataMap, 
          loaded: true 
        }
      });
      
      console.log(`✅ Processament completat: ${dataMap.size} barris, ${processedCount} registres`);
      console.log('Barris carregats:', Array.from(dataMap.keys()).slice(0, 10).join(', ') + '...');
      
      setLoading(false);

    } catch (err: any) {
      console.error('❌ Error carregant dades:', err);
      
      let errorMessage = 'Error desconegut al carregar les dades';
      
      if (err.message.includes('503') || err.message.includes('502')) {
        errorMessage = 'L\'API d\'Open Data Barcelona està temporalment no disponible (error 503/502). Això sol passar quan hi ha manteniment o massa trànsit. Torna a intentar-ho en uns minuts.';
      } else if (err.name === 'AbortError' || err.message.includes('timeout')) {
        errorMessage = 'La connexió amb l\'API ha trigat massa temps. Comprova la teva connexió a internet i torna a intentar-ho.';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = 'No s\'ha pogut connectar amb l\'API. Comprova la teva connexió a internet.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const verificarAfirmacion = async () => {
    if (!datasets.renda.loaded) {
      alert('Les dades no estan disponibles');
      return;
    }

    if (!claim.trim()) return;

    setVerifying(true);
    await new Promise(r => setTimeout(r, 300));

    const text = claim.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Buscar barrios mencionados
    const barrisFound: string[] = [];
    datasets.renda.data.forEach((_, barriNorm) => {
      const words = barriNorm.split(/\s+/);
      words.forEach(word => {
        if (word.length > 3 && text.includes(word)) {
          if (!barrisFound.includes(barriNorm)) {
            barrisFound.push(barriNorm);
          }
        }
      });
    });

    // Detectar tipo de pregunta
    const isTop = text.includes('top') || text.includes('ranking');
    const isMes = text.includes('mes') || text.includes('mas') || text.includes('rica') || text.includes('rico') || text.includes('alta');
    const isMenys = text.includes('menys') || text.includes('menos') || text.includes('pobre') || text.includes('baixa');
    const isQuant = text.includes('quant') || text.includes('cuant');
    const isCompara = text.includes('compara') || text.includes('vs') || (barrisFound.length >= 2);

    let verdict = null;

    // Obtener todos los datos
    const allData: DataPoint[] = [];
    datasets.renda.data.forEach((dataPoints) => {
      const latest = dataPoints.sort((a, b) => parseInt(b.any) - parseInt(a.any))[0];
      if (latest) allData.push(latest);
    });

    // CASO 1: Top/Ranking
    if (isTop || ((isMes || isMenys) && barrisFound.length === 0)) {
      const sorted = isMenys 
        ? allData.sort((a, b) => a.valor - b.valor)
        : allData.sort((a, b) => b.valor - a.valor);
      
      verdict = {
        tipo: 'true',
        titulo: isMenys ? 'TOP 5 RENDES MÉS BAIXES' : 'TOP 5 RENDES MÉS ALTES',
        explicacion: `Classificació de ${allData.length} barris segons renda familiar disponible per càpita.`,
        datos: sorted.slice(0, 5)
      };
    }
    
    // CASO 2: Un barrio específico
    else if (barrisFound.length === 1) {
      const barriData = datasets.renda.data.get(barrisFound[0]);
      if (barriData) {
        const data = barriData.sort((a, b) => parseInt(b.any) - parseInt(a.any))[0];
        const sorted = allData.sort((a, b) => b.valor - a.valor);
        const position = sorted.findIndex(d => normalizeBarriName(d.barri) === barrisFound[0]) + 1;
        
        verdict = {
          tipo: 'true',
          titulo: 'DADES VERIFICADES',
          explicacion: `${data.barri} té una renda de ${data.valor.toLocaleString('ca-ES')}€ per càpita (${data.any}). Posició: #${position} de ${allData.length} barris.`,
          datos: [data]
        };
      } else {
        verdict = {
          tipo: 'false',
          titulo: 'BARRI NO TROBAT',
          explicacion: `No s'han trobat dades per aquest barri. Prova amb: ${Array.from(datasets.renda.data.keys()).slice(0, 5).join(', ')}.`,
          datos: []
        };
      }
    }
    
    // CASO 3: Comparación
    else if (isCompara && barrisFound.length >= 2) {
      const comparisons = barrisFound
        .map(bn => {
          const dataPoints = datasets.renda.data.get(bn);
          return dataPoints ? dataPoints.sort((a, b) => parseInt(b.any) - parseInt(a.any))[0] : null;
        })
        .filter(d => d !== null);
      
      if (comparisons.length >= 2) {
        const sorted = comparisons.sort((a: any, b: any) => b.valor - a.valor);
        const diff = sorted[0].valor - sorted[sorted.length - 1].valor;
        
        verdict = {
          tipo: 'true',
          titulo: 'COMPARACIÓ',
          explicacion: `${sorted[0].barri} (${sorted[0].valor.toLocaleString('ca-ES')}€) vs ${sorted[sorted.length-1].barri} (${sorted[sorted.length-1].valor.toLocaleString('ca-ES')}€). Diferència: ${diff.toLocaleString('ca-ES')}€.`,
          datos: sorted
        };
      }
    }
    
    // CASO por defecto
    else {
      const sorted = allData.sort((a, b) => a.valor - b.valor);
      verdict = {
        tipo: 'partially',
        titulo: 'SUGGERIMENT',
        explicacion: `Aquí tens els 5 barris amb renda més baixa. Prova preguntes com: "Quin barri és més ric?", "Compara Gràcia amb Sarrià", "Top 5 més pobres".`,
        datos: sorted.slice(0, 5)
      };
    }

    setResult(verdict);
    setVerifying(false);
  };

  const examples = [
    'Quin barri té més renda?',
    'El Raval és el més pobre?',
    'Compara Gràcia amb Sarrià',
    'Quina renda té Eixample?',
    'Top 5 barris més rics',
    'Barris amb menys renda'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Carregant dades oficials...</h2>
          <p className="text-gray-600 mb-2">Connectant amb API d'Open Data Barcelona</p>
          <p className="text-sm text-gray-500">Obtenint metadades i dades reals del portal</p>
          <p className="text-xs text-gray-400 mt-3">Això pot trigar fins a 30 segons</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Error carregant dades</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-yellow-900 mb-2">Possibles causes</h3>
            <ul className="text-sm text-yellow-800 space-y-1 ml-4">
              <li>• L'API d'Open Data Barcelona està en manteniment</li>
              <li>• Hi ha massa trànsit simultani al servidor</li>
              <li>• Problemes temporals de connectivitat</li>
              <li>• Timeout de connexió</li>
            </ul>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-bold text-gray-900">Solucions:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span><strong>Espera 5-10 minuts</strong> i torna a carregar la pàgina</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span>Comprova l'estat de l'API: <a href="https://opendata-ajuntament.barcelona.cat" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">opendata-ajuntament.barcelona.cat</a></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <span>Verifica la teva connexió a internet</span>
              </div>
            </div>
          </div>

          <button
            onClick={loadData}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Tornar a intentar
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Aquest verificador utilitza dades 100% reals de l'API oficial d'Open Data Barcelona
          </p>
        </div>
      </div>
    );
  }

  const totalBarris = datasets.renda.data.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Verificador de Renda per Barris</h1>
          <p className="text-xl text-gray-600 mb-4">Barcelona - Dades Oficials</p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Connectat amb Open Data Barcelona
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {totalBarris} barris • 100% dades reals • Renda familiar per càpita
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && claim && verificarAfirmacion()}
              placeholder="Fes una pregunta sobre renda per barris..."
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              onClick={verificarAfirmacion}
              disabled={!claim || verifying}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center gap-2 transition-colors"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verificant...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Verificar
                </>
              )}
            </button>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">💡 Exemples de preguntes:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setClaim(ex)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-sm rounded-lg transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 ${
            result.tipo === 'true' ? 'border-green-500' : 
            result.tipo === 'false' ? 'border-red-500' : 'border-yellow-500'
          }`}>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                {result.tipo === 'true' && <CheckCircle className="w-12 h-12 text-green-500" />}
                {result.tipo === 'false' && <XCircle className="w-12 h-12 text-red-500" />}
                {result.tipo === 'partially' && <AlertTriangle className="w-12 h-12 text-yellow-500" />}
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{result.titulo}</h2>
                <p className="text-gray-600 italic border-l-2 border-gray-300 pl-3">"{claim}"</p>
              </div>
            </div>

            <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <p className="text-lg text-gray-800 leading-relaxed">{result.explicacion}</p>
            </div>

            {result.datos && result.datos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Dades oficials (€/any per càpita):
                </h3>
                <div className="space-y-2">
                  {result.datos.map((d: DataPoint, i: number) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <span className="font-medium text-gray-900">{i + 1}. {d.barri}</span>
                        <span className="text-xs text-gray-500 ml-2">(any {d.any})</span>
                      </div>
                      <span className="text-blue-600 font-bold text-lg">
                        {d.valor.toLocaleString('ca-ES')} €
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Font:</strong> API Open Data Barcelona - Dataset: {DATASET_ID}
              </p>
              <a 
                href={`https://opendata-ajuntament.barcelona.cat/data/ca/dataset/${DATASET_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
              >
                Veure dataset complet →
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-3">ℹSobre aquest verificador</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>Dades 100% reals de l'API oficial d'Open Data Barcelona</p>
            <p>{totalBarris} barris de Barcelona amb dades de renda familiar</p>
            <p>Renda familiar disponible per càpita (€/any)</p>
            <p>Les dades es carreguen directament de l'API cada vegada</p>
            <p>Utilitza els endpoints oficials: package_show i datastore_search</p>
          </div>
        </div>

      </div>
    </div>
  );
}