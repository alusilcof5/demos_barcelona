import { createBrowserRouter } from 'react-router';
import { DemografPage } from './pages/DemografPage';
import { CorpusPage } from './pages/CorpusPage';
import { MetodologiaPage } from './pages/MetodologiaPage';
import { RootLayout } from './pages/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: DemografPage
      },
      {
        path: 'corpus',
        Component: CorpusPage
      },
      {
        path: 'metodologia',
        Component: MetodologiaPage
      }
    ]
  }
]);
