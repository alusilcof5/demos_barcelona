import { Link } from 'react-router-dom'; // ✅ CORREGIDO: Cambiado de 'react-router' a 'react-router-dom'
import { Database, Github, Mail, Heart, ExternalLink, FileText, BookOpen } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Sobre el proyecto */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-white text-lg">Observatori BCN</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Eina de codi obert per visualitzar desigualtats urbanes a Barcelona amb dades públiques verificables.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-800 rounded">CC BY 4.0</span>
              <span className="px-2 py-1 bg-gray-800 rounded">Open Data</span>
            </div>
          </div>

          {/* Columna 2: Dades */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              Dades i Metodologia
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/metodologia" className="hover:text-white transition-colors flex items-center gap-1">
                  Metodologia completa
                </Link>
              </li>
              <li>
                <a 
                  href="https://opendata-ajuntament.barcelona.cat/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Open Data BCN
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/corpus" className="hover:text-white transition-colors">
                  Descarregar corpus (JSON)
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Documentació API
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ajuda */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              Ajuda i Recursos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Preguntes freqüents
                </a>
              </li>
              <li>
                <Link to="/metodologia#accesibilitat" className="hover:text-white transition-colors">
                  Declaració d'accesibilitat
                </Link>
              </li>
              <li>
                <a 
                  href="" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Reportar errors
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#tutorials" className="hover:text-white transition-colors">
                  Guies d'ús
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacte */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contacte i Comunitat
            </h4>
            <ul className="space-y-2 text-sm">
             
              <li>
                <a 
                  href="https://github.com/alusilcof5/demos_barcelona.git" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/observatoribcn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-white transition-colors">
                  Formulari de feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright y créditos */}
            <div className="text-sm text-gray-500 text-center md:text-left">
              <p>
                © {currentYear} Observatori BCN · Dades obertes al servei de la ciutadania
              </p>
              <p className="mt-1">
                Última actualització: {new Date().toLocaleDateString('ca-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Enlaces legales */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a href="#terms" className="hover:text-gray-300 transition-colors">
                Termes d'ús
              </a>
              <span>·</span>
              <a href="#privacy" className="hover:text-gray-300 transition-colors">
                Privacitat
              </a>
              <span>·</span>
              <a href="#cookies" className="hover:text-gray-300 transition-colors">
                Cookies
              </a>
            </div>
          </div>

          {/* Badge "Made with love" */}
         

          {/* Logos de colaboradores */}
          <div className="mt-6 flex items-center justify-center gap-8 opacity-50">
            <div className="text-xs text-gray-600">
              <span className="font-semibold">Col·labora:</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600">Ajuntament de Barcelona</span>
              <span className="text-sm text-gray-600">Open Data BCN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}