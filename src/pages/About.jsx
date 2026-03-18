import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────
   ABOUT PAGE
   Section 1: Story — hover-preview links
   Section 2: Music — glassmorphic player
───────────────────────────────────────── */

/* ── Hover preview data ── */
const PREVIEWS = {
  gyms: {
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=560&h=320&fit=crop&q=80",
    title: "Elite Gyms",
    subtitle: "Strength, performance, and iron — everywhere.",
  },
  pools: {
    image: "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?w=560&h=320&fit=crop&q=80",
    title: "Hotel Pools",
    subtitle: "Lap lanes and luxury. One scan away.",
  },
  studios: {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=560&h=320&fit=crop&q=80",
    title: "Boutique Studios",
    subtitle: "Yoga. Pilates. Boxing. All included.",
  },
  egypt: {
    image: "https://images.unsplash.com/photo-1539768942893-daf53489c7e4?w=560&h=320&fit=crop&q=80",
    title: "Across Egypt",
    subtitle: "From Cairo to the coast — your pass travels with you.",
  },
  abdalla: {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=560&h=320&fit=crop&q=80",
    title: "Abdalla Ibrahim",
    subtitle: "CEO & Founder · pass+",
  },
  abdulaziz: {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=560&h=320&fit=crop&q=80",
    title: "Abdalla Abdulaziz",
    subtitle: "CTO · pass+",
  },
  islam: {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=560&h=320&fit=crop&q=80",
    title: "Islam Fahmy",
    subtitle: "CFO & Co-founder · pass+",
  },
};

