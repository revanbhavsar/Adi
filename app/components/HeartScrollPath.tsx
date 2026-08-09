// app/components/HeartScrollPath.tsx
"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function HeartScrollPath() {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll animation values
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale up the giant heart as you scroll past the top hero section
  const heartScale = useTransform(smoothProgress, [0, 0.15], [1, 2.5]);
  const heartOpacity = useTransform(smoothProgress, [0, 0.1, 0.25], [0.35, 0.2, 0]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 1. GIANT BG HEART (Fades into black background on top section scroll) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ scale: heartScale, opacity: heartOpacity }}
          className="relative flex items-center justify-center"
        >
          {/* Shaded Glow Heart Layer */}
          <div className="h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-pink-600/30 via-rose-500/20 to-transparent blur-[90px]" />
          <svg
            viewBox="0 0 24 24"
            className="absolute h-96 w-96 fill-pink-500/10 stroke-pink-500/20 stroke-[0.5] filter drop-shadow-[0_0_30px_rgba(255,75,114,0.3)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </div>

      {/* 2. CONTINUOUS SCROLL RIBBON (Traces down the site as you scroll) */}
      <svg
        className="h-full w-full opacity-60"
        preserveAspectRatio="none"
        viewBox="0 0 100 1000"
      >
        <defs>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4b72" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Static Background Guide Ribbon */}
        <path
          d="M 50,0 Q 20,250 50,500 T 50,1000"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />

        {/* Animated Active Ribbon */}
        <motion.path
          d="M 50,0 Q 20,250 50,500 T 50,1000"
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeWidth="4"
          filter="url(#glow)"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: smoothProgress,
          }}
        />
      </svg>
    </div>
  );
}