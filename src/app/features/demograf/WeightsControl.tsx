import { useState } from 'react';
import { useDemografStore } from '../../demos.stores';
import { DEFAULT_WEIGHTS } from '../../core/datasets';
import { Sliders, RotateCcw, Info } from 'lucide-react';

export function WeightsControl() {
  const { weights, setWeights, resetWeights } = useDemografStore();
  const [showInfo, setShowInfo] = useState(false);

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights({
      ...weights,
      [key]: value / 100
    });
  };

  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const isValid = Math.abs(totalWeight - 1) < 0.01;

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-lg text-gray-900">Configuració de Pesos</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Informació"
          >
            <Info className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={resetWeights}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restaurar
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
          <p className="font-medium mb-2">Com funciona?</p>
          <p>Els pesos determinen la importància de cada indicador en el càlcul de l'índex de vulnerabilitat. 
             Han de sumar exactament 100%. Pots ajustar-los per explorar diferents perspectives de vulnerabilitat.</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Renda</label>
            <span className="text-sm font-semibold text-gray-900">
              {(weights.renda * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.renda * 100}
            onChange={(e) => handleWeightChange('renda', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            Menor renda → major vulnerabilitat
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Atur</label>
            <span className="text-sm font-semibold text-gray-900">
              {(weights.atur * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.atur * 100}
            onChange={(e) => handleWeightChange('atur', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            Major atur → major vulnerabilitat
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Envelliment</label>
            <span className="text-sm font-semibold text-gray-900">
              {(weights.envelliment * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.envelliment * 100}
            onChange={(e) => handleWeightChange('envelliment', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            Major envelliment → major vulnerabilitat
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Immigració</label>
            <span className="text-sm font-semibold text-gray-900">
              {(weights.immigracio * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.immigracio * 100}
            onChange={(e) => handleWeightChange('immigracio', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            Major immigració → possible vulnerabilitat administrativa
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Total:</span>
          <span className={`text-lg font-bold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
            {(totalWeight * 100).toFixed(0)}%
          </span>
        </div>
        {!isValid && (
          <p className="text-xs text-red-600 mt-1">
            ⚠️ Els pesos han de sumar exactament 100%
          </p>
        )}
      </div>
    </div>
  );
}
