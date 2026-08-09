"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config";

// Premium vivid colors for the 3D balloons
const balloonColors = [
  "#ff4b72", // Vibrant Pink
  "#a855f7", // Purple
  "#ec4899", // Magenta
  "#3b82f6", // Blue
  "#f43f5e", // Rose
  "#8b5cf6", // Violet
];

export default function PolaroidBook() {
  const [popped, setPopped] = useState<boolean[]>(new Array(6).fill(false));
  const polaroids = siteConfig.polaroids.slice(0, 6);

  const handlePop = (index: number, e: React.MouseEvent) => {
    // 1. Lightweight confetti burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 70, // Reduced particle count to prevent lag spikes
      spread: 100,
      startVelocity: 30,
      origin: { x, y },
      colors: ['#ff4b72', '#ffffff', '#ffd700', '#a855f7', '#ff8da1'],
      disableForReducedMotion: true,
    });

    // 2. Trigger polaroid reveal
    setPopped((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Embedded Lightweight GPU Animation Styles */}
      <style jsx global>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .gpu-balloon {
          animation: subtleFloat 4s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
      
      {/* Title Section */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-rose-300">
            Memory Balloons 🎈
          </h2>
          <p className="text-white/80 text-lg">
            {popped.every(Boolean) 
              ? "All memories unlocked! ✨" 
              : "Pop a balloon to reveal a special moment..."}
          </p>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-10 w-full px-4">
        {polaroids.map((photo, i) => {
          const tilt = i % 2 === 0 ? 4 : -4;
          const bColor = balloonColors[i % balloonColors.length];

          return (
            <div key={i} className="relative w-full h-[320px] flex justify-center items-center">
              
              {/* STATE 1: THE BALLOON (GPU Accelerated) */}
              {!popped[i] && (
                <div
                  onClick={(e) => handlePop(i, e)}
                  className="cursor-pointer flex flex-col items-center justify-center absolute group gpu-balloon transform-gpu"
                  style={{
                    animationDelay: `${i * 0.5}s` // Offsets movement without performance hit
                  }}
                >
                  {/* 3D Glossy CSS Balloon */}
                  <div 
                    className="relative w-28 h-36 flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
                    style={{
                      backgroundColor: bColor,
                      borderRadius: "80% 80% 80% 80% / 80% 80% 100% 100%",
                      boxShadow: `inset -8px -8px 20px rgba(0,0,0,0.3), inset 8px 8px 20px rgba(255,255,255,0.5), 0 10px 20px ${bColor}30`
                    }}
                  >
                    {/* Shiny Light Reflection */}
                    <div className="absolute top-4 left-4 w-5 h-12 bg-white/50 rounded-full blur-[2px] rotate-[20deg]" />
                    <span className="text-white font-bold text-lg drop-shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      POP!
                    </span>
                  </div>

                  {/* Balloon Knot & String */}
                  <div 
                    className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] z-10 relative -mt-1"
                    style={{ borderBottomColor: bColor }}
                  />
                  <svg className="w-8 h-24 opacity-60 pointer-events-none" viewBox="0 0 20 100">
                    <path d="M10,0 Q20,25 10,50 T10,100" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                  </svg>
                </div>
              )}

              {/* STATE 2: THE POLAROID REVEAL */}
              {popped[i] && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: tilt }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute z-20 transform-gpu"
                >
                  {/* Authentic Polaroid Card Design */}
                  <div className="bg-white p-3 pb-8 md:p-4 md:pb-10 rounded shadow-[0_15px_30px_rgba(0,0,0,0.4)] border border-gray-200 flex flex-col items-center w-56 md:w-64 transform hover:scale-105 hover:z-50 transition-transform duration-300 relative group">
                    
                    {/* Translucent Tape Graphic */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm rotate-[-2deg] z-30" />

                    {/* Image Container */}
                    <div className="w-full aspect-square bg-gray-200 overflow-hidden mb-4 border border-gray-100 shadow-inner">
                      <img 
                        src={photo.image} 
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Caption */}
                    <p className="text-gray-800 text-base md:text-lg font-medium text-center w-full truncate px-2">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              )}

            </div>
          );
        })}
      </div>
      
    </div>
  );
}