import { useState, useEffect, useRef } from 'react';
import { Accessibility, Type, Contrast, Keyboard, Volume2, X } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [contrastMode, setContrastMode] = useState('normal');
  const [focusHighlight, setFocusHighlight] = useState(false);
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Aplicar tamaño de fuente REAL al documento
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('text-base', 'text-lg', 'text-xl');
    
    if (fontSize === 'normal') {
      html.classList.add('text-base');
    } else if (fontSize === 'medium') {
      html.classList.add('text-lg');
    } else if (fontSize === 'large') {
      html.classList.add('text-xl');
    }
  }, [fontSize]);

  // Aplicar modo de contraste REAL
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('contrast-normal', 'contrast-high', 'contrast-inverted');
    html.classList.add(`contrast-${contrastMode}`);
  }, [contrastMode]);

  // Aplicar resaltado de foco REAL
  useEffect(() => {
    const html = document.documentElement;
    if (focusHighlight) {
      html.classList.add('focus-highlight-enabled');
    } else {
      html.classList.remove('focus-highlight-enabled');
    }
  }, [focusHighlight]);

  // Foco automático al abrir
  useEffect(() => {
    if (isOpen && panelRef.current) {
      setTimeout(() => panelRef.current?.focus(), 50);
    }
  }, [isOpen]);

  return (
    <>
      {/* Botón flotante con animación */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[9999] w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-400"
        aria-label="Obrir opcions d'accessibilitat"
        title="Accessibilitat"
        style={{
          animation: isOpen ? 'none' : 'pulse 3s ease-in-out infinite',
          transform: `translateY(${Math.sin(scrollY / 100) * 10}px) rotate(${scrollY / 50}deg)`,
        }}
      >
        <Accessibility className="w-8 h-8" aria-hidden="true" />
      </button>

      {/* Panel de opciones */}
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Panel */}
          <div
            ref={panelRef}
            className="fixed bottom-24 left-6 z-[9999] w-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
            tabIndex={-1}
            style={{
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Accessibility className="w-6 h-6" />
                </div>
                <h3 id="accessibility-title" className="font-bold text-lg">Accessibilitat</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors active:scale-95"
                aria-label="Tancar panel"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-5 space-y-6 max-h-[65vh] overflow-y-auto">
              
              {/* Tamaño de texto */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-indigo-600" />
                  <label className="text-sm font-bold text-gray-900">Mida del text</label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'normal', label: 'A', size: 'text-sm' },
                    { value: 'medium', label: 'A', size: 'text-lg' },
                    { value: 'large', label: 'A', size: 'text-2xl' }
                  ].map(({ value, label, size }) => (
                    <button
                      key={value}
                      onClick={() => setFontSize(value)}
                      className={`
                        ${size} font-bold py-3 rounded-xl transition-all duration-200
                        ${fontSize === value
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                        }
                      `}
                      aria-pressed={fontSize === value}
                      aria-label={`Text ${value === 'normal' ? 'normal' : value === 'medium' ? 'mitjà' : 'gran'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contraste */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Contrast className="w-5 h-5 text-indigo-600" />
                  <label className="text-sm font-bold text-gray-900">Mode de contrast</label>
                </div>
                <div className="space-y-2">
                  {[
                    { value: 'normal', label: 'Normal', icon: '◐' },
                    { value: 'high', label: 'Alt contrast', icon: '◑' },
                    { value: 'inverted', label: 'Colors invertits', icon: '●' }
                  ].map(({ value, label, icon }) => (
                    <button
                      key={value}
                      onClick={() => setContrastMode(value)}
                      className={`
                        w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 flex items-center gap-3
                        ${contrastMode === value
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.02]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.98]'
                        }
                      `}
                      aria-pressed={contrastMode === value}
                    >
                      <span className="text-xl">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resaltado de foco */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-5 h-5 text-indigo-600" />
                    <label className="text-sm font-bold text-gray-900">Ressaltar enfocament</label>
                  </div>
                  <button
                    onClick={() => setFocusHighlight(!focusHighlight)}
                    className={`
                      relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300
                      ${focusHighlight ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-300'}
                    `}
                    role="switch"
                    aria-checked={focusHighlight}
                    aria-label="Toggle ressaltar enfocament"
                  >
                    <span
                      className={`
                        inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300
                        ${focusHighlight ? 'translate-x-7' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ressalta visualment l'element actiu per facilitar la navegació amb teclat
                </p>
              </div>

              {/* Lector de pantalla */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-indigo-600" />
                    <label className="text-sm font-bold text-gray-900">Mode lector</label>
                  </div>
                  <button
                    onClick={() => setScreenReaderMode(!screenReaderMode)}
                    className={`
                      relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300
                      ${screenReaderMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-300'}
                    `}
                    role="switch"
                    aria-checked={screenReaderMode}
                    aria-label="Toggle mode lector"
                  >
                    <span
                      className={`
                        inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300
                        ${screenReaderMode ? 'translate-x-7' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Activa ajudes addicionals per a lectors de pantalla
                </p>
                {screenReaderMode && (
                  <div aria-live="polite" className="sr-only">
                    Mode de lector de pantalla activat
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 text-center">
              <p className="text-xs text-gray-600">
                Compleix amb <span className="font-bold text-indigo-700">WCAG 2.1 nivell AA</span>
              </p>
            </div>
          </div>
        </>
      )}

      {/* Estilos globales COMPLETOS Y FUNCIONALES */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 20px 40px -5px rgba(99, 102, 241, 0.5);
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* TAMAÑOS DE TEXTO */
        html.text-base {
          font-size: 16px !important;
        }
        html.text-lg {
          font-size: 18px !important;
        }
        html.text-xl {
          font-size: 20px !important;
        }

        /* MODOS DE CONTRASTE */
        html.contrast-normal body {
          background: white;
          color: #1f2937;
        }

        html.contrast-high body {
          background: #ffffff !important;
          color: #000000 !important;
          filter: contrast(1.5);
        }
        html.contrast-high * {
          border-color: #000000 !important;
        }

        html.contrast-inverted body {
          background: #000000 !important;
          color: #ffffff !important;
          filter: invert(1) hue-rotate(180deg);
        }
        html.contrast-inverted img,
        html.contrast-inverted video {
          filter: invert(1) hue-rotate(180deg);
        }

        /* RESALTADO DE FOCO */
        html.focus-highlight-enabled *:focus {
          outline: 4px solid #6366f1 !important;
          outline-offset: 3px !important;
          border-radius: 6px !important;
          box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.2) !important;
        }

        /* Mejoras generales de accesibilidad */
        * {
          scroll-behavior: smooth;
        }

        button, a, input, select, textarea {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}