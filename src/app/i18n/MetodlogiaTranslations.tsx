export const sobreElProyectoTranslations = {
  es: {
    header: {
      title: "Un Proyecto contra la Desinformación",
      subtitle: "Datos abiertos de calidad para una democracia más transparente",
      description: "Transformamos la cobertura mediática de figuras públicas en datos verificables, accesibles y útiles para toda la sociedad."
    },
    
    problem: {
      title: "¿Por qué existe este proyecto?",
      intro: "Vivimos en una era de información abundante pero de calidad desigual. La desinformación amenaza nuestras democracias y la confianza pública.",
      challenges: [
        {
          title: "Información fragmentada",
          description: "Las noticias sobre figuras públicas están dispersas en miles de medios, sin conexión entre sí."
        },
        {
          title: "Difícil de verificar",
          description: "Es complicado contrastar lo que dicen los políticos con lo que realmente hacen o han dicho antes."
        },
        {
          title: "Memoria colectiva frágil",
          description: "Lo que era noticia hace meses desaparece del debate público, aunque siga siendo relevante."
        },
        {
          title: "Datos no estructurados",
          description: "La información existe pero no está organizada de forma que permita análisis o comparaciones."
        }
      ]
    },

    solution: {
  title: "Transparència i fonts oficials",
  intro: "Un verificador que garanteix informació fiable connectant directament amb les bases de dades de l'Ajuntament de Barcelona.",
  
  howItWorks: {
    title: "De la font oficial a tu",
    steps: [
      {
        number: "1",
        title: "Fonts 100% oficials",
        description: "Totes les dades provenen de l'API oficial d'Open Data Barcelona, gestionada per l'Ajuntament."
      },
      {
        number: "2",
        title: "Sense intermediaris",
        description: "La informació es carrega directament des de la font cada vegada, sense bases de dades pròpies que puguin quedar obsoletes."
      },
      {
        number: "3",
        title: "Resposta contextualitzada",
        description: "No només et donem xifres: comparem amb la mitjana, mostrem posicions al rànquing i oferim context útil."
      },
      {
        number: "4",
        title: "Verificació independent",
        description: "Cada resposta inclou l'enllaç al dataset oficial perquè puguis comprovar les dades pel teu compte."
      }
        ]
      },

      visual: {
        title: "De noticias dispersas a conocimiento estructurado",
        before: "Antes: Miles de artículos sin conexión",
        after: "Después: Datos organizados y relacionados"
      }
    },

    impact: {
      title: "Impacto Real",
      intro: "Este proyecto contribuye directamente a los objetivos del Open Data Day 2026:",
      
      goals: [
        {
          icon: "Shield",
          title: "Combatir la desinformación",
          description: "Facilitamos la verificación de hechos al reunir todas las menciones mediáticas en un solo lugar.",
          example: "Ejemplo: Un periodista puede ver rápidamente todas las declaraciones de un político sobre un tema específico a lo largo del tiempo."
        },
        {
          icon: "Eye",
          title: "Transparencia democrática",
          description: "Hacemos visible la cobertura mediática y permitimos que cualquier ciudadano acceda a información contrastada.",
          example: "Ejemplo: Una asociación ciudadana puede analizar qué políticos reciben más atención mediática y por qué temas."
        },
        {
          icon: "Users",
          title: "Participación informada",
          description: "Damos herramientas para que la ciudadanía tome decisiones basadas en datos reales, no en titulares aislados.",
          example: "Ejemplo: Antes de unas elecciones, puedes ver el historial completo de un candidato en los medios."
        },
        {
          icon: "Bot",
          title: "IA responsable",
          description: "Creamos datos limpios y verificados que pueden entrenar sistemas de inteligencia artificial sin sesgos ni desinformación.",
          example: "Ejemplo: Un sistema de IA puede aprender a analizar tendencias políticas con datos fiables y etiquetados."
        }
      ],

      metrics: {
        title: "En números",
        stats: [
          {
            number: "50.000+",
            label: "Menciones analizadas"
          },
          {
            number: "1.200+",
            label: "Figuras públicas"
          },
          {
            number: "100+",
            label: "Medios monitorizados"
          },
          {
            number: "100%",
            label: "Datos abiertos y gratuitos"
          }
        ]
      }
    },

    uses: {
      title: "¿Quién puede usar estos datos?",
      intro: "Nuestros datos son útiles para cualquier persona u organización que valore la información de calidad:",
      
      profiles: [
        {
          icon: "Newspaper",
          title: "Periodistas",
          description: "Investiga el historial completo de figuras públicas, encuentra patrones en declaraciones y contrasta información rápidamente.",
          tasks: [
            "Fact-checking de declaraciones",
            "Investigaciones en profundidad",
            "Seguimiento de temas a largo plazo"
          ]
        },
        {
          icon: "GraduationCap",
          title: "Investigadores y educadores",
          description: "Analiza tendencias mediáticas, estudia el discurso público y enseña con ejemplos reales de datos abiertos.",
          tasks: [
            "Análisis de cobertura mediática",
            "Estudios de comunicación política",
            "Proyectos educativos con datos reales"
          ]
        },
        {
          icon: "Users",
          title: "Ciudadanía activa",
          description: "Infórmate con datos verificados, compara trayectorias políticas y participa en el debate público con fundamentos.",
          tasks: [
            "Seguimiento de representantes políticos",
            "Toma de decisiones electorales informadas",
            "Participación en debates con datos"
          ]
        },
      ]
    },

    quality: {
      title: "Garantía de Calidad",
      intro: "No todos los datos abiertos son iguales. Nos comprometemos con la excelencia:",
      
      principles: [
        {
          icon: "Shield",
          title: "Verificación múltiple",
          description: "Cada dato pasa por varios filtros automáticos y validaciones cruzadas antes de publicarse."
        },
        {
          icon: "Eye",
          title: "Trazabilidad completa",
          description: "Cada mención incluye enlace al artículo original, fecha de publicación y contexto completo."
        },
        {
          icon: "CheckCircle",
          title: "Actualización constante",
          description: "Los datos se actualizan diariamente con nueva información de los medios monitorizados."
        },
        {
          icon: "Globe",
          title: "Formato estándar",
          description: "Usamos formatos abiertos y ampliamente compatibles (CSV, JSON) para máxima accesibilidad."
        },
        {
          icon: "Heart",
          title: "Transparencia total",
          description: "Documentamos nuestra metodología y limitaciones. Si algo puede mejorar, lo decimos."
        },
        {
          icon: "Zap",
          title: "Libre y gratuito",
          description: "Sin restricciones, sin costes, sin registro obligatorio. Datos verdaderamente abiertos."
        }
      ]
    },

    data: {
  title: "¿Cómo funciona el verificador?",
  intro: "Nuestro verificador conecta directamente con Open Data Barcelona para ofrecerte:",
  
  fields: [
    {
      name: "Datos Oficiales Verificados",
      description: "100% provenientes de la API oficial del Ajuntament de Barcelona"
    },
    {
      name: "Consultas Inteligentes",
      description: "Pregunta en lenguaje natural: '¿Qué barrio es más rico?', 'Compara Gràcia con Sarrià'"
    },
    {
      name: "Renta Familiar",
      description: "Renta disponible per cápita de 73 barrios de Barcelona (año 2022)"
    },
    {
      name: "Rankings Automáticos",
      description: "Top 5 de barrios por nivel de renta, comparaciones automáticas con la media"
    },
    {
      name: "Búsqueda Flexible",
      description: "El sistema encuentra barrios aunque no escribas el nombre exacto"
    },
    {
      name: "Transparencia Total",
      description: "Cada respuesta incluye enlace directo al dataset oficial para verificación"
    }        
      ],
    },

    
    values: {
      title: "Nuestros Valores",
      intro: "Este proyecto se construye sobre principios fundamentales:",
      
      list: [
        {
          icon: "Shield",
          title: "Independencia",
          description: "No tenemos afiliación política ni recibimos financiación de partidos o grupos de interés."
        },
        {
          icon: "Eye",
          title: "Objetividad",
          description: "No editamos ni interpretamos las noticias, solo las organizamos y hacemos accesibles."
        },
        {
          icon: "Globe",
          title: "Apertura radical",
          description: "Todo es gratuito, sin restricciones de uso, y con el código fuente disponible públicamente."
        },
        {
          icon: "Users",
          title: "Servicio público",
          description: "Creemos que el acceso a información de calidad es un derecho, no un privilegio."
        }
      ]
    },

    cta: {
      title: "Únete al Movimiento Open Data",
      description: "Los datos abiertos son una herramienta poderosa para la democracia y la transparencia. Este proyecto es nuestra contribución.",
      actions: {
        explore: "Explorar los datos",
        download: "Descargar dataset",
        learn: "Ver metodología completa",
        contact: "Contactar"
      }
    }
  },
  
  ca: {
    header: {
      title: "Un Projecte contra la Desinformació",
      subtitle: "Dades obertes de qualitat per a una democràcia més transparent",
      description: "Transformem la cobertura mediàtica de figures públiques en dades verificables, accessibles i útils per a tota la societat."
    },
    
    problem: {
      title: "Per què existeix aquest projecte?",
      intro: "Vivim en una era d'informació abundant però de qualitat desigual. La desinformació amenaça les nostres democràcies i la confiança pública.",
      challenges: [
        {
          title: "Informació fragmentada",
          description: "Les notícies sobre figures públiques estan disperses en milers de mitjans, sense connexió entre elles."
        },
        {
          title: "Difícil de verificar",
          description: "És complicat contrastar el que diuen els polítics amb el que realment fan o han dit abans."
        },
        {
          title: "Memòria col·lectiva fràgil",
          description: "El que era notícia fa mesos desapareix del debat públic, tot i que continuï sent rellevant."
        },
        {
          title: "Dades no estructurades",
          description: "La informació existeix però no està organitzada de manera que permeti anàlisis o comparacions."
        }
      ]
    },

    solution: {
  title: "Transparencia y fuentes oficiales",
  intro: "Un verificador que garantiza información fiable conectando directamente con las bases de datos del Ayuntamiento de Barcelona.",
  
  howItWorks: {
    title: "De la fuente oficial a ti",
    steps: [
      {
        number: "1",
        title: "Fuentes 100% oficiales",
        description: "Todos los datos provienen de la API oficial de Open Data Barcelona, gestionada por el Ayuntamiento."
      },
      {
        number: "2",
        title: "Sin intermediarios",
        description: "La información se carga directamente desde la fuente cada vez, sin bases de datos propias que puedan quedar obsoletas."
      },
      {
        number: "3",
        title: "Respuesta contextualizada",
        description: "No solo te damos cifras: comparamos con la media, mostramos posiciones en el ranking y ofrecemos contexto útil."
      },
      {
        number: "4",
        title: "Verificación independiente",
        description: "Cada respuesta incluye el enlace al dataset oficial para que puedas comprobar los datos por tu cuenta."
      }
        ]
      },

      visual: {
        title: "De notícies disperses a coneixement estructurat",
        before: "Abans: Milers d'articles sense connexió",
        after: "Després: Dades organitzades i relacionades"
      }
    },

    impact: {
      title: "Impacte Real",
      intro: "Aquest projecte contribueix directament als objectius de l'Open Data Day 2026:",
      
      goals: [
        {
          icon: "Shield",
          title: "Combatre la desinformació",
          description: "Facilitem la verificació de fets reunint totes les mencions mediàtiques en un sol lloc.",
          example: "Exemple: Un periodista pot veure ràpidament totes les declaracions d'un polític sobre un tema específic al llarg del temps."
        },
        {
          icon: "Eye",
          title: "Transparència democràtica",
          description: "Fem visible la cobertura mediàtica i permetem que qualsevol ciutadà accedeixi a informació contrastada.",
          example: "Exemple: Una associació ciutadana pot analitzar quins polítics reben més atenció mediàtica i per quins temes."
        },
        {
          icon: "Users",
          title: "Participació informada",
          description: "Donem eines perquè la ciutadania prengui decisions basades en dades reals, no en titulars aïllats.",
          example: "Exemple: Abans d'unes eleccions, pots veure l'historial complet d'un candidat als mitjans."
        },
        {
          icon: "Bot",
          title: "IA responsable",
          description: "Creem dades netes i verificades que poden entrenar sistemes d'intel·ligència artificial sense biaixos ni desinformació.",
          example: "Exemple: Un sistema d'IA pot aprendre a analitzar tendències polítiques amb dades fiables i etiquetades."
        }
      ],

      metrics: {
        title: "En xifres",
        stats: [
          {
            number: "50.000+",
            label: "Mencions analitzades"
          },
          {
            number: "1.200+",
            label: "Figures públiques"
          },
          {
            number: "100+",
            label: "Mitjans monitoritzats"
          },
          {
            number: "100%",
            label: "Dades obertes i gratuïtes"
          }
        ]
      }
    },

    uses: {
      title: "Qui pot usar aquestes dades?",
      intro: "Les nostres dades són útils per a qualsevol persona o organització que valori la informació de qualitat:",
      
      profiles: [
        {
          icon: "Newspaper",
          title: "Periodistes",
          description: "Investiga l'historial complet de figures públiques, troba patrons en declaracions i contrasta informació ràpidament.",
          tasks: [
            "Fact-checking de declaracions",
            "Investigacions en profunditat",
            "Seguiment de temes a llarg termini"
          ]
        },
        {
          icon: "GraduationCap",
          title: "Investigadors i educadors",
          description: "Analitza tendències mediàtiques, estudia el discurs públic i ensenya amb exemples reals de dades obertes.",
          tasks: [
            "Anàlisi de cobertura mediàtica",
            "Estudis de comunicació política",
            "Projectes educatius amb dades reals"
          ]
        },
        {
          icon: "Users",
          title: "Ciutadania activa",
          description: "Informa't amb dades verificades, compara trajectòries polítiques i participa en el debat públic amb fonaments.",
          tasks: [
            "Seguiment de representants polítics",
            "Presa de decisions electorals informades",
            "Participació en debats amb dades"
          ]
        },
      ]
    },

    quality: {
      title: "Garantia de Qualitat",
      intro: "No totes les dades obertes són iguals. Ens comprometem amb l'excel·lència:",
      
      principles: [
        {
          icon: "Shield",
          title: "Verificació múltiple",
          description: "Cada dada passa per diversos filtres automàtics i validacions creuades abans de publicar-se."
        },
        {
          icon: "Eye",
          title: "Traçabilitat completa",
          description: "Cada menció inclou enllaç a l'article original, data de publicació i context complet."
        },
        {
          icon: "CheckCircle",
          title: "Actualització constant",
          description: "Les dades s'actualitzen diàriament amb nova informació dels mitjans monitoritzats."
        },
        {
          icon: "Globe",
          title: "Format estàndard",
          description: "Usem formats oberts i àmpliament compatibles (CSV, JSON) per a màxima accessibilitat."
        },
        {
          icon: "Heart",
          title: "Transparència total",
          description: "Documentem la nostra metodologia i limitacions. Si alguna cosa pot millorar, ho diem."
        },
        {
          icon: "Zap",
          title: "Lliure i gratuït",
          description: "Sense restriccions, sense costos, sense registre obligatori. Dades veritablement obertes."
        }
      ]
    },

    data: {
  title: "Què pots verificar?",
  intro: "El verificador et permet consultar dades oficials sobre:",
  
  fields: [
    {
      name: "Renda per Barris",
      description: "Renda familiar disponible per càpita de cada barri de Barcelona (€/any)"
    },
    {
      name: "Rànquings i Comparacions",
      description: "Top de barris més rics o pobres, comparacions entre diferents zones"
    },
    {
      name: "Estadístiques Generals",
      description: "Renda mitjana de Barcelona, valors màxims i mínims per barri"
    },
    {
      name: "Dades per Barri Específic",
      description: "Consulta la renda de qualsevol barri i la seva posició al rànquing"
    },
    {
      name: "Fonts Oficials",
      description: "Totes les dades provenen directament de l'API d'Open Data Barcelona"
    },
    {
      name: "Actualització en Temps Real",
      description: "Les dades es carreguen directament des de la font oficial cada vegada que hi accedeixes"
    }
      ],

      
    },

    values: {
      title: "Els Nostres Valors",
      intro: "Aquest projecte es construeix sobre principis fonamentals:",
      
      list: [
        {
          icon: "Shield",
          title: "Independència",
          description: "No tenim afiliació política ni rebem finançament de partits o grups d'interès."
        },
        {
          icon: "Eye",
          title: "Objectivitat",
          description: "No editem ni interpretem les notícies, només les organitzem i fem accessibles."
        },
        {
          icon: "Globe",
          title: "Obertura radical",
          description: "Tot és gratuït, sense restriccions d'ús, i amb el codi font disponible públicament."
        },
        {
          icon: "Users",
          title: "Servei públic",
          description: "Creiem que l'accés a informació de qualitat és un dret, no un privilegi."
        }
      ]
    },

    cta: {
      title: "Uneix-te al Moviment Open Data",
      description: "Les dades obertes són una eina poderosa per a la democràcia i la transparència. Aquest projecte és la nostra contribució.",
      actions: {
        explore: "Explorar les dades",
        download: "Descarregar dataset",
        learn: "Veure metodologia completa",
        contact: "Contactar"
      }
    }
  }
};