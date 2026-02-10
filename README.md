# 🏙️ Observatori de Vulnerabilitat BCN

**Projecte per Open Data Day 2026**

Plataforma de visualització i anàlisi de desigualtats urbanes a Barcelona utilitzant dades obertes.

---

## 🎯 Filosofia del Projecte

Aquest projecte s'alinea amb els quatre pilars d'**Open Data Day 2026**:

### ✅ Combat de la Desinformació
- Dades verificables i trazables a fonts oficials
- Metodologia transparent i reproducible
- Cap "caixa negra": tot el càlcul és auditable

### ✅ Suport a la Presa de Decisions
- Ranking per barris amb indicadors clars
- Comparació temporal possible amb actualitzacions
- Visualitzacions operatives per tècnics i periodistes

### ✅ Millora de la Qualitat de la Informació Pública
- Separació clara entre dada cruda, transformació i visualització
- Informació contrastable i accessible
- Rigor tècnic = rigor informatiu

### ✅ Bases de Dades per IA Responsable
- **CORPUS·CAT**: Corpus etiquetat per entrenament d'IA
- Dades trazables a fonts públiques
- Context territorial inclòs

---

## 🏗️ Arquitectura

```
src/
├── core/                    # Lògica del negoci
│   ├── datasets/           # Definició de fonts de dades
│   ├── pipeline.ts         # Pipeline de processament
│   └── vulnerability.ts    # Càlcul de vulnerabilitat
├── features/               # Features per domini
│   ├── demograf/          # Visualització de dades
│   │   ├── AtlasMap.tsx
│   │   ├── RankingTable.tsx
│   │   ├── RadarIndicadors.tsx
│   │   ├── BarriDetail.tsx
│   │   └── WeightsControl.tsx
│   └── corpuscat/         # Generació de corpus IA
│       ├── CorpusExplorer.tsx
│       ├── CorpusStats.tsx
│       ├── ExportCorpus.tsx
│       └── RecordViewer.tsx
├── shared/                # Components reutilitzables
│   └── components/
├── hooks/                 # Custom hooks
│   ├── useBarris.ts
│   └── useCorpus.ts
└── demos.stores.ts       # Estat global (Zustand)
```

---

## 🔧 Stack Tecnològic

- **React** + **TypeScript** - Framework i tipatge
- **Vite** - Build tool ràpid
- **Tailwind CSS** - Estils utilitaris
- **React Router** - Navegació
- **Zustand** - Gestió d'estat global
- **TanStack Query** - Gestió de dades asíncrones
- **Recharts** - Gràfics estadístics
- **Leaflet** - Mapes interactius

---

## 📊 Fonts de Dades

Tots els indicadors provenen de **Open Data BCN** amb llicència **CC BY 4.0**:

1. **Barris de Barcelona (GeoJSON)** - Geometries administratives
2. **Renda Familiar Disponible** - Per capita/any
3. **Atur Registrat** - Percentatge sobre població activa
4. **Índex d'Envelliment** - Ratio >65 anys / <15 anys
5. **Població Estrangera** - Percentatge sobre total

---

## 🧮 Càlcul de l'Índex de Vulnerabilitat

### 1. Normalització
Cada indicador es normalitza entre 0 i 1:
```
valor_normalitzat = (valor - min) / (max - min)
```

### 2. Ponderació (pesos per defecte)
- **Renda**: 35%
- **Atur**: 30%
- **Envelliment**: 20%
- **Immigració**: 15%

### 3. Suma Ponderada
```
vulnerabilitat = Σ (indicador_normalitzat × pes)
```

**Els pesos són configurables** per explorar diferents perspectives.

---

## 🤖 CORPUS·CAT

Sistema de generació de datasets etiquetats per **IA responsable**:

- Textos descriptius + indicadors quantitatius
- Categories de vulnerabilitat (alta/mitjana/baixa)
- Exportació en format JSON
- Traçabilitat completa a fonts oficials

**Ús**: Entrenar models d'IA amb dades verificables sobre desigualtats urbanes.

---

## 🚀 Com Utilitzar

### Vista DemoGràfic
1. **Atlas**: Mapa interactiu amb codi de colors per vulnerabilitat
2. **Ranking**: Taula ordenable amb tots els barris
3. **Indicadors**: Radar chart comparatiu amb la mitjana de BCN
4. **Configuració**: Ajusta els pesos per recalcular l'índex

### Vista CORPUS·CAT
1. Selecciona un barri des de DemoGràfic
2. Clica "Afegir al Corpus"
3. Explora els registres generats
4. Exporta el corpus complet en JSON

---

## 🔍 Transparència

### Garanties
✅ Codi obert i auditable  
✅ Fonts trazables (enllaços directes als datasets)  
✅ Metodologia reproducible  
✅ Pesos configurables  
✅ Exportació de dades en format obert  

### Limitacions
⚠️ Simplificació de la realitat complexa  
⚠️ Decisions valoratives en selecció d'indicadors  
⚠️ Dades amb diferents dates d'actualització  
⚠️ No substitueix avaluacions professionals  

---

## 📦 Instal·lació i Desenvolupament

```bash
# Instal·lar dependències
npm install

# Desenvolupament
npm run dev

# Build de producció
npm run build
```

---

## 🙏 Crèdits

- **Dades**: [Open Data BCN](https://opendata-ajuntament.barcelona.cat/)
- **Projecte**: Open Data Day 2026
- **Llicència**: CC BY 4.0

---

## 🎖️ Open Data Day 2026

Aquest projecte està pensat per:
- **Mostrar**, no narrar (visualitzacions clares)
- **Empoderar** ciutadans, tècnics i periodistes
- **Garantir** la traçabilitat i reproducibilitat
- **Generar** coneixement reutilitzable per IA responsable

**No és un experiment, és una infraestructura cívica lleugera.**

---

Made with ❤️ for Open Data Day 2026
# demos_barcelona
