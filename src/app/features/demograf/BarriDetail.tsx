import { useDemografStore } from '../../demos.stores';
import { Users, Euro, TrendingUp, TrendingDown, Calendar, Globe, X, ChevronRight } from 'lucide-react';

export function BarriDetail() {
  const { barrisWithVulnerability, selectedBarri, setSelectedBarri } = useDemografStore();

  if (!selectedBarri) return null;

  const barri = barrisWithVulnerability.find(b => b.id === selectedBarri);
  
  if (!barri) return null;

  const getVulnerabilityColor = (score: number) => {
    if (score > 0.7) return { border: 'border-red-500', bg: 'bg-red-50', dot: 'bg-red-500', text: 'text-red-700' };
    if (score > 0.6) return { border: 'border-red-400', bg: 'bg-red-50', dot: 'bg-red-400', text: 'text-red-600' };
    if (score > 0.5) return { border: 'border-orange-500', bg: 'bg-orange-50', dot: 'bg-orange-500', text: 'text-orange-700' };
    if (score > 0.4) return { border: 'border-yellow-500', bg: 'bg-yellow-50', dot: 'bg-yellow-500', text: 'text-yellow-700' };
    if (score > 0.3) return { border: 'border-lime-500', bg: 'bg-lime-50', dot: 'bg-lime-500', text: 'text-lime-700' };
    return { border: 'border-green-500', bg: 'bg-green-50', dot: 'bg-green-500', text: 'text-green-700' };
  };

  const getVulnerabilityLabel = (score: number) => {
    if (score > 0.7) return 'Muy Alta';
    if (score > 0.6) return 'Alta';
    if (score > 0.5) return 'Media-Alta';
    if (score > 0.4) return 'Media';
    if (score > 0.3) return 'Baja';
    return 'Muy Baja';
  };

  const colors = getVulnerabilityColor(barri.vulnerability_score);
  const label = getVulnerabilityLabel(barri.vulnerability_score);

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-xl border-2 border-slate-200 shadow-2xl z-[1001] overflow-hidden">
      
      {/* Header con código de color */}
      <div className={`p-6 border-l-4 ${colors.border} ${colors.bg}`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${colors.dot}`}></div>
              <h2 className="text-2xl font-bold text-slate-900">{barri.nom}</h2>
            </div>
            <p className="text-sm text-slate-600">{barri.districte}</p>
            <p className="text-xs text-slate-500 mt-1">
              Ranking: #{barri.rank} de {barrisWithVulnerability.length}
            </p>
          </div>
          <button
            onClick={() => setSelectedBarri(null)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Cerrar panel"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Índice de vulnerabilidad */}
        <div className="mt-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold text-slate-900">
              {(barri.vulnerability_score * 100).toFixed(1)}
            </span>
            <span className="text-lg text-slate-600">/100</span>
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
            <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
            <span className={`text-sm font-medium ${colors.text}`}>
              Vulnerabilidad {label}
            </span>
          </div>
        </div>
      </div>

      {/* Indicadores principales */}
      <div className="p-6 space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
        
        {/* Población */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-slate-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-slate-600 mb-1">Población</div>
            <div className="text-xl font-bold text-slate-900">
              {barri.poblacio.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">habitantes</div>
          </div>
        </div>

        <div className="border-t border-slate-100"></div>

        {/* Renta */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Euro className="w-5 h-5 text-slate-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-slate-600 mb-1">Renta media</div>
            <div className="text-xl font-bold text-slate-900">
              {barri.renda_mitjana.toLocaleString()}€
            </div>
            <div className="text-xs text-slate-500">por persona/año</div>
          </div>
        </div>

        <div className="border-t border-slate-100"></div>

        {/* Paro */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {barri.atur > 10 ? (
              <TrendingUp className="w-5 h-5 text-red-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-green-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-slate-600 mb-1">Tasa de paro</div>
            <div className="text-xl font-bold text-slate-900">
              {barri.atur.toFixed(1)}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  barri.atur > 15 ? 'bg-red-500' : barri.atur > 8 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(barri.atur * 4, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100"></div>

        {/* Envejecimiento */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-slate-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-slate-600 mb-1">Índice de envejecimiento</div>
            <div className="text-xl font-bold text-slate-900">
              {barri.envelliment.toFixed(1)}
            </div>
            <div className="text-xs text-slate-500">ratio &gt;65 años / &lt;15 años</div>
          </div>
        </div>

        <div className="border-t border-slate-100"></div>

        {/* Población extranjera */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-slate-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-slate-600 mb-1">Población extranjera</div>
            <div className="text-xl font-bold text-slate-900">
              {barri.immigracio.toFixed(1)}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{ width: `${Math.min(barri.immigracio * 2, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer del panel */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <button className="w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 group">
          Ver análisis detallado
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}