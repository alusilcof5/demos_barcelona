import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./pages/RootLayout";
import { HomePage } from "./pages/HomePage";
import { DatosPage } from "./pages/DatosPage";
import { MetodologiaPage } from "./pages/MetodologiaPage";
import { DemografPage } from "./pages/DemografPage";
import { GeneroPage } from "./features/genero";
 


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "demograf", Component: DemografPage },
      { path: "genero", Component: GeneroPage }, 
      { path: "corpus", Component: DatosPage },
      { path: "metodologia", Component: MetodologiaPage },
    ],
  },
]);