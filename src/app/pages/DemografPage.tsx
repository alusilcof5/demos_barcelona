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
import { Map, Table, Radar, Settings, Plus, Info, TrendingUp } from 'lucide-react';
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
    toast.success('Registre afegit al corpus!', {
      description: 'Pots veure\'l a la secció CORPUS·CAT',
      action: {
        label: 'Veure corpus',
        onClick: () => window.location.href = '/corpus'
      }
    });
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
        <div className="max-w-2xl mx-auto bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-900 mb-2">Error carregant les dades</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Tornar a intentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Header millorat */}
      <div className="mb-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 md:p-10 border border-blue-200 shadow-lg">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Observatori de Vulnerabilitat
                  </h1>
                  <p className="text-lg text-gray-700">
                    Analitza les desigualtats urbanes a Barcelona amb dades obertes
                  </p>
                </div>
              </div>
              
              {selectedBarri && (
                <button
                  onClick={handleGenerateRecord}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-medium whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  Afegir al Corpus
                </button>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Barris analitzats</div>
                <div className="text-3xl font-bold text-blue-600">{barrisWithVulnerability.length}</div>
              </div>
              
              <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Indicadors</div>
                <div className="text-3xl font-bold text-purple-600">4</div>
              </div>
              
              <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Datasets oficials</div>
                <div className="text-3xl font-bold text-pink-600">6</div>
              </div>
              
              <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Actualització</div>
                <div className="text-sm font-medium text-gray-900">Febrer 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info rápida */}
        {!selectedBarri && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">👉 Com utilitzar aquesta eina</p>
                <p>Fes clic en un barri del mapa o selecciona'l de la taula per veure els seus indicadors detallats. Després pots afegir-lo al corpus d'IA.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="atlas" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 shadow-sm">
          <TabsTrigger value="atlas" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">Atlas Interactiu</span>
            <span className="sm:hidden">Atlas</span>
          </TabsTrigger>
          <TabsTrigger value="ranking" className="flex items-center gap-2">
            <Table className="w-4 h-4" />
            <span className="hidden sm:inline">Ranking Complet</span>
            <span className="sm:hidden">Ranking</span>
          </TabsTrigger>
          <TabsTrigger value="radar" className="flex items-center gap-2">
            <Radar className="w-4 h-4" />
            <span className="hidden sm:inline">Anàlisi Detallada</span>
            <span className="sm:hidden">Detalls</span>
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Configuració</span>
            <span className="sm:hidden">Config</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="atlas" className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-gray-900">Mapa de Vulnerabilitat</h2>
              <p className="text-sm text-gray-600">Colors més foscos indiquen major vulnerabilitat</p>
            </div>
            <div className="p-4">
              <AtlasMap />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-gray-900">Taula de Barris</h2>
              <p className="text-sm text-gray-600">Clica sobre les columnes per ordenar</p>
            </div>
            <div className="p-4">
              <RankingTable />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-900">Gràfic Radar</h2>
                <p className="text-sm text-gray-600">Compara amb la mitjana de Barcelona</p>
              </div>
              <div className="p-4">
                <RadarIndicadors />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-900">Pesos dels Indicadors</h2>
                <p className="text-sm text-gray-600">Personalitza el càlcul de vulnerabilitat</p>
              </div>
              <div className="p-4">
                <WeightsControl />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-900">Ajusta els Pesos</h2>
                <p className="text-sm text-gray-600">Modifica la importància de cada indicador</p>
              </div>
              <div className="p-6">
                <WeightsControl />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Ajuda
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Com utilitzar</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Ajusta els pesos movent els controls lliscants</li>
                    <li>La suma total ha de ser 100%</li>
                    <li>Els canvis es reflecteixen immediatament</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Consell</h4>
                  <p className="text-xs bg-white p-3 rounded border border-blue-200">
                    Augmenta el pes de <strong>renda</strong> si vols prioritzar factors econòmics, 
                    o <strong>envelliment</strong> per factors demogràfics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detall del barri (overlay) */}
      <BarriDetail />
    </div>
  );
}