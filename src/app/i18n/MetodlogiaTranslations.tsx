export const metodologiaTranslations = {
  es: {
    // Header
    header: {
      title: '¿Cómo funciona todo esto?',
      subtitle: 'Te explicamos de dónde salen los datos y cómo los calculamos.',
      subtitleBold: 'Todo transparente y verificable.'
    },

    // Selector de nivel
    levelSelector: {
      title: 'Elige tu nivel de detalle:',
      subtitle: 'Tenemos tres explicaciones según cuánto quieras profundizar',
      simple: {
        title: 'Simple',
        subtitle: 'Para ciudadanos',
        description: 'Explicación básica sin tecnicismos. Perfecto si solo quieres entender cómo funciona.'
      },
      intermediate: {
        title: 'Intermedio',
        subtitle: 'Para estudiantes/periodistas',
        description: 'Más detalles sobre fuentes y cálculos. Para quien quiera profundizar un poco más.'
      },
      technical: {
        title: 'Técnico',
        subtitle: 'Para investigadores',
        description: 'Metodología completa con fórmulas y referencias. Para reproducir el análisis.'
      }
    },

    // Nivel Simple
    simple: {
      whatWeDo: {
        title: '¿Qué hacemos?',
        text: 'Recopilamos información oficial sobre los barrios de Barcelona y la mostramos de forma fácil de entender.',
        summary: 'En pocas palabras:',
        summaryText: 'Tomamos datos del Ayuntamiento, los organizamos y te los mostramos con gráficos y explicaciones sencillas.'
      },
      dataSource: {
        title: '¿De dónde salen los datos?',
        intro: 'Todos los datos vienen del',
        introOrg: 'Ayuntamiento de Barcelona',
        introExtra: 'Son públicos y cualquiera puede consultarlos.',
        typesTitle: 'Usamos 4 tipos de información:',
        types: [
          { title: '1. INGRESOS', description: 'Cuánto dinero ganan las familias' },
          { title: '2. EMPLEO', description: 'Cuántas personas tienen trabajo' },
          { title: '3. EDAD', description: 'Cuántas personas mayores y jóvenes hay' },
          { title: '4. ORIGEN', description: 'Cuántas personas vienen de otros países' }
        ],
        viewSources: 'Ver fuentes originales'
      },
      reliability: {
        title: '¿Cómo sabemos que son fiables?',
        items: [
          { title: 'Fuente oficial', description: 'Todos vienen del Ayuntamiento de Barcelona' },
          { title: 'Verificables', description: 'Puedes ver la fuente original de cada dato' },
          { title: 'Actualizados', description: 'Se actualizan regularmente' },
          { title: 'Sin manipulación', description: 'No los modificamos, solo los mostramos claramente' }
        ]
      },
      needCalculation: {
        title: '¿Cómo calculamos "necesidad"?',
        intro: 'Combinamos los 4 tipos de información para crear un número del',
        introNumbers: '0 al 100:',
        factors: [
          { title: 'Si los ingresos son bajos', description: '→ Más necesidad (las familias tienen menos recursos)' },
          { title: 'Si el paro es alto', description: '→ Más necesidad (más gente sin trabajo)' },
          { title: 'Si hay muchos mayores', description: '→ Más necesidad de servicios (salud, accesibilidad...)' },
          { title: 'Si hay muchos extranjeros', description: '→ Más necesidad de integración (idioma, papeles...)' }
        ],
        resultTitle: 'El resultado es un número:',
        ranges: [
          { label: '0-30: Poca necesidad', color: 'green' },
          { label: '30-60: Necesidad media', color: 'yellow' },
          { label: '60-100: Mucha necesidad', color: 'red' }
        ],
        exampleHigh: {
          title: '💡 Ejemplo: El Raval = 82/100',
          items: [
            'Ingresos muy bajos',
            'Paro muy alto',
            'Muchas personas extranjeras'
          ]
        },
        exampleLow: {
          title: '💡 Ejemplo: Pedralbes = 15/100',
          items: [
            'Ingresos muy altos',
            'Paro muy bajo',
            'Población más homogénea'
          ]
        }
      },
      moreDetails: {
        title: '¿Quieres más detalles?',
        text: 'Si eres estudiante, periodista o investigador, tenemos explicaciones más detalladas',
        buttonIntermediate: 'Ver explicación intermedia →',
        buttonTechnical: 'Ver explicación técnica →'
      }
    },

    // Nivel Intermedio
    intermediate: {
      title: 'Nivel Intermedio',
      text: 'Esta sección contendrá información más técnica sobre fuentes de datos, metodología estadística, y referencias bibliográficas para estudiantes y periodistas.',
      development: '(Contenido en desarrollo)'
    },

    // Nivel Técnico
    technical: {
      title: 'Nivel Técnico',
      text: 'Esta sección contendrá la metodología completa con fórmulas matemáticas, ponderaciones, normalización de datos, y toda la información necesaria para reproducir el análisis.',
      development: '(Contenido en desarrollo)'
    }
  },

  ca: {
    // Header
    header: {
      title: 'Com funciona tot això?',
      subtitle: 'T\'expliquem d\'on surten les dades i com les calculem.',
      subtitleBold: 'Tot transparent i verificable.'
    },

    // Selector de nivel
    levelSelector: {
      title: 'Tria el teu nivell de detall:',
      subtitle: 'Tenim tres explicacions segons quant vulguis aprofundir',
      simple: {
        title: 'Simple',
        subtitle: 'Per a ciutadans',
        description: 'Explicació bàsica sense tecnicismes. Perfecte si només vols entendre com funciona.'
      },
      intermediate: {
        title: 'Intermedi',
        subtitle: 'Per a estudiants/periodistes',
        description: 'Més detalls sobre fonts i càlculs. Per a qui vulgui aprofundir una mica més.'
      },
      technical: {
        title: 'Tècnic',
        subtitle: 'Per a investigadors',
        description: 'Metodologia completa amb fórmules i referències. Per reproduir l\'anàlisi.'
      }
    },

    // Nivel Simple
    simple: {
      whatWeDo: {
        title: 'Què fem?',
        text: 'Recopilem informació oficial sobre els barris de Barcelona i la mostrem de forma fàcil d\'entendre.',
        summary: 'En poques paraules:',
        summaryText: 'Prenem dades de l\'Ajuntament, les organitzem i te les mostrem amb gràfics i explicacions senzilles.'
      },
      dataSource: {
        title: 'D\'on surten les dades?',
        intro: 'Totes les dades vénen de l\'',
        introOrg: 'Ajuntament de Barcelona',
        introExtra: 'Són públiques i qualsevol pot consultar-les.',
        typesTitle: 'Utilitzem 4 tipus d\'informació:',
        types: [
          { title: '1. INGRESSOS', description: 'Quants diners guanyen les famílies' },
          { title: '2. OCUPACIÓ', description: 'Quantes persones tenen feina' },
          { title: '3. EDAT', description: 'Quantes persones grans i joves hi ha' },
          { title: '4. ORIGEN', description: 'Quantes persones vénen d\'altres països' }
        ],
        viewSources: 'Veure fonts originals'
      },
      reliability: {
        title: 'Com sabem que són fiables?',
        items: [
          { title: 'Font oficial', description: 'Totes vénen de l\'Ajuntament de Barcelona' },
          { title: 'Verificables', description: 'Pots veure la font original de cada dada' },
          { title: 'Actualitzades', description: 'S\'actualitzen regularment' },
          { title: 'Sense manipulació', description: 'No les modifiquem, només les mostrem clarament' }
        ]
      },
      needCalculation: {
        title: 'Com calculem "necessitat"?',
        intro: 'Combinem els 4 tipus d\'informació per crear un número del',
        introNumbers: '0 al 100:',
        factors: [
          { title: 'Si els ingressos són baixos', description: '→ Més necessitat (les famílies tenen menys recursos)' },
          { title: 'Si l\'atur és alt', description: '→ Més necessitat (més gent sense feina)' },
          { title: 'Si hi ha molts grans', description: '→ Més necessitat de serveis (salut, accessibilitat...)' },
          { title: 'Si hi ha molts estrangers', description: '→ Més necessitat d\'integració (idioma, papers...)' }
        ],
        resultTitle: 'El resultat és un número:',
        ranges: [
          { label: '0-30: Poca necessitat', color: 'green' },
          { label: '30-60: Necessitat mitjana', color: 'yellow' },
          { label: '60-100: Molta necessitat', color: 'red' }
        ],
        exampleHigh: {
          title: '💡 Exemple: El Raval = 82/100',
          items: [
            'Ingressos molt baixos',
            'Atur molt alt',
            'Moltes persones estrangeres'
          ]
        },
        exampleLow: {
          title: '💡 Exemple: Pedralbes = 15/100',
          items: [
            'Ingressos molt alts',
            'Atur molt baix',
            'Població més homogènia'
          ]
        }
      },
      moreDetails: {
        title: 'Vols més detalls?',
        text: 'Si ets estudiant, periodista o investigador, tenim explicacions més detallades',
        buttonIntermediate: 'Veure explicació intermèdia →',
        buttonTechnical: 'Veure explicació tècnica →'
      }
    },

    // Nivel Intermedio
    intermediate: {
      title: 'Nivell Intermedi',
      text: 'Aquesta secció contindrà informació més tècnica sobre fonts de dades, metodologia estadística, i referències bibliogràfiques per a estudiants i periodistes.',
      development: '(Contingut en desenvolupament)'
    },

    // Nivel Técnico
    technical: {
      title: 'Nivell Tècnic',
      text: 'Aquesta secció contindrà la metodologia completa amb fórmules matemàtiques, ponderacions, normalització de dades, i tota la informació necessària per reproduir l\'anàlisi.',
      development: '(Contingut en desenvolupament)'
    }
  }
};