import { useState, useEffect } from 'react';
import { 
  Search, CheckCircle, XCircle, AlertTriangle, Loader2, RefreshCw, 
  Database, Info, BarChart3, HelpCircle, Lightbulb
} from 'lucide-react';
import { verificadorEs } from '../i18n/FactCheckerTranslation';

const API_BASE = 'https://opendata-ajuntament.barcelona.cat/data/api/action';
const DATASET_ID = 'renda-disponible-llars-bcn';

interface DataPoint {
  barri: string;
  valor: number;
  any: string;
  distrito?: string;
}

interface Dataset {
  name: string;
  data: Map<string, DataPoint[]>;
  loaded: boolean;
  error?: string;
  metadata?: {
    total_barrios: number;
    anyo_mas_reciente: string;
    renda_promedio: number;
    renda_maxima: number;
    renda_minima: number;
  };
}

interface VerificationResult {
  tipo: 'true' | 'false' | 'partially';
  titulo: string;
  explicacion: string;
  datos: DataPoint[];
  confianza?: number;
  fuente?: string;
}

export default function FactCheckerBarcelona() {
  const [datasets, setDatasets] = useState<{ renda: Dataset }>({
    renda: { name: 'Renda familiar', data: new Map(), loaded: false }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  // Normalizar nombres de barrios
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
        setLoadingProgress(Math.floor((i / retries) * 50));
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        const response = await fetch(url, { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'FactCheckerBarcelona/1.0'
          },
          mode: 'cors'
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          setLoadingProgress(100);
          return response;
        }
        
        if (response.status === 503 || response.status === 502 || response.status === 500) {
          console.log(`Reintento ${i + 1}/${retries} después de error ${response.status}`);
          if (i < retries - 1) {
            await new Promise(r => setTimeout(r, delay * (i + 1)));
            continue;
          }
        }
        
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log(`Timeout en intento ${i + 1}/${retries}`);
        } else {
          console.log(`Error en intento ${i + 1}/${retries}:`, err.message);
        }
        
        if (i === retries - 1) {
          throw err;
        }
        
        await new Promise(r => setTimeout(r, delay * (i + 1)));
      }
    }
    
    throw new Error('Max retries alcanzado');
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      setLoadingProgress(0);
      
      console.log('Obteniendo metadatos del dataset...');
      
      // Paso 1: Obtener metadatos
      const packageUrl = `${API_BASE}/package_show?id=${DATASET_ID}`;
      setLoadingProgress(10);
      const packageResponse = await fetchWithRetry(packageUrl);
      const packageData = await packageResponse.json();
      
      if (!packageData.success) {
        throw new Error('No se pudieron obtener los metadatos del dataset');
      }
      
      console.log('Metadatos obtenidos');
      setLoadingProgress(30);
      
      const resources = packageData.result.resources.filter((r: any) => 
        r.format?.toLowerCase() === 'csv' && 
        r.datastore_active === true
      );
      
      if (resources.length === 0) {
        throw new Error('No se encontraron recursos CSV con API habilitada');
      }
      
      console.log(`Encontrados ${resources.length} recursos disponibles`);
      setLoadingProgress(40);

      const sortedResources = resources.sort((a: any, b: any) => {
        const yearA = a.name?.match(/\d{4}/)?.[0] || '0';
        const yearB = b.name?.match(/\d{4}/)?.[0] || '0';
        return yearB.localeCompare(yearA);
      });
      
      let rendaData = null;
      let successfulResource = null;
      
      for (const resource of sortedResources) {
        try {
          console.log(`Intentando cargar: ${resource.name} (${resource.id})`);
          setLoadingProgress(50 + (sortedResources.indexOf(resource) / sortedResources.length) * 30);
          
          const dataUrl = `${API_BASE}/datastore_search?resource_id=${resource.id}&limit=10000`;
          const dataResponse = await fetchWithRetry(dataUrl, 2, 1500);
          const data = await dataResponse.json();
          
          if (data.success && data.result?.records?.length > 0) {
            rendaData = data;
            successfulResource = resource;
            console.log(`Datos cargados: ${resource.name}`);
            break;
          }
        } catch (err) {
          console.log(`Error con recurso ${resource.name}, probando siguiente...`);
          continue;
        }
      }
      
      if (!rendaData || !successfulResource) {
        throw new Error('No se pudieron cargar datos de ninguno de los recursos disponibles');
      }

      setLoadingProgress(80);

      // Procesar datos
      const records = rendaData.result.records;
      const fields = rendaData.result.fields;
      
      console.log('Procesando datos...');
      console.log('Campos disponibles:', fields.map((f: any) => f.id).join(', '));
      
      const barriField = fields.find((f: any) => {
        const id = f.id;
        return id === 'Nom_Barri'; 
      })?.id || fields.find((f: any) => {
        const id = f.id.toLowerCase();
        return id.includes('nom') && id.includes('barri');
      })?.id;
      
      const importField = fields.find((f: any) => {
        const id = f.id;
        return id === 'Import_Euros';
      })?.id || fields.find((f: any) => {
        const id = f.id.toLowerCase();
        return id.includes('import') || id.includes('renda') || id.includes('rfd');
      })?.id;
      
      const anyField = fields.find((f: any) => {
        const id = f.id;
        return id === 'Any';
      })?.id || fields.find((f: any) => {
        const id = f.id.toLowerCase();
        return id.includes('any') || id.includes('año') || id.includes('year');
      })?.id;

      console.log('Campo barrio:', barriField);
      console.log('Campo importe:', importField);
      console.log('Campo año:', anyField);

      if (!barriField || !importField) {
        console.error('Campos disponibles:', fields.map((f: any) => f.id));
        throw new Error(`Campos necesarios no encontrados. Barrio: ${barriField}, Importe: ${importField}`);
      }

      const dataMap = new Map<string, DataPoint[]>();
      let processedCount = 0;
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
      
      console.log(`Estadísticas procesamiento:
        - Total registros: ${records.length}
        - Procesados correctamente: ${processedCount}
        - Barrios inválidos: ${invalidBarriCount}
        - Valores inválidos: ${invalidValorCount}
        - Barrios únicos: ${dataMap.size}
      `);

      if (dataMap.size === 0) {
        throw new Error(`No se pudieron procesar los datos correctamente. Barrios inválidos: ${invalidBarriCount}, Valores inválidos: ${invalidValorCount}`);
      }

      setLoadingProgress(90);

      dataMap.forEach((dataPoints, barriNorm) => {
        const sorted = dataPoints.sort((a, b) => {
          const yearA = parseInt(a.any) || 0;
          const yearB = parseInt(b.any) || 0;
          return yearB - yearA;
        });
        dataMap.set(barriNorm, [sorted[0]]);
      });

      const allData: DataPoint[] = [];
      dataMap.forEach((dataPoints) => {
        if (dataPoints[0]) allData.push(dataPoints[0]);
      });

      const valores = allData.map(d => d.valor);
      const metadata = {
        total_barrios: dataMap.size,
        anyo_mas_reciente: Math.max(...allData.map(d => parseInt(d.any) || 0)).toString(),
        renda_promedio: Math.round(valores.reduce((sum, v) => sum + v, 0) / valores.length),
        renda_maxima: Math.max(...valores),
        renda_minima: Math.min(...valores)
      };

      setDatasets({
        renda: { 
          name: 'Renda familiar', 
          data: dataMap, 
          loaded: true,
          metadata 
        }
      });
      
      console.log(`Procesamiento completado: ${dataMap.size} barrios, ${processedCount} registros`);
      console.log('Metadata:', metadata);
      
      setLoadingProgress(100);
      setLoading(false);

    } catch (err: any) {
      console.error('❌ Error cargando datos:', err);
      
      let errorMessage = 'Error desconocido al cargar los datos';
      
      if (err.message.includes('503') || err.message.includes('502') || err.message.includes('500')) {
        errorMessage = 'La API de Open Data Barcelona está temporalmente no disponible. Esto suele ocurrir durante mantenimiento o mucho tráfico. Vuelve a intentarlo en unos minutos.';
      } else if (err.name === 'AbortError' || err.message.includes('timeout')) {
        errorMessage = 'La conexión con la API ha tardado demasiado tiempo. Comprueba tu conexión a internet y vuelve a intentarlo.';
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'No se pudo conectar con la API. Comprueba tu conexión a internet o verifica que la API esté disponible.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
      setLoadingProgress(0);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const levenshteinDistance = (str1: string, str2: string): number => {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator,
        );
      }
    }
    return track[str2.length][str1.length];
  };

  // Verificar afirmación mejorado
  const verificarAfirmacion = async () => {
    if (!datasets.renda.loaded) {
      alert('Los datos no están disponibles');
      return;
    }

    if (!claim.trim()) return;

    setVerifying(true);
    await new Promise(r => setTimeout(r, 300));

    const text = claim.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
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

    const isTop = text.includes('top') || text.includes('ranking');
    const isMes = text.includes('mes') || text.includes('mas') || text.includes('rica') || text.includes('rico') || text.includes('alta') || text.includes('major');
    const isMenys = text.includes('menys') || text.includes('menos') || text.includes('pobre') || text.includes('baixa') || text.includes('menor');
    const isCompara = text.includes('compara') || text.includes('vs') || text.includes('versus') || (barrisFound.length >= 2);
    const isPromedio = text.includes('promedio') || text.includes('media') || text.includes('mitjana') || text.includes('average');

    let verdict: VerificationResult | null = null;

    const allData: DataPoint[] = [];
    datasets.renda.data.forEach((dataPoints) => {
      const latest = dataPoints.sort((a, b) => parseInt(b.any) - parseInt(a.any))[0];
      if (latest) allData.push(latest);
    });

    const metadata = datasets.renda.metadata!;

    if (isTop || ((isMes || isMenys) && barrisFound.length === 0)) {
      const sorted = isMenys 
        ? allData.sort((a, b) => a.valor - b.valor)
        : allData.sort((a, b) => b.valor - a.valor);
      
      verdict = {
        tipo: 'true',
        titulo: isMenys ? 'TOP 5 RENTAS MÁS BAJAS' : 'TOP 5 RENTAS MÁS ALTAS',
        explicacion: `Clasificación de ${allData.length} barrios según renta familiar disponible per cápita. Los datos son del año ${metadata.anyo_mas_reciente} del portal Open Data Barcelona.`,
        datos: sorted.slice(0, 5),
        confianza: 100,
        fuente: `Open Data Barcelona - ${DATASET_ID}`
      };
    }
    
    else if (isPromedio && barrisFound.length === 0) {
      verdict = {
        tipo: 'true',
        titulo: 'RENTA MEDIA DE BARCELONA',
        explicacion: `La renta media de Barcelona es de ${metadata.renda_promedio.toLocaleString()}€ per cápita (año ${metadata.anyo_mas_reciente}). El barrio con mayor renta tiene ${metadata.renda_maxima.toLocaleString()}€ y el de menor renta ${metadata.renda_minima.toLocaleString()}€.`,
        datos: allData.slice(0, 3).sort((a, b) => Math.abs(a.valor - metadata.renda_promedio) - Math.abs(b.valor - metadata.renda_promedio)),
        confianza: 100,
        fuente: `Open Data Barcelona - ${DATASET_ID}`
      };
    }
    
    else if (barrisFound.length === 1) {
      const barriData = datasets.renda.data.get(barrisFound[0]);
      if (barriData) {
        const data = barriData.sort((a, b) => parseInt(b.any) - parseInt(a.any))[0];
        const sorted = allData.sort((a, b) => b.valor - a.valor);
        const position = sorted.findIndex(d => normalizeBarriName(d.barri) === barrisFound[0]) + 1;
        
        const difPromedio = data.valor - metadata.renda_promedio;
        const porcPromedio = ((difPromedio / metadata.renda_promedio) * 100).toFixed(1);
        const comparacion = difPromedio > 0 
          ? `${Math.abs(parseFloat(porcPromedio))}% por encima de la media`
          : `${Math.abs(parseFloat(porcPromedio))}% por debajo de la media`;
        
        verdict = {
          tipo: 'true',
          titulo: 'DATOS VERIFICADOS',
          explicacion: `${data.barri} tiene una renta de ${data.valor.toLocaleString('es-ES')}€ per cápita (${data.any}). Posición: #${position} de ${allData.length} barrios. Esto es ${comparacion} de Barcelona.`,
          datos: [data],
          confianza: 100,
          fuente: `Open Data Barcelona - ${DATASET_ID}`
        };
      } else {
        const similares = Array.from(datasets.renda.data.keys())
          .map(k => ({ key: k, dist: levenshteinDistance(barrisFound[0], k) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3)
          .map(s => datasets.renda.data.get(s.key)![0].barri);
        
        verdict = {
          tipo: 'false',
          titulo: 'BARRIO NO ENCONTRADO',
          explicacion: `No se encontraron datos para este barrio. ¿Quizás quisiste decir: ${similares.join(', ')}?`,
          datos: [],
          confianza: 0,
          fuente: `Open Data Barcelona - ${DATASET_ID}`
        };
      }
    }
    
    else if (isCompara && barrisFound.length >= 2) {
      const comparisons = barrisFound
        .map(bn => {
          const dataPoints = datasets.renda.data.get(bn);
          return dataPoints ? dataPoints.sort((a, b) => parseInt(b.any) - parseInt(a.any))[0] : null;
        })
        .filter(d => d !== null) as DataPoint[];
      
      if (comparisons.length >= 2) {
        const sorted = comparisons.sort((a, b) => b.valor - a.valor);
        const diff = sorted[0].valor - sorted[sorted.length - 1].valor;
        const diffPercent = ((diff / sorted[sorted.length - 1].valor) * 100).toFixed(1);
        
        verdict = {
          tipo: 'true',
          titulo: 'COMPARACIÓN VERIFICADA',
          explicacion: `${sorted[0].barri} tiene ${sorted[0].valor.toLocaleString('es-ES')}€ vs ${sorted[sorted.length-1].barri} con ${sorted[sorted.length-1].valor.toLocaleString('es-ES')}€. Diferencia: ${diff.toLocaleString('es-ES')}€ (${diffPercent}% más).`,
          datos: sorted,
          confianza: 100,
          fuente: `Open Data Barcelona - ${DATASET_ID}`
        };
      }
    }
    
    else {
      const sorted = allData.sort((a, b) => a.valor - b.valor);
      verdict = {
        tipo: 'partially',
        titulo: 'SUGERENCIA - PRUEBA ESTAS PREGUNTAS',
        explicacion: `No pude entender la pregunta exactamente. Aquí están los 5 barrios con renta más baja. Prueba preguntas como: "¿Qué barrio es más rico?", "Compara Gràcia con Sarrià", "Top 5 más pobres", "¿Cuál es la renta media?"`,
        datos: sorted.slice(0, 5),
        confianza: 50,
        fuente: `Open Data Barcelona - ${DATASET_ID}`
      };
    }

    setResult(verdict);
    setVerifying(false);
  };

  const examples = [
    '¿Qué barrio tiene más renta?',
    '¿El Raval es el más pobre?',
    'Compara Gràcia con Sarrià',
    '¿Cuál es la renta de Eixample?',
    'Top 5 barrios más ricos',
    'Barrios con menos renta',
    '¿Cuál es la renta media de Barcelona?',
    '¿Qué barrio está más cerca de la media?'
  ];

  const quickStats = datasets.renda.loaded && datasets.renda.metadata ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <div className="text-sm text-blue-700 font-medium mb-1">Barrios</div>
        <div className="text-2xl font-bold text-blue-900">{datasets.renda.metadata.total_barrios}</div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <div className="text-sm text-green-700 font-medium mb-1">Media BCN</div>
        <div className="text-xl font-bold text-green-900">{datasets.renda.metadata.renda_promedio.toLocaleString()}€</div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <div className="text-sm text-purple-700 font-medium mb-1">Máxima</div>
        <div className="text-xl font-bold text-purple-900">{datasets.renda.metadata.renda_maxima.toLocaleString()}€</div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
        <div className="text-sm text-orange-700 font-medium mb-1">Mínima</div>
        <div className="text-xl font-bold text-orange-900">{datasets.renda.metadata.renda_minima.toLocaleString()}€</div>
      </div>
    </div>
  ) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Cargando datos oficiales...</h2>
          <p className="text-gray-600 mb-2">Conectando con API de Open Data Barcelona</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{loadingProgress}%</p>
          <p className="text-xs text-gray-400 mt-3">Esto puede tardar hasta 30 segundos</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Error cargando datos</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-yellow-900 mb-2">Posibles causas:</h3>
            <ul className="text-sm text-yellow-800 space-y-1 ml-4">
              <li>• La API de Open Data Barcelona está en mantenimiento</li>
              <li>• Hay demasiado tráfico simultáneo en el servidor</li>
              <li>• Problemas temporales de conectividad</li>
              <li>• Timeout de conexión</li>
            </ul>
          </div>

          <button
            onClick={loadData}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Reintentar
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Este verificador utiliza datos 100% reales de la API oficial de Open Data Barcelona
          </p>
        </div>
      </div>
    );
  }

  const totalBarris = datasets.renda.data.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Verificador de renta por barrios de Barcelona
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">Barcelona - Datos Oficiales</p>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
              Conectado con Open Data Barcelona
            </div>
            
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              {showHelp ? 'Ocultar ayuda' : 'Mostrar ayuda'}
            </button>
          </div>
          
          <p className="text-xs text-gray-600 mt-2">
            {totalBarris} barrios • 100% datos reales • Renta familiar per cápita • Año {datasets.renda.metadata?.anyo_mas_reciente}
          </p>
        </div>

        {showHelp && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 text-lg mb-3">Cómo usar el verificador</h3>
                <div className="space-y-2 text-sm text-blue-900">
                  <p><strong>✓ Tipos de preguntas que puedes hacer:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• "¿Qué barrio tiene más/menos renta?"</li>
                    <li>• "Top 5 barrios más ricos/pobres"</li>
                    <li>• "¿Cuál es la renta de [nombre del barrio]?"</li>
                    <li>• "Compara [barrio 1] con [barrio 2]"</li>
                    <li>• "¿Cuál es la renta media de Barcelona?"</li>
                  </ul>
                  <p className="mt-3"><strong>💡 Consejos:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• Escribe el nombre del barrio sin artículos (ej: "Raval" en lugar de "El Raval")</li>
                    <li>• Puedes usar catalán o español</li>
                    <li>• Los datos se actualizan automáticamente desde Open Data Barcelona</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {quickStats}

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-gray-100">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && claim && verificarAfirmacion()}
              placeholder="Haz una pregunta sobre renta por barrios..."
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              onClick={verificarAfirmacion}
              disabled={!claim || verifying}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verificando...
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
            <p className="text-sm text-gray-600 mb-2 font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Ejemplos de preguntas:
            </p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setClaim(ex)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-sm rounded-lg transition-colors border border-gray-200 hover:border-blue-300"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-4 ${
            result.tipo === 'true' ? 'border-green-500' : 
            result.tipo === 'false' ? 'border-red-500' : 'border-yellow-500'
          }`}>
            

            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                {result.tipo === 'true' && (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                  </div>
                )}
                {result.tipo === 'false' && (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <XCircle className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
                  </div>
                )}
                {result.tipo === 'partially' && (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-yellow-600" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{result.titulo}</h2>
                  {result.confianza !== undefined && (
                    <div className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      result.confianza >= 90 ? 'bg-green-100 text-green-700' :
                      result.confianza >= 50 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {result.confianza}% confianza
                    </div>
                  )}
                </div>
                <p className="text-sm md:text-base text-gray-600 italic border-l-2 border-gray-300 pl-3 mb-3 break-words">"{claim}"</p>
              </div>
            </div>

            <div className="mb-6 p-4 md:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">{result.explicacion}</p>
            </div>

            {result.datos && result.datos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Datos oficiales (€/año per cápita):
                </h3>
                <div className="space-y-2">
                  {result.datos.map((d: DataPoint, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:from-gray-100 hover:to-gray-50 transition-all border border-gray-200 shadow-sm gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-blue-700">{i + 1}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{d.barri}</span>
                          <span className="text-xs text-gray-500 ml-2">({d.any})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:ml-auto">
                        <div className="text-right">
                          <div className="text-blue-600 font-bold text-lg">
                            {d.valor.toLocaleString('es-ES')} €
                          </div>
                          {datasets.renda.metadata && (
                            <div className="text-xs text-gray-500">
                              {((d.valor / datasets.renda.metadata.renda_promedio - 1) * 100).toFixed(1)}% vs media
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex items-start gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-700">
                    <strong>Fuente:</strong> {result.fuente || `API Open Data Barcelona - Dataset: ${DATASET_ID}`}
                  </p>
                  <a 
                    href={`https://opendata-ajuntament.barcelona.cat/data/ca/dataset/${DATASET_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    Ver dataset completo →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Sobre este verificador
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>✓ Datos 100% reales de la API oficial de Open Data Barcelona</p>
            <p>✓ {totalBarris} barrios de Barcelona con datos de renta familiar</p>
            <p>✓ Renta familiar disponible per cápita (€/año)</p>
            <p>✓ Los datos se cargan directamente de la API cada vez</p>
            <p>✓ Utiliza los endpoints oficiales: package_show y datastore_search</p>
            <p>✓ Año de datos más reciente: {datasets.renda.metadata?.anyo_mas_reciente}</p>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Este verificador utiliza algoritmos de coincidencia aproximada, 
              así que no te preocupes si no escribes el nombre exacto del barrio. El sistema intentará 
              encontrar la mejor coincidencia.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}