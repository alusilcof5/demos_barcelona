/**
 * Hook per gestionar el corpus d'IA
 */

import { useCorpusStore } from '../demos.stores';
import { useDemografStore } from '../demos.stores';

export function useCorpus() {
  const corpus = useCorpusStore();
  const { barrisWithVulnerability } = useDemografStore();

  const generateRecord = (barriId: string) => {
    const barri = barrisWithVulnerability.find(b => b.id === barriId);
    if (!barri) return;

    // Genera un text descriptiu del barri
    const text = `El barri ${barri.nom} (${barri.districte}) presenta un índex de vulnerabilitat de ${barri.vulnerability_score.toFixed(3)}. ` +
      `Té una població de ${barri.poblacio.toLocaleString()} habitants, ` +
      `una renda mitjana de ${barri.renda_mitjana.toLocaleString()}€, ` +
      `una taxa d'atur del ${barri.atur.toFixed(1)}%, ` +
      `un índex d'envelliment de ${barri.envelliment.toFixed(1)} ` +
      `i un ${barri.immigracio.toFixed(1)}% de població estrangera.`;

    // Determina la categoria
    let category: 'alta' | 'mitjana' | 'baixa';
    if (barri.vulnerability_score > 0.6) category = 'alta';
    else if (barri.vulnerability_score > 0.4) category = 'mitjana';
    else category = 'baixa';

    corpus.addRecord({
      id: `${barri.id}-${Date.now()}`,
      barri: barri.nom,
      districte: barri.districte,
      text,
      indicators: {
        renda: barri.renda_mitjana,
        atur: barri.atur,
        envelliment: barri.envelliment,
        immigracio: barri.immigracio
      },
      vulnerability_score: barri.vulnerability_score,
      category,
      timestamp: new Date().toISOString()
    });
  };

  const filteredRecords = corpus.filterCategory === 'all' 
    ? corpus.records 
    : corpus.records.filter(r => r.category === corpus.filterCategory);

  return {
    ...corpus,
    filteredRecords,
    generateRecord
  };
}
