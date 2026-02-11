import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Database, Info, ArrowRight, CheckCircle, Brain, Sparkles, AlertCircle, FileText } from 'lucide-react';
import { CorpusStats } from '../features/corpuscat/CorpusStats';
import { CorpusExplorer } from '../features/corpuscat/CorpusExplorer';
import { RecordViewer } from '../features/corpuscat/RecordViewer';
import { ExportCorpus } from '../features/corpuscat/ExportCorpus';

// Arreglar iconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Datos de ejemplo de barrios
const barrios = [
  { name: 'El Raval', position: [41.3809, 2.1699] },
  { name: 'Gràcia', position: [41.4036, 2.1530] },
  { name: 'Eixample', position: [41.3917, 2.1649] },
  { name: 'Sants', position: [41.3789, 2.1394] },
];

// FAQ dinámico
const faqs = [
  { question: '❓ Què vol dir "etiquetat"?', answer: 'Cada text té una categoria assignada (Alta/Mitjana/Baixa vulnerabilitat). Això permet que una IA aprengui a classificar nous textos.' },
  { question: '❓ Per què serveix aquest corpus?', answer: 'Per entrenar models d\'IA que puguin analitzar vulnerabilitat urbana en altres ciutats o per fer recerca sobre desigualtats socials amb dades fiables.' },
  { question: '❓ Puc usar-lo lliurement?', answer: 'Sí! El corpus es publica amb llicència CC BY 4.0, igual que les dades d\'Open Data BCN. Pots usar-lo, modificar-lo i redistribuir-lo sempre que citis la font.' },
  { question: '❓ Com es calcula l\'etiqueta (alta/mitjana/baixa)?', answer: 'Segons l\'índex de vulnerabilitat: >60% = Alta, 40-60% = Mitjana, <40% = Baixa. Aquest índex es calcula amb 4 indicadors: renda, atur, envelliment i immigració.' },
];

// Componente FAQ desplegable
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-panel-${index}`}
            id={`faq-button-${index}`}
            className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
          >
            <span>{faq.question}</span>
            <span>{openIndex === index ? '−' : '+'}</span>
          </button>
          <div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            className={`${openIndex === index ? 'block' : 'hidden'} px-4 py-3 bg-white text-gray-700 text-sm`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente del mapa
function DemoMap() {
  const barcelonaCenter: [number, number] = [41.3851, 2.1734]; // Centro de Barcelona

  return (
    <MapContainer center={barcelonaCenter} zoom={12} className="w-full h-96 rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {barrios.map((b, i) => (
        <Marker key={i} position={b.position}>
          <Popup>{b.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

// Página principal
export function CorpusPage() {
  const [showExplanation, setShowExplanation] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Database className="w-8 h-8 text-purple-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CORPUS·CAT</h1>
            <p className="text-gray-600">Dataset de text per entrenar IA responsable</p>
          </div>
        </div>

        {/* Explicación principal */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-purple-700 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="font-bold text-lg text-purple-900 mb-3">Què és CORPUS·CAT?</h2>
              <p className="text-gray-700 mb-3 leading-relaxed">
                Col·lecció de textos sobre els barris de Barcelona amb dades reals i etiquetatge automàtic.
              </p>
            </div>
          </div>
        </div>

        {/* Com funciona */}
        {showExplanation && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl text-gray-900">Com funciona? (Pas a pas)</h2>
              <button onClick={() => setShowExplanation(false)} className="text-sm text-gray-500 hover:text-gray-700">
                Amagar
              </button>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">Selecciones un barri</h3>
                <p className="text-sm text-gray-600">Al mapa (DemoGràfic), fas clic sobre un barri que t'interessi.</p>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-3">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">Premies "Afegir al Corpus"</h3>
                <p className="text-sm text-gray-600">Es genera automàticament un text descriptiu amb les dades del barri.</p>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mb-3">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">S'etiqueta automàticament</h3>
                <p className="text-sm text-gray-600">El sistema calcula Alta/Mitjana/Baixa segons els indicadors.</p>
              </div>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mb-3">4</div>
                <h3 className="font-semibold text-gray-900 mb-2">Exportes el corpus</h3>
                <p className="text-sm text-gray-600">Descarregues un fitxer JSON amb tots els textos i etiquetes.</p>
              </div>
            </div>
          </div>
        )}
        {!showExplanation && (
          <button onClick={() => setShowExplanation(true)} className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">
            Mostrar explicació de com funciona
          </button>
        )}
      </div>

      {/* Mapa */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mapa de Barris</h2>
        <DemoMap />
      </div>

      {/* Estadísticas y exportación */}
      <div className="space-y-6">
        <CorpusStats />
        <ExportCorpus />

        {/* Explorador */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Registres Generats</h2>
            <span className="text-sm text-gray-500">(Clica sobre un per veure'l complet)</span>
          </div>
          <CorpusExplorer />
        </div>

        {/* FAQ */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-xl text-gray-900 mb-4">Preguntes Freqüents</h2>
          <FAQAccordion />
        </div>
      </div>

      {/* Viewer (modal) */}
      <RecordViewer />
    </div>
  );
}
