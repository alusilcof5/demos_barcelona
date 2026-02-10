import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useDemografStore } from '../../demos.stores';

export function RadarIndicadors() {
  const { barrisWithVulnerability, selectedBarri } = useDemografStore();

  if (!selectedBarri) {
    return (
      <div className="flex items-center justify-center h-[400px] border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-500">Selecciona un barri per veure els indicadors</p>
      </div>
    );
  }

  const barri = barrisWithVulnerability.find(b => b.id === selectedBarri);
  
  if (!barri) return null;

  // Calcula la mitjana de Barcelona per comparar
  const avgBarri = {
    renda_normalized: barrisWithVulnerability.reduce((sum, b) => sum + b.renda_normalized, 0) / barrisWithVulnerability.length,
    atur_normalized: barrisWithVulnerability.reduce((sum, b) => sum + b.atur_normalized, 0) / barrisWithVulnerability.length,
    envelliment_normalized: barrisWithVulnerability.reduce((sum, b) => sum + b.envelliment_normalized, 0) / barrisWithVulnerability.length,
    immigracio_normalized: barrisWithVulnerability.reduce((sum, b) => sum + b.immigracio_normalized, 0) / barrisWithVulnerability.length
  };

  const data = [
    {
      indicator: 'Renda',
      barri: barri.renda_normalized * 100,
      mitjana: avgBarri.renda_normalized * 100
    },
    {
      indicator: 'Atur',
      barri: barri.atur_normalized * 100,
      mitjana: avgBarri.atur_normalized * 100
    },
    {
      indicator: 'Envelliment',
      barri: barri.envelliment_normalized * 100,
      mitjana: avgBarri.envelliment_normalized * 100
    },
    {
      indicator: 'Immigració',
      barri: barri.immigracio_normalized * 100,
      mitjana: avgBarri.immigracio_normalized * 100
    }
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-gray-900">{barri.nom}</h3>
        <p className="text-sm text-gray-600">{barri.districte}</p>
        <div className="mt-2">
          <span className="text-xs text-gray-500">Índex de Vulnerabilitat: </span>
          <span className="font-bold text-lg text-blue-700">
            {(barri.vulnerability_score * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="indicator" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name={barri.nom}
            dataKey="barri"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Radar
            name="Mitjana BCN"
            dataKey="mitjana"
            stroke="#9ca3af"
            fill="#9ca3af"
            fillOpacity={0.3}
          />
          <Legend />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>• <strong>Renda:</strong> Menor renda → major vulnerabilitat</p>
        <p>• <strong>Atur:</strong> Major atur → major vulnerabilitat</p>
        <p>• <strong>Envelliment:</strong> Major envelliment → major vulnerabilitat</p>
        <p>• <strong>Immigració:</strong> Major immigració → possible vulnerabilitat administrativa</p>
      </div>
    </div>
  );
}
