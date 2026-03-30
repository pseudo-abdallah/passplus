import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

/* ══════════════════════════════════════════
   LIQUID METAL — PASS+ JOIN PAGE REDESIGN
   Full mercury/chrome aesthetic
══════════════════════════════════════════ */

/* ── Static CSS ambient background — zero JS overhead ── */
function MetalAmbient() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Top-left chrome pool */}
      <div style={{ position: "absolute", width: "55vw", height: "55vw", borderRadius: "50%", top: "-20%", left: "-18%", background: "radial-gradient(ellipse at 38% 32%, rgba(220,220,235,0.055) 0%, rgba(160,160,180,0.025) 40%, transparent 70%)", filter: "blur(48px)" }} />
      {/* Bottom-right chrome pool */}
      <div style={{ position: "absolute", width: "60vw", height: "60vw", borderRadius: "50%", bottom: "-22%", right: "-14%", background: "radial-gradient(ellipse at 60% 65%, rgba(200,200,220,0.05) 0%, rgba(130,130,150,0.02) 45%, transparent 70%)", filter: "blur(56px)" }} />
      {/* Centre whisper */}
      <div style={{ position: "absolute", width: "40vw", height: "40vw", borderRadius: "50%", top: "30%", left: "30%", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.018) 0%, transparent 65%)", filter: "blur(60px)" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LIQUID METAL PLUS — WebGL2 shader (paper-design/liquid-logo technique)
   Uses real simplex noise + chromatic dispersion in GLSL.
   No SVG gradient tricks. No color overlay rects.
═══════════════════════════════════════════════════════════════ */

/* ── Wordmark: "pass+" — chrome SVG gradient ── */
function PassplusWordmark({ mouse }) {
  const lx = (mouse?.x ?? 0.5) * 100;
  const ly = (mouse?.y ?? 0.3) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none" }}>
      <svg width="260" height="64" viewBox="0 0 260 64" fill="none" style={{ overflow: "visible", display: "block" }}>
        <defs>
          <linearGradient id="wm-metal" x1={lx*2.6} y1={ly*0.64} x2={260-lx*1.3} y2={64-ly*0.32} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#e8e8ee"/>
            <stop offset="18%"  stopColor="#b2b2b8"/>
            <stop offset="40%"  stopColor="#ffffff"/>
            <stop offset="56%"  stopColor="#909098"/>
            <stop offset="74%"  stopColor="#dcdce2"/>
            <stop offset="100%" stopColor="#a4a4aa"/>
          </linearGradient>
          <radialGradient id="wm-spec" cx={lx*2.6} cy={ly*0.64} r="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%"  stopColor="#fff" stopOpacity={0.4+lx*0.002}/>
            <stop offset="60%" stopColor="#fff" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <text x="130" y="52" textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="54" fontWeight="300" letterSpacing="-1.5" fill="url(#wm-metal)">pass+</text>
        <text x="130" y="52" textAnchor="middle" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="54" fontWeight="300" letterSpacing="-1.5" fill="url(#wm-spec)">pass+</text>
      </svg>
    </div>
  );
}

/* Simple chrome + for SuccessModal */
function MetalLogo({ size = 32, mouse }) {
  return (
    <span style={{
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 300,
      fontSize: size * 1.1,
      background: "linear-gradient(135deg, #e8e8ee, #ffffff, #a0a0a8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: 1,
    }}>+</span>
  );
}

