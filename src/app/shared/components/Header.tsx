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

  /* =====================================================
     NAV STRUCTURE
     Inicio | Datos | Población ▼ | Metodología
  ===================================================== */

  const NAV_ITEMS = [
    { label: 'Inicio', path: '/' },
    { label: 'Datos', path: '/datos' },
    {
      label: 'Población',
      dropdown: [
        {
          label: 'Qui viu a Barcelona',
          path: '/demograf',
          hover: 'hover:bg-blue-50',
        },
        {
          label: 'Bretxa de gènere',
          path: '/genero',
          hover: 'hover:bg-pink-50',
        },
      ],
    },
    { label: 'Metodología', path: '/metodologia' },
  ];

  /* =====================================================
     HELPERS
  ===================================================== */

  const isPathActive = (path?: string) =>
    path ? location.pathname === path : false;

  const isDropdownActive = (dropdown?: any[]) =>
    dropdown?.some((item) => item.path === location.pathname);

  /* =====================================================
     CLOSE DROPDOWN OUTSIDE CLICK
  ===================================================== */

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

  /* =====================================================
     COMPONENT
  ===================================================== */

  return (
    <header className="border-b bg-white sticky top-0 z-[9999] shadow-sm">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">

          {/* LOGO */}
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

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex gap-2">
              {NAV_ITEMS.map((item) => {

                /* NORMAL LINKS */
                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.path}
                      to={item.path!}
                      className={`px-4 py-2 rounded-lg ${
                        isPathActive(item.path)
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                /* POBLACIÓN DROPDOWN */
                const active = isDropdownActive(item.dropdown);

                return (
                  <div
                    key={item.label}
                    className="relative"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setPoblacionOpen(!poblacionOpen)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
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
                            className={`block px-4 py-3 ${sub.hover}`}
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {language.toUpperCase()}
              </span>
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4">
            {NAV_ITEMS.map((item) => {

              if (!item.dropdown) {
                return (
                  <Link
                    key={item.path}
                    to={item.path!}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2"
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
                  className="block py-2"
                >
                  {sub.label}
                </Link>
              ));
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
