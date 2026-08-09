// app/components/LoveCoupons.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { Ticket, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function LoveCoupons() {
  const [redeemed, setRedeemed] = useState<{ [key: number]: boolean }>({});

  const handleRedeem = (index: number) => {
    setRedeemed(prev => ({ ...prev, [index]: true }));
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-3 text-pink-400">Adiii's Love Coupon Book 🎟️</h2>
        <p className="text-white/60">Tap any coupon to redeem it from Revan anytime!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {siteConfig.coupons.map((coupon, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="glass-panel p-6 rounded-3xl border border-white/15 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <Ticket className="w-8 h-8 text-pink-400" />
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold">
                  Valid Forever
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{coupon.title}</h3>
              <p className="text-white/70 text-sm mb-6">{coupon.desc}</p>
            </div>

            <button
              onClick={() => handleRedeem(idx)}
              disabled={redeemed[idx]}
              className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                redeemed[idx]
                  ? "bg-green-500/20 text-green-300 border border-green-500/30 cursor-default"
                  : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-lg"
              }`}
            >
              {redeemed[idx] ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Redeemed Successfully! 🎉
                </>
              ) : (
                "Redeem Coupon ✨"
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}