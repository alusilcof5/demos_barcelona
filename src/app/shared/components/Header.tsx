import { Link, useLocation } from 'react-router-dom';
import { Globe, X, Menu, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [datosOpen, setDatosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;
  const isDatosActive = () =>
    location.pathname === '/demograf' || location.pathname === '/genero';

  // Cerrar dropdown al clicar fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDatosOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-white sticky top-0 z-[9999] shadow-sm">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-20 h-20">
              <img
                src="./images/logo1.png"
                alt="Logo Observatori BCN"
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">
                {t('header.logo')}
              </h1>
              <p className="text-xs text-gray-500">
                {t('header.tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex gap-2">

              {/* Inicio */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/')
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('header.nav.home')}
              </Link>

              {/* DESPLEGABLE DATOS */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDatosOpen(!datosOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isDatosActive()
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t('header.nav.demograf')}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      datosOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {datosOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border z-[9999]">
                    <Link
                      to="/demograf"
                      onClick={() => setDatosOpen(false)}
                      className="block px-4 py-3 hover:bg-blue-50"
                    >
                      Qui viu a Barcelona
                    </Link>

                    <Link
                      to="/genero"
                      onClick={() => setDatosOpen(false)}
                      className="block px-4 py-3 hover:bg-pink-50"
                    >
                      Bretxa de gènere
                    </Link>
                  </div>
                )}
              </div>

              {/* Corpus */}
              <Link
                to="/corpus"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/corpus')
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('header.nav.corpus')}
              </Link>

              {/* Metodologia */}
              <Link
                to="/metodologia"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/metodologia')
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('header.nav.methodology')}
              </Link>
            </nav>

            {/* Language */}
            <button
              onClick={() => setLanguage(language === 'ca' ? 'es' : 'ca')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {language.toUpperCase()}
              </span>
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Inici
            </Link>
            <Link to="/demograf" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Qui viu a Barcelona
            </Link>
            <Link to="/genero" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Bretxa de gènere
            </Link>
            <Link to="/corpus" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Corpus
            </Link>
            <Link to="/metodologia" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Metodologia
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
