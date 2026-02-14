# CIVIXDATA - Barcelona

> Visualización interactiva de desigualdades socioeconómicas en Barcelona usando datos abiertos oficiales

[![Open Data Day 2026](https://img.shields.io/badge/Open%20Data%20Day-2026-blue)](https://opendataday.org/)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Data Source](https://img.shields.io/badge/Data-Open%20Data%20BCN-green)](https://opendata-ajuntament.barcelona.cat/)

---

## Descripción

**CIVIXDATA** es una aplicación web interactiva que analiza y visualiza las desigualdades socioeconómicas entre los 73 barrios de Barcelona. Utilizando datos oficiales de Open Data Barcelona, el proyecto permite:

- **Explorar** un mapa interactivo con índices de vulnerabilidad por barrio
- **Comparar** indicadores entre diferentes zonas de la ciudad
- **Analizar** brechas de género en renta y empleo
- **Descargar** datasets completos en múltiples formatos (JSON, CSV, Excel)
- **Entender** la metodología de cálculo en 3 niveles de detalle

**Objetivo:** Democratizar el acceso a información socioeconómica verificable para fomentar decisiones basadas en evidencia y transparencia.

Asismismo busca:
- Mejorar la transparencia de datos públicos
- Facilitar la comprensión de desigualdades territoriales
- Apoyar la toma de decisiones basada en datos abiertos
- Combatir la desinformación mediante datos verificables

## Impacto Social

Este proyecto no solo visualiza datos, sino que busca fortalecer la transparencia, la participación ciudadana y la toma de decisiones informadas en Barcelona.

¿Cómo contribuye a la ciudadanía?

- Permite a vecinos y asociaciones comprender mejor la situación socioeconómica de su barrio.

- Facilita la comparación entre territorios para detectar desigualdades estructurales.

- Ofrece datos verificables que pueden apoyar debates vecinales y procesos participativos.

- Sirve como herramienta de apoyo para periodistas, investigadores y organizaciones sociales.

### Conexión con problemas reales

Los indicadores analizados (renta, desempleo, envejecimiento, población extranjera) están directamente relacionados con:

- Desigualdad territorial

- Riesgo de exclusión social

- Acceso desigual a oportunidades

- Planificación de servicios públicos

- La visualización facilita identificar patrones que pueden orientar políticas públicas más equitativas.

### Impacto esperado

Mayor transparencia sobre las desigualdades urbanas.

Mejora del debate público mediante datos abiertos verificables.

Apoyo a la planificación basada en evidencia.

Reducción de la desinformación mediante acceso directo a fuentes oficiales.

---

## Características Principales

### Mapa Interactivo de Vulnerabilidad
- Visualización geográfica de los 73 barrios
- Código de colores según nivel de necesidad
- Información detallada al hacer clic en cada barrio

### Indicadores Múltiples
- **Renta media** por hogar
- **Tasa de desempleo**
- **Índice de envejecimiento**
- **Población extranjera**

Se construye un Índice de Vulnerabilidad Urbana basado en:

- Renta media
- Tasa de desempleo
- Índice de envejecimiento
- Porcentaje de población extranjera

### Análisis de Género
- Evolución de brecha salarial (2008-2025)
- Comparación de ingresos por edad y género
- Distribución poblacional por distrito

### Exportación de Datos
- Descarga en formato Excel (.xlsx)
- Descarga en CSV para análisis
- Descarga en JSON para desarrollo

### Multiidioma
- Interfaz completa en **Catalán** y **Español**
- Cambio de idioma en tiempo real

---

## Fuentes de Datos

Todos los datos provienen de **Open Data Barcelona** (Ajuntament de Barcelona):

| Dataset | Descripción | Enlace |
|---------|-------------|--------|
| **Renta por barrios** | Renta familiar disponible neta | [Ver dataset](https://opendata-ajuntament.barcelona.cat/data/es/dataset/renda-disponible-llars-bcn) |
| **Población por barrios** | Demografía y estructura poblacional | [Ver dataset](https://opendata-ajuntament.barcelona.cat/data/es/dataset/est-demo-poblacio-sexe-edat) |
| **Desempleo** | Tasa de paro del Instituto de Estadística de Cataluña | [Ver dataset](https://www.idescat.cat/treball/epa?tc=4&id=ib4044&lang=es) |
| **Geodatos** | Límites geográficos de barrios | [Ver dataset](https://opendata-ajuntament.barcelona.cat/data/es/dataset/20170706-districtes-barris/resource/cd800462-f326-429f-a67a-c69b7fc4c50a) |
| **Renta por sexo y edad** | Datos de género y edad del INE| [Ver dataset](https://www.ine.es/jaxiT3/Tabla.htm?t=9942) |

---

## Instalación

### Requisitos Previos
- **Node.js** 
- **npm** o **yarn**

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/alusilcof5/demos_barcelona.git
cd demos_barcelona
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```
---
5. **Funcionalidades principales**

- Mapa interactivo por barrios
- Comparación entre barrios
- Análisis demográfico
- Análisis de brecha de género
- Descarga de datos en formato JSON / CSV
- Visualización clara y accesible

## Uso

### Explorar el Mapa
1. Navega a la sección **"Población"** (Demograf)
2. Haz clic en cualquier barrio del mapa
3. Visualiza los indicadores en el panel lateral
4. Compara con otros barrios

### Analizar Datos de Género
1. Navega a la sección **"Análisis de Género"**
2. Explora gráficos interactivos
3. Compara brechas salariales por edad

### Descargar Datos
1. Ve a la sección **"Datos"** (Corpus)
2. Selecciona el formato deseado (Excel/CSV/JSON)
3. Haz clic en "Descargar"

### Entender la Metodología
1. Ve a **"Cómo se ha hecho"** (Metodologia)
2. Selecciona tu nivel de detalle:
   - **Simple:** Para ciudadanos
   - **Intermedio:** Para estudiantes/periodistas
   - **Técnico:** Para investigadores

---

## Metodología

### Cálculo del Índice de Vulnerabilidad

El índice se calcula mediante una **media ponderada** de 4 indicadores normalizados (0-1):

```
Vulnerabilidad = 0.35×Renda + 0.30×Atur + 0.20×Envelliment + 0.15×Immigració
```

**Normalización:**
- **Renta:** Invertida (menor renta → mayor vulnerabilidad)
- **Desempleo:** Directa (mayor paro → mayor vulnerabilidad)
- **Envejecimiento:** Directa (mayor índice → mayor necesidad de servicios)
- **Inmigración:** Directa (mayor % → posible vulnerabilidad administrativa)

**Categorización:**
- 🟢 Baja: 0-30
- 🟡 Media: 30-60
- 🟠 Alta: 60-75
- 🔴 Muy Alta: 75-100

Para más detalles, consulta la [metodología completa](src/app/pages/MetodologiaPage.tsx).

---

## Tecnologías

### Frontend
- **React 18** + **TypeScript**
- **React Router** para navegación
- **Tailwind CSS** para estilos
- **Recharts** para gráficos
- **Leaflet** para mapas interactivos

### Estado y Datos
- **Zustand** para gestión de estado
- **React Query** para fetching de datos
- **XLSX** para exportación Excel

### UI Components
- **shadcn/ui** (componentes accesibles)
- **Lucide React** (iconos)
- **Sonner** (notificaciones)

### Internacionalización
- Context API personalizado
- Soporte CA/ES

---

## Estructura del Proyecto

```
demos_barcelona/
├── public/
│   ├── geojson/           # GeoJSON de barrios
│   └── images/            # Imágenes de la app
├── src/
│   ├── app/
│   │   ├── components/    # Componentes UI reutilizables
│   │   ├── features/      # Módulos por funcionalidad
│   │   │   ├── demograf/  # Análisis demográfico
│   │   │   ├── genero/    # Análisis de género
│   │   │   └── corpuscat/ # Gestión de corpus
│   │   ├── i18n/          # Traducciones CA/ES
│   │   ├── pages/         # Páginas principales
│   │   ├── shared/        # Componentes compartidos
│   │   └── routes.tsx     # Configuración de rutas
│   └── main.tsx           # Punto de entrada
├── README.md              # Este archivo
└── package.json
```

---

## Contribuir

¡Las contribuciones son bienvenidas! Este es un proyecto de código abierto.

### Cómo contribuir

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guías de Contribución

- Usa nombres de variables en **inglés**
- Sigue las convenciones de **TypeScript**
- Añade **tests** para nuevas funcionalidades
- Actualiza la **documentación** si es necesario
- Respeta la estructura de carpetas existente

---

## Licencia

Este proyecto está bajo la licencia **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

Esto significa que puedes:
- **Compartir** — copiar y redistribuir el material
- **Adaptar** — remezclar, transformar y crear a partir del material
- **Uso comercial** permitido

Bajo las siguientes condiciones:
- **Atribución** — Debes dar crédito apropiado
- 🔗 Enlazar a la licencia: https://creativecommons.org/licenses/by/4.0/

---

## Autores y Créditos

**Desarrollado por:** Ana Lucía Silva Córdoba .

**Proyecto:** Open Data Day 2026 Barcelona  

**Fecha:** 10 de marzo de 2026

### Agradecimientos

- **Ajuntament de Barcelona** por Open Data BCN
- **Iniciativa Barcelona Open Data Day** por la iniciativa 

---

## 📞 Contacto

- **Email:** alusilvacordoba@gmai.com   
- **GitHub:** [@alusilcof5](https://github.com/alusilcof5)

---

## Reporte de Bugs

Si encuentras algún error, por favor:

1. Verifica que no haya sido reportado en [Issues](../../issues)
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Capturas de pantalla (si aplica)
   - Navegador y versión

---

## Si te gusta este proyecto...

- Dale una ⭐ en GitHub
- Compártelo en redes sociales
- Úsalo en tus análisis o reportajes
- Contribuye con mejoras

---

## Recursos Adicionales

- [Open Data Barcelona](https://opendata-ajuntament.barcelona.cat/)
- [Open Data Day](https://opendataday.org/)
- [Documentación de Leaflet](https://leafletjs.com/)
- [Guía de Tailwind CSS](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)

---

¡Gracias por tu interés en datos abiertos y transparencia! 

---

# Licencia...

Este proyecto se distribuye bajo licencia MIT.
Los datos utilizados mantienen su licencia original (CC BY 4.0 u otras especificadas por el proveedor).

      *Última actualización: Febrero 2026*