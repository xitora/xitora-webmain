import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={closeMenu} aria-label="xitora 홈">
        XITORA<span className="wordmark__dot">.</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav
        className={`site-nav${menuOpen ? " site-nav--open" : ""}`}
        id="site-nav"
        aria-label="주요 메뉴"
      >
        <a href="#work" onClick={closeMenu}>
          Work
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
        <span className="site-nav__index">KR / 2026</span>
      </nav>
    </header>
  );
}
