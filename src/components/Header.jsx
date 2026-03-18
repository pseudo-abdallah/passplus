import { Link } from "react-router-dom";

export default function Header({ 
  loaded = true, 
  logoAnimated = true, 
  currentScene = "scene-4" 
}) {
  const hCls = [
    "pp-header", 
    loaded ? "visible" : "", 
    logoAnimated ? "logo-animated" : "logo-center", 
    currentScene
  ].filter(Boolean).join(" ");

  return (
    <header className={hCls}>
      <style>{`
        .pp-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          width: 100%; height: 56px;
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          z-index: 10001;
          transition: opacity 0.6s ease, background 0.6s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          pointer-events: none;
        }
        .pp-header.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .pp-header.logo-center {
          justify-content: center;
        }
        .pp-header.logo-center .pp-header-actions {
          opacity: 0;
          pointer-events: none;
        }

        .pp-logo-group {
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pp-header.logo-center .pp-logo-group {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) scale(1.5);
        }
        .pp-header.logo-animated .pp-logo-group {
          transform: translateX(0) scale(1);
        }
        .pp-header.logo-animated .pp-header-actions {
          opacity: 1;
          transition: opacity 0.6s ease 0.4s;
        }

        .pp-wordmark {
          display: flex;
          align-items: center;
          gap: 1px;
          position: relative;
          text-decoration: none;
        }

        .pp-wordmark-text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 15px;
          letter-spacing: -0.02em;
          color: #fff;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pp-header.scene-1 .pp-wordmark-text { color: #000000; }
        .pp-header.scene-2 .pp-wordmark-text { color: #FF6FA3; }
        .pp-header.scene-3 .pp-wordmark-text { color: #19B8CC; }
        .pp-header.scene-4 .pp-wordmark-text,
        .pp-header.scene-5 .pp-wordmark-text {
          background: linear-gradient(135deg, #E8317A, #9B7FE8, #19B8CC);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ppGradShift 3s ease infinite;
        }
        .pp-header.scene-metal .pp-wordmark-text,
        .pp-header.scene-metal .pp-wordmark-text-plus {
          background: linear-gradient(135deg, #e8e8ee, #ffffff, #a0a0a8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes ppGradShift { 
          0%, 100% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
        }

        .pp-wordmark-text-plus {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 15px;
          letter-spacing: -0.02em;
          color: #fff;
          opacity: 1;
          max-width: 100px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pp-header.scene-1 .pp-wordmark-text-plus { color: #000000; }
        .pp-header.logo-animated .pp-wordmark-text-plus {
          opacity: 0;
          max-width: 0;
        }

        .pp-wordmark-plus {
          width: 13px;
          height: 13px;
          position: relative;
          display: inline-block;
          opacity: 0;
          transform: scale(0) rotate(-90deg);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
        }
        .pp-header.logo-animated .pp-wordmark-plus {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .pp-wordmark-plus::before,
        .pp-wordmark-plus::after {
          content: '';
          position: absolute;
          background: #fff;
          border-radius: 1px;
          transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pp-header.scene-1 .pp-wordmark-plus::before,
        .pp-header.scene-1 .pp-wordmark-plus::after { background: #000000; }
        .pp-header.scene-2 .pp-wordmark-plus::before,
        .pp-header.scene-2 .pp-wordmark-plus::after { background: #FF6FA3; }
        .pp-header.scene-3 .pp-wordmark-plus::before,
        .pp-header.scene-3 .pp-wordmark-plus::after { background: #19B8CC; }
        .pp-header.scene-4 .pp-wordmark-plus::before,
        .pp-header.scene-4 .pp-wordmark-plus::after,
        .pp-header.scene-5 .pp-wordmark-plus::before,
        .pp-header.scene-5 .pp-wordmark-plus::after {
          background: linear-gradient(135deg, #E8317A, #9B7FE8, #19B8CC);
        }
        .pp-header.scene-metal .pp-wordmark-plus::before,
        .pp-header.scene-metal .pp-wordmark-plus::after {
          background: linear-gradient(135deg, #e8e8ee, #ffffff, #a0a0a8);
        }
        .pp-wordmark-plus::before { width: 13px; height: 3px; top: 5px; left: 0; }
        .pp-wordmark-plus::after { width: 3px; height: 13px; top: 0; left: 5px; }

        .pp-header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .pp-lang-toggle {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pp-header.scene-1 .pp-lang-toggle { color: rgba(0,0,0,0.4); }
        .pp-header.scene-1 .pp-lang-toggle .active { color: #000; }
        .pp-lang-toggle .active { color: #fff; }

        .pp-header-btn {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 99px;
          padding: 8px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }
        .pp-header.scene-1 .pp-header-btn {
          background: rgba(0,0,0,0.05);
          color: #000;
          border-color: rgba(0,0,0,0.1);
        }
        .pp-header-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }
        .pp-header-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="pp-logo-group">
        <Link to="/" className="pp-wordmark">
          <span className="pp-wordmark-text">pass</span>
          <span className="pp-wordmark-text pp-wordmark-text-plus">plus</span>
          <span className="pp-wordmark-plus" />
        </Link>
      </div>

      <div className="pp-header-actions">
        <div className="pp-lang-toggle">
          <span className="active">EN</span>
          <span>·</span>
          <span>AR</span>
        </div>
        <Link to="/join" className="pp-header-btn">Join</Link>
      </div>
    </header>
  );
}