/* ── Confetti burst ── */
function ConfettiBurst({ active }) {
  const canvasRef = useRef(null);
  const animId = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const COLORS = ["#fff","#e2e2e6","#c0c0c4","#9a9a9e","#f0f0f0","#d4d4d8"];
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const particles = Array.from({ length: 120 }, () => ({
      x: cx, y: cy,
      vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20 - 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: Math.random() * 8 + 3, h: Math.random() * 3 + 2,
      rot: Math.random() * Math.PI * 2, rotV: (Math.random() - 0.5) * 0.3,
      gravity: 0.35, opacity: 1, decay: Math.random() * 0.01 + 0.007,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.opacity <= 0) return; alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= 0.98;
        p.rot += p.rotV; p.opacity -= p.decay;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.opacity); ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (alive) {
        animId.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(animId.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }} />;
}

/* ── Success modal ── */
function SuccessModal({ email, onClose, mouse }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", animation: "fadeIn 0.2s ease both" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 9001, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, pointerEvents: "none" }}>
        <div style={{ width: "100%", maxWidth: 360, background: "linear-gradient(145deg, #1a1a1e, #111114)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "40px 32px 28px", position: "relative", textAlign: "center", pointerEvents: "all", animation: "modalIn 0.4s cubic-bezier(0.34,1.4,0.64,1) both", boxShadow: "0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>×</button>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(145deg, #222226, #2e2e34)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", animation: "checkIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both", boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <MetalLogo size={32} mouse={mouse} />
            </div>
          </div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 20, color: "#fff", lineHeight: 1.3, marginBottom: 10 }}>You're on the list.</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24, lineHeight: 1.6 }}>We'll reach out when pass+ opens in Cairo.</p>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
              <rect x="1" y="3" width="12" height="8" rx="2" stroke="white" strokeWidth="1.2"/>
              <path d="M1 5l6 4 6-4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{email}</span>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>ONE PASS · ALL CAIRO</p>
        </div>
      </div>
    </>
  );
}

/* ── Ticker ── */
const TICKER_ITEMS = ["GYMS","PADEL","PILATES","SPA","YOGA","BOXING","SWIMMING","CYCLING","GYMS","PADEL","PILATES","SPA","YOGA","BOXING","SWIMMING","CYCLING"];
function Ticker({ mouse }) {
  const lx = (mouse?.x ?? 0.5) * 100;
  const ly = (mouse?.y ?? 0.5) * 100;

  return (
    <div style={{ overflow: "hidden", position: "relative", padding: "10px 0" }}>
      {/* metal rail lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px" }}>
        <svg width="100%" height="1" style={{ display: "block" }}>
          <defs>
            <linearGradient id="rail-top" x1={`${lx}%`} y1="0" x2={`${100 - lx * 0.5}%`} y2="0">
              <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
              <stop offset="20%"  stopColor="rgba(255,255,255,0.06)" />
              <stop offset="50%"  stopColor="rgba(255,255,255,0.2)" />
              <stop offset="80%"  stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="1" fill="url(#rail-top)" />
        </svg>
      </div>
      <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "ticker 28s linear infinite", width: "max-content", padding: "6px 0" }}>
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: i % 4 === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
            position: "relative",
          }}>
            {i % 4 === 0 && (
              <span style={{ display: "inline-block", width: 4, height: 4, background: "rgba(255,255,255,0.4)", borderRadius: "50%", marginRight: 16, verticalAlign: "middle", marginTop: -2 }} />
            )}
            {item}
          </span>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px" }}>
        <svg width="100%" height="1" style={{ display: "block" }}>
          <defs>
            <linearGradient id="rail-bot" x1={`${lx}%`} y1="0" x2={`${100 - lx * 0.5}%`} y2="0">
              <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
              <stop offset="30%"  stopColor="rgba(255,255,255,0.08)" />
              <stop offset="60%"  stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="1" fill="url(#rail-bot)" />
        </svg>
      </div>
    </div>
  );
}

/* ── Live counter ── */
function LiveCounter({ count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
      <div style={{ position: "relative", width: 8, height: 8 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(255,255,255,0.6)", animation: "pulseRing 2.5s ease-in-out infinite" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", position: "relative", zIndex: 1 }} />
      </div>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
        <span style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{count.toLocaleString()}</span> MEMBERS WAITING
      </span>
    </div>
  );
}

/* ── Liquid metal card: the join form ── */
function LiquidCard({ mouse, email, setEmail, focusedEmail, setFocusedEmail, onSubmit, tilt, cardRef }) {
  const lx = (mouse?.x ?? 0.5) * 100;
  const ly = (mouse?.y ?? 0.3) * 100;

  return (
    <div
      ref={cardRef}
      onMouseLeave={() => {}}
      style={{
        width: "100%",
        maxWidth: 420,
        transform: `perspective(1400px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.5s cubic-bezier(0.2,0,0.2,1)",
        willChange: "transform",
        position: "relative",
      }}
    >
      {/* Liquid metal border SVG */}
      <svg
        viewBox="0 0 420 320"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="card-border" x1={`${lx * 4.2}`} y1={`${ly * 3.2}`} x2={`${420 - lx * 2.1}`} y2={`${320 - ly * 1.6}`} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.03)" />
            <stop offset="25%"  stopColor="rgba(255,255,255,0.18)" />
            <stop offset="50%"  stopColor="rgba(200,200,210,0.08)" />
            <stop offset="75%"  stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
          <filter id="card-border-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        <rect x="0.75" y="0.75" width="418.5" height="318.5" rx="27.25" fill="none" stroke="url(#card-border)" strokeWidth="1.5" filter="url(#card-border-blur)" />
      </svg>

      {/* Specular highlight top edge */}
      <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.1 + (1 - (mouse?.x ?? 0.5)) * 0.2}), transparent)`, borderRadius: 1, zIndex: 2 }} />

      {/* Card body */}
      <div style={{
        background: "linear-gradient(145deg, rgba(28,28,34,0.92) 0%, rgba(14,14,18,0.96) 100%)",
        backdropFilter: "blur(40px) saturate(160%)",
        borderRadius: 28,
        padding: "36px 32px 32px",
        position: "relative",
        overflow: "hidden",
        boxShadow: `
          0 48px 100px rgba(0,0,0,0.85),
          0 0 0 0.5px rgba(255,255,255,0.06) inset,
          inset 0 1px 0 rgba(255,255,255,0.08)
        `,
        zIndex: 1,
      }}>

        {/* Inner chrome sheen — moves with mouse */}
        <div style={{
          position: "absolute",
          width: "180%", height: "180%",
          top: `${(mouse?.y ?? 0.3) * -50}%`,
          left: `${(mouse?.x ?? 0.5) * -40}%`,
          background: `radial-gradient(ellipse at center, rgba(255,255,255,0.028) 0%, transparent 60%)`,
          pointerEvents: "none",
          transition: "top 0.4s ease, left 0.4s ease",
        }} />

        {/* Network info */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Network</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em" }}>Cairo Venues</span>
          </div>
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Access</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>Unified Pass</span>
          </div>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)", marginBottom: 24 }} />

        {/* Email input — liquid metal style */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "0 16px",
          background: focusedEmail ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: focusedEmail ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14,
          marginBottom: 14,
          transition: "all 0.3s ease",
          boxShadow: focusedEmail ? "0 0 0 3px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: focusedEmail ? 0.4 : 0.2, flexShrink: 0, transition: "opacity 0.3s" }}>
            <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10z" />
            <path d="M22 7l-10 7L2 7" />
          </svg>
          <input
            className="pp-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocusedEmail(true)}
            onBlur={() => setFocusedEmail(false)}
            onKeyDown={e => e.key === "Enter" && onSubmit()}
            style={{
              flex: 1, background: "transparent", border: "none",
              padding: "17px 0", color: "#fff",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400,
            }}
          />
        </div>

        {/* Submit button — liquid metal */}
        <button
          className="pp-btn"
          onClick={onSubmit}
          disabled={!email}
          style={{
            width: "100%",
            padding: "18px 24px",
            background: email
              ? "linear-gradient(145deg, #e8e8ec 0%, #c0c0c8 30%, #f4f4f8 55%, #a0a0a8 80%, #d4d4da 100%)"
              : "rgba(255,255,255,0.04)",
            color: email ? "#0a0a0c" : "rgba(255,255,255,0.15)",
            border: email ? "none" : "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: email ? "pointer" : "default",
            transition: "all 0.4s cubic-bezier(0.2,0,0.2,1)",
            boxShadow: email ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.2)" : "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {email && (
            <div style={{
              position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              animation: "metalSheen 3s ease-in-out infinite",
              transform: "skewX(-20deg)",
            }} />
          )}
          REQUEST ACCESS →
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   MAIN JOIN PAGE
══════════════════════════════ */
export default function Join() {
  const [email, setEmail] = useState("");
  const [membersCount, setMembersCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    
    // Fetch initial count from Supabase
    const fetchCount = async () => {
      try {
        const res = await fetch("https://vcimglvlnsqdeztmzzsd.supabase.co/rest/v1/waitlist?select=count", {
          headers: {
            "apikey": "sb_publishable_RaabbAPCljSOWWCi3N8skA_LMqaH5bH",
            "Authorization": "Bearer sb_publishable_RaabbAPCljSOWWCi3N8skA_LMqaH5bH",
            "Prefer": "count=exact"
          }
        });
        const data = await res.json();
        // PostgREST returns count in the first element if using count=exact/select=count
        if (data && data[0] && typeof data[0].count === 'number') {
          setMembersCount(data[0].count);
        }
      } catch (err) {
        console.error("Error fetching count:", err);
      }
    };
    fetchCount();

    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e) => {
    const nx = e.clientX / window.innerWidth;
    const ny = e.clientY / window.innerHeight;
    setMouse({ x: nx, y: ny });
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientX - cx) / (rect.width / 2)) * 7,
      y: -((e.clientY - cy) / (rect.height / 2)) * 7,
    });
  };

  const handleSubmit = async () => {
    if (!email) return;
    
    // Save to Supabase waitlist table
    try {
      const res = await fetch("https://vcimglvlnsqdeztmzzsd.supabase.co/rest/v1/waitlist", {
        method: "POST",
        headers: {
          "apikey": "sb_publishable_RaabbAPCljSOWWCi3N8skA_LMqaH5bH",
          "Authorization": "Bearer sb_publishable_RaabbAPCljSOWWCi3N8skA_LMqaH5bH",
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ email: email })
      });

      if (res.ok) {
        setConfetti(true);
        setMembersCount(c => c + 1);
        setTimeout(() => { 
          setShowModal(true); 
          setConfetti(false); 
        }, 280);
      } else {
        console.error("Failed to join waitlist:", await res.text());
      }
    } catch (err) {
      console.error("Supabase Error:", err);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", background: "#060608", color: "#fff", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&family=Barlow+Condensed:ital,wght@1,700;1,800;1,900&display=swap');

        *{box-sizing:border-box;margin:0;padding:0}

        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.92) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes checkIn{0%{opacity:0;transform:scale(0.3)}60%{transform:scale(1.1)}100%{opacity:1;transform:scale(1)}}
        @keyframes pulseRing{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(2.2);opacity:0}}
        @keyframes metalSheen{0%{left:-100%}50%,100%{left:200%}}
        @keyframes logoSpin{0%,100%{transform:translateY(0px) rotate(0deg)}50%{transform:translateY(-6px) rotate(3deg)}}
        @keyframes headlineReveal{from{opacity:0;transform:translateY(40px) skewY(2deg)}to{opacity:1;transform:translateY(0) skewY(0deg)}}
        @keyframes shimmerText{0%{background-position:-200% center}100%{background-position:200% center}}

        .pp-input::placeholder{color:rgba(255,255,255,0.15)}
        .pp-input:focus{outline:none}
        .pp-btn:hover:not(:disabled){transform:translateY(-3px) !important;box-shadow:0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.2) !important}
        .pp-btn:active:not(:disabled){transform:translateY(0) !important}
      `}</style>

      {/* Static CSS ambient — no JS loops */}
      <MetalAmbient />

      {/* Grain overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`, opacity: 0.6 }} />

      {/* ── MODALS & OVERLAYS ── */}
      <ConfettiBurst active={confetti} />
      {showModal && <SuccessModal email={email} onClose={() => setShowModal(false)} mouse={mouse} />}

      {/* ── HEADER (preserved) ── */}
      <Header currentScene="scene-metal" />

      {/* ── MAIN CONTENT ── */}
      <main style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "110px 24px 72px",
      }}>

        {/* Ticker */}
        <div style={{ width: "100%", maxWidth: 780, marginBottom: 52, opacity: mounted ? 1 : 0, animation: mounted ? "fadeIn 1s ease 0.1s both" : "none" }}>
          <Ticker mouse={mouse} />
        </div>

        {/* Wordmark: pass+ */}
        <div style={{ marginBottom: 48, opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 0.8s ease 0.2s both" : "none", display: "flex", justifyContent: "center", width: "100%" }}>
          <PassplusWordmark mouse={mouse} />
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 20, maxWidth: 700 }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "clamp(52px, 9vw, 118px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: 6,
            opacity: mounted ? 1 : 0,
            animation: mounted ? "headlineReveal 0.9s cubic-bezier(0.2,0,0.2,1) 0.35s both" : "none",
          }}>
            CLAIM YOUR
          </h1>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "clamp(52px, 9vw, 118px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            marginBottom: 0,
            background: "linear-gradient(110deg, #d4d4dc 0%, #ffffff 20%, #a0a0ac 38%, #e8e8f0 55%, #787880 72%, #f0f0f4 88%, #c0c0c8 100%)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: mounted ? "headlineReveal 0.9s cubic-bezier(0.2,0,0.2,1) 0.42s both, shimmerText 5s linear 1.5s infinite" : "none",
            opacity: mounted ? 1 : 0,
            filter: "drop-shadow(0 0 40px rgba(200,200,220,0.15))",
          }}>
            PRIORITY.
          </h1>
        </div>

        {/* Subline */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(14px, 1.8vw, 17px)",
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
          letterSpacing: "0.04em",
          maxWidth: 400,
          lineHeight: 1.7,
          marginBottom: 32,
          opacity: mounted ? 1 : 0,
          animation: mounted ? "fadeUp 0.8s ease 0.5s both" : "none",
        }}>
          One pass. Every gym, studio &amp; spa in Cairo.
        </p>

        {/* Live counter */}
        <div style={{ marginBottom: 48, opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 0.8s ease 0.55s both" : "none" }}>
          <LiveCounter count={membersCount} />
        </div>

        {/* THE CARD */}
        <div style={{ opacity: mounted ? 1 : 0, animation: mounted ? "fadeUp 0.9s ease 0.6s both" : "none", width: "100%", display: "flex", justifyContent: "center" }}>
          <LiquidCard
            mouse={mouse}
            email={email}
            setEmail={setEmail}
            focusedEmail={focusedEmail}
            setFocusedEmail={setFocusedEmail}
            onSubmit={handleSubmit}
            tilt={tilt}
            cardRef={cardRef}
          />
        </div>

        {/* Footer note */}
        <p style={{
          marginTop: 28,
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: mounted ? 1 : 0,
          animation: mounted ? "fadeIn 1s ease 0.9s both" : "none",
          textAlign: "center",
        }}>
          No spam · Cancel anytime · Cairo only
        </p>
      </main>
    </div>
  );
}
