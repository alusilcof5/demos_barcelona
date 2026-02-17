import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const t = {
    es: {
      description: "Herramienta de código abierto para visualizar desigualdades urbanas en Barcelona con datos públicos verificables.",
      sections: {
        data: "Datos y Metodología",
        help: "Ayuda y Recursos",
        contact: "Contacto y Comunidad"
      },
      links: {
        methodology: "Metodología completa",
        demographics: "Demografía",
        gender: "Género",
        faq: "Preguntas frecuentes",
        accessibility: "Declaración de accesibilidad",
        guides: "Guías de uso",
        terms: "Términos de uso",
        privacy: "Privacidad",
        cookies: "Cookies"
      },
      bottom: {
        rights: "Datos abiertos al servicio de la ciudadanía",
        lastUpdate: "Última actualización",
        tools: "Se emplearon herramientas de diseño asistido:"
      }
    },
    ca: {
      description: "Eina de codi obert per visualitzar desigualtats urbanes a Barcelona amb dades públiques verificables.",
      sections: {
        data: "Dades i Metodologia",
        help: "Ajuda i Recursos",
        contact: "Contacte i Comunitat"
      },
      links: {
        methodology: "Metodologia completa",
        demographics: "Demografia",
        gender: "Gènere",
        faq: "Preguntes freqüents",
        accessibility: "Declaració d'accessibilitat",
        guides: "Guies d'ús",
        terms: "Termes d'ús",
        privacy: "Privacitat",
        cookies: "Cookies"
      },
      bottom: {
        rights: "Dades obertes al servei de la ciutadania",
        lastUpdate: "Última actualització",
        tools: "Es van emprar eines de disseny assistit:"
      }
    }
  };

  const translations = t[language];

  const formattedDate = new Date().toLocaleDateString(
    language === 'ca' ? 'ca-ES' : 'es-ES',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          

          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-white text-lg">CIVIXDATA</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {translations.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-800 rounded">CC BY 4.0</span>
              <span className="px-2 py-1 bg-gray-800 rounded">Open Data</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              {translations.sections.data}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre-el-proyecto" className="hover:text-white transition-colors flex items-center gap-1">
                  {translations.links.methodology}
                </Link>
              </li>
              <li>
                <Link to="/demograf" className="hover:text-white transition-colors">
                  {translations.links.demographics}
                </Link>
              </li>
              <li>
                <Link to="/genero" className="hover:text-white transition-colors">
                  {translations.links.gender}
                </Link>
              </li>
              <li>
                <Link to="/corpus" className="hover:text-white transition-colors">
                  {translations.links.download}
                </Link>
              </li>              
            </ul>
          </div>

         <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              {translations.sections.help}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {translations.links.faq}
                </a>
              </li>
              <li>
                <Link to="/sobre-el-proyecto#accesibilitat" className="hover:text-white transition-colors">
                  {translations.links.accessibility}
                </Link>
              </li>
              <li>
                <a href="#tutorials" className="hover:text-white transition-colors">
                  {translations.links.guides}
                </a>
              </li>
              <li>
                <Link to="/verificador" className="hover:text-white transition-colors">
                  {translations.links.contactForm}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {translations.sections.contact}
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
                  href="https://www.linkedin.com/in/ana-lucia-silva-cordoba/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />Linkedin
                 
                </a>
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
                <Link to="/verificador" className="hover:text-white transition-colors">
                  {translations.links.contactForm}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center md:text-left">
              <p>
                © {currentYear} CIVIXDATA · {translations.bottom.rights}
              </p>
              <p className="mt-1">
                {translations.bottom.lastUpdate}: {formattedDate}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a href="#terms" className="hover:text-gray-300 transition-colors">
                {translations.links.terms}
              </a>
              <span>·</span>
              <a href="#privacy" className="hover:text-gray-300 transition-colors">
                {translations.links.privacy}
              </a>
              <span>·</span>
              <a href="#cookies" className="hover:text-gray-300 transition-colors">
                {translations.links.cookies}
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-8 opacity-50">
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-500">{translations.bottom.tools}</span>
              <span className="text-sm text-gray-500">Figma, Claude</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}