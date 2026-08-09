// app/components/MainApp.tsx
// app/components/MainApp.tsx
"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config";
import { Heart, Sparkles, Star, Gift, MessageCircleHeart } from "lucide-react";
import PolaroidBook from "./PolaroidBook";
import HeartScrollPath from "./HeartScrollPath";
import OpenWhen from "./OpenWhen";
import LoveCoupons from "./LoveCoupons";
import BucketList from "./BucketList";

export default function MainApp() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Love Jar State
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [noteOpen, setNoteOpen] = useState(false);

  // Quiz State
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  // Finale State
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);

  const handleLoveJarClick = () => {
    setNoteOpen(true);
    setCurrentNoteIndex((prev) => (prev + 1) % siteConfig.loveNotes.length);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ['#ff4b72', '#ffffff'] });
  };

  const handleQuizAnswer = (optIndex: number) => {
    setSelectedOpt(optIndex);
    setTimeout(() => {
      setSelectedOpt(null);
      if (currentQuizStep + 1 < siteConfig.quiz.length) {
        setCurrentQuizStep(prev => prev + 1);
      } else {
        setQuizFinished(true);
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
      }
    }, 1000);
  };

  const handleNoHover = () => {
    setNoPos({
      x: Math.random() * 280 - 140,
      y: Math.random() * 280 - 140,
    });
  };

  const handleYes = () => {
    setIsAccepted(true);
    confetti({ 
      particleCount: 500, 
      spread: 180, 
      origin: { y: 0.6 }, 
      colors: ['#ff4b72', '#ffffff', '#ff8da1', '#ffd700', '#ff69b4'] 
    });
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full min-h-screen pb-32 overflow-hidden text-white bg-black">
      
      {/* 1. Background Shaded Heart & Animated Scroll Ribbon */}
      <HeartScrollPath />

      {/* 2. Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-400 origin-left z-50 shadow-[0_0_20px_rgba(255,75,114,0.9)]" 
      />

      {/* Floating Header Tag */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 glass-panel px-6 py-2.5 rounded-full z-40 hidden md:flex items-center gap-3 shadow-2xl border border-white/20 backdrop-blur-xl">
        <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-200">
          Made with Love by {siteConfig.names.sender} for {siteConfig.names.receiver}
        </span>
      </nav>

      {/* SECTION 1: HERO LETTER */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative pt-20">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="glass-panel p-8 md:p-14 rounded-3xl max-w-3xl w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/15"
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <motion.div 
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block mb-4 text-pink-400"
          >
            <Sparkles className="w-12 h-12 mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-200 to-rose-300">
            Happy Birthday, {siteConfig.names.nickname}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-white/90 whitespace-pre-wrap font-light">
            {siteConfig.messages.letter}
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-center gap-6 text-sm text-pink-300 font-medium">
            <span>✨ July 31st Special</span>
            <span>•</span>
            <span>💖 Forever Yours</span>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: POLAROID PHOTO BOOK */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <PolaroidBook />
      </section>

      {/* SECTION 3: "OPEN WHEN..." LETTERS */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <OpenWhen />
      </section>

      {/* SECTION 4: LOVE COUPON BOOK */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <LoveCoupons />
      </section>

      {/* SECTION 5: VIRTUAL LOVE JAR */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl max-w-xl w-full text-center shadow-2xl border border-white/15 relative"
        >
          <MessageCircleHeart className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">The Magic Love Jar 🫙</h2>
          <p className="text-white/60 text-sm mb-8">Tap whenever you need a sweet reminder of my love.</p>

          <button
            onClick={handleLoveJarClick}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 font-bold text-lg shadow-[0_0_25px_rgba(255,75,114,0.5)] transition-all transform active:scale-95 cursor-pointer"
          >
            Open a Secret Note ✨
          </button>

          <AnimatePresence mode="wait">
            {noteOpen && (
              <motion.div
                key={currentNoteIndex}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                className="mt-6 p-6 bg-white/10 rounded-2xl border border-pink-500/30 text-pink-200 text-lg font-medium italic shadow-inner"
              >
                "{siteConfig.loveNotes[currentNoteIndex]}"
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SECTION 6: FUTURE BUCKET LIST */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <BucketList />
      </section>

      {/* SECTION 7: REASONS WHY I LOVE YOU */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300">
            Why You Mean Everything To Me ✨
          </h2>
          <p className="text-white/60">Hover over each card to explore my feelings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {siteConfig.reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-pink-500/60 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/30 transition-all" />
              <Heart className="w-8 h-8 text-pink-400 mb-4 fill-pink-400/20 group-hover:scale-125 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">{reason.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 8: COUPLE QUIZ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl max-w-xl w-full text-center shadow-2xl border border-white/15 relative"
        >
          <Star className="w-10 h-10 text-yellow-400 mx-auto mb-4 fill-yellow-400 animate-spin-slow" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How Well Do We Match? 🧩</h2>
          <p className="text-white/60 text-sm mb-8">Question {currentQuizStep + 1} of {siteConfig.quiz.length}</p>

          {!quizFinished ? (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-pink-200">
                {siteConfig.quiz[currentQuizStep].question}
              </h3>
              <div className="space-y-3">
                {siteConfig.quiz[currentQuizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    className={`w-full py-4 px-6 rounded-2xl font-medium transition-all border text-left cursor-pointer ${
                      selectedOpt === i 
                        ? "bg-pink-500 border-pink-400 text-white shadow-[0_0_20px_rgba(255,75,114,0.6)] scale-[1.02]" 
                        : "bg-white/5 border-white/10 hover:bg-white/15 text-white/90"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-6">
              <h3 className="text-3xl font-bold text-pink-400 mb-3">Quiz Completed! 🎉</h3>
              <p className="text-white/80 text-lg mb-6">You scored 100% in Revan's heart forever! 🥰</p>
              <button 
                onClick={() => { setCurrentQuizStep(0); setQuizFinished(false); }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-all border border-white/20 cursor-pointer"
              >
                Play Again 🔄
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* SECTION 9: GRAND FINALE QUESTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/50 via-transparent to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl w-full"
        >
          <Gift className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-pink-400 leading-tight">
            Will You Always Be Mine, Forever & Ever? ❤️
          </h2>

          {isAccepted ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel p-10 rounded-3xl border border-pink-500/60 shadow-[0_0_60px_rgba(255,75,114,0.5)]"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Yaaay! She Said Yes! 🎉🥰</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Here's to a lifetime of endless love, unforgettable laughs, and pure happiness together. Happy Birthday, Adiii! I love you so much! ❤️
              </p>
            </motion.div>
          ) : (
            <div className="flex justify-center items-center gap-6 relative h-40">
              <button 
                onClick={handleYes}
                className="px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-xl font-bold rounded-full shadow-[0_0_35px_rgba(255,75,114,0.7)] transition-all transform hover:scale-110 z-20 cursor-pointer"
              >
                Yes, Forever! 😍
              </button>
              
              <motion.button 
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onHoverStart={handleNoHover}
                onClick={handleNoHover}
                className="px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-xl font-bold rounded-full absolute z-10 cursor-pointer"
                style={{ left: "calc(50% + 50px)" }}
              >
                No 😢
              </motion.button>
            </div>
          )}
        </motion.div>
      </section>

    </div>
  );
}