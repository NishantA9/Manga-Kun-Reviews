import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

export default function Header() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch { return false; }
  });

  useEffect(() => {
    const body = document.body;
    if (dark) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo"> Manga-Kun-Collection </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* <div className="nav-links"> {/* <Link to="/">Home</Link> */}
            {/* <a href="https://nishantacharekarportfolio.netlify.app/" target="_blank" rel="noreferrer">Portfolio</a><a href="https://github.com/NishantA9" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/nishantacharekar/" target="_blank" rel="noreferrer">LinkedIn</a></div> <Button aria-label="Toggle dark mode" variant="dark" className="dark-toggle btn-blue" onClick={() => setDark((d) => !d)} title="Toggle dark mode"> */}
          <Button aria-label="Toggle dark mode"  className="dark-toggle btn-black" onClick={() => setDark((d) => !d)} title="Toggle dark mode">
            {dark ? "🌞 Light" : "🌙 Dark"}
          </Button>
        </div>
      </div>
    </header>
  );
}