import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../shared/components/Header';
import { Footer } from '../shared/components/Footer';
import AccessibilityWidget from '../shared/components/AccessiblityWidget';
import { Toaster } from '../components/ui/sonner';
import { LanguageProvider } from '../i18n/LanguageContext'; 


const queryClient = new QueryClient();

export function RootLayout() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[9999] bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Saltar al contenido principal
          </a>

          <Header />

          <main id="main-content" className="flex-1" tabIndex={-1}>
            <Outlet />
          </main>

          <Footer />

          <AccessibilityWidget />
          <Toaster />
        </div>
      </QueryClientProvider>
    </LanguageProvider>
  );
}
