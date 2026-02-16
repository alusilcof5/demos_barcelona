import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ca' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ca');

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const translations = {
  ca: {
    common: {
      loading: "Carregant...",
      error: "Error",
      close: "Tancar",
      download: "Descarregar",
      search: "Cercar",
      filter: "Filtrar",
      all: "Tots",
      yes: "Sí",
      no: "No"
    },
    
    header: {
      logo: "CIVIXDATA",
      tagline: "Open Data Day 2026",
      nav: {
        home: "Inici",
        homeAria: "Anar a la pàgina d'inici",
        demograf: "Població",
        demografAria: "Explorar l'atlas demogràfic",
        corpus: "Dates",
        corpusAria: "Veure el corpus de dades",
        methodology: "Sobre el projecte",
        methodologyAria: "Llegir la metodologia"
      },
      mobileMenu: {
        open: "Obrir menú",
        close: "Tancar menú"
      }
    },

    home: {
      hero: {
        badge: "Open Data Day 2026",
        title: "Desigualtats urbanes a Barcelona",
        subtitle: "Visualitza i analitza les diferències socioeconòmiques entre barris amb dades verificades i transparents",
        exploreCTA: "Explorar mapa",
        methodologyCTA: "Sobre el projecte"
      },
      
      metrics: {
        neighborhoods: "Barris analitzats",
        neighborhoodsSub: "Cobertura completa de la ciutat",
        indicators: "Indicadors principals",
        indicatorsSub: "Renda, ocupació, edat, migració",
        dataQuality: "Dades oficials",
        dataQualitySub: "Open Data Barcelona"
      },

      problem: {
        title: "Per què és important",
        subtitle: "Les desigualtats urbanes afecten la qualitat de vida de milers de persones",
        raval: {
          title: "El Raval",
          tag: "Alta vulnerabilitat",
          income: "Renda anual",
          unemployment: "Taxa d'atur",
          population: "Població"
        },
        pedralbes: {
          title: "Pedralbes",
          tag: "Baixa vulnerabilitat"
        },
        insight: "vegades més de diferència en ingressos. Aquestes dades ajuden a identificar on invertir recursos públics."
      },

      features: {
        title: "Eines disponibles",
        subtitle: "Tres formes d'explorar les dades",
        map: {
          title: "Mapa interactiu",
          description: "Visualitza les diferències entre barris amb colors i dades en temps real",
          cta: "Explorar"
        },
        data: {
          title: "Dades obertes",
          description: "Descarrega datasets complets en múltiples formats per a la teva anàlisi",
          cta: "Descarregar"
        },
        methodology: {
          title: "Metodologia",
          description: "Comprèn com es calculen els índexs i d'on provenen les dades",
          cta: "Llegir més"
        }
      },

      transparency: {
        title: "Transparència total",
        subtitle: "Totes les dades provenen de fonts oficials verificables",
        items: {
          official: {
            title: "Dades oficials",
            description: "Open Data Barcelona i fonts municipals"
          },
          openSource: {
            title: "Codi obert",
            description: "Metodologia documentada i reproducible"
          },
          updates: {
            title: "Actualització contínua",
            description: "Dades actualitzades mensualment"
          },
          license: {
            title: "Llicència oberta",
            description: "CC BY 4.0 - Lliure ús amb atribució"
          }
        },
        cta: "Veure el projecte"
      },

      finalCta: {
        title: "Comença a explorar",
        subtitle: "Descobreix com està el teu barri o explora tota Barcelona",
        button: "Veure mapa interactiu"
      }
    },

    charts: {
      wageGap: {
        title: "Evolució de la Renda per Gènere",
        subtitle: "Comparativa de salari mitjà entre homes i dones (últims 10 anys)",
        men: "Homes",
        women: "Dones",
        gap: "Bretxa",
        maleIncome: "Renda homes",
        femaleIncome: "Renda dones"
      }
    },

    demograf: {
      hero: {
        title: "Explora el teu Barri",
        subtitle: "Descobreix com està el teu barri comparat amb la resta de Barcelona"
      },
      
      legend: {
        title: "Mapa de Necessitats de Barcelona",
        subtitle: "LLEGENDA - Nivell de Necessitat:",
        low: {
          title: "Baixa",
          description: "El barri té bons serveis i oportunitats"
        },
        medium: {
          title: "Mitjana",
          description: "Algunes àrees necessiten millora"
        },
        high: {
          title: "Alta",
          description: "Necessita atenció prioritària"
        },
        veryHigh: {
          title: "Molt Alta",
          description: "Requereix intervenció urgent"
        },
        tip: "Fes clic en un barri del mapa per veure més detalls",
        info: "Com més fosc el color, més atenció necessita el barri"
      },

      barrio: {
        needLevel: "NIVELL DE NECESSITAT",
        inNumbers: "El teu barri en 4 números",
        income: {
          title: "INGRESSOS",
          unit: "€ a l'any per persona",
          whatMeans: "Què significa?",
          low: "Les famílies tenen menys recursos per cobrir necessitats bàsiques",
          high: "Les famílies tenen més recursos econòmics disponibles",
          comparison: "que la mitjana"
        },
        employment: {
          title: "OCUPACIÓ",
          unit: "d'atur",
          whatMeans: "Què significa?",
          high: "de cada persones que busca feina no la troba",
          low: "La majoria de persones que busquen feina la troben"
        },
        aging: {
          title: "POBLACIÓ MAJOR",
          unit: "índex d'envelliment",
          whatMeans: "Què significa?",
          high: "persones grans que joves. Necessiten serveis específics (salut, accessibilitat...)",
          low: "Població més equilibrada entre edats"
        },
        foreign: {
          title: "POBLACIÓ ESTRANGERA",
          unit: "de la població",
          whatMeans: "Què significa?",
          high: "Moltes persones vénen d'altres països. Poden necessitar suport amb idioma, papers, integració...",
          low: "Població més homogènia pel que fa a origen"
        },
        conclusion: {
          title: "QUÈ NECESSITA AQUEST BARRI?",
          intro: "Basant-nos en aquestes dades, necessita especialment:",
          employment: "Programes d'ocupació i formació",
          economic: "Ajudes econòmiques per a famílies",
          integration: "Serveis d'integració",
          elderly: "Serveis per a persones grans",
          compare: "Comparar amb un altre barri",
          downloadReport: "Descarregar informe"
        }
      },

      noSelection: {
        title: "Selecciona un barri al mapa",
        subtitle: "Fes clic a qualsevol barri del mapa o utilitza el cercador per veure informació detallada",
        tip: "Els barris més vermells necessiten més atenció. Els barris més verds estan millor coberts."
      }
    },

    datos: {
      hero: {
        title: "Dades per a Tothom",
        subtitle: "Informació verificada i descarregable sobre Barcelona.",
        tagline: "Gratis, oberta i per a tothom."
      },

      what: {
        title: "Què trobaràs aquí?",
        description: "Totes les dades que veus en aquesta web, llestes per descarregar. En formats fàcils d'utilitzar (Excel, CSV, JSON).",
        includes: {
          title: "Inclou:",
          neighborhoods: "Informació dels 73 barris de Barcelona",
          indicators: "Dades de renda, ocupació, població, envelliment",
          updates: "Actualitzacions mensuals",
          sources: "Fonts oficials de l'Ajuntament de Barcelona"
        },
        free: {
          title: "GRATIS I PER A TOTHOM",
          description: "No cal registre. No hi ha restriccions. Utilitza'ls per al que vulguis (estudis, projectes, reportatges...)."
        }
      },

      uses: {
        title: "Per a què pots utilitzar aquestes dades?",
        journalism: {
          title: "Periodisme",
          item1: "Escriure articles amb dades reals",
          item2: "Contrastar informació",
          item3: "Fer visualitzacions"
        },
        education: {
          title: "Educació",
          item1: "Projectes de classe",
          item2: "Treballs de recerca",
          item3: "Aprendre anàlisi de dades"
        },
        public: {
          title: "Decisions Públiques",
          item1: "Planificació urbana",
          item2: "Assignació de pressupostos",
          item3: "Avaluació de polítiques"
        },
        ai: {
          title: "Intel·ligència Artificial",
          item1: "Entrenar models amb dades reals",
          item2: "Crear chatbots informatius",
          item3: "Sistemes de recomanació"
        }
      },

      quality: {
        title: "Garantia de Qualitat",
        intro: "Totes les nostres dades estan:",
        verified: {
          title: "Verificades amb fonts oficials",
          subtitle: "Ajuntament de Barcelona"
        },
        updated: {
          title: "Actualitzades regularment",
          subtitle: "Dades fresques cada mes"
        },
        documented: {
          title: "Documentades",
          subtitle: "Saps d'on vénen"
        },
        clean: {
          title: "Sense manipulacions ni biaixos",
          subtitle: "Dades tal com són"
        }
      },

      ai: {
        title: "Ús Responsable en Intel·ligència Artificial",
        what: {
          title: "Què és això?",
          description: "La intel·ligència artificial (IA) aprèn de dades. Si les dades són dolentes o falses, la IA aprèn coses incorrectes."
        },
        why: {
          title: "Per això és important:",
          item1: "Utilitzar dades verificades (com aquestes)",
          item2: "Saber d'on vénen",
          item3: "Poder-les comprovar"
        },
        perfect: {
          title: "Les nostres dades són perfectes per entrenar IA perquè:",
          item1: "Són 100% reals (de fonts oficials)",
          item2: "Estan ben explicades",
          item3: "No tenen biaixos polítics",
          item4: "S'actualitzen regularment"
        },
        example: {
          title: "Exemple d'ús en IA:",
          description: "Pots crear un chatbot que respongui preguntes com:",
          question: "Quin barri de Barcelona necessita més ajuda amb l'ocupació?",
          answer: "I la resposta es basarà en dades reals, no en opinions."
        }
      },

      download: {
        title: "Descarrega les Dades",
        excel: {
          title: "Format Excel",
          format: ".xlsx",
          description: "Per a anàlisi a Excel",
          button: "Descarregar"
        },
        csv: {
          title: "Format CSV",
          format: ".csv",
          description: "Per importar a programes",
          button: "Descarregar"
        },
        json: {
          title: "Format JSON",
          format: ".json",
          description: "Per a desenvolupadors",
          button: "Descarregar"
        },
        help: {
          title: "No saps quin triar?",
          excel: "Utilitza Excel si treballes amb fulls de càlcul.",
          csv: "Utilitza CSV si necessites importar a altres programes.",
          json: "Utilitza JSON si ets desenvolupador."
        }
      }
    },

    metodologia: {
      hero: {
        title: "Com funciona tot això?",
        subtitle: "T'expliquem d'on surten les dades i com les calculem. Tot transparent i verificable."
      },

      levels: {
        title: "Tria el teu nivell de detall:",
        subtitle: "Tenim tres explicacions segons quant vulguis aprofundir",
        simple: {
          title: "Simple",
          audience: "Per a ciutadans",
          description: "Explicació bàsica sense tecnicismes. Perfecte si només vols entendre com funciona."
        },
        intermediate: {
          title: "Intermedi",
          audience: "Per a estudiants/periodistes",
          description: "Més detalls sobre fonts i càlculs. Per a qui vulgui aprofundir una mica més."
        },
        technical: {
          title: "Tècnic",
          audience: "Per a investigadors",
          description: "Metodologia completa amb fórmules i referències. Per reproduir l'anàlisi."
        }
      },

      simple: {
        whatWeDo: {
          title: "Què fem?",
          description: "Recopilem informació oficial sobre els barris de Barcelona i la mostrem de forma fàcil d'entendre.",
          summary: "En poques paraules: Prenem dades de l'Ajuntament, les organitzem i te les mostrem amb gràfics i explicacions senzilles."
        },
        
        wherFrom: {
          title: "D'on surten les dades?",
          intro: "Totes les dades vénen de l'Ajuntament de Barcelona. Són públiques i qualsevol pot consultar-les.",
          types: {
            title: "Utilitzem 4 tipus d'informació:",
            income: {
              title: "INGRESSOS",
              description: "Quants diners guanyen les famílies"
            },
            employment: {
              title: "OCUPACIÓ",
              description: "Quantes persones tenen feina"
            },
            age: {
              title: "EDAT",
              description: "Quantes persones grans i joves hi ha"
            },
            origin: {
              title: "ORIGEN",
              description: "Quantes persones vénen d'altres països"
            }
          },
          sources: "Veure fonts originals"
        },

        reliability: {
          title: "Com sabem que són fiables?",
          official: {
            title: "Font oficial",
            description: "Totes vénen de l'Ajuntament de Barcelona"
          },
          verifiable: {
            title: "Verificables",
            description: "Pots veure la font original de cada dada"
          },
          updated: {
            title: "Actualitzades",
            description: "S'actualitzen regularment"
          },
          clean: {
            title: "Sense manipulació",
            description: "No les modifiquem, només les mostrem clarament"
          }
        },

        calculation: {
          title: "Com calculem 'necessitat'?",
          intro: "Combinem els 4 tipus d'informació per crear un número del 0 al 100:",
          factors: {
            income: {
              title: "Si els ingressos són baixos",
              effect: "Més necessitat (les famílies tenen menys recursos)"
            },
            unemployment: {
              title: "Si l'atur és alt",
              effect: "Més necessitat (més gent sense feina)"
            },
            aging: {
              title: "Si hi ha moltes persones grans",
              effect: "Més necessitat de serveis (salut, accessibilitat...)"
            },
            foreign: {
              title: "Si hi ha molts estrangers",
              effect: "Més necessitat d'integració (idioma, papers...)"
            }
          },
          scale: {
            title: "El resultat és un número:",
            low: "Poca necessitat",
            medium: "Necessitat mitjana",
            high: "Molta necessitat"
          },
          examples: {
            raval: {
              title: "Exemple: El Raval = 82/100",
              reasons: [
                "Ingressos molt baixos",
                "Atur molt alt",
                "Moltes persones estrangeres"
              ]
            },
            pedralbes: {
              title: "Exemple: Pedralbes = 15/100",
              reasons: [
                "Ingressos molt alts",
                "Atur molt baix",
                "Població més homogènia"
              ]
            }
          }
        },

        moreDetails: {
          title: "Vols més detalls?",
          description: "Si ets estudiant, periodista o investigador, tenim explicacions més detallades",
          intermediate: "Veure explicació intermèdia →",
          technical: "Veure explicació tècnica →"
        }
      }
    },

    footer: {
      about: {
        title: "Observatori BCN",
        description: "Eina de codi obert per visualitzar desigualtats urbanes a Barcelona amb dades públiques verificables.",
        licenses: {
          ccby: "CC BY 4.0",
          openData: "Open Data"
        }
      },

      data: {
        title: "Dades i Metodologia",
        methodology: "Metodologia completa",
        openDataBCN: "Open Data BCN",
        
       
      },

      help: {
        title: "Ajuda i Recursos",
        faq: "Preguntes freqüents",
        accessibility: "Declaració d'accessibilitat",
        guides: "Guies d'ús"
      },

      contact: {
        title: "Contacte i Comunitat",
        github: "GitHub",
        
      },

      bottom: {
        copyright: "© {year} Observatori BCN · Dades obertes al servei de la ciutadania",
        lastUpdate: "Última actualització: {date}",
        terms: "Termes d'ús",
        privacy: "Privacitat",
        cookies: "Cookies",
        collaborators: {
          title: "Col·labora:",
          ajuntament: "Ajuntament de Barcelona",
          openData: "Open Data BCN"
        }
      }
    },

    accessibility: {
      title: "Accessibilitat",
      fontSize: {
        label: "Mida del text",
        normal: "Text normal",
        medium: "Text mitjà",
        large: "Text gran"
      },
      contrast: {
        label: "Mode de contrast",
        normal: "Normal",
        high: "Alt contrast",
        inverted: "Colors invertits"
      }
    }
  },

  es: {
    common: {
      loading: "Cargando...",
      error: "Error",
      close: "Cerrar",
      download: "Descargar",
      search: "Buscar",
      filter: "Filtrar",
      all: "Todos",
      yes: "Sí",
      no: "No"
    },

    header: {
      logo: "CIVIXDATA",
      tagline: "Open Data Day 2026",
      nav: {
        home: "Inicio",
        homeAria: "Ir a la página de inicio",
        demograf: "Población",
        demografAria: "Explorar el atlas demográfico",
        corpus: "Datos",
        corpusAria: "Ver el corpus de datos",
        methodology: "Cómo se hizo",
        methodologyAria: "Leer la metodología"
      },
      mobileMenu: {
        open: "Abrir menú",
        close: "Cerrar menú"
      }
    },

    home: {
      hero: {
        badge: "Open Data Day 2026",
        title: "Desigualdades urbanas en Barcelona",
        subtitle: "Visualiza y analiza las diferencias socioeconómicas entre barrios con datos verificados y transparentes",
        exploreCTA: "Explorar mapa",
        methodologyCTA: "Ver metodología"
      },

      metrics: {
        neighborhoods: "Barrios analizados",
        neighborhoodsSub: "Cobertura completa de la ciudad",
        indicators: "Indicadores principales",
        indicatorsSub: "Renta, empleo, edad, migración",
        dataQuality: "Datos oficiales",
        dataQualitySub: "Open Data Barcelona"
      },

      problem: {
        title: "Por qué es importante",
        subtitle: "Las desigualdades urbanas afectan la calidad de vida de miles de personas",
        raval: {
          title: "El Raval",
          tag: "Alta vulnerabilidad",
          income: "Renta anual",
          unemployment: "Tasa de paro",
          population: "Población"
        },
        pedralbes: {
          title: "Pedralbes",
          tag: "Baja vulnerabilidad"
        },
        insight: "veces más de diferencia en ingresos. Estos datos ayudan a identificar dónde invertir recursos públicos."
      },

      features: {
        title: "Herramientas disponibles",
        subtitle: "Tres formas de explorar los datos",
        map: {
          title: "Mapa interactivo",
          description: "Visualiza las diferencias entre barrios con colores y datos en tiempo real",
          cta: "Explorar"
        },
        data: {
          title: "Datos abiertos",
          description: "Descarga datasets completos en múltiples formatos para tu análisis",
          cta: "Descargar"
        },
        methodology: {
          title: "Metodología",
          description: "Comprende cómo se calculan los índices y de dónde provienen los datos",
          cta: "Leer más"
        }
      },

      transparency: {
        title: "Transparencia total",
        subtitle: "Todos los datos provienen de fuentes oficiales verificables",
        items: {
          official: {
            title: "Datos oficiales",
            description: "Open Data Barcelona y fuentes municipales"
          },
          openSource: {
            title: "Código abierto",
            description: "Metodología documentada y reproducible"
          },
          updates: {
            title: "Actualización continua",
            description: "Datos actualizados mensualmente"
          },
          license: {
            title: "Licencia abierta",
            description: "CC BY 4.0 - Uso libre con atribución"
          }
        },
        cta: "Ver metodología completa"
      },

      finalCta: {
        title: "Empieza a explorar",
        subtitle: "Descubre cómo está tu barrio o explora toda Barcelona",
        button: "Ver mapa interactivo"
      }
    },

    demograf: {
      hero: {
        title: "Explora tu Barrio",
        subtitle: "Descubre cómo está tu barrio comparado con el resto de Barcelona"
      },

      legend: {
        title: "Mapa de Necesidades de Barcelona",
        subtitle: "LEYENDA - Nivel de Necesidad:",
        low: {
          title: "Baja",
          description: "El barrio tiene buenos servicios y oportunidades"
        },
        medium: {
          title: "Media",
          description: "Algunas áreas necesitan mejora"
        },
        high: {
          title: "Alta",
          description: "Necesita atención prioritaria"
        },
        veryHigh: {
          title: "Muy Alta",
          description: "Requiere intervención urgente"
        },
        tip: "Haz clic en un barrio del mapa para ver más detalles",
        info: "Cuanto más oscuro el color, más atención necesita el barrio"
      },

      barrio: {
        needLevel: "NIVEL DE NECESIDAD",
        inNumbers: "Tu barrio en 4 números",
        income: {
          title: "INGRESOS",
          unit: "€ al año por persona",
          whatMeans: "¿Qué significa?",
          low: "Las familias tienen menos recursos para cubrir necesidades básicas",
          high: "Las familias tienen más recursos económicos disponibles",
          comparison: "que la media"
        },
        employment: {
          title: "EMPLEO",
          unit: "de paro",
          whatMeans: "¿Qué significa?",
          high: "de cada personas que buscan trabajo no lo encuentran",
          low: "La mayoría de personas que buscan trabajo lo encuentran"
        },
        aging: {
          title: "POBLACIÓN MAYOR",
          unit: "índice de envejecimiento",
          whatMeans: "¿Qué significa?",
          high: "más personas mayores que jóvenes. Necesitan servicios específicos (salud, accesibilidad...)",
          low: "Población más equilibrada entre edades"
        },
        foreign: {
          title: "POBLACIÓN EXTRANJERA",
          unit: "de la población",
          whatMeans: "¿Qué significa?",
          high: "Muchas personas vienen de otros países. Pueden necesitar apoyo con idioma, documentación, integración...",
          low: "Población más homogénea en cuanto a origen"
        },
        conclusion: {
          title: "¿QUÉ NECESITA ESTE BARRIO?",
          intro: "Basándonos en estos datos, necesita especialmente:",
          employment: "Programas de empleo y formación",
          economic: "Ayudas económicas para familias",
          integration: "Servicios de integración",
          elderly: "Servicios para personas mayores",
          compare: "Comparar con otro barrio",
          downloadReport: "Descargar informe"
        }
      },

      noSelection: {
        title: "Selecciona un barrio en el mapa",
        subtitle: "Haz clic en cualquier barrio del mapa o utiliza el buscador para ver información detallada",
        tip: "Los barrios más rojos necesitan más atención. Los barrios más verdes están mejor cubiertos."
      }
    },

    datos: {
      hero: {
        title: "Datos para Todos",
        subtitle: "Información verificada y descargable sobre Barcelona.",
        tagline: "Gratis, abierta y para todos."
      },

      what: {
        title: "¿Qué encontrarás aquí?",
        description: "Todos los datos que ves en esta web, listos para descargar. En formatos fáciles de utilizar (Excel, CSV, JSON).",
        includes: {
          title: "Incluye:",
          neighborhoods: "Información de los 73 barrios de Barcelona",
          indicators: "Datos de renta, empleo, población, envejecimiento",
          updates: "Actualizaciones mensuales",
          sources: "Fuentes oficiales del Ayuntamiento de Barcelona"
        },
        free: {
          title: "GRATIS Y PARA TODOS",
          description: "No hace falta registro. No hay restricciones. Utilízalos para lo que quieras (estudios, proyectos, reportajes...)."
        }
      },

      uses: {
        title: "¿Para qué puedes utilizar estos datos?",
        journalism: {
          title: "Periodismo",
          item1: "Escribir artículos con datos reales",
          item2: "Contrastar información",
          item3: "Hacer visualizaciones"
        },
        education: {
          title: "Educación",
          item1: "Proyectos de clase",
          item2: "Trabajos de investigación",
          item3: "Aprender análisis de datos"
        },
        public: {
          title: "Decisiones Públicas",
          item1: "Planificación urbana",
          item2: "Asignación de presupuestos",
          item3: "Evaluación de políticas"
        },
        ai: {
          title: "Inteligencia Artificial",
          item1: "Entrenar modelos con datos reales",
          item2: "Crear chatbots informativos",
          item3: "Sistemas de recomendación"
        }
      },

      quality: {
        title: "Garantía de Calidad",
        intro: "Todos nuestros datos están:",
        verified: {
          title: "Verificados con fuentes oficiales",
          subtitle: "Ayuntamiento de Barcelona"
        },
        updated: {
          title: "Actualizados regularmente",
          subtitle: "Datos frescos cada mes"
        },
        documented: {
          title: "Documentados",
          subtitle: "Sabes de dónde vienen"
        },
        clean: {
          title: "Sin manipulaciones ni sesgos",
          subtitle: "Datos tal como son"
        }
      },

      ai: {
        title: "Uso Responsable en Inteligencia Artificial",
        what: {
          title: "¿Qué es esto?",
          description: "La inteligencia artificial (IA) aprende de datos. Si los datos son malos o falsos, la IA aprende cosas incorrectas."
        },
        why: {
          title: "Por eso es importante:",
          item1: "Utilizar datos verificados (como estos)",
          item2: "Saber de dónde vienen",
          item3: "Poder comprobarlos"
        },
        perfect: {
          title: "Nuestros datos son perfectos para entrenar IA porque:",
          item1: "Son 100% reales (de fuentes oficiales)",
          item2: "Están bien explicados",
          item3: "No tienen sesgos políticos",
          item4: "Se actualizan regularmente"
        },
        example: {
          title: "Ejemplo de uso en IA:",
          description: "Puedes crear un chatbot que responda preguntas como:",
          question: "¿Qué barrio de Barcelona necesita más ayuda con el empleo?",
          answer: "Y la respuesta se basará en datos reales, no en opiniones."
        }
      },

      download: {
        title: "Descarga los Datos",
        excel: {
          title: "Formato Excel",
          format: ".xlsx",
          description: "Para análisis en Excel",
          button: "Descargar"
        },
        csv: {
          title: "Formato CSV",
          format: ".csv",
          description: "Para importar a programas",
          button: "Descargar"
        },
        json: {
          title: "Formato JSON",
          format: ".json",
          description: "Para desarrolladores",
          button: "Descargar"
        },
        help: {
          title: "¿No sabes cuál elegir?",
          excel: "Utiliza Excel si trabajas con hojas de cálculo.",
          csv: "Utiliza CSV si necesitas importar a otros programas.",
          json: "Utiliza JSON si eres desarrollador."
        }
      }
    },

    metodologia: {
      hero: {
        title: "¿Cómo funciona todo esto?",
        subtitle: "Te explicamos de dónde salen los datos y cómo los calculamos. Todo transparente y verificable."
      },

      levels: {
        title: "Elige tu nivel de detalle:",
        subtitle: "Tenemos tres explicaciones según cuánto quieras profundizar",
        simple: {
          title: "Simple",
          audience: "Para ciudadanos",
          description: "Explicación básica sin tecnicismos. Perfecto si solo quieres entender cómo funciona."
        },
        intermediate: {
          title: "Intermedio",
          audience: "Para estudiantes/periodistas",
          description: "Más detalles sobre fuentes y cálculos. Para quien quiera profundizar un poco más."
        },
        technical: {
          title: "Técnico",
          audience: "Para investigadores",
          description: "Metodología completa con fórmulas y referencias. Para reproducir el análisis."
        }
      },

      simple: {
        whatWeDo: {
          title: "¿Qué hacemos?",
          description: "Recopilamos información oficial sobre los barrios de Barcelona y la mostramos de forma fácil de entender.",
          summary: "En pocas palabras: Tomamos datos del Ayuntamiento, los organizamos y te los mostramos con gráficos y explicaciones sencillas."
        },
        
        wherFrom: {
          title: "¿De dónde salen los datos?",
          intro: "Todos los datos vienen del Ayuntamiento de Barcelona. Son públicos y cualquiera puede consultarlos.",
          types: {
            title: "Utilizamos 4 tipos de información:",
            income: {
              title: "INGRESOS",
              description: "Cuánto dinero ganan las familias"
            },
            employment: {
              title: "EMPLEO",
              description: "Cuántas personas tienen trabajo"
            },
            age: {
              title: "EDAD",
              description: "Cuántas personas mayores y jóvenes hay"
            },
            origin: {
              title: "ORIGEN",
              description: "Cuántas personas vienen de otros países"
            }
          },
          sources: "Ver fuentes originales"
        },

        reliability: {
          title: "¿Cómo sabemos que son fiables?",
          official: {
            title: "Fuente oficial",
            description: "Todos vienen del Ayuntamiento de Barcelona"
          },
          verifiable: {
            title: "Verificables",
            description: "Puedes ver la fuente original de cada dato"
          },
          updated: {
            title: "Actualizados",
            description: "Se actualizan regularmente"
          },
          clean: {
            title: "Sin manipulación",
            description: "No los modificamos, solo los mostramos claramente"
          }
        },

        calculation: {
          title: "¿Cómo calculamos 'necesidad'?",
          intro: "Combinamos los 4 tipos de información para crear un número del 0 al 100:",
          factors: {
            income: {
              title: "Si los ingresos son bajos",
              effect: "Más necesidad (las familias tienen menos recursos)"
            },
            unemployment: {
              title: "Si el paro es alto",
              effect: "Más necesidad (más gente sin trabajo)"
            },
            aging: {
              title: "Si hay muchas personas mayores",
              effect: "Más necesidad de servicios (salud, accesibilidad...)"
            },
            foreign: {
              title: "Si hay muchos extranjeros",
              effect: "Más necesidad de integración (idioma, documentación...)"
            }
          },
          scale: {
            title: "El resultado es un número:",
            low: "Poca necesidad",
            medium: "Necesidad media",
            high: "Mucha necesidad"
          },
          examples: {
            raval: {
              title: "Ejemplo: El Raval = 82/100",
              reasons: [
                "Ingresos muy bajos",
                "Paro muy alto",
                "Muchas personas extranjeras"
              ]
            },
            pedralbes: {
              title: "Ejemplo: Pedralbes = 15/100",
              reasons: [
                "Ingresos muy altos",
                "Paro muy bajo",
                "Población más homogénea"
              ]
            }
          }
        },

        moreDetails: {
          title: "¿Quieres más detalles?",
          description: "Si eres estudiante, periodista o investigador, tenemos explicaciones más detalladas",
          intermediate: "Ver explicación intermedia →",
          technical: "Ver explicación técnica →"
        }
      }
    },

    footer: {
      about: {
        title: "Observatori BCN",
        description: "Herramienta de código abierto para visualizar desigualdades urbanas en Barcelona con datos públicos verificables.",
        licenses: {
          ccby: "CC BY 4.0",
          openData: "Open Data"
        }
      },

      data: {
        title: "Datos y Metodología",
        methodology: "Metodología completa",
        openDataBCN: "Open Data BCN",
        apiDocs: "Documentación API"
      },

      help: {
        title: "Ayuda y Recursos",
        faq: "Preguntas frecuentes",
        accessibility: "Declaración de accesibilidad",
        reportBugs: "Reportar errores",
        guides: "Guías de uso"
      },

      contact: {
        title: "Contacto y Comunidad",
        github: "GitHub",
       

      },

      bottom: {
        copyright: "© {year} Observatori BCN · Datos abiertos al servicio de la ciudadanía",
        lastUpdate: "Última actualización: {date}",
        terms: "Términos de uso",
        privacy: "Privacidad",
        cookies: "Cookies",
        collaborators: {
          title: "Colabora:",
          ajuntament: "Ajuntament de Barcelona",
          openData: "Open Data BCN"
        }
      }
    },

    accessibility: {
      title: "Accesibilidad",
      fontSize: {
        label: "Tamaño del texto",
        normal: "Texto normal",
        medium: "Texto medio",
        large: "Texto grande"
      },
      contrast: {
        label: "Modo de contraste",
        normal: "Normal",
        high: "Alto contraste",
        inverted: "Colores invertidos"
      }
    }
  }
};