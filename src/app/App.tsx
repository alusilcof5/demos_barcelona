import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-container">
        <ScrollToTop />
      
      <header>
        <h1>Mi Aplicación</h1>
        <nav>
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/demograf"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                Demografía
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/corpus"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                Corpus
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/metodologia"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                Metodología
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>

      <footer style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>© 2026 CIVIXDATA</p>
      </footer>
    </div>
  );
}