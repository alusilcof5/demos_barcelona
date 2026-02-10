import { useBarris } from '../hooks/useBarris';
import { useCorpus } from '../hooks/useCorpus';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import { AtlasMap } from '../features/demograf/AtlasMap';
import { RankingTable } from '../features/demograf/RankingTable';
import { RadarIndicadors } from '../features/demograf/RadarIndicadors';
import { BarriDetail } from '../features/demograf/BarriDetail';
import { WeightsControl } from '../features/demograf/WeightsControl';
import { useDemografStore } from '../demos.stores';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Map, Table, Radar, Settings, Plus } from 'lucide-react';
import { toast } from 'sonner';

export function DemografPage() {
  const { barrisWithVulnerability, isLoading, error } = useBarris();
  const { generateRecord } = useCorpus();
  const { selectedBarri } = useDemografStore();

  const handleGenerateRecord = () => {
    if (!selectedBarri) {
      toast.error('Selecciona un barri primer');
      return;
    }
    generateRecord(selectedBarri);
    toast.success('Registre afegit al corpus!');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner message="Carregant dades dels barris de Barcelona..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium">Error carregant les dades</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          DemoGràfic · Observatori de Vulnerabilitat
        </h1>
        <p className="text-gray-600">
          Índex de vulnerabilitat urbana dels barris de Barcelona calculat amb dades obertes
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{barrisWithVulnerability.length}</span> barris analitzats
          </div>
          {selectedBarri && (
            <button
              onClick={handleGenerateRecord}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Afegir al Corpus
            </button>
          )}
        </div>
      </div>

      <Tabs defaultValue="atlas" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="atlas" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            Atlas
          </TabsTrigger>
          <TabsTrigger value="ranking" className="flex items-center gap-2">
            <Table className="w-4 h-4" />
            Ranking
          </TabsTrigger>
          <TabsTrigger value="radar" className="flex items-center gap-2">
            <Radar className="w-4 h-4" />
            Indicadors
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configuració
          </TabsTrigger>
        </TabsList>

        <TabsContent value="atlas" className="space-y-6">
          <AtlasMap />
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          <RankingTable />
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RadarIndicadors />
            <WeightsControl />
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <WeightsControl />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">ℹ️ Com utilitzar aquesta eina</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Atlas:</strong> Visualitza el mapa interactiu de vulnerabilitat per barris</li>
              <li>• <strong>Ranking:</strong> Consulta la taula ordenable amb tots els barris</li>
              <li>• <strong>Indicadors:</strong> Compara els indicadors d'un barri amb la mitjana de Barcelona</li>
              <li>• <strong>Configuració:</strong> Ajusta els pesos per recalcular l'índex segons diferents perspectives</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detall del barri (overlay) */}
      <BarriDetail />
    </div>
  );
}
