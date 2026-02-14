export const generoTranslations = {
  es: {
    
    header: {
      title: 'Análisis de Género',
      subtitle: 'Desagregación de datos por género en Barcelona',
      subtitleBold: 'Renta, empleo y demografía'
    },
    
    
    loading: 'Cargando datos de género...',
    error: 'Error',
    retry: 'Reintentar',
    

    stats: {
      population: {
        title: 'Población',
        men: 'Hombres',
        women: 'Mujeres',
        label: 'habitantes'
      },
      wageGap: {
        title: 'Brecha Salarial',
        subtitle: 'Diferencia de ingresos'
      },
      income: {
        title: 'Renta Media (último año)',
        label: 'al año'
      },
      unemployment: {
        title: 'Diferencia en Desempleo',
        higherFemale: 'Mayor paro femenino',
        higherMale: 'Mayor paro masculino'
      }
    },
    
    charts: {
      sectionTitle: 'Análisis Temporal y Demográfico',
      sectionSubtitle: 'Evolución de las diferencias de género en ingresos, empleo y distribución poblacional',
      
      wageGap: {
        title: 'Evolución de la Brecha Salarial',
        subtitle: 'Comparación de ingresos anuales por género (últimos 10 años)',
        men: 'Hombres',
        women: 'Mujeres',
        gap: 'Brecha %',
        maleIncome: 'Renta Masculina',
        femaleIncome: 'Renta Femenina'
      },
      
      incomeByAge: {
        title: 'Brecha Salarial por Grupo de Edad',
        subtitle: 'Comparación de ingresos anuales entre hombres y mujeres según edad',
        noData: 'No hay datos disponibles por edad',
        gap: 'Brecha',
        analysisTitle: 'Análisis',
        analysisText: 'La brecha salarial varía según el grupo de edad. El grupo de 30-44 años tiende a mostrar las mayores diferencias, coincidiendo con la edad de mayor responsabilidad familiar y desarrollo profesional.'
      },
      
      populationByDistrict: {
        title: 'Distribución de Población por Distrito',
        subtitle: 'Población total desagregada por género en cada distrito',
        inhabitants: 'habitantes',
        contextTitle: 'Contexto Demográfico',
        contextText: 'La distribución de población por género es relativamente equilibrada en todos los distritos. Los distritos más poblados (Eixample, Sant Martí) muestran patrones similares al resto de la ciudad.'
      }
    },
    
    // Conclusions
    conclusions: {
      title: 'Conclusiones Clave',
      wageGap: {
        title: 'Brecha Salarial Persistente',
        text: 'Aunque ha disminuido en los últimos años, la brecha salarial sigue siendo significativa, especialmente en grupos de edad entre 35-54 años.'
      },
      distribution: {
        title: 'Distribución Equilibrada',
        text: 'La distribución de población por género es relativamente equilibrada en todos los distritos de Barcelona, con ligera mayoría femenina.'
      },
      employment: {
        title: 'Empleo y Género',
        text: 'Las diferencias en tasas de desempleo entre géneros varían según la coyuntura económica, pero históricamente afectan más a las mujeres.'
      },
      sources: 'Fuentes:',
      sourcesText: 'Open Data Barcelona - Datos de renta, población y empleo desagregados por sexo (2000-2025)'
    }
  },
  
  ca: {
  
    header: {
      title: 'Anàlisi de Gènere',
      subtitle: 'Desagregació de dades per gènere a Barcelona',
      subtitleBold: 'Renda, ocupació i demografia'
    },
    
    
    loading: 'Carregant dades de gènere...',
    error: 'Error',
    retry: 'Tornar a intentar',
  
    stats: {
      population: {
        title: 'Població',
        men: 'Homes',
        women: 'Dones',
        label: 'habitants'
      },
      wageGap: {
        title: 'Bretxa Salarial',
        subtitle: 'Diferència d\'ingressos'
      },
      income: {
        title: 'Renda Mitjana (últim any)',
        label: 'a l\'any'
      },
      unemployment: {
        title: 'Diferència en Atur',
        higherFemale: 'Major atur femení',
        higherMale: 'Major atur masculí'
      }
    },
    

    charts: {
      sectionTitle: 'Anàlisi Temporal i Demogràfic',
      sectionSubtitle: 'Evolució de les diferències de gènere en ingressos, ocupació i distribució poblacional',
      
      wageGap: {
        title: 'Evolució de la Bretxa Salarial',
        subtitle: 'Comparació d\'ingressos anuals per gènere (últims 10 anys)',
        men: 'Homes',
        women: 'Dones',
        gap: 'Bretxa %',
        maleIncome: 'Renda Masculina',
        femaleIncome: 'Renda Femenina'
      },
      
      incomeByAge: {
        title: 'Bretxa Salarial per Grup d\'Edat',
        subtitle: 'Comparació d\'ingressos anuals entre homes i dones segons edat',
        noData: 'No hi ha dades disponibles per edat',
        gap: 'Bretxa',
        analysisTitle: 'Anàlisi',
        analysisText: 'La bretxa salarial varia segons el grup d\'edat. El grup de 30-44 anys tendeix a mostrar les majors diferències, coincidint amb l\'edat de major responsabilitat familiar i desenvolupament professional.'
      },
      
      populationByDistrict: {
        title: 'Distribució de Població per Districte',
        subtitle: 'Població total desagregada per gènere a cada districte',
        inhabitants: 'habitants',
        contextTitle: 'Context Demogràfic',
        contextText: 'La distribució de població per gènere és relativament equilibrada en tots els districtes. Els districtes més poblats (Eixample, Sant Martí) mostren patrons similars a la resta de la ciutat.'
      }
    },
    
    conclusions: {
      title: 'Conclusions Clau',
      wageGap: {
        title: 'Bretxa Salarial Persistent',
        text: 'Tot i que ha disminuït en els últims anys, la bretxa salarial continua sent significativa, especialment en grups d\'edat entre 35-54 anys.'
      },
      distribution: {
        title: 'Distribució Equilibrada',
        text: 'La distribució de població per gènere és relativament equilibrada en tots els districtes de Barcelona, amb lleugera majoria femenina.'
      },
      employment: {
        title: 'Ocupació i Gènere',
        text: 'Les diferències en taxes d\'atur entre gèneres varien segons la conjuntura econòmica, però històricament afecten més a les dones.'
      },
      sources: 'Fonts:',
      sourcesText: 'Open Data Barcelona - Dades de renda, població i ocupació desagregades per sexe (2000-2025)'
    }
  }
};