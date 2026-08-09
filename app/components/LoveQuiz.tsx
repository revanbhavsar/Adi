"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Star, CheckCircle2, XCircle } from "lucide-react";

// The custom quiz data (3 Wrong, 1 Right for each)
const quizQuestions = [
  {
    question: "What is my absolute favorite thing about you?",
    options: [
      "Your cute smile", 
      "Your pure heart", 
      "Your beautiful voice", 
      "Literally everything about you"
    ],
    correctIndex: 3, // "Literally everything about you"
  },
  {
    question: "If we were to go on a perfect date right now, where would I take you?",
    options: [
      "A crowded and loud concert",
      "To Cafe Golden Hours for a cozy evening ☕", 
      "A fancy, overly expensive restaurant", 
      "A snowy mountain trek"
    ],
    correctIndex: 1, // "Cafe Golden Hours"
  },
  {
    question: "What am I usually doing when I'm not talking to you?",
    options: [
      "Looking at your pictures and missing you 🥺",
      "Building new worlds in Minecraft ⛏️",
      "Editing videos for clients 🎬",
      "Working on new graphic designs 🎨"
    ],
    correctIndex: 0, // "Looking at your pictures"
  },
  {
    question: "What is the one thing I simply cannot live without?",
    options: [
      "My PC setup",
      "Fast food",
      "You ❤️",
      "My sleep"
    ],
    correctIndex: 2, // "You"
  }
];

export default function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent clicking multiple times fast

    setSelectedAnswer(index);

    if (index === quizQuestions[currentQuestion].correctIndex) {
      // Correct Answer!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff4b72', '#a855f7', '#ec4899']
      });

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setShowResult(true);
        }
      }, 1200); // Wait a second before moving to next question
    } else {
      // Wrong Answer!
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
        setSelectedAnswer(null); // Reset so she can try again
      }, 800);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10">
      <div className="max-w-2xl w-full bg-gray-900/90 border border-pink-500/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(255,75,114,0.1)]">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            How Well Do We Match? 🧩
          </h2>
          {!showResult && (
            <p className="text-pink-300/80">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
          )}
        </div>

        {/* Quiz Content */}
        <div className="min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="text-xl md:text-2xl font-medium text-pink-100 mb-8 text-center leading-relaxed">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === quizQuestions[currentQuestion].correctIndex;
                    
                    // Determine styling based on right/wrong selection
                    let buttonStyle = "bg-black/40 border-gray-700 text-gray-300 hover:border-pink-500/50 hover:bg-pink-900/20";
                    if (isSelected && isCorrect) {
                      buttonStyle = "bg-green-500/20 border-green-500 text-green-200 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = "bg-red-500/20 border-red-500 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        disabled={selectedAnswer !== null}
                        animate={isSelected && !isCorrect && isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`w-full p-4 md:p-5 rounded-2xl border text-left text-sm md:text-base font-medium transition-all duration-300 flex items-center justify-between ${buttonStyle}`}
                      >
                        <span>{option}</span>
                        {isSelected && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                        {isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400" />}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              
              /* End Screen */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <Heart className="w-20 h-20 text-pink-500 fill-pink-500 mx-auto mb-6 animate-bounce drop-shadow-[0_0_25px_rgba(255,75,114,0.6)]" />
                <h3 className="text-3xl font-bold text-white mb-4">100% Match! ❤️</h3>
                <p className="text-xl text-pink-200 mb-8">
                  You know me perfectly, Aditi. I love you!
                </p>
                <button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setShowResult(false);
                  }}
                  className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-bold transition-colors"
                >
                  Play Again 🔄
                </button>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}