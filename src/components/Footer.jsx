import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section id="pp-s5" className="pp-scene pp-footer-section" style={{ minHeight: "auto", padding: "80px 32px 32px", background: "#080808" }}>
      <style>{`
        .pp-footer-section {
          width: 100%;
          position: relative;
          z-index: 10;
        }
        .pp-footer-content {
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }
        .pp-footer-main {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .pp-footer-brand {
          display: flex;
          flex-direction: column; gap: 12px;
        }
        .pp-footer-logo {
          display: flex; align-items: center; gap: 2px; margin-bottom: 8px;
          text-decoration: none;
        }
        .pp-footer-logo-text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 18px;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .pp-footer-plus {
          width: 16px; height: 16px; position: relative; display: inline-block;
        }
        .pp-footer-plus::before,
        .pp-footer-plus::after {
          content: ''; position: absolute; background: white; border-radius: 1px;
        }
        .pp-footer-plus::before { width: 16px; height: 4px; top: 6px; left: 0; }
        .pp-footer-plus::after  { width: 4px; height: 16px; top: 0; left: 6px; }
        
        .pp-footer-tagline {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.35);
        }
        .pp-footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .pp-footer-col {
          display: flex; flex-direction: column; gap: 12px;
        }
        .pp-footer-link {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding-bottom: 2px;
          width: fit-content;
        }
        .pp-footer-link::after {
          content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 1px;
          background: #FF6FA3; transition: width 0.3s ease;
        }
        .pp-footer-link:hover { color: white; }
        .pp-footer-link:hover::after { width: 100%; }
        
        .pp-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
        }
        .pp-footer-copy,
        .pp-footer-domain {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 960px) {
          .pp-footer-main { grid-template-columns: 1fr; gap: 40px; }
          .pp-footer-links { grid-template-columns: 1fr; gap: 24px; }
          .pp-footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="pp-footer-content">
        <div className="pp-footer-main">
          <div className="pp-footer-brand">
            <Link to="/" className="pp-footer-logo">
              <span className="pp-footer-logo-text">pass</span>
              <span className="pp-footer-plus" />
            </Link>
            <p className="pp-footer-tagline">Egypt's pass to everything.</p>
          </div>
          <div className="pp-footer-links">
            <div className="pp-footer-col">
              <Link to="/how-it-works" className="pp-footer-link">How it works</Link>
              <Link to="/venues" className="pp-footer-link">Venues</Link>
              <Link to="/membership" className="pp-footer-link">Membership</Link>
            </div>
            <div className="pp-footer-col">
              <Link to="/about" className="pp-footer-link">About</Link>
              <Link to="/download" className="pp-footer-link">Download app</Link>
            </div>
            <div className="pp-footer-col">
              <Link to="/contact" className="pp-footer-link">Contact</Link>
              <Link to="/privacy" className="pp-footer-link">Privacy</Link>
              <Link to="/terms" className="pp-footer-link">Terms</Link>
            </div>
          </div>
        </div>
        <div className="pp-footer-bottom">
          <div className="pp-footer-copy">© 2026 pass+ · Egypt</div>
          <div className="pp-footer-domain">passplus.me</div>
        </div>
      </div>
    </section>
  );
}
