import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TIERS = [
  {
    id: "gold",
    name: "GOLD",
    price: "TBA",
    color: "#D4AF37",
    features: ["Gyms Across Cairo", "Standard Hours", "Instant Access", "Scan & Enter", "Female-only Zones"]
  },
  {
    id: "platinum",
    name: "PLATINUM",
    price: "TBA",
    color: "#19B8CC",
    features: ["Everything in GOLD", "Luxury Studios", "Peak Hours", "Pool Access", "Priority Booking"]
  },
  {
    id: "diamond",
    name: "DIAMOND",
    price: "TBA",
    color: "#9B7FE8",
    features: ["Everything in PLATINUM", "Hotel Spas", "Unlimited Classes", "Guest Pass", "Concierge Service"]
  }
];

export default function Membership() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="pp-page pp-membership-page" style={{ 
        padding: "160px 40px 100px", 
        minHeight: "100vh", 
        background: "#050505",
        position: "relative",
        overflow: "hidden"
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

          .pp-membership-page::before {
            content: '';
            position: absolute;
            bottom: -10%;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 80vw;
            background: radial-gradient(circle, 
              rgba(155, 127, 232, 0.12) 0%, 
              rgba(232, 49, 122, 0.08) 40%, 
              transparent 70%
            );
            pointer-events: none;
            z-index: 0;
            filter: blur(140px);
            animation: pulseAura 15s ease-in-out infinite alternate;
          }

          @keyframes pulseAura {
            0% { opacity: 0.6; transform: translateX(-50%) scale(1); }
            100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
          }

          .pp-tier-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 40px;
            max-width: 1300px;
            margin: 80px auto 0;
            position: relative;
            z-index: 1;
          }

          .pp-membership-card {
            padding: 64px 48px;
            border-radius: 48px;
            background: rgba(10, 10, 10, 0.4);
            backdrop-filter: blur(24px) saturate(200%);
            -webkit-backdrop-filter: blur(24px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.7s cubic-bezier(0.2, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          /* Animated Border */
          .pp-membership-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 48px;
            padding: 1px;
            background: linear-gradient(
              135deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 25%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.1) 75%,
              transparent 100%
            );
            background-size: 200% 200%;
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0.4;
            transition: opacity 0.6s ease;
            animation: borderRotate 6s linear infinite;
            pointer-events: none;
          }

          @keyframes borderRotate {
            0% { background-position: 0% 0%; }
            100% { background-position: 200% 200%; }
          }

          .pp-membership-card:hover {
            transform: translateY(-20px) scale(1.02);
            background: rgba(15, 15, 20, 0.6);
            box-shadow: 0 48px 100px -20px rgba(0, 0, 0, 0.8);
          }
          
          .pp-membership-card:hover::before {
            opacity: 1;
            background: var(--tier-gradient);
            background-size: 200% 200%;
          }

          .pp-tier-label {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.4em;
            color: rgba(255, 255, 255, 0.25);
            margin-bottom: 20px;
            text-transform: uppercase;
            font-weight: 700;
          }

          .pp-tier-name {
            font-family: 'Barlow Condensed', sans-serif;
            font-style: italic;
            font-weight: 900;
            font-size: 64px;
            line-height: 0.9;
            margin-bottom: 32px;
            letter-spacing: -0.03em;
            transition: transform 0.4s ease;
          }
          .pp-membership-card:hover .pp-tier-name {
            transform: scale(1.05);
          }

          .pp-tier-price-wrap {
            margin-bottom: 48px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .pp-tier-price {
            font-family: 'DM Mono', monospace;
            font-size: 36px;
            color: #fff;
            margin-bottom: 6px;
            font-weight: 500;
          }

          .pp-tier-period {
            font-family: 'DM Sans', sans-serif;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.2);
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-weight: 700;
          }

          .pp-feature-list {
            list-style: none;
            padding: 0;
            margin: 0 0 56px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .pp-feature-item {
            font-family: 'DM Sans', sans-serif;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.45);
            display: flex;
            align-items: center;
            gap: 16px;
            text-align: left;
            font-weight: 400;
            transition: color 0.3s ease;
          }
          .pp-membership-card:hover .pp-feature-item {
            color: rgba(255, 255, 255, 0.8);
          }

          .pp-nfc-badge {
            margin-bottom: 40px;
            color: rgba(255, 255, 255, 0.1);
            transition: all 0.6s cubic-bezier(0.2, 0, 0.2, 1);
            animation: nfcPulse 4s infinite;
          }

          @keyframes nfcPulse {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }

          .pp-membership-card:hover .pp-nfc-badge {
            animation: none;
            transform: scale(1.2) rotate(5deg);
          }

          .pp-btn-join {
            width: 100%;
            padding: 22px;
            border-radius: 20px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 700;
            font-size: 15px;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);
            position: relative;
            z-index: 1;
          }

          .pp-btn-join:hover {
            transform: translateY(-4px);
            background: #fff !important;
            color: #000 !important;
            box-shadow: 0 20px 40px rgba(255, 255, 255, 0.2);
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .pp-reveal {
            animation: fadeInUp 1s cubic-bezier(0.2, 0, 0.2, 1) both;
          }
        `}</style>

        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div className="pp-reveal" style={{ 
            fontFamily: "'DM Mono', monospace", 
            fontSize: "12px", 
            letterSpacing: "0.5em", 
            color: "#9B7FE8", 
            marginBottom: "24px",
            textTransform: "uppercase",
            fontWeight: 700,
            opacity: 0.7
          }}>
            MEMBERSHIP TIERS
          </div>
          
          <h1 className="pp-reveal" style={{ 
            fontFamily: "'Barlow Condensed', sans-serif", 
            fontStyle: "italic", 
            fontWeight: 900, 
            fontSize: "clamp(64px, 11vw, 160px)",
            lineHeight: 0.8,
            color: "#fff",
            marginBottom: "48px",
            letterSpacing: "-0.03em"
          }}>
            ACCESS REDEFINED. <br />
            <span style={{ 
              background: "linear-gradient(135deg, #9B7FE8 0%, #E8317A 50%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(155, 127, 232, 0.25))"
            }}>IDENTITY BUILT.</span>
          </h1>
        </div>

        <div className="pp-tier-grid">
          {TIERS.map((tier, i) => (
            <div 
              key={tier.name} 
              className="pp-membership-card pp-reveal" 
              style={{ 
                animationDelay: `${0.2 + (i * 0.1)}s`,
                '--tier-gradient': tier.id === 'gold' 
                  ? 'linear-gradient(135deg, #D4AF37, #FFF5D1, #D4AF37)'
                  : tier.id === 'platinum'
                    ? 'linear-gradient(135deg, #19B8CC, #C4FFF9, #19B8CC)'
                    : 'linear-gradient(135deg, #9B7FE8, #E0D4FF, #9B7FE8)'
              }}
            >
              <div className="pp-nfc-badge" style={{ color: tier.color }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 22a10 10 0 0 0 10-10M12 18a6 6 0 0 0 6-6" />
                  <path d="M2 12a10 10 0 0 1 10 10M6 12a6 6 0 0 1 6 6" strokeOpacity="0.4" />
                </svg>
              </div>
              <div className="pp-tier-label">Limitless Access</div>
              <div className="pp-tier-name" style={{ 
                color: tier.color,
                textShadow: `0 0 30px ${tier.color}30`
              }}>{tier.name}</div>
              <div className="pp-tier-price-wrap">
                <div className="pp-tier-price" style={{fontSize: tier.price==="TBA" ? "18px" : undefined, color: tier.price==="TBA" ? "rgba(255,255,255,0.35)" : undefined, letterSpacing: tier.price==="TBA" ? "0.2em" : undefined}}>{tier.price === "TBA" ? "PRICING COMING SOON" : `EGP ${tier.price}`}</div>
                <div className="pp-tier-period">Monthly Subscription</div>
              </div>
              <ul className="pp-feature-list">
                {tier.features.map(f => (
                  <li key={f} className="pp-feature-item">
                    <span style={{ color: tier.color, opacity: 0.8, fontSize: 18 }}>✦</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/join" className="pp-btn-join" style={{ 
                background: `${tier.color}15`,
                border: `1px solid ${tier.color}40`,
                color: tier.color,
              }}>
                Start your experience
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
