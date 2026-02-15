/* 
export interface GeoJSONGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

// Centroide de un barrio
export interface Centroide {
  lat: number;
  lon: number;
}

// Datos de población de un barrio
export interface DatosPoblacion {
  actual: number;
  hace_1_ano: number | null;
  hace_5_anos: number | null;
  historico: number[];
}

// Datos de paro de un barrio
export interface DatosParo {
  actual: number;
  hace_1_ano: number | null;
  historico: number[];
}

// Barrio completo con todos sus datos
export interface Barrio {
  nombre: string;
  distrito_codigo: string;
  barrio_codigo: string;
  centroide: Centroide;
  geometria: GeoJSONGeometry;
  poblacion?: DatosPoblacion;
  paro?: DatosParo;
  tasa_paro?: number | null;
  evolucion_poblacion?: number | null;
  evolucion_paro?: number | null;
}

// Estructura del archivo JSON principal
export interface BarriosData {
  fecha_actualizacion: string;
  total_barrios: number;
  barrios: Barrio[];
}

// Distrito (agrupación de barrios)
export interface Distrito {
  codigo: string;
  nombre: string;
  barrios: Barrio[];
  poblacion_total: number;
  paro_total: number;
  tasa_paro_promedio: number;
}

// Métrica seleccionable para visualizar
export type MetricaVisualizacion = 
  | 'poblacion' 
  | 'paro' 
  | 'tasa_paro' 
  | 'evolucion_poblacion' 
  | 'evolucion_paro';

// Configuración de la leyenda del mapa
export interface ConfiguracionLeyenda {
  metrica: MetricaVisualizacion;
  titulo: string;
  rangos: {
    min: number;
    max: number;
    color: string;
    etiqueta: string;
  }[];
}

// Estadísticas agregadas de Barcelona
export interface EstadisticasBarcelona {
  poblacion_total: number;
  paro_total: number;
  tasa_paro_promedio: number;
  barrio_mas_poblado: {
    nombre: string;
    poblacion: number;
  };
  barrio_menor_poblacion: {
    nombre: string;
    poblacion: number;
  };
  barrio_mayor_tasa_paro: {
    nombre: string;
    tasa: number;
  };
  barrio_menor_tasa_paro: {
    nombre: string;
    tasa: number;
  };
}

// Props para componentes

export interface MapaProps {
  barrios: Barrio[];
  barrioSeleccionado: Barrio | null;
  metricaActiva: MetricaVisualizacion;
  onSeleccionarBarrio: (barrio: Barrio) => void;
}

export interface PanelInfoProps {
  barrio: Barrio | null;
  estadisticasGenerales: EstadisticasBarcelona;
  onCerrar: () => void;
}

export interface SelectorMetricaProps {
  metricaActiva: MetricaVisualizacion;
  onCambiarMetrica: (metrica: MetricaVisualizacion) => void;
}

export interface ComparadorBarriosProps {
  barrio1: Barrio;
  barrio2: Barrio;
  onCerrar: () => void;
}

// Filtros
export interface FiltrosBarrios {
  busqueda: string;
  distritos: string[];
  rangosPoblacion: {
    min: number;
    max: number;
  };
  rangosTasaParo: {
    min: number;
    max: number;
  };
}

// Datos para gráficos
export interface DatoGrafico {
  fecha: string;
  valor: number;
  etiqueta?: string;
}

export interface DatosGraficoComparacion {
  categoria: string;
  barrio1: number;
  barrio2: number;
} */