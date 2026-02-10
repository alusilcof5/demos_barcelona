import { Link, useLocation } from 'react-router';
import { BarChart3, Database, Info } from 'lucide-react';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Observatori BCN</h1>
              <p className="text-xs text-gray-500">Open Data Day 2026</p>
            </div>
          </Link>
          
          <nav className="flex gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>DemoGràfic</span>
            </Link>
            
            <Link 
              to="/corpus" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/corpus') ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>CORPUS·CAT</span>
            </Link>
            
            <Link 
              to="/metodologia" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/metodologia') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Metodologia</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