/* ─────────────────────────────────────────
   HOVER LINK (for venue links)
───────────────────────────────────────── */
function HoverLink({ previewKey, children, onEnter, onMove, onLeave }) {
  return (
    <span
      className="ab-hover-link"
      onMouseEnter={(e) => onEnter(previewKey, e)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────
   FOUNDER LINK
   Hover shows preview card.
   Click still navigates to LinkedIn.
   The <a> is the actual clickable element;
   preview is triggered on the wrapper span.
───────────────────────────────────────── */
function FounderLink({ previewKey, href, children, onEnter, onMove, onLeave }) {
  return (
    <span
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={(e) => onEnter(previewKey, e)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="ab-founder-link"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </a>
    </span>
  );
}

/* ─────────────────────────────────────────
   PREVIEW CARD
───────────────────────────────────────── */
function PreviewCard({ data, pos, visible }) {
  if (!data) return null;
  return (
    <div
      className={`ab-preview${visible ? " ab-preview--on" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="ab-preview-inner">
        <img src={data.image} alt={data.title} />
        <div className="ab-preview-title">{data.title}</div>
        <div className="ab-preview-sub">{data.subtitle}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CSS
───────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400&display=swap');

  /* ── PAGE ── */
  .ab-page { min-height:100vh; background:#050505; padding-top:80px; position:relative; overflow-x:hidden; }

  /* ── BG ORBS ── */
  .ab-orb { position:fixed; pointer-events:none; border-radius:50%; filter:blur(120px); z-index:0; }
  .ab-orb-1 { width:70vw; height:70vw; top:-15%; left:-20%; background:radial-gradient(circle,rgba(155,127,232,0.08),transparent 70%); animation:orbDrift1 22s ease-in-out infinite; }
  .ab-orb-2 { width:60vw; height:60vw; bottom:-15%; right:-15%; background:radial-gradient(circle,rgba(25,184,204,0.07),transparent 70%); animation:orbDrift2 18s ease-in-out infinite; }
  @keyframes orbDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,50px)} }
  @keyframes orbDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,-30px)} }

  /* ── SECTIONS ── */
  .ab-section { position:relative; z-index:1; max-width:1440px; margin:0 auto; padding:120px 48px; }
  .ab-eyebrow { font-family:'DM Mono',monospace; font-size:11px; font-weight:600; letter-spacing:0.35em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:32px; }
  .ab-headline { font-family:'Barlow Condensed',sans-serif; font-style:italic; font-weight:900; font-size:clamp(64px,10vw,140px); line-height:0.85; letter-spacing:-0.03em; color:#fff; margin-bottom:80px; }
  .ab-headline em { font-style:inherit; background:linear-gradient(135deg,#C4AFFF 0%,#E8317A 35%,#9B7FE8 65%,#19B8CC 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* ── STORY LAYOUT ── */
  .ab-story { display:grid; grid-template-columns:1.1fr 0.9fr; gap:80px; align-items:start; margin-bottom:160px; }
  .ab-story-text { font-size:clamp(17px,1.9vw,24px); line-height:1.82; color:rgba(255,255,255,0.52); font-weight:300; letter-spacing:-0.01em; }
  .ab-story-text p { margin-bottom:1.8em; opacity:0; animation:fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) forwards; }
  .ab-story-text p:nth-child(1) { animation-delay:0.1s; }
  .ab-story-text p:nth-child(2) { animation-delay:0.26s; }
  .ab-story-text p:nth-child(3) { animation-delay:0.42s; }

  /* ── HOVER LINK ── */
  .ab-hover-link { color:#fff; font-weight:600; cursor:pointer; position:relative; display:inline-block; }
  .ab-hover-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1.5px; background:linear-gradient(90deg,#9B7FE8,#19B8CC); transition:width 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
  .ab-hover-link:hover::after { width:100%; }

  /* ── STATS ── */
  .ab-stats { display:flex; flex-direction:column; gap:24px; padding-top:8px; }
  .ab-stat-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:32px; backdrop-filter:blur(20px); transition:all 0.5s cubic-bezier(0.16,1,0.3,1); position:relative; overflow:hidden; }
  .ab-stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent); }
  .ab-stat-card:hover { transform:translateY(-6px); border-color:rgba(255,255,255,0.14); background:rgba(255,255,255,0.05); }
  .ab-stat-num { font-family:'Barlow Condensed',sans-serif; font-style:italic; font-weight:900; font-size:clamp(44px,5.5vw,72px); line-height:1; letter-spacing:-0.03em; margin-bottom:8px; }
  .ab-stat-label { font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(255,255,255,0.4); letter-spacing:0.04em; }

  /* ── PREVIEW CARD ── */
  .ab-preview { position:fixed; pointer-events:none; z-index:9000; opacity:0; transform:translateY(14px) scale(0.93); transition:opacity 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1); will-change:transform,opacity; }
  .ab-preview--on { opacity:1; transform:translateY(0) scale(1); }
  .ab-preview-inner { background:#141418; border-radius:16px; padding:8px; box-shadow:0 24px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.09), 0 0 60px rgba(155,127,232,0.08); overflow:hidden; }
  .ab-preview-inner img { width:280px; height:160px; object-fit:cover; border-radius:10px; display:block; }
  .ab-preview-title { padding:12px 8px 4px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; color:#fff; }
  .ab-preview-sub { padding:0 8px 10px; font-family:'DM Mono',monospace; font-size:11px; color:rgba(255,255,255,0.38); }


  /* ── TEAM STORY ── */
  .ab-team-section { position:relative; z-index:1; max-width:1440px; margin:0 auto; padding:0 48px 120px; }
  .ab-team-eyebrow { font-family:'DM Mono',monospace; font-size:11px; font-weight:600; letter-spacing:0.35em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:24px; }
  .ab-team-story { font-size:clamp(17px,1.8vw,22px); line-height:1.9; color:rgba(255,255,255,0.48); font-weight:300; max-width:760px; }
  .ab-team-story p { margin-bottom:1.6em; }
  .ab-founder-link { color:#fff; font-weight:500; text-decoration:none; position:relative; display:inline-block; cursor:pointer; white-space:nowrap; }
  .ab-founder-link::after { content:''; position:absolute; bottom:-1px; left:0; width:0; height:1px; background:linear-gradient(90deg,#9B7FE8,#19B8CC); transition:width 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
  .ab-founder-link:hover { color:#C4AFFF; }
  .ab-founder-link:hover::after { width:100%; }
  @media(max-width:960px) { .ab-team-section { padding:0 24px 80px; } }

  /* ── FOOTER ── */
  .pp-footer-content { max-width:1440px; margin:0 auto; }
  .pp-footer-main { display:grid; grid-template-columns:1fr 1.5fr; gap:80px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,0.06); }
  .pp-footer-brand { display:flex; flex-direction:column; gap:12px; }
  .pp-footer-logo { display:flex; align-items:center; gap:2px; margin-bottom:8px; }
  .pp-footer-logo-text { font-family:'DM Sans',sans-serif; font-weight:400; font-size:18px; letter-spacing:-0.02em; color:#fff; }
  .pp-footer-plus { width:16px; height:16px; position:relative; display:inline-block; }
  .pp-footer-plus::before,.pp-footer-plus::after { content:''; position:absolute; background:white; border-radius:1px; }
  .pp-footer-plus::before { width:16px; height:4px; top:6px; left:0; }
  .pp-footer-plus::after { width:4px; height:16px; top:0; left:6px; }
  .pp-footer-tagline { font-family:'DM Sans',sans-serif; font-weight:300; font-size:13px; color:rgba(255,255,255,0.35); }
  .pp-footer-links { display:grid; grid-template-columns:repeat(3,1fr); gap:40px; }
  .pp-footer-col { display:flex; flex-direction:column; gap:12px; }
  .pp-footer-link { font-family:'DM Sans',sans-serif; font-weight:400; font-size:12px; color:rgba(255,255,255,0.4); text-decoration:none; transition:color 0.2s ease; position:relative; padding-bottom:2px; }
  .pp-footer-link::after { content:''; position:absolute; left:0; bottom:0; width:0; height:1px; background:#FF6FA3; transition:width 0.3s ease; }
  .pp-footer-link:hover { color:white; }
  .pp-footer-link:hover::after { width:100%; }
  .pp-footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:24px; }
  .pp-footer-copy,.pp-footer-domain { font-family:'DM Mono',monospace; font-size:10px; color:rgba(255,255,255,0.25); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);} }

  /* ── RESPONSIVE ── */
  @media(max-width:960px) {
    .ab-section { padding:80px 24px; }
    .ab-story { grid-template-columns:1fr; gap:48px; margin-bottom:100px; }
    .pp-footer-main { grid-template-columns:1fr; gap:40px; }
    .pp-footer-links { grid-template-columns:1fr; gap:24px; }
    .pp-footer-bottom { flex-direction:column; gap:8px; text-align:center; }
  }
`;

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function About() {
  const [preview, setPreview] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Object.values(PREVIEWS).forEach(d => {
      const img = new Image();
      img.src = d.image;
    });
  }, []);

  const updatePos = useCallback((e) => {
    const W = 296, H = 208, gap = 20;
    let x = e.clientX - W / 2;
    let y = e.clientY - H - gap;
    if (x + W > window.innerWidth - 16) x = window.innerWidth - W - 16;
    if (x < 16) x = 16;
    if (y < 16) y = e.clientY + gap;
    setPos({ x, y });
  }, []);

  const onEnter = useCallback((key, e) => {
    setPreview(PREVIEWS[key]);
    setVisible(true);
    updatePos(e);
  }, [updatePos]);

  const onMove = useCallback((e) => { if (visible) updatePos(e); }, [visible, updatePos]);
  const onLeave = useCallback(() => { setVisible(false); }, []);

  return (
    <>
      <style>{CSS}</style>

      <div className="ab-page">
        <div className="ab-orb ab-orb-1" />
        <div className="ab-orb ab-orb-2" />

        <Header loaded={true} logoAnimated={true} currentScene="scene-5" />

        {/* ── STORY ── */}
        <div className="ab-section">
          <div className="ab-eyebrow">Our story</div>
          <h1 className="ab-headline">
            MULTI ACCESS.<br />
            <em>ONE PASS.</em>
          </h1>

          <div className="ab-story">
            <div className="ab-story-text">
              <p>
                pass+ was built from a simple frustration — too many
                memberships, too many apps, too much friction between you and
                your workout. We wanted one key that opened every door.
              </p>
              <p>
                Today that key works at elite gyms, hotel pools, and
                boutique studios — and it's expanding across Egypt.
              </p>
              <p>
                No long-term contracts. No minimum visits. Just show up,
                scan, and move. The way fitness was always meant to feel.
              </p>
            </div>

            <div className="ab-stats">
              {[
                { num: "···", label: "Venues Nationwide", color: "#9B7FE8" },
                { num: "···", label: "Active Members", color: "#19B8CC" },
                { num: "···", label: "Cities & Growing", color: "#E8317A" },
              ].map((s) => (
                <div className="ab-stat-card" key={s.label}>
                  <div className="ab-stat-num" style={{ color: s.color }}>{s.num}</div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ── TEAM ── */}
        <div className="ab-team-section">
          <div className="ab-team-eyebrow">Meet the team</div>
          <div className="ab-team-story">
            <p>
              {" "}
              <FounderLink
                previewKey="abdalla"
                href="https://www.linkedin.com/in/abdallah-ibrahim-a58576182/"
              >
                Abdalla Ibrahim
              </FounderLink>
              , CEO and founder — the man who treats deadlines like a game of “Catch Me If You Can."
            </p>
            <p>
              {" "}
              <FounderLink
                previewKey="abdulaziz"
                href="https://www.linkedin.com/in/abdulla-abdelaziz-003840279/"
              >
                Abdalla Abdulaziz
              </FounderLink>
              , our CTO—because every great company needs a tech wizard who speaks fluent code and occasionally communicates in binary for fun.
            </p>
            <p>
              {" "}
              <FounderLink
                previewKey="islam"
                href="https://www.linkedin.com/in/islamfahmy-i4/"
              >
                Islam Fahmy
              </FounderLink>{" "}
              our CFO and co-founder—the numbers ninja who crunches spreadsheets faster than you can say "profit margins."
            </p>
            <p>Together, they are pass+.</p>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <Footer />
      </div>

      {/* Preview card — fixed position, rendered outside page flow */}
      <PreviewCard data={preview} pos={pos} visible={visible} />
    </>
  );
}
