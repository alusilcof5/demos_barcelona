import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../shared/components/Header';
import { Toaster } from '../components/ui/sonner';

const queryClient = new QueryClient();

export function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Outlet />
        </main>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
