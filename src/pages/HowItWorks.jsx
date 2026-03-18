import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowItWorks() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="pp-page pp-how-page" style={{ 
        padding: "160px 32px 100px", 
        minHeight: "100vh", 
        background: "#050505",
        position: "relative",
        overflow: "hidden"
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

          .pp-how-page::before {
            content: '';
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70vw;
            height: 70vw;
            background: radial-gradient(circle, rgba(232, 49, 122, 0.12) 0%, rgba(155, 127, 232, 0.08) 40%, transparent 80%);
            pointer-events: none;
            z-index: 0;
            filter: blur(80px);
          }

          .pp-how-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            max-width: 1200px;
            margin: 80px auto 0;
            position: relative;
            z-index: 1;
          }

          .pp-glass {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-radius: 32px;
            padding: 48px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }

          .pp-glass::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1.5px; /* Border thickness */
            background: linear-gradient(
              120deg, 
              transparent 0%, 
              rgba(232, 49, 122, 0.3) 25%, 
              rgba(155, 127, 232, 0.6) 50%, 
              rgba(232, 49, 122, 0.3) 75%, 
              transparent 100%
            );
            background-size: 200% 200%;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: 2;
            animation: move-border 6s linear infinite;
            opacity: 0.5;
            transition: opacity 0.5s ease;
          }

          .pp-glass:hover::before {
            opacity: 1;
            animation-duration: 3s;
          }

          @keyframes move-border {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }

          .pp-glass:hover {
            transform: translateY(-12px);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.6);
          }

          .pp-step-num {
            font-family: 'Barlow Condensed', sans-serif;
            font-style: italic;
            font-weight: 900;
            font-size: 80px;
            line-height: 1;
            margin-bottom: 24px;
            background: linear-gradient(135deg, #FF6FA3, #9B7FE8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            opacity: 0.8;
          }

          .pp-step-title {
            font-family: 'Barlow Condensed', sans-serif;
            font-style: italic;
            font-weight: 800;
            font-size: 32px;
            color: #fff;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
          }

          .pp-step-body {
            font-family: 'DM Sans', sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.6);
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .pp-reveal {
            animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) both;
          }
        `}</style>

        <div style={{ textAlign: "center", marginBottom: "80px" }}>

          
          <h1 className="pp-reveal" style={{ 
            fontFamily: "'Barlow Condensed', sans-serif", 
            fontStyle: "italic", 
            fontWeight: 900, 
            fontSize: "clamp(64px, 10vw, 140px)",
            lineHeight: 0.85,
            color: "#fff",
            marginBottom: "40px",
            letterSpacing: "-0.02em"
          }}>
            HOW PASS+ <br />
            <span style={{ 
              background: "linear-gradient(135deg, #FF6FA3 0%, #9B7FE8 50%, #19B8CC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(232, 49, 122, 0.25))"
            }}>WORKS.</span>
          </h1>
        </div>

        <div className="pp-how-grid">
          {[
            { num: "01", title: "Claim Your Pass", body: "Select a membership tier that fits your life. Gold, Platinum, or Diamond. No long-term contracts. Cancel anytime." },
            { num: "02", title: "Find a Venue", body: "Use our real-time map to find gyms, pools, and boutique studios near you. Filter by facility type or female-only zones." },
            { num: "03", title: "Scan & Enter", body: "Show up at the front desk, scan the pass+ NFC tag with your phone, and walk right in. It's that simple." }
          ].map((step, i) => (
            <div key={step.num} className="pp-glass pp-reveal" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
              <div className="pp-step-num">{step.num}</div>
              <div className="pp-step-title">{step.title}</div>
              <p className="pp-step-body">{step.body}</p>
              

            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
