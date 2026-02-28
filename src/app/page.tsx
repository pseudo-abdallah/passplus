"use client";

import React, { useEffect, useState, useRef } from "react";
import { TextColor } from "@/components/ui/text-color";
import HeroSection from "@/components/ui/glassmorphism-trust-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Users, 
  Waves, 
  Sparkles, 
  Clock, 
  Dumbbell, 
  Swords, 
  BarChart3, 
  Anchor
} from "lucide-react";

// Helper to interpolate between two colors
const interpolateColor = (color1: number[], color2: number[], factor: number) => {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
  }
  return gb(\, \, \);
};

const colors = [
  [8, 8, 8],      // Slide 1: Black/Ink
  [20, 10, 20],   // Slide 2: Deep Purple (Hero)
  [40, 0, 20],    // Slide 3: Deep Magenta (Women)
  [0, 30, 40],    // Slide 4: Deep Teal (Men)
  [8, 8, 8]       // Footer: Back to Black
];

export default function Home() {
  const [bgColor, setBgColor] = useState("rgb(8, 8, 8)");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight - windowHeight;
      const progress = scrollY / totalHeight;

      // Color Interpolation Logic
      const sectionCount = colors.length - 1;
      const rawIndex = progress * sectionCount;
      const index = Math.floor(rawIndex);
      const factor = rawIndex - index;

      if (index >= 0 && index < sectionCount) {
        setBgColor(interpolateColor(colors[index], colors[index + 1], factor));
      } else if (index >= sectionCount) {
        setBgColor(gb(\, \, \));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main 
      className="min-h-screen transition-colors duration-300 ease-out"
      style={{ backgroundColor: bgColor }}
    >
            {/* Film Grain Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5]"
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" 
        }} 
      />
      {/* Cinematic Atmosphere Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20 mix-blend-screen animate-pulse"
          style={{ 
            background: "radial-gradient(circle, rgba(232, 49, 122, 0.4) 0%, transparent 70%)",
            transition: "all 2s ease-in-out"
          }} 
        />
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-10 mix-blend-screen"
          style={{ 
            background: "radial-gradient(circle, rgba(155, 127, 232, 0.4) 0%, transparent 70%)",
            transition: "all 3s ease-in-out"
          }} 
        />
      </div>

      <div className="relative z-10">
        {/* Slide 1: Cinematic Intro */}
        <section className="min-h-screen flex items-center justify-center p-4">
          <TextColor />
        </section>

        {/* Slide 2: Trust Hero */}
        <section>
          <HeroSection />
        </section>

        {/* Slide 3: For Women */}
        <section className="min-h-screen py-32 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 mb-12">
               <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#FF6FA3] mb-4 drop-shadow-sm">
                 FOR WOMEN · للنساء
               </div>
               <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] text-white">
                 YOUR CITY.<br />YOUR GYM.
               </h2>
            </div>
            
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard>
                <Users className="w-8 h-8 text-[#FF6FA3] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Female-only zones</h3>
                <p className="text-sm text-zinc-400">Filter venues with dedicated women-only floors and hours.</p>
              </GlassCard>
              
              <GlassCard>
                <Waves className="w-8 h-8 text-[#FF6FA3] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Hotel spa access</h3>
                <p className="text-sm text-zinc-400">Pool sessions at Cairo's top hotels. Included in Platinum and Diamond.</p>
              </GlassCard>
              
              <GlassCard>
                <Sparkles className="w-8 h-8 text-[#FF6FA3] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Yoga & Pilates</h3>
                <p className="text-sm text-zinc-400">30+ boutique studios. One QR. No booking fees.</p>
              </GlassCard>
              
              <GlassCard>
                <Clock className="w-8 h-8 text-[#FF6FA3] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Flexible scheduling</h3>
                <p className="text-sm text-zinc-400">Visit whenever. No class commitments. No minimum frequency.</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Slide 4: For Men */}
        <section className="min-h-screen py-32 px-4 shadow-[inset_0_100px_100px_-50px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 mb-12 text-right">
               <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#19B8CC] mb-4 drop-shadow-sm">
                 FOR MEN · للرجال
               </div>
               <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] text-white">
                 TRAIN<br />EVERYWHERE.
               </h2>
            </div>
            
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard>
                <Dumbbell className="w-8 h-8 text-[#19B8CC] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Strength & CrossFit</h3>
                <p className="text-sm text-zinc-400">Heavy lifting, functional fitness, and CrossFit boxes across Cairo.</p>
              </GlassCard>
              
              <GlassCard>
                <Waves className="w-8 h-8 text-[#19B8CC] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Olympic pools</h3>
                <p className="text-sm text-zinc-400">50m competition pools and lap lanes. Included with all tiers.</p>
              </GlassCard>
              
              <GlassCard>
                <Swords className="w-8 h-8 text-[#19B8CC] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">MMA & Combat</h3>
                <p className="text-sm text-zinc-400">Boxing gyms, MMA facilities, and martial arts studios on the network.</p>
              </GlassCard>
              
              <GlassCard>
                <BarChart3 className="w-8 h-8 text-[#19B8CC] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Performance tracking</h3>
                <p className="text-sm text-zinc-400">Visit history, streak counter, and monthly stats in the app.</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Footer / Final CTA */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
          <h2 className="text-6xl sm:text-9xl font-black italic uppercase tracking-tightest text-white mb-8 mix-blend-difference">
            THIS IS YOUR CITY.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 relative z-10">
            <button className="px-12 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(255,255,255,0.15)]">
              Join pass+
            </button>
            <button className="px-12 py-5 border border-white/20 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-colors backdrop-blur-md">
              Explore Cairo
            </button>
          </div>
          
          <div className="absolute bottom-12 w-full text-center px-4">
             <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase opacity-40">
                Cairo · 60+ Venues · Unlimited Potential
             </p>
          </div>
        </section>
      </div>
    </main>
  );
}

