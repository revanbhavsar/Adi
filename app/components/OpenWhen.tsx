// app/components/OpenWhen.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config";
import { Mail, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function OpenWhen() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const openLetter = (content: string) => {
    setActiveLetter(content);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-3 text-pink-400">Open When... Letters 💌</h2>
        <p className="text-white/60">Tap an envelope whenever you need me by your side</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {siteConfig.openWhen.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLetter(item.content)}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 cursor-pointer flex items-center gap-4 shadow-xl transition-all group"
          >
            <div className="p-4 bg-pink-500/20 rounded-xl text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
              <p className="text-white/60 text-xs">Tap to read secret message</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup for Letter Content */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="glass-panel p-8 rounded-3xl max-w-lg w-full relative border border-pink-500/40 shadow-[0_0_50px_rgba(255,75,114,0.4)] text-center bg-[#15102b]/90"
            >
              <button 
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <Mail className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-pink-300 mb-4">A Note From Revan</h3>
              <p className="text-white/90 text-lg leading-relaxed font-light italic">
                "{activeLetter}"
              </p>
              <button
                onClick={() => setActiveLetter(null)}
                className="mt-6 px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 font-semibold text-white shadow-lg cursor-pointer"
              >
                Close 💖
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}