// src/components/LockScreen.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);

  // Countdown Logic
  useEffect(() => {
    const target = new Date(siteConfig.dates.birthday).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setIsBirthday(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Passcode Logic
  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const handleUnlock = () => {
    if (pin.join("") === siteConfig.security.passcode) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPin(["", "", "", ""]);
      document.getElementById("pin-0")?.focus();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4"
    >
      <div className="glass-panel rounded-3xl p-8 md:p-12 w-full max-w-lg text-center">
        
        {/* Countdown */}
        <h2 className="text-2xl md:text-3xl font-light mb-6">
          {isBirthday ? "It's Your Birthday! 🎉" : "Time Until Your Birthday"}
        </h2>
        
        {!isBirthday && (
          <div className="flex justify-center gap-4 mb-10 text-pink-400">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center bg-black/30 p-3 rounded-xl min-w-[70px]">
                <span className="text-3xl font-bold">{String(value).padStart(2, "0")}</span>
                <span className="text-xs uppercase tracking-widest text-white/70">{unit}</span>
              </div>
            ))}
          </div>
        )}

        {/* Passcode Area */}
        <div className="mt-8">
          <p className="text-sm text-white/60 mb-4">Enter our special date to unlock (DDMM)</p>
          <motion.div 
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} 
            transition={{ duration: 0.4 }}
            className="flex justify-center gap-3 mb-6"
          >
            {pin.map((digit, idx) => (
              <input
                key={idx}
                id={`pin-${idx}`}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="w-14 h-16 text-center text-2xl bg-white/5 border border-white/20 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
              />
            ))}
          </motion.div>
          <button 
            onClick={handleUnlock}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(255,75,114,0.4)] transition-all"
          >
            Unlock My Heart
          </button>
          {error && <p className="text-rose-400 text-sm mt-3">Wrong passcode, try again baby!</p>}
        </div>
      </div>
    </motion.div>
  );
}