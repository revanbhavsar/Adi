// app/components/BucketList.tsx
"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { Sparkles, CheckCircle } from "lucide-react";

export default function BucketList() {
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-3 text-pink-400">Our Future Bucket List ✈️</h2>
        <p className="text-white/60">Dreams and adventures waiting for us</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl w-full border border-white/15 shadow-2xl space-y-6">
        {siteConfig.bucketList.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <Sparkles className="w-6 h-6 text-pink-400 flex-shrink-0" />
              <span className="text-white font-medium text-base md:text-lg">{item.goal}</span>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5 flex-shrink-0">
              <CheckCircle className="w-3.5 h-3.5" /> {item.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}