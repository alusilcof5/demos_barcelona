import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { RootLayout } from './pages/RootLayout';
import { CorpusPage } from './pages/CorpusPage';
import { MetodologiaPage } from './pages/MetodologiaPage';
import { DemografPage } from './pages/DemografPage';


export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: 'demograf',
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