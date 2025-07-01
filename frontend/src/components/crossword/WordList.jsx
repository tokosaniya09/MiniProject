import React from "react";

export default function WordList({ words, foundWords, score, timeLeft }) {
    return (
        <div className="flex flex-col items-center relative lg:topSeventy topMinus md:mt-20 md:pt-10">
        <div className="text-xl mb-1">⏳ Time Left: {timeLeft}s</div>
        <div className="text-lg mb-3">🎯 Score: {score} / {words.length * 5}</div>
        <h2 className="text-xl font-semibold mb-2">Words to Find</h2>
        <div className="flex flex-wrap gap-2 max-w-xs justify-center">
            {words.map((word, i) => (
            <span key={i} className={`px-2 py-1 rounded-full border ${foundWords.includes(word) ? "bg-blue-600 text-white line-through" : "bg-white"}`}>
                {word}
            </span>
            ))}
        </div>
        </div>
    );
}
