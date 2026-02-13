import { Link, useLocation } from 'react-router-dom'; // ✅ CORREGIDO: Cambiado de 'react-router' a 'react-router-dom'
import { BarChart3, X, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Inici', ariaLabel: 'Anar a la pàgina d\'inici' },
    { path: '/demograf', label: 'DemoGràfic', ariaLabel: 'Explorar l\'atlas demogràfic' },
    { path: '/corpus', label: 'CORPUS·CAT', ariaLabel: 'Veure el corpus de dades' },
    { path: '/metodologia', label: 'Metodologia', ariaLabel: 'Llegir la metodologia' }
  ];
  
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Decorative gradient bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            aria-label="Observatori BCN - Pàgina d'inici"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                Observatori BCN
              </h1>
              <p className="text-xs text-gray-500">Open Data Day 2026</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2" aria-label="Navegació principal">
            {navItems.map((item) => {
              const isCurrentPage = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-label={item.ariaLabel}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isCurrentPage
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Tancar menú' : 'Obrir menú'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden pb-4 border-t border-gray-100 pt-4 mt-4"
            aria-label="Navegació mòbil"
          >
            {navItems.map((item) => {
              const isCurrentPage = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={item.ariaLabel}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${
                    isCurrentPage
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}