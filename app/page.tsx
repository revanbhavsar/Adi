// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "./components/LockScreen";
import MainApp from "./components/MainApp";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Name your happy birthday audio file 'happy-birthday.mp3' and place it in the public folder
    const audio = new Audio('/happy-birthday.mp3'); 
    audio.loop = true;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <div className="aurora-bg" />

      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0c29]"
          >
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-pink-500 text-5xl mb-4"
            >
              ❤️
            </motion.div>
            <p className="text-white/70 tracking-widest uppercase text-sm">Building Adiii's World...</p>
          </motion.div>
        ) : !isUnlocked ? (
          <LockScreen key="lock" onUnlock={handleUnlock} />
        ) : (
          <motion.div 
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <MainApp />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}