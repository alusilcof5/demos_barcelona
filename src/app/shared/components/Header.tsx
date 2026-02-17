import { Link, useLocation } from 'react-router-dom';
import { Globe, X, Menu, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [poblacionOpen, setPoblacionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const NAV_ITEMS = [
    { label: t('header.nav.home'), path: '/' },
    {
      label: t('header.nav.demograf'),
      dropdown: [
        {
          label: t('header.nav.demograf'),
          path: '/demograf',
          hover: 'hover:bg-blue-50',
        },
        {
          label: t('Brecha de genero'),
          path: '/genero',
          hover: 'hover:bg-pink-50',
        },
      ],
    },
    { label: t('Verificador'), path: '/verificador' }, 

    { label: t('header.nav.methodology'), path: '/sobre-el-proyecto' },
    
    { label: t('Contacto'), path: '/contacto' },
  ];

  const isPathActive = (path?: string) =>
    path ? location.pathname === path : false;

  const isDropdownActive = (dropdown?: any[]) =>
    dropdown?.some((item) => item.path === location.pathname);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setPoblacionOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-white sticky top-0 z-[9999] shadow-sm">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-20 h-20">
              <img
                src="./images/logo1.png"
                alt="Logo CIVIXDATA BCN"
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

          <div className="hidden md:flex items-center gap-4">
            <nav className="flex gap-2">
              {NAV_ITEMS.map((item) => {

                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.path}
                      to={item.path!}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isPathActive(item.path)
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const active = isDropdownActive(item.dropdown);

                return (
                  <div
                    key={item.label}
                    className="relative"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setPoblacionOpen(!poblacionOpen)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        active
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          poblacionOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {poblacionOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border z-[9999]">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setPoblacionOpen(false)}
                            className={`block px-4 py-3 ${sub.hover} transition-colors`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* LANGUAGE */}
            <button
              onClick={() =>
                setLanguage(language === 'ca' ? 'es' : 'ca')
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {language.toUpperCase()}
              </span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4 space-y-2">
            {NAV_ITEMS.map((item) => {

              if (!item.dropdown) {
                return (
                  <Link
                    key={item.path}
                    to={item.path!}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-3 rounded-lg transition-colors ${
                      isPathActive(item.path)
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return item.dropdown.map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg transition-colors ${
                    isPathActive(sub.path)
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {sub.label}
                </Link>
              ));
            })}

            <button
              onClick={() => {
                setLanguage(language === 'ca' ? 'es' : 'ca');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50 w-full transition-colors mt-4"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {language.toUpperCase()}
              </span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}