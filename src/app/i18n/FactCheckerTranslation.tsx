export const verificadorTranslations = {
  ca: {
    verificador: {
      loading: {
        title: "Carregant dades oficials...",
        subtitle: "Connectant amb l'API d'Open Data Barcelona",
        wait: "Això pot trigar fins a 30 segons"
      },
      error: {
        title: "Error carregant dades",
        causes: "Possibles causes:",
        causesList: {
          maintenance: "L'API d'Open Data Barcelona està en manteniment",
          traffic: "Hi ha massa trànsit simultani al servidor",
          connectivity: "Problemes temporals de connectivitat",
          timeout: "Timeout de connexió"
        },
        retry: "Tornar a intentar",
        footer: "Aquest verificador utilitza dades 100% reals de l'API oficial d'Open Data Barcelona"
      },
      header: {
        title: "Verificador de renda per barris de Barcelona",
        subtitle: "Barcelona - Dades Oficials",
        connected: "Connectat amb Open Data Barcelona",
        help: "Mostrar ajuda",
        hideHelp: "Ocultar ajuda",
        stats: {
          neighborhoods: "barris",
          realData: "100% dades reals",
          income: "Renda familiar per càpita",
          year: "Any"
        }
      },
    },

    

    es: {
    verificador: {
      loading: {
        title: "Cargando datos oficiales...",
        subtitle: "Conectando con API de Open Data Barcelona",
        wait: "Esto puede tardar hasta 30 segundos"
      },
      error: {
        title: "Error cargando datos",
        causes: "Posibles causas:",
        causesList: {
          maintenance: "La API de Open Data Barcelona está en mantenimiento",
          traffic: "Hay demasiado tráfico simultáneo en el servidor",
          connectivity: "Problemas temporales de conectividad",
          timeout: "Timeout de conexión"
        },
        retry: "Reintentar",
        footer: "Este verificador utiliza datos 100% reales de la API oficial de Open Data Barcelona"
      },
      header: {
        title: "Verificador de renta por barrios de Barcelona",
        subtitle: "Barcelona - Datos Oficiales",
        connected: "Conectado con Open Data Barcelona",
        help: "Mostrar ayuda",
        hideHelp: "Ocultar ayuda",
        stats: {
          neighborhoods: "barrios",
          realData: "100% datos reales",
          income: "Renta familiar per cápita",
          year: "Año"
        }
      },
      help: {
        title: "Cómo usar el verificador",
        questions: "✓ Tipos de preguntas que puedes hacer:",
        questionsList: {
          moreIncome: "¿Qué barrio tiene más/menos renta?",
          top: "Top 5 barrios más ricos/pobres",
          specific: "¿Cuál es la renta de [nombre del barrio]?",
          compare: "Compara [barrio 1] con [barrio 2]",
          average: "¿Cuál es la renta media de Barcelona?"
        },
        tips: "💡 Consejos:",
        tipsList: {
          noArticles: "Escribe el nombre del barrio sin artículos (ej: \"Raval\" en lugar de \"El Raval\")",
          languages: "Puedes usar catalán o español",
          realtime: "Los datos se actualizan automáticamente desde Open Data Barcelona"
        }
      },
      stats: {
        neighborhoods: "Barrios",
        averageBCN: "Media BCN",
        maximum: "Máxima",
        minimum: "Mínima"
      },
      search: {
        placeholder: "Haz una pregunta sobre renta por barrios...",
        verify: "Verificar",
        verifying: "Verificando...",
        examples: "Ejemplos de preguntas:"
      },
      examples: [
        "¿Qué barrio tiene más renta?",
        "¿El Raval es el más pobre?",
        "Compara Gràcia con Sarrià",
        "¿Cuál es la renta de Eixample?",
        "Top 5 barrios más ricos",
        "Barrios con menos renta",
        "¿Cuál es la renta media de Barcelona?",
        "¿Qué barrio está más cerca de la media?"
      ],
      results: {
        topLow: "TOP 5 RENTAS MÁS BAJAS",
        topHigh: "TOP 5 RENTAS MÁS ALTAS",
        topExplanation: (total: number, year: string) =>
          `Clasificación de ${total} barrios según renta familiar disponible per cápita. Los datos son del año ${year} del portal Open Data Barcelona.`,
        averageTitle: "RENTA MEDIA DE BARCELONA",
        averageExplanation: (avg: string, year: string, max: string, min: string) =>
          `La renta media de Barcelona es de ${avg}€ per cápita (año ${year}). El barrio con mayor renta tiene ${max}€ y el de menor renta ${min}€.`,
        verified: "DATOS VERIFICADOS",
        verifiedExplanation: (
          barrio: string,
          valor: string,
          year: string,
          position: number,
          total: number,
          comparison: string
        ) =>
          `${barrio} tiene una renta de ${valor}€ per cápita (${year}). Posición: #${position} de ${total} barrios. Esto es ${comparison} de Barcelona.`,
        notFound: "BARRIO NO ENCONTRADO",
        notFoundExplanation: (similares: string) =>
          `No se encontraron datos para este barrio. ¿Quizás quisiste decir: ${similares}?`,
        comparisonTitle: "COMPARACIÓN VERIFICADA",
        comparisonExplanation: (
          barrio1: string,
          valor1: string,
          barrio2: string,
          valor2: string,
          diff: string,
          percent: string
        ) =>
          `${barrio1} tiene ${valor1}€ vs ${barrio2} con ${valor2}€. Diferencia: ${diff}€ (${percent}% más).`,
        suggestion: "SUGERENCIA - PRUEBA ESTAS PREGUNTAS",
        suggestionExplanation:
          "No pude entender la pregunta exactamente. Aquí están los 5 barrios con renta más baja. Prueba preguntas como: \"¿Qué barrio es más rico?\", \"Compara Gràcia con Sarrià\", \"Top 5 más pobres\", \"¿Cuál es la renta media?\"",
        confidence: "confianza",
        aboveAverage: "por encima de la media",
        belowAverage: "por debajo de la media",
        officialData: "Datos oficiales (€/año per cápita):",
        vsAverage: "vs media",
        source: "Fuente:",
        viewDataset: "Ver dataset completo →"
      },
      about: {
        title: "Sobre este verificador",
        items: {
          realData: "Datos 100% reales de la API oficial de Open Data Barcelona",
          neighborhoods: (total: number) =>
            `${total} barrios de Barcelona con datos de renta familiar`,
          incomeType: "Renta familiar disponible per cápita (€/año)",
          directAPI: "Los datos se cargan directamente de la API cada vez",
          endpoints: "Utiliza los endpoints oficiales: package_show y datastore_search",
          year: (year: string) => `Año de datos más reciente: ${year}`
        },
        tip: {
          title: "💡 Tip:",
          text: "Este verificador utiliza algoritmos de coincidencia aproximada, así que no te preocupes si no escribes el nombre exacto del barrio. El sistema intentará encontrar la mejor coincidencia."
        }
      }
    }
  },
  ca: {
    verificador: {
      loading: {
        title: "Carregant dades oficials...",
        subtitle: "Connectant amb l'API d'Open Data Barcelona",
        wait: "Això pot trigar fins a 30 segons"
      },
      error: {
        title: "Error carregant dades",
        causes: "Possibles causes:",
        causesList: {
          maintenance: "L'API d'Open Data Barcelona està en manteniment",
          traffic: "Hi ha massa trànsit simultani al servidor",
          connectivity: "Problemes temporals de connectivitat",
          timeout: "Timeout de connexió"
        },
        retry: "Tornar a intentar",
        footer: "Aquest verificador utilitza dades 100% reals de l'API oficial d'Open Data Barcelona"
      },
      header: {
        title: "Verificador de renda per barris de Barcelona",
        subtitle: "Barcelona - Dades Oficials",
        connected: "Connectat amb Open Data Barcelona",
        help: "Mostrar ajuda",
        hideHelp: "Ocultar ajuda",
        stats: {
          neighborhoods: "barris",
          realData: "100% dades reals",
          income: "Renda familiar per càpita",
          year: "Any"
        }
      }
    }
  }
};
