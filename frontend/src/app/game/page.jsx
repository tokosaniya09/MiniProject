"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function GameStartPage() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const nextStep = () => setStep(prev => prev + 1);

    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative">

            {/* Glitter Background Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

        {step === 0 && (
            <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => router.push("/game/crossword")}
            className="text-3xl px-6 py-3 cursor-pointer rounded-full bg-white text-black font-bold bg-opacity-50 backdrop-blur-md"
            >
            Let's Play a Game
            </motion.button>
        )}

        </div>
    );
}
