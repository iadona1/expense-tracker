import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme } from "../features/settings/settingsSlice";
import "../styles/Header.css";

export default function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header__inner">
        <span className="header__logo">💰 ExpenseTracker</span>

        {/* Desktop nav */}
        <nav className="header__nav header__nav--desktop">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Transactions
          </NavLink>
          <button
            className="header__theme-btn"
            onClick={() => dispatch(toggleTheme())}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <NavLink to="/transactions/new" className="header__cta">
            + Add
          </NavLink>
        </nav>

        {/* Mobile right side */}
        <div className="header__mobile-right">
          <button
            className="header__theme-btn"
            onClick={() => dispatch(toggleTheme())}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            className="header__burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`burger__line ${menuOpen ? "burger__line--open-1" : ""}`} />
            <span className={`burger__line ${menuOpen ? "burger__line--open-2" : ""}`} />
            <span className={`burger__line ${menuOpen ? "burger__line--open-3" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`header__mobile-menu ${menuOpen ? "header__mobile-menu--open" : ""}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "mobile-link mobile-link--active" : "mobile-link"
          }
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "mobile-link mobile-link--active" : "mobile-link"
          }
          onClick={() => setMenuOpen(false)}
        >
          Transactions
        </NavLink>
        <NavLink
          to="/transactions/new"
          className="mobile-link mobile-link--cta"
          onClick={() => setMenuOpen(false)}
        >
          + Add Transaction
        </NavLink>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="header__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}