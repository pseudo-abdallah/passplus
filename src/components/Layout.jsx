
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body {
    font-family:'DM Sans',sans-serif;
    background:#000;
    color:#fff;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
    cursor:none;
  }

  /* ══ CURSOR ══ */
  .pp-cursor {
    position:fixed; width:24px; height:24px;
    pointer-events:none; z-index:10002;
    transition:transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    mix-blend-mode:difference;
    transform:translate(-50%,-50%);
  }
  .pp-cursor::before,.pp-cursor::after {
    content:''; position:absolute; background:white; border-radius:1px;
  }
  .pp-cursor::before { width:24px; height:3px; top:50%; left:0; transform:translateY(-50%); }
  .pp-cursor::after  { width:3px; height:24px; top:0; left:50%; transform:translateX(-50%); }
  .pp-cursor.hover   { transform:translate(-50%,-50%) scale(1.6) rotate(135deg); }
`;

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = BASE_CSS;
    document.head.appendChild(style);

    // High-performance cursor initialization
    const cursor = document.createElement("div");
    cursor.className = "pp-cursor";
    document.body.appendChild(cursor);

    const mv = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    const hi = (e) => { 
      if (e.target.closest("button,a,.pp-glass,.pp-hero-cta,.pp-footer-btn,.pp-feat-card,.pp-header-btn,.glass-surface")) {
        cursor.classList.add("hover");
      }
    };
    const lo = (e) => { 
      if (e.target.closest("button,a,.pp-glass,.pp-hero-cta,.pp-footer-btn,.pp-feat-card,.pp-header-btn,.glass-surface")) {
        cursor.classList.remove("hover");
      }
    };

    document.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", hi);
    document.addEventListener("mouseout", lo);

    return () => { 
      document.head.removeChild(style);
      document.body.removeChild(cursor);
      document.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseover", hi);
      document.removeEventListener("mouseout", lo);
    };
  }, []);

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main>{children}</main>
  );
}
