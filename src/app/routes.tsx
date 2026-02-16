import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./pages/RootLayout";
import { HomePage } from "./pages/HomePage";
import { ContactoPage } from "./pages/ContactPage";
import { SobreElProyectoPage } from "./pages/MetodologiaPage";
import { GeneroPage } from "./features/genero";
import { DemografPage } from "./pages/DemografPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "demograf", Component: DemografPage },
      { path: "genero", Component: GeneroPage },
      { path: "sobre-el-proyecto", Component: SobreElProyectoPage },
      { path: "contacto", Component: ContactoPage },
    ],
  },
]);