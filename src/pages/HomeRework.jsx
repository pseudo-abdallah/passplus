import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";




/* ─────────────────────────────────────────
   BRAND TOKENS
───────────────────────────────────────── */
const T = {
  pink:   "#E8317A",
  pinkLt: "#FF6FA3",
  pinkDk: "#B81F5C",
  teal:   "#0C7E8C",
  tealLt: "#19B8CC",
  tealDk: "#033D47",
  lav:    "#9B7FE8",
  lavLt:  "#C4AFFF",
  gold:   "#D4A017",
  goldLt: "#F5CB5C",
  plat:   "#A0AEC0",
  platLt: "#CBD5E0",
  diam:   "#93C5FD",
  diamLt: "#BFDBFE",
  ink:    "#080808",
};

/* ─────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; cursor:none !important; }
  body {
    font-family:'DM Sans',sans-serif;
    background:#000;
    color:#fff;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
    cursor:none;
  }

  /* Custom Plus Cursor (handled globally in Layout.jsx) */

  /* ══ LOADING ══ */
  .pp-loading {
    position:fixed; inset:0; background:#000; z-index:10000;
    display:flex; align-items:center; justify-content:center;
    transition:opacity 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-loading.loaded { opacity:0; pointer-events:none; }
  .pp-loading-logo {
    display:flex; align-items:center; justify-content:center;
    gap:2px; margin-bottom:48px;
    animation:fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s both;
  }
  .pp-loading-logo-text {
    font-family:'DM Sans',sans-serif; font-weight:400;
    font-size:32px; letter-spacing:-0.02em; color:#fff;
  }
  .pp-loading-plus { width:24px; height:24px; position:relative; display:inline-block; margin-left:2px; }
  .pp-loading-plus::before,.pp-loading-plus::after {
    content:''; position:absolute; background:white; border-radius:2px;
  }
  .pp-loading-plus::before { width:24px; height:6px; top:9px; left:0; }
  .pp-loading-plus::after  { width:6px; height:24px; top:0; left:9px; }
  .pp-loading-bar-wrap {
    width:280px; height:2px; background:rgba(255,255,255,0.08);
    border-radius:2px; margin:0 auto 20px; overflow:hidden;
    animation:fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.4s both;
  }
  .pp-loading-bar {
    height:100%; background:linear-gradient(90deg,#FF6FA3,#E8317A,#9B7FE8);
    border-radius:2px; width:0%;
    transition:width 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow:0 0 20px rgba(232,49,122,0.5);
  }
  .pp-loading-counter {
    font-family:'DM Mono',monospace; font-size:14px;
    color:rgba(255,255,255,0.5); margin-bottom:12px; text-align:center;
    animation:fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.6s both;
  }
  .pp-loading-text {
    font-family:'DM Sans',sans-serif; font-weight:300; font-size:11px;
    letter-spacing:0.15em; text-transform:uppercase;
    color:rgba(255,255,255,0.3); text-align:center;
    animation:fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.8s both;
  }


  /* ══ S0 FLUID INTRO SCENE ══ */
  .pp-unicorn-scene {
    opacity:0; transition:opacity 1.2s ease;
  }
  .pp-unicorn-scene.visible { opacity:1; }

  .pp-unicorn-canvas {
    position:absolute; inset:0; width:100%; height:100%;
    overflow:hidden;
    /* Clip the bottom 60px to hide any watermark */
    clip-path:inset(0 0 60px 0);
  }
  .pp-unicorn-canvas canvas {
    width:100%!important; height:100%!important; display:block;
  }
  .pp-fluid-bg {
    position:absolute; inset:0;
    background:linear-gradient(135deg,#0a0014,#0d0020,#14002a,#1a0035);
    background-size:400% 400%;
    animation:fluidShift 12s ease infinite;
  }
  @keyframes fluidShift {
    0%,100%{background-position:0% 50%}
    25%{background-position:100% 0%}
    50%{background-position:100% 100%}
    75%{background-position:0% 100%}
  }
  .pp-fluid-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); mix-blend-mode:screen;
    animation-timing-function:ease-in-out;
    animation-iteration-count:infinite;
  }
  .pp-fluid-orb-1 {
    width:60vw; height:60vw; top:-10%; left:-10%;
    background:radial-gradient(circle,rgba(232,49,122,0.4),transparent 70%);
    animation:orb1Move 10s infinite;
  }
  .pp-fluid-orb-2 {
    width:50vw; height:50vw; bottom:-15%; right:-10%;
    background:radial-gradient(circle,rgba(155,127,232,0.35),transparent 70%);
    animation:orb2Move 13s infinite;
  }
  .pp-fluid-orb-3 {
    width:40vw; height:40vw; top:30%; left:40%;
    background:radial-gradient(circle,rgba(25,184,204,0.3),transparent 70%);
    animation:orb3Move 11s infinite;
  }
  @keyframes orb1Move {
    0%,100%{transform:translate(0,0) scale(1)}
    33%{transform:translate(15vw,10vh) scale(1.1)}
    66%{transform:translate(-5vw,20vh) scale(0.95)}
  }
  @keyframes orb2Move {
    0%,100%{transform:translate(0,0) scale(1)}
    33%{transform:translate(-10vw,-15vh) scale(1.15)}
    66%{transform:translate(10vw,-5vh) scale(0.9)}
  }
  @keyframes orb3Move {
    0%,100%{transform:translate(0,0) scale(1)}
    33%{transform:translate(-15vw,10vh) scale(1.08)}
    66%{transform:translate(10vw,-12vh) scale(1.12)}
  }
  .pp-intro-text {
    position:absolute; inset:0; z-index:2;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    transition:opacity 1.5s ease;
  }
  .pp-intro-label {
    font-family:'DM Mono',monospace; font-size:11px; font-weight:500;
    letter-spacing:0.3em; color:rgba(255,255,255,0.35);
    margin-bottom:24px;
    animation:fadeInUp 1s ease 0.3s both;
  }
  .pp-intro-title {
    font-family:'DM Sans',sans-serif; font-weight:300;
    font-size:64px; letter-spacing:-0.03em; color:#fff;
    animation:fadeInUp 1s ease 0.6s both;
  }
  
  .pp-unicorn-scene iframe,
  .pp-unicorn-scene canvas {
    width:100%!important; height:100%!important;
    display:block;
  }
  /* ══ HEADER — Standardized global Header used ══ */
  .pp-header-btn {
    background:rgba(0,0,0,0.08);
    backdrop-filter:blur(12px) saturate(180%);
    -webkit-backdrop-filter:blur(12px) saturate(180%);
    color:#000; border:1px solid rgba(0,0,0,0.12);
    border-radius:99px; padding:8px 18px;
    font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500;
    cursor:pointer; position:relative; overflow:hidden;
    transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-header-btn::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(0,0,0,0.2),transparent);
  }
  .pp-header-btn:hover {
    background:rgba(0,0,0,0.12); border-color:rgba(0,0,0,0.2);
    transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,0,0,0.08);
  }

  /* ══ STICKY FOOTER ══ */
  .pp-sticky-footer {
    position:fixed; bottom:0; left:0; right:0; height:80px;
    display:flex; align-items:center; justify-content:center;
    gap:16px; padding:0 32px 32px; z-index:10000;
    opacity:0; pointer-events:none;
    transition:opacity 0.6s ease,transform 0.6s ease;
  }
  .pp-sticky-footer.visible { opacity:1; pointer-events:auto; }
  .pp-sticky-footer.scene-1 { opacity:0!important; pointer-events:none!important; transform:translateY(20px); }
  .pp-sticky-footer.scene-5 { opacity:0!important; pointer-events:none!important; transform:translateY(100px); }
  .pp-footer-btn {
    padding:16px 36px; border-radius:99px;
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
    cursor:pointer; border:none; position:relative; overflow:hidden;
    backdrop-filter:blur(20px) saturate(180%);
    -webkit-backdrop-filter:blur(20px) saturate(180%);
    transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-footer-btn::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);
  }
  .pp-footer-btn::after {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.1),transparent 60%);
    pointer-events:none;
  }
  .pp-footer-btn-primary {
    background:rgba(232,49,122,0.15); border:1px solid rgba(232,49,122,0.3);
    color:#FF6FA3;
    box-shadow:0 8px 32px rgba(232,49,122,0.15),inset 0 0 20px rgba(232,49,122,0.1);
    transition:all 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-sticky-footer.scene-1 .pp-footer-btn-primary {
    background:rgba(0,0,0,0.15); border-color:rgba(0,0,0,0.3); color:#000;
    box-shadow:0 8px 32px rgba(0,0,0,0.15),inset 0 0 20px rgba(0,0,0,0.1);
  }
  .pp-sticky-footer.scene-2 .pp-footer-btn-primary {
    background:rgba(232,49,122,0.15); border-color:rgba(232,49,122,0.3); color:#FF6FA3;
  }
  .pp-sticky-footer.scene-3 .pp-footer-btn-primary {
    background:rgba(25,184,204,0.15); border-color:rgba(25,184,204,0.3); color:#19B8CC;
    box-shadow:0 8px 32px rgba(25,184,204,0.15),inset 0 0 20px rgba(25,184,204,0.1);
  }
  .pp-footer-btn-primary:hover { transform:translateY(-3px); }
  .pp-footer-btn-secondary {
    background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
    color:rgba(0,0,0,0.8);
    box-shadow:0 8px 32px rgba(0,0,0,0.1),inset 0 0 20px rgba(255,255,255,0.05);
  }
  .pp-footer-btn-secondary:hover {
    background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.25);
    transform:translateY(-3px);
  }

  /* ══ PROGRESS + SCROLL ══ */
  .pp-progress-counter {
    position:fixed; bottom:32px; right:32px;
    font-family:'DM Mono',monospace; font-size:10px;
    color:rgba(255,255,255,0.3); z-index:999;
  }
  .pp-scroll-prompt {
    position:fixed; bottom:40px;
    text-align:center; z-index:100; transition:opacity 0.5s ease;
    display:flex; flex-direction:column; align-items:center; gap:8px;
  }
  .pp-scroll-prompt-left  { left:40px; }
  .pp-scroll-prompt-right { right:40px; }
  .pp-scroll-text {
    font-family:'DM Sans',sans-serif; font-weight:300; font-size:10px;
    letter-spacing:0.25em; text-transform:uppercase;
    color:rgba(0,0,0,0.4);
  }
  .pp-scroll-chevron {
    width:12px; height:12px; margin:0 auto;
    border-left:1px solid rgba(0,0,0,0.3); border-bottom:1px solid rgba(0,0,0,0.3);
    transform:rotate(-45deg); animation:bounce 2s infinite;
  }
  @keyframes bounce {
    0%,100% { transform:translateY(0) rotate(-45deg); }
    50%      { transform:translateY(4px) rotate(-45deg); }
  }

  /* ══ GLASS ══ */
  .pp-glass {
    background:rgba(255,255,255,0.03);
    backdrop-filter:blur(32px) saturate(200%);
    -webkit-backdrop-filter:blur(32px) saturate(200%);
    border:1px solid rgba(255,255,255,0.08); border-radius:24px;
    position:relative; overflow:hidden;
    transition:all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pp-glass:hover { transform:translateY(-6px); border-color:rgba(255,255,255,0.15); box-shadow:0 32px 80px rgba(0,0,0,0.5); }
  .pp-glass::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5) 40%,rgba(255,255,255,0.5) 60%,transparent);
  }
  .pp-glass::after {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse at 50% 0%,rgba(155,127,232,0.08),transparent 60%);
    pointer-events:none;
  }

  /* ══ REVEALS ══ */
  .pp-reveal {
    opacity:0; transform:translateY(60px);
    transition:opacity 1s cubic-bezier(0.4,0,0.2,1),transform 1s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-reveal.visible { opacity:1; transform:translateY(0); }
  .pp-reveal-left {
    opacity:0; transform:translateX(-80px);
    transition:opacity 1.2s cubic-bezier(0.4,0,0.2,1),transform 1.2s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-reveal-left.visible { opacity:1; transform:translateX(0); }
  .pp-reveal-right {
    opacity:0; transform:translateX(80px);
    transition:opacity 1.2s cubic-bezier(0.4,0,0.2,1),transform 1.2s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-reveal-right.visible { opacity:1; transform:translateX(0); }
  .pp-reveal-scale {
    opacity:0; transform:scale(0.85);
    transition:opacity 1s cubic-bezier(0.4,0,0.2,1),transform 1s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-reveal-scale.visible { opacity:1; transform:scale(1); }
  .pp-stagger > *:nth-child(1) { transition-delay:0s; }
  .pp-stagger > *:nth-child(2) { transition-delay:0.15s; }
  .pp-stagger > *:nth-child(3) { transition-delay:0.3s; }
  .pp-stagger > *:nth-child(4) { transition-delay:0.45s; }
  .pp-stagger > *:nth-child(5) { transition-delay:0.6s; }

  /* ══════════════════════════════════════════════════
     SEAMLESS BACKGROUND FLOW SYSTEM
     
     Each scene has a solid base color that sits flush
     with the next. The "bridge" is always a ::after
     gradient fade at the bottom of each scene,
     matching the next scene's base exactly.
     All scenes use margin-top:-20vh + z-index stacking
     so the bridge gradient overlaps and hides the seam.
  ══════════════════════════════════════════════════ */

  /* S1 — Hero: sits on top of everything, covers S2 bleed */
  #pp-s1 {
    background:#000000; position:relative; overflow:hidden;
    z-index:10;
  }
  .pp-webgl { position:absolute; inset:0; z-index:1; width:100%; height:100%; }
  .pp-webgl canvas { display:block; width:100% !important; height:100% !important; }
  #pp-s1 .pp-scene-content { position:relative; z-index:2; }

  /* S2 — Women: deep magenta-black */
  #pp-s2 {
    background:#0A0008; position:relative; overflow:hidden;
    margin-top:-20vh; z-index:3;
    padding-top:calc(20vh + 80px);
  }
  /* Pink aura blobs */
  #pp-s2::before {
    content:''; position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(ellipse 90% 70% at 35% 50%,
        rgba(255,111,163,0.38) 0%, rgba(232,49,122,0.18) 46%, transparent 72%),
      radial-gradient(ellipse 55% 48% at 75% 25%,
        rgba(180,40,100,0.25) 0%, transparent 65%);
    animation:auraShift 8s ease-in-out infinite;
  }
  /* Bridge: pink → teal */
  #pp-s2::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:42vh; pointer-events:none; z-index:4;
    background:linear-gradient(to bottom,
      transparent 0%,
      rgba(0,5,7,0.55) 45%,
      rgba(0,8,10,0.92) 78%,
      #00080A 100%
    );
  }
  @keyframes auraShift {
    0%,100% { transform:translate(0,0) scale(1); opacity:1; }
    50%      { transform:translate(-18px,18px) scale(1.04); opacity:0.85; }
  }

  /* S3 — Men: deep teal-black */
  #pp-s3 {
    background:#00080A; position:relative; overflow:hidden;
    margin-top:-20vh; z-index:4;
  }
  /* Teal aura blobs */
  #pp-s3::before {
    content:''; position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(ellipse 85% 65% at 65% 50%,
        rgba(25,184,204,0.35) 0%, rgba(12,126,140,0.18) 48%, transparent 72%),
      radial-gradient(ellipse 68% 55% at 28% 62%,
        rgba(3,61,71,0.50) 0%, transparent 68%);
    animation:auraTeal 9s ease-in-out infinite;
  }
  /* Bridge: teal → near-black (tiers) */
  #pp-s3::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:42vh; pointer-events:none; z-index:5;
    background:linear-gradient(to bottom,
      transparent 0%,
      rgba(0,2,6,0.55) 45%,
      rgba(0,0,5,0.92) 78%,
      #000005 100%
    );
  }
  @keyframes auraTeal {
    0%,100% { transform:translate(0,0) scale(1); opacity:1; }
    50%      { transform:translate(22px,-18px) scale(1.05); opacity:0.88; }
  }
  .pp-teal-glass { border:1px solid rgba(25,184,204,0.15)!important; background:rgba(12,126,140,0.06)!important; }
  .pp-teal-glass::after { background:radial-gradient(ellipse at 50% 0%,rgba(25,184,204,0.12),transparent 60%)!important; }
  .pp-stat-teal { color:rgba(25,184,204,0.45)!important; }

  /* ── TIERS (scroll-jacked) ── */
  .pp-tiers-outer { position:relative; height:300vh; }
  .pp-tiers-sticky {
    position:sticky; top:0; height:100vh; overflow:hidden;
    display:flex; align-items:center; justify-content:center;
    background:#000005;
  }
  /* Top bridge receiving teal from S3 */
  .pp-tiers-sticky::before {
    content:''; position:absolute; top:0; left:0; right:0;
    height:28vh; pointer-events:none; z-index:10;
    background:linear-gradient(to bottom,rgba(0,8,10,0.45) 0%,transparent 100%);
  }
  /* Bottom bridge → purple identity */
  .pp-tiers-sticky::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:28vh; pointer-events:none; z-index:10;
    background:linear-gradient(to bottom,transparent 0%,rgba(4,0,10,0.55) 60%,#04000A 100%);
  }
  .pp-tier-bg {
    position:absolute; inset:0;
    transition:opacity 1s cubic-bezier(0.4,0,0.2,1);
    z-index:1;
  }
  .pp-tier-panel {
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center; padding:0 48px;
    transition:opacity 0.6s cubic-bezier(0.4,0,0.2,1),transform 0.6s cubic-bezier(0.4,0,0.2,1);
    z-index:2;
  }
  .pp-tier-panel.hidden  { opacity:0; transform:translateY(40px);  pointer-events:none; }
  .pp-tier-panel.exiting { opacity:0; transform:translateY(-60px); pointer-events:none; }
  .pp-tier-inner {
    max-width:1440px; width:100%;
    display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;
  }
  .pp-tier-label {
    font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600;
    letter-spacing:0.22em; text-transform:uppercase; margin-bottom:20px;
  }
  .pp-tier-name {
    font-family:'Barlow Condensed',sans-serif; font-style:italic; font-weight:900;
    font-size:clamp(72px,11vw,160px); line-height:0.85; letter-spacing:-0.03em;
    color:#fff; margin-bottom:12px;
  }
  .pp-tier-price {
    font-family:'DM Mono',monospace; font-size:18px;
    margin-bottom:32px; color:rgba(255,255,255,0.5);
  }
  .pp-tier-benefits { display:flex; flex-direction:column; gap:14px; }
  .pp-tier-benefit {
    display:flex; align-items:flex-start; gap:12px;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:300;
    color:rgba(255,255,255,0.75); line-height:1.5;
  }
  .pp-tier-check { flex-shrink:0; margin-top:2px; }
  .pp-tier-card {
    aspect-ratio:1.586; border-radius:20px; position:relative; overflow:hidden;
    padding:28px 32px; display:flex; flex-direction:column; justify-content:space-between;
  }
  .pp-tier-card-label {
    font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600;
    letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.6);
  }
  .pp-tier-card-name {
    font-family:'DM Sans',sans-serif; font-size:22px; font-weight:300;
    letter-spacing:-0.02em; color:#fff;
  }
  .pp-tier-progress {
    position:absolute; right:32px; top:50%; transform:translateY(-50%);
    display:flex; flex-direction:column; align-items:center; gap:8px; z-index:11;
  }
  .pp-tier-dot { width:6px; height:6px; border-radius:50%; transition:all 0.4s ease; }
  .pp-tier-dot.active { transform:scale(1.5); }
  .pp-float { animation:float 6s ease-in-out infinite; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

  /* S4 — Identity: deep purple */
  #pp-s4 {
    background:#04000A; position:relative; overflow:hidden;
    margin-top:-20vh; z-index:5;
  }
  /* Iridescent brand gradient */
  #pp-s4::before {
    content:''; position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(ellipse 100% 80% at 50% 50%,
        rgba(155,127,232,0.22) 0%,
        rgba(196,175,255,0.10) 40%,
        rgba(232,49,122,0.08) 70%,
        transparent 90%),
      linear-gradient(135deg,
        rgba(155,127,232,0.08) 0%,
        rgba(192,132,252,0.12) 30%,
        rgba(96,165,250,0.08) 60%,
        rgba(244,114,182,0.08) 100%);
    background-size:300% 300%;
    animation:iridBloom 14s ease infinite;
  }
  /* Bridge: purple → footer ink */
  #pp-s4::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:38vh; pointer-events:none; z-index:3;
    background:linear-gradient(to bottom,
      transparent 0%,
      rgba(5,5,7,0.55) 45%,
      rgba(8,8,8,0.92) 78%,
      #080808 100%
    );
  }
  @keyframes iridBloom {
    0%   { background-position:0% 50%; }
    50%  { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }

  /* S5 — Footer: solid ink */
  #pp-s5 {
    background:#080808; min-height:auto!important;
    padding:80px 32px 32px!important;
    margin-top:-20vh; z-index:6; position:relative;
  }

  /* ══ SCENE SHARED ══ */
  .pp-scene {
    min-height:100vh; position:relative;
    display:flex; align-items:center; justify-content:center;
    padding:120px 32px 20vh;
  }

  /* ── S1: exactly one screen, nothing overflows ── */
  #pp-s1.pp-scene {
    height:100svh;
    min-height:100svh;
    max-height:100svh;
    padding:56px 32px 32px;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    box-sizing:border-box;
  }

  .pp-scene-content {
    width:100%; max-width:1440px; margin:0 auto;
    position:relative; z-index:2;
  }

  /* ══ HERO CONTENT ══ */
  .pp-hero-center {
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:20px;
    height:calc(100svh - 88px);
  }
  .pp-hero-headline {
    font-family:'Barlow Condensed',sans-serif; font-style:italic;
    font-weight:900;
    font-size:clamp(64px,11vw,160px);
    line-height:0.88; letter-spacing:-0.03em; color:#000;
    text-shadow:0 10px 30px rgba(0,0,0,0.1);
    animation:heroTitleIn 1.2s cubic-bezier(0.16,1,0.3,1) both;
  }
  /* ══ LIQUID GLASS ══ */
  .pp-liquid-glass-wrap {
    max-width:520px; width:100%;
    position:relative;
    border-radius:28px;
  }
  /* Hidden SVG filter definition */
  .pp-lg-svg-defs {
    position:absolute; width:0; height:0; overflow:hidden;
  }
  /* Distortion canvas — position:absolute, full cover, clips to radius */
  .pp-lg-canvas {
    position:absolute; inset:-1px;
    border-radius:28px;
    overflow:hidden;
    pointer-events:none;
    z-index:0;
  }
  .pp-lg-canvas-inner {
    width:100%; height:100%;
    filter:url(#lg-filter);
    border-radius:28px;
  }
  /* Chromatic aberration layers */
  .pp-lg-ca-r {
    position:absolute; inset:0;
    border-radius:28px;
    background:inherit;
    mix-blend-mode:screen;
    opacity:0.18;
    filter:url(#lg-filter-r);
    pointer-events:none;
  }
  .pp-lg-ca-b {
    position:absolute; inset:0;
    border-radius:28px;
    background:inherit;
    mix-blend-mode:screen;
    opacity:0.18;
    filter:url(#lg-filter-b);
    pointer-events:none;
  }
  /* Main glass surface */
  .pp-hero-glass {
    position:relative; z-index:2;
    display:flex;
    flex-direction:column;
    border-radius:28px;
    overflow:hidden;
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(24px) saturate(180%) brightness(1.10);
    -webkit-backdrop-filter:blur(24px) saturate(180%) brightness(1.10);
    border:1px solid rgba(255,255,255,0.52);
    box-shadow:
      0 8px 40px rgba(0,0,0,0.10),
      inset 0 1px 0 rgba(255,255,255,0.88),
      inset 0 -1px 0 rgba(200,220,255,0.18),
      inset 1px 0 0 rgba(255,255,255,0.42),
      inset -1px 0 0 rgba(200,220,255,0.22);
  }
  /* Top specular dome */
  .pp-hero-glass::before {
    content:''; position:absolute;
    top:0; left:0; right:0; height:48%;
    background:radial-gradient(ellipse 75% 55% at 50% -5%,
      rgba(255,255,255,0.40) 0%,
      rgba(220,235,255,0.10) 55%,
      transparent 100%);
    border-radius:28px 28px 50% 50%;
    pointer-events:none; z-index:1;
  }
  /* Bottom shimmer */
  .pp-hero-glass::after {
    content:''; position:absolute;
    bottom:0; left:8%; right:8%; height:1px;
    background:linear-gradient(90deg,
      transparent,
      rgba(180,215,255,0.50) 25%,
      rgba(230,245,255,0.95) 50%,
      rgba(180,215,255,0.50) 75%,
      transparent);
    pointer-events:none; z-index:1;
  }
  

  /* Content above pseudo-elements */
  .pp-lg-content { position:relative; z-index:2; }

  /* Upper body */
  .pp-hero-glass-body { padding:28px 36px 20px; text-align:center; }
  .pp-hero-desc {
    font-family:'DM Sans',sans-serif; font-weight:300; font-size:16px;
    line-height:1.75; color:rgba(0,0,0,0.70);
  }
  .pp-hero-divider {
    height:1px; margin:0;
    background:linear-gradient(90deg,
      transparent,
      rgba(180,215,255,0.40) 20%,
      rgba(210,235,255,0.70) 50%,
      rgba(180,215,255,0.40) 80%,
      transparent);
  }

  /* ── Pressable CTA ── */
  .pp-hero-cta {
    display:block; width:100%;
    padding:16px 36px 20px;
    background:transparent;
    border:none; cursor:pointer;
    position:relative; z-index:2;
    border-radius:0 0 24px 24px;
    transition:background 0.3s ease, transform 0.15s ease;
  }
  .pp-hero-cta::before {
    content:''; position:absolute; inset:0;
    background:rgba(255,255,255,0.10);
    opacity:0; transition:opacity 0.25s ease;
    border-radius:0 0 24px 24px;
  }
  .pp-hero-cta:hover::before { opacity:1; }
  .pp-hero-cta:active { transform:scale(0.985); }
  .pp-hero-cta-label {
    font-family:'DM Sans',sans-serif; font-weight:600; font-size:11px;
    letter-spacing:0.16em; text-transform:uppercase; color:rgba(80,140,220,0.9);
    display:flex; align-items:center; justify-content:center; gap:8px;
    position:relative; z-index:1;
  }
  .pp-hero-cta-arrow {
    transition:transform 0.3s cubic-bezier(0.175,0.885,0.32,2.2);
    display:inline-block;
  }
  .pp-hero-cta:hover .pp-hero-cta-arrow { transform:translateX(5px); }

  /* ══ SCENES 2-3 ══ */
  .pp-eyebrow {
    font-family:'DM Sans',sans-serif; font-weight:600; font-size:10px;
    letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.4);
  }
  .pp-split { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
  .pp-massive {
    font-family:'Barlow Condensed',sans-serif; font-style:italic; font-weight:900;
    font-size:clamp(72px,13vw,180px); line-height:0.85; letter-spacing:-0.03em; color:#fff;
  }
  .pp-massive.right { text-align:right; }
  .pp-feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .pp-feat-card { padding:20px 24px; border-radius:12px; }
  .pp-feat-card > * { position:relative; z-index:1; }
  .pp-feat-title {
    font-family:'DM Sans',sans-serif; font-weight:500; font-size:13px;
    color:#fff; margin-bottom:8px;
  }
  .pp-feat-body {
    font-family:'DM Sans',sans-serif; font-weight:300; font-size:12px;
    line-height:1.6; color:rgba(255,255,255,0.6);
  }
  .pp-stat-strip { margin-top:48px; padding:12px 24px; border-radius:99px; text-align:center; }
  .pp-stat-strip > * { position:relative; z-index:1; }
  .pp-stat-text { font-family:'DM Mono',monospace; font-size:10px; color:rgba(255,255,255,0.45); }

  /* ══ SCENE 4 IDENTITY ══ */
  .pp-identity-center {
    text-align:center; display:flex; flex-direction:column;
    align-items:center; gap:40px;
  }
  .pp-identity-headline {
    font-family:'Barlow Condensed',sans-serif; font-style:italic; font-weight:900;
    font-size:clamp(80px,16vw,220px); line-height:0.88; letter-spacing:-0.03em;
  }
  .pp-id-line1 {
    color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.55);
    text-shadow:0 0 40px rgba(155,127,232,0.45),0 0 80px rgba(232,49,122,0.25);
    animation:neonPulse 2.5s ease-in-out infinite;
  }
  .pp-id-line2 {
    background:linear-gradient(135deg,#C4AFFF 0%,#E8317A 30%,#9B7FE8 60%,#19B8CC 100%);
    background-clip:text; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-size:200% 200%; animation:gradShift 4s ease infinite;
    filter:drop-shadow(0 0 28px rgba(155,127,232,0.65));
  }
  @keyframes gradShift {
    0%,100% { background-position:0% 50%; }
    50%      { background-position:100% 50%; }
  }
  @keyframes neonPulse {
    0%,100% { text-shadow:0 0 40px rgba(155,127,232,0.45),0 0 80px rgba(232,49,122,0.25); }
    50%      { text-shadow:0 0 70px rgba(155,127,232,0.75),0 0 120px rgba(232,49,122,0.45); }
  }
  .pp-identity-symbol {
    width:64px; height:64px; position:relative; margin:0 auto 24px;
    animation:symbolRotate 20s linear infinite;
  }
  @keyframes symbolRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .pp-identity-symbol::before,.pp-identity-symbol::after {
    content:''; position:absolute;
    background:linear-gradient(135deg,#E0E0F0,#C084FC 25%,#F0F0FF 50%,#60A5FA 75%,#F472B6);
    border-radius:2px; animation:iridShift 8s ease-in-out infinite;
  }
  .pp-identity-symbol::before { width:64px; height:12px; top:26px; left:0; }
  .pp-identity-symbol::after  { width:12px; height:64px; top:0; left:26px; }
  @keyframes iridShift {
    0%   { filter:hue-rotate(0deg); }
    40%  { filter:hue-rotate(25deg); }
    70%  { filter:hue-rotate(-15deg); }
    100% { filter:hue-rotate(0deg); }
  }
  .pp-identity-subhead {
    font-family:'DM Sans',sans-serif; font-weight:300;
    font-size:clamp(18px,2.5vw,28px); line-height:1.6; letter-spacing:-0.01em;
    color:rgba(255,255,255,0.7);
  }

  /* ══ FOOTER ══ */
  .pp-footer-content { max-width:1440px; margin:0 auto; }
  .pp-footer-main {
    display:grid; grid-template-columns:1fr 1.5fr; gap:80px;
    padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,0.06);
  }
  .pp-footer-brand { display:flex; flex-direction:column; gap:12px; }
  .pp-footer-logo { display:flex; align-items:center; gap:2px; margin-bottom:8px; }
  .pp-footer-logo-text {
    font-family:'DM Sans',sans-serif; font-weight:400; font-size:18px;
    letter-spacing:-0.02em; color:#fff;
  }
  .pp-footer-plus { width:16px; height:16px; position:relative; display:inline-block; }
  .pp-footer-plus::before,.pp-footer-plus::after {
    content:''; position:absolute; background:white; border-radius:1px;
  }
  .pp-footer-plus::before { width:16px; height:4px; top:6px; left:0; }
  .pp-footer-plus::after  { width:4px; height:16px; top:0; left:6px; }
  .pp-footer-tagline {
    font-family:'DM Sans',sans-serif; font-weight:300;
    font-size:13px; color:rgba(255,255,255,0.35);
  }
  .pp-footer-links { display:grid; grid-template-columns:repeat(3,1fr); gap:40px; }
  .pp-footer-col { display:flex; flex-direction:column; gap:12px; }
  .pp-footer-link {
    font-family:'DM Sans',sans-serif; font-weight:400; font-size:12px;
    color:rgba(255,255,255,0.4); text-decoration:none; transition:color 0.2s ease;
    position:relative; padding-bottom:2px;
  }
  .pp-footer-link:hover { color:white; }
  .pp-footer-bottom {
    display:flex; justify-content:space-between; align-items:center; padding-top:24px;
  }
  .pp-footer-copy,.pp-footer-domain {
    font-family:'DM Mono',monospace; font-size:10px; color:rgba(255,255,255,0.25);
  }

  /* ══ KEYFRAMES ══ */
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ══ RESPONSIVE ══ */


  @media (max-width:768px) {
    .pp-header { padding:0 20px; }
    .pp-hdr-btn { display:none; }
  }

  @media (max-width:768px) {
    .pp-header { padding:0 20px; }
    .pp-lang-toggle { display:none; }
    .pp-scene { padding:100px 20px 15vh; }
    .pp-split { grid-template-columns:1fr; gap:48px; }
    .pp-tier-inner { grid-template-columns:1fr; gap:40px; }
    .pp-footer-main { grid-template-columns:1fr; gap:40px; }
    .pp-footer-links { grid-template-columns:1fr; gap:24px; }
    .pp-footer-bottom { flex-direction:column; gap:8px; text-align:center; }
  }

  /* ══ PREMIUM TEXTURE ══ */
  .pp-glass::after, .pp-hero-glass::after {
    content:''; position:absolute; inset:0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.04; mix-blend-mode: overlay; pointer-events: none;
  }
  
  @keyframes heroTitleIn {
    from { opacity: 0; transform: translateY(40px) skewY(2deg); }
    to { opacity: 1; transform: translateY(0) skewY(0deg); }
  }
  
  .pp-footer-link::after {
    content:''; position:absolute; left:0; bottom:0; width:0; height:1px;
    background: #FF6FA3; transition: width 0.3s ease;
  }
  .pp-footer-link:hover::after { width: 100%; }


  @media (prefers-reduced-motion:reduce) {
    *,*::before,*::after {
      animation-duration:0.01ms!important;
      transition-duration:0.01ms!important;
    }
  }
`;

/* ─────────────────────────────────────────
   TIER DATA
───────────────────────────────────────── */
const TIERS = [
  {
    id: "gold",
    name: "GOLD",
    price: "Coming soon",
    color: T.goldLt,
    aura: `radial-gradient(ellipse 85% 75% at 50% 48%,
      rgba(212,160,23,0.30) 0%, rgba(245,203,92,0.12) 55%, transparent 82%)`,
    cardBg:     "linear-gradient(135deg,rgba(212,160,23,0.35),rgba(139,101,8,0.55))",
    cardBorder: "1px solid rgba(245,203,92,0.30)",
    dotColor: T.goldLt,
    benefits: [
      "Access gyms across Egypt",
      "Female-only zones & studios",
      "QR check-in — no booking required",
      "Visit history in app",
    ],
  },
  {
    id: "platinum",
    name: "PLATINUM",
    price: "Coming soon",
    color: T.platLt,
    aura: `radial-gradient(ellipse 85% 75% at 50% 48%,
      rgba(160,174,192,0.30) 0%, rgba(113,128,150,0.12) 55%, transparent 82%)`,
    cardBg:     "linear-gradient(135deg,rgba(160,174,192,0.30),rgba(74,85,104,0.55))",
    cardBorder: "1px solid rgba(203,213,224,0.30)",
    dotColor: T.platLt,
    benefits: [
      "Everything in Gold",
      "Hotel pools & spa access",
      "Olympic pools across the city",
      "MMA & Combat studios",
      "Priority class booking",
    ],
  },
  {
    id: "diamond",
    name: "DIAMOND",
    price: "Coming soon",
    color: T.diamLt,
    aura: `radial-gradient(ellipse 90% 80% at 50% 48%,
      rgba(147,197,253,0.28) 0%,
      rgba(191,219,254,0.14) 40%,
      rgba(96,165,250,0.08) 72%,
      transparent 90%)`,
    cardBg:     "linear-gradient(135deg,rgba(147,197,253,0.35),rgba(59,130,246,0.50),rgba(96,165,250,0.25))",
    cardBorder: "1px solid rgba(191,219,254,0.35)",
    dotColor: T.diamLt,
    iridescent: true,
    benefits: [
      "Everything in Platinum",
      "Unlimited venue access",
      "Monthly guest passes included",
      "Concierge booking service",
      "Early access to new venues",
      "Annual wellness review",
    ],
  },
];

/* ─────────────────────────────────────────
   WEBGL FLUID GRADIENT
───────────────────────────────────────── */
function initWebGL(container) {
  if (!window.THREE) return null;
  const THREE = window.THREE;
  const scene = new THREE.Scene();
  const cam   = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 10000);
  cam.position.z = 50;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const u = {
    uTime:       { value: 0 },
    uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
    uColor1:     { value: new THREE.Vector3(1.0, 0.6, 0.7) },
    uColor2:     { value: new THREE.Vector3(0.7, 0.6, 1.0) },
    uColor3:     { value: new THREE.Vector3(0.95, 0.9, 1.0) },
    uSpeed:      { value: 0.3 },
    uIntensity:  { value: 0.8 },
  };

  const getSize = () => {
    const h = Math.abs(cam.position.z * Math.tan((cam.fov * Math.PI) / 360) * 2);
    return { w: h * cam.aspect, h };
  };

  const vs = `varying vec2 vUv;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);vUv=uv;}`;
  const fs = `
    uniform float uTime,uSpeed,uIntensity;
    uniform vec2 uResolution,uMouse;
    uniform vec3 uColor1,uColor2,uColor3;
    varying vec2 vUv;
    float rng(vec2 s){return fract(sin(dot(s,vec2(12.9898,78.233)))*43758.5453);}
    void main(){
      vec2 uv=vUv;
      vec2 c1=vec2(0.5+sin(uTime*uSpeed*0.4+uMouse.x*2.0)*0.3,0.5+cos(uTime*uSpeed*0.5+uMouse.y*2.0)*0.3);
      vec2 c2=vec2(0.5+cos(uTime*uSpeed*0.6-uMouse.x*1.5)*0.4,0.5+sin(uTime*uSpeed*0.45-uMouse.y*1.5)*0.4);
      vec2 c3=vec2(0.5+sin(uTime*uSpeed*0.35)*0.35,0.5+cos(uTime*uSpeed*0.55)*0.35);
      float d1=1.0-smoothstep(0.0,0.5,length(uv-c1));
      float d2=1.0-smoothstep(0.0,0.5,length(uv-c2));
      float d3=1.0-smoothstep(0.0,0.6,length(uv-c3));
      vec3 col=vec3(0.95,0.96,0.98);
      col=mix(col,uColor1,d1*uIntensity);
      col=mix(col,uColor2,d2*uIntensity);
      col=mix(col,uColor3,d3*uIntensity*0.5);
      col+=(rng(uv+uTime)-0.5)*0.03;
      col=clamp(col,vec3(0.9),vec3(1.0));
      gl_FragColor=vec4(col,1.0);
    }
  `;

  const sz  = getSize();
  const geo = new THREE.PlaneGeometry(sz.w, sz.h, 1, 1);
  const mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: vs, fragmentShader: fs });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  let mouse = { x: 0.5, y: 0.5 };
  container.addEventListener("mousemove", (e) => {
    const r = container.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = 1 - (e.clientY - r.top) / r.height;
  });

  const clock = new THREE.Clock();
  let id;
  const animate = () => {
    id = requestAnimationFrame(animate);
    u.uTime.value += Math.min(clock.getDelta(), 0.1);
    u.uMouse.value.x += (mouse.x - u.uMouse.value.x) * 0.05;
    u.uMouse.value.y += (mouse.y - u.uMouse.value.y) * 0.05;
    renderer.render(scene, cam);
  };
  animate();

  const onResize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    cam.aspect = w / h; cam.updateProjectionMatrix();
    renderer.setSize(w, h); u.uResolution.value.set(w, h);
    const s = getSize();
    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneGeometry(s.w, s.h, 1, 1);
  };
  window.addEventListener("resize", onResize);
  return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onResize); renderer.dispose(); };
}

/* ─────────────────────────────────────────
   TIER CARD
───────────────────────────────────────── */
function TierCard({ tier }) {
  return (
    <div className="pp-tier-card pp-float" style={{
      background:  tier.cardBg,
      border:      tier.cardBorder,
      boxShadow:   tier.iridescent
        ? "0 0 60px rgba(155,127,232,0.28),0 0 120px rgba(232,49,122,0.10),inset 0 0 40px rgba(155,127,232,0.07)"
        : "0 24px 80px rgba(0,0,0,0.42),inset 0 1px 0 rgba(255,255,255,0.13)",
      animation: tier.iridescent ? "iridShift 8s ease-in-out infinite" : undefined,
    }}>
      <div>
        <div className="pp-tier-card-name">pass+</div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.32)", marginTop:4 }}>
          {tier.price}
        </div>
      </div>
      {/* Surface shine */}
      <div style={{
        position:"absolute", inset:0, borderRadius:20, pointerEvents:"none",
        background:"linear-gradient(135deg,rgba(255,255,255,0.13) 0%,transparent 50%,rgba(255,255,255,0.04) 100%)",
      }} />
      {/* Top edge */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:1,
        borderRadius:"20px 20px 0 0", pointerEvents:"none",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.36) 50%,transparent)",
      }} />
    </div>
  );
}


/* ─────────────────────────────────────────
   LIQUID GLASS COMPONENT
   
   Technique:
   • SVG feTurbulence (polar, seed-animated) → feDisplacementMap
   • Chromatic aberration: separate R and B displaced layers
   • Elasticity 0.15 — lerped mouse tracking per rAF
   • Frost overlay for the milky refraction body
   • Zero external deps — pure React + SVG
───────────────────────────────────────── */
function LiquidGlass({ children }) {
  const wrapRef  = useRef(null);
  const turbRef  = useRef(null);
  const turbRRef = useRef(null);
  const turbBRef = useRef(null);
  const dispRef  = useRef(null);
  const dispRRef = useRef(null);
  const dispBRef = useRef(null);
  const rafRef   = useRef(null);
  const seedRef  = useRef(2);
  const target   = useRef({ x: 0, y: 0 });
  const current  = useRef({ x: 0, y: 0 });

  const ELASTICITY       = 0.15;  // 0=instant snap, 1=never moves
  const MAX_DISPLACEMENT = 22;    // px at full mouse distance from center
  const CA_OFFSET        = 1.8;   // chromatic aberration shift

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      // Normalized -1..1 from center
      target.current.x = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
      target.current.y = ((e.clientY - r.top)    / r.height - 0.5) * 2;
    };
    const onLeave = () => { target.current.x = 0; target.current.y = 0; };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const tx = target.current.x;
      const ty = target.current.y;
      const cx = current.current.x;
      const cy = current.current.y;

      // Lerp with elasticity
      current.current.x = cx + (tx - cx) * (1 - ELASTICITY);
      current.current.y = cy + (ty - cy) * (1 - ELASTICITY);

      const nx = current.current.x;
      const ny = current.current.y;
      const dist = Math.sqrt(nx * nx + ny * ny); // 0..1.414

      // Polar refraction: baseFrequency shifts with mouse distance
      const bf = (0.010 + dist * 0.006).toFixed(4);

      // Slowly drift seed for organic feel
      seedRef.current = (seedRef.current + 0.04) % 999;
      const seedInt = Math.floor(seedRef.current);

      // Main displacement scale
      const scale = dist * MAX_DISPLACEMENT;

      // Set main turbulence
      if (turbRef.current) {
        turbRef.current.setAttribute("baseFrequency", `${bf} ${(parseFloat(bf)*1.5).toFixed(4)}`);
        turbRef.current.setAttribute("seed", seedInt);
      }
      if (dispRef.current) dispRef.current.setAttribute("scale", scale.toFixed(2));

      // Chromatic aberration — R shifts +CA_OFFSET, B shifts -CA_OFFSET
      const bfCA = (parseFloat(bf) + 0.003).toFixed(4);
      if (turbRRef.current) {
        turbRRef.current.setAttribute("baseFrequency", `${bfCA} ${(parseFloat(bfCA)*1.5).toFixed(4)}`);
        turbRRef.current.setAttribute("seed", (seedInt + 7) % 999);
      }
      if (dispRRef.current) dispRRef.current.setAttribute("scale", (scale + CA_OFFSET).toFixed(2));
      if (turbBRef.current) {
        turbBRef.current.setAttribute("baseFrequency", `${bfCA} ${(parseFloat(bfCA)*1.5).toFixed(4)}`);
        turbBRef.current.setAttribute("seed", (seedInt + 13) % 999);
      }
      if (dispBRef.current) dispBRef.current.setAttribute("scale", (scale - CA_OFFSET).toFixed(2));

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pp-liquid-glass-wrap pp-reveal-scale">
      {/* ── SVG filter definitions (hidden) ── */}
      <svg className="pp-lg-svg-defs" aria-hidden="true" focusable="false">
        <defs>
          {/* Main polar displacement filter */}
          <filter id="lg-filter" x="-8%" y="-8%" width="116%" height="116%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbRef}
              type="turbulence"
              baseFrequency="0.010 0.015"
              numOctaves="4"
              seed="2"
              stitchTiles="stitch"
              result="turb" />
            <feColorMatrix type="saturate" values="3" in="turb" result="colorTurb" />
            <feDisplacementMap ref={dispRef}
              in="SourceGraphic" in2="colorTurb"
              scale="0"
              xChannelSelector="R" yChannelSelector="G"
              result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.4" />
          </filter>

          {/* Red channel CA filter */}
          <filter id="lg-filter-r" x="-8%" y="-8%" width="116%" height="116%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbRRef}
              type="turbulence"
              baseFrequency="0.013 0.018"
              numOctaves="3"
              seed="9"
              stitchTiles="stitch"
              result="turb" />
            <feColorMatrix type="saturate" values="3" in="turb" result="colorTurb" />
            <feDisplacementMap ref={dispRRef}
              in="SourceGraphic" in2="colorTurb"
              scale="1.8"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Blue channel CA filter */}
          <filter id="lg-filter-b" x="-8%" y="-8%" width="116%" height="116%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbBRef}
              type="turbulence"
              baseFrequency="0.013 0.018"
              numOctaves="3"
              seed="17"
              stitchTiles="stitch"
              result="turb" />
            <feColorMatrix type="saturate" values="3" in="turb" result="colorTurb" />
            <feDisplacementMap ref={dispBRef}
              in="SourceGraphic" in2="colorTurb"
              scale="0"
              xChannelSelector="B" yChannelSelector="R" />
          </filter>
        </defs>
      </svg>

      {/* ── Displacement canvas (behind glass) ── */}
      <div className="pp-lg-canvas" aria-hidden="true">
        <div className="pp-lg-canvas-inner"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(210,230,255,0.22) 0%,
              rgba(190,220,255,0.12) 40%,
              rgba(230,215,255,0.18) 70%,
              rgba(200,235,255,0.20) 100%
            )`,
          }}
        />
        {/* Chromatic aberration — R tint */}
        <div className="pp-lg-ca-r"
          style={{ background: "rgba(255,60,60,0.06)" }}
        />
        {/* Chromatic aberration — B tint */}
        <div className="pp-lg-ca-b"
          style={{ background: "rgba(60,100,255,0.06)" }}
        />
      </div>

      {/* ── Glass surface ── */}
      <div className="pp-hero-glass">
        {children}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */

