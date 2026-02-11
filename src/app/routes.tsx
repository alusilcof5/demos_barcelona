import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { DatosPage } from "./pages/DatosPage";
import { MetodologiaPage } from "./pages/MetodologiaPage";
import { DemografPage } from "./pages/DemografPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App, // layout principal
    children: [
      { index: true, Component: HomePage },       // ruta raíz
      { path: "demograf", Component: DemografPage },
      { path: "corpus", Component: DatosPage },
      { path: "metodologia", Component: MetodologiaPage },
    ],
  },
]);