export default function HomeRework() {
  const [loaded,       setLoaded]       = useState(() => !!sessionStorage.getItem("pp_loaded"));
  const [loadPct,      setLoadPct]      = useState(0);
  const [loadMsg,      setLoadMsg]      = useState("Initializing experience");
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [currentScene, setCurrentScene] = useState("scene-1");
  const [progress,     setProgress]     = useState("000%");
  const [hideFooter,   setHideFooter]   = useState(false);
  const [showScroll,   setShowScroll]   = useState(true);


  const [activeTier,   setActiveTier]   = useState(0);
  const [prevTier,     setPrevTier]     = useState(-1);

  const webglRef      = useRef(null);
  const tiersOuterRef = useRef(null);
  const cleanupRef    = useRef(null);

  /* Inject CSS + Three.js */
  useEffect(() => {
    const style  = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    const script = document.createElement("script");
    script.src   = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    document.head.appendChild(script);
    return () => { document.head.removeChild(style); };
  }, []);

  /* Loading */
  useEffect(() => {
    const alreadySeen = !!sessionStorage.getItem("pp_loaded");

    const finish = () => {
      sessionStorage.setItem("pp_loaded", "1");
      setLoaded(true);
      // Remove Unicorn Studio watermark
      const removeWatermark = () => {
        const links = document.querySelectorAll('a[href*="unicorn.studio"]');
        links.forEach(el => el.remove());
        if (links.length === 0) setTimeout(removeWatermark, 500);
      };
      setTimeout(removeWatermark, 1000);
      setTimeout(() => {
        document.querySelectorAll(".pp-reveal,.pp-reveal-left,.pp-reveal-right,.pp-reveal-scale")
          .forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible"); });
      }, 100);
      setTimeout(() => {
        if (webglRef.current && window.THREE)
          cleanupRef.current = initWebGL(webglRef.current);
      }, 400);
    };

    if (alreadySeen) {
      // Skip the loading screen entirely
      setLoadPct(100);
      setLoadMsg("Ready");
      finish();
      return () => { cleanupRef.current?.(); };
    }

    let pct = 0;
    const msgs = ["Initializing experience","Loading components","Preparing visuals","Almost ready"];
    const tick = () => {
      pct += Math.random() * 15 + 5;
      if (pct >= 100) {
        pct = 100; setLoadPct(100); setLoadMsg("Ready");
        setTimeout(finish, 500);
      } else {
        setLoadPct(pct);
        if (pct > 75) setLoadMsg(msgs[3]);
        else if (pct > 50) setLoadMsg(msgs[2]);
        else if (pct > 25) setLoadMsg(msgs[1]);
        setTimeout(tick, Math.random() * 150 + 100);
      }
    };
    setTimeout(tick, 120);
    return () => { cleanupRef.current?.(); };
  }, []);

  /* Scroll */
  useEffect(() => {
    if (!loaded) return;
    const onScroll = () => {
      const sy   = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      setProgress(String(Math.round((sy / docH) * 100)).padStart(3,"0") + "%");
      setHideFooter((sy / docH) >= 0.95);
      setShowScroll(sy <= 80);
      if (sy > 50 && !logoAnimated) setLogoAnimated(true);

      const ids = ["pp-s1","pp-s2","pp-s3","pp-s4","pp-s5"];
      let current = "scene-1";
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45)
          current = `scene-${i + 1}`;
      });
      setCurrentScene(current);

      if (tiersOuterRef.current) {
        const rect  = tiersOuterRef.current.getBoundingClientRect();
        const total = tiersOuterRef.current.offsetHeight - window.innerHeight;
        const ratio = Math.max(0, Math.min(1, -rect.top / total));
        const idx   = ratio < 0.33 ? 0 : ratio < 0.66 ? 1 : 2;
        if (idx !== activeTier) { setPrevTier(activeTier); setActiveTier(idx); }
      }

      document.querySelectorAll(".pp-reveal,.pp-reveal-left,.pp-reveal-right,.pp-reveal-scale")
        .forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("visible"); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, logoAnimated, activeTier]);

  /* High-Performance Cursor handled globally in Layout.jsx */
  const fCls = ["pp-sticky-footer", loaded?"visible":"", (currentScene==="scene-5" || hideFooter)?"scene-5":"", currentScene].filter(Boolean).join(" ");
  const tSt  = (i) => i===activeTier ? "" : i===prevTier ? "exiting" : "hidden";

  /* ── RENDER ── */
  return (
    <>
      {/* LOADING */}
      <div className={`pp-loading${loaded?" loaded":""}`}>
        <div style={{ textAlign:"center" }}>
          <div className="pp-loading-logo">
            <span className="pp-loading-logo-text">pass</span>
            <span className="pp-loading-plus" />
          </div>
          <div className="pp-loading-bar-wrap">
            <div className="pp-loading-bar" style={{ width:`${loadPct}%` }} />
          </div>
          <div className="pp-loading-counter">{String(Math.floor(loadPct)).padStart(3,"0")}%</div>
          <div className="pp-loading-text">{loadMsg}</div>
        </div>
      </div>

      {/* HEADER */}
      <Header 
        loaded={loaded} 
        logoAnimated={logoAnimated} 
        currentScene={currentScene} 
      />

      {/* STICKY FOOTER */}
      <div className={fCls}>
        <Link to="/join" className="pp-footer-btn pp-footer-btn-primary">Start your pass+</Link>
        <Link to="/how-it-works" className="pp-footer-btn pp-footer-btn-secondary">How it works</Link>
      </div>

      {/* PROGRESS */}
      <div className="pp-progress-counter">{progress}</div>

      {/* SCROLL PROMPTS — left + right */}
      <div className="pp-scroll-prompt pp-scroll-prompt-left" style={{ opacity:showScroll?1:0, pointerEvents:showScroll?"auto":"none" }}>
        <div className="pp-scroll-text">scroll</div>
        <div className="pp-scroll-chevron" />
      </div>
      <div className="pp-scroll-prompt pp-scroll-prompt-right" style={{ opacity:showScroll?1:0, pointerEvents:showScroll?"auto":"none" }}>
        <div className="pp-scroll-text">scroll</div>
        <div className="pp-scroll-chevron" />
      </div>


            {/* ══ S1 HERO ══ */}
      <section id="pp-s1" className="pp-scene">
        <div ref={webglRef} className="pp-webgl" />
        <div className="pp-scene-content">
          <div className="pp-hero-center">
            <div className="pp-stagger">
              <div className="pp-hero-headline pp-reveal">ONE PASS.</div>
              <div className="pp-hero-headline pp-reveal">ACCESS</div>
              <div className="pp-hero-headline pp-reveal">EVERYTHING.</div>
            </div>

            <LiquidGlass>
              <div className="pp-lg-content">
                <div className="pp-hero-glass-body">
                  <p className="pp-hero-desc">
                    One monthly subscription.<br />
                    Egypt's gyms, hotel pools, and studios — all in one pass.<br />
                    Show up. Scan. Walk in.
                  </p>
                </div>
                <div className="pp-hero-divider" />
                <Link to="/join" className="pp-hero-cta">
                  <span className="pp-hero-cta-label">
                    Join our waiting list
                    <span className="pp-hero-cta-arrow">→</span>
                  </span>
                </Link>
              </div>
            </LiquidGlass>

          </div>
        </div>
      </section>

      {/* ══ S2 WOMEN ══ */}
      <section id="pp-s2" className="pp-scene">
        <div className="pp-scene-content">
          <div className="pp-eyebrow" style={{ color:"rgba(255,111,163,0.7)" }}>FOR WOMEN</div>
          <div className="pp-split" style={{ marginTop:48 }}>
            <div className="pp-stagger">
              {["YOUR","CITY.","YOUR","GYM."].map(w => (
                <div key={w} className="pp-massive pp-reveal">{w}</div>
              ))}
            </div>
            <div className="pp-feat-grid pp-stagger">
              {[
                { title:"Female-only zones",      body:"Filter venues with dedicated women-only floors and hours.",     icon:"◉" },
                { title:"Hotel spa access",       body:"Pool sessions at Egypt's top hotels. Included in Platinum+.",   icon:"⬡" },
                { title:"Yoga & Pilates studios", body:"Boutique studios citywide. One QR. No booking fees.",               icon:"✦" },
                { title:"Flexible scheduling",    body:"Visit whenever. No class commitments. No minimum frequency.",   icon:"◷" },
              ].map((f, i) => (
                <div key={i} className={`pp-feat-card pp-glass ${i===0?"pp-reveal-left":"pp-reveal"}`}>
                  <div style={{ fontSize:20, color:"rgba(255,111,163,0.8)", marginBottom:12 }}>{f.icon}</div>
                  <div className="pp-feat-title">{f.title}</div>
                  <div className="pp-feat-body">{f.body}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pp-stat-strip pp-glass pp-reveal">
            <div className="pp-stat-text">Studios · Hotel Pools · Female-Only Zones Available</div>
          </div>
        </div>
      </section>

      {/* ══ S3 MEN ══ */}
      <section id="pp-s3" className="pp-scene">
        <div className="pp-scene-content">
          <div className="pp-eyebrow pp-reveal" style={{ color:"rgba(25,184,204,0.7)", textAlign:"right" }}>FOR MEN</div>
          <div className="pp-split" style={{ marginTop:48 }}>
            <div className="pp-feat-grid pp-stagger">
              {[
                { title:"Strength & CrossFit",  body:"Heavy lifting, functional fitness, and CrossFit boxes across Egypt.",   icon:"↑" },
                { title:"Olympic pools",        body:"Competition pools and lap lanes. Included with all tiers.",          icon:"〰" },
                { title:"MMA & Combat",         body:"Boxing gyms, MMA facilities, and martial arts studios.",                 icon:"⬡" },
                { title:"Performance tracking", body:"Visit history, streak counter, and monthly stats in the app.",           icon:"◫" },
              ].map((f, i) => (
                <div key={i} className={`pp-feat-card pp-glass pp-teal-glass ${i===0?"pp-reveal-right":"pp-reveal"}`}>
                  <div style={{ fontSize:20, color:"rgba(25,184,204,0.8)", marginBottom:12 }}>{f.icon}</div>
                  <div className="pp-feat-title">{f.title}</div>
                  <div className="pp-feat-body">{f.body}</div>
                </div>
              ))}
            </div>
            <div className="pp-stagger">
              {["TRAIN","EVERY","WHERE."].map(w => (
                <div key={w} className="pp-massive right pp-reveal">{w}</div>
              ))}
            </div>
          </div>
          <div className="pp-stat-strip pp-glass pp-teal-glass pp-reveal">
            <div className="pp-stat-text pp-stat-teal">Gyms · Olympic Pools · MMA & Combat Included</div>
          </div>
        </div>
      </section>

      {/* ══ TIERS SCROLL-JACKED ══ */}
      <div ref={tiersOuterRef} className="pp-tiers-outer">
        <div className="pp-tiers-sticky">

          {/* Color auras */}
          {TIERS.map((tier, i) => (
            <div key={tier.id} className="pp-tier-bg" style={{ opacity: activeTier===i ? 1 : 0 }}>
              <div style={{
                position:"absolute", inset:0,
                background: tier.aura,
                backgroundSize: tier.iridescent ? "300% 300%" : undefined,
                animation: tier.iridescent ? "iridBloom 14s ease infinite" : undefined,
              }} />
            </div>
          ))}

          {/* Progress dots */}
          <div className="pp-tier-progress">
            {TIERS.map((tier, i) => (
              <div key={tier.id} className={`pp-tier-dot${activeTier===i?" active":""}`} style={{
                background: activeTier===i ? tier.dotColor : "rgba(255,255,255,0.18)",
                boxShadow:  activeTier===i ? `0 0 8px ${tier.dotColor}` : "none",
              }} />
            ))}
          </div>

          {/* Tier panels */}
          {TIERS.map((tier, i) => (
            <div key={tier.id} className={`pp-tier-panel${tSt(i)?" "+tSt(i):""}`}>
              <div className="pp-tier-inner">
                <div>
                  <div className="pp-tier-name">{tier.name}</div>
                  <div className="pp-tier-price">{tier.price}</div>
                  <div className="pp-tier-benefits">
                    {tier.benefits.map((b, bi) => (
                      <div key={bi} className="pp-tier-benefit">
                        <div className="pp-tier-check">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke={tier.color} strokeWidth="1" strokeOpacity="0.4" />
                            <path d="M5 8L7 10L11 6" stroke={tier.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        {b}
                      </div>
                    ))}
                  </div>
                  <button style={{
                    marginTop:40, padding:"14px 32px", borderRadius:99,
                    background:`rgba(${tier.id==="gold"?"212,160,23":tier.id==="platinum"?"160,174,192":"147,197,253"},0.10)`,
                    border:`1px solid ${tier.color}38`,
                    color:tier.color,
                    fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500,
                    cursor:"pointer", backdropFilter:"blur(12px)",
                    transition:"all 0.3s ease",
                  }}>
                    Get {tier.name.charAt(0)+tier.name.slice(1).toLowerCase()} →
                  </button>
                </div>
                <TierCard tier={tier} />
              </div>
            </div>
          ))}

          {/* Eyebrow */}
          <div style={{
            position:"absolute", top:48, left:48, zIndex:12,
            fontFamily:"'DM Mono',monospace", fontSize:9, fontWeight:600,
            letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.20)",
          }}>
            MEMBERSHIP
          </div>
        </div>
      </div>

      {/* ══ S4 IDENTITY ══ */}
      <section id="pp-s4" className="pp-scene">
        <div className="pp-scene-content">
          <div className="pp-identity-center">
            <div className="pp-identity-headline pp-reveal">
              <div className="pp-id-line1">THIS IS YOUR</div>
              <div className="pp-id-line2">CITY.</div>
            </div>
            <div className="pp-reveal" style={{ textAlign:"center" }}>
              <div className="pp-identity-symbol" />
              <p className="pp-identity-subhead">
                Egypt's gyms. Hotel pools. Boutique studios.<br />
                All of it. One pass.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S5 FOOTER ══ */}
      <section id="pp-s5" className="pp-scene" style={{ minHeight:"auto", padding:"80px 32px 32px" }}>
        <div className="pp-footer-content" style={{ width:"100%" }}>
          <div className="pp-footer-main">
            <div className="pp-footer-brand">
              <div className="pp-footer-logo">
                <span className="pp-footer-logo-text">pass</span>
                <span className="pp-footer-plus" />
              </div>
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
            <div className="pp-footer-copy">© 2026 pass+  · Egypt</div>
            <div className="pp-footer-domain">passplus.me</div>
          </div>
        </div>
      </section>
    </>
  );
}
