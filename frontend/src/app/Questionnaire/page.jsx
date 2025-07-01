'use client';

import { useState, useEffect, useMemo } from 'react';
import QuestionCard from "../../components/QuestionCard";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import questionData from '../../data/questions.json';
import scoreRules from '../../data/questscore.json';

const topics = Object.keys(questionData); // Automatically get topics from JSON

export default function Page() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const questions = useMemo(() => {
        return selectedTopic ? questionData[selectedTopic] : [];
    }, [selectedTopic]);

    useEffect(() => {
        if (questions.length > 0 && currentQuestion >= questions.length) {
            const timer = setTimeout(() => {
                setShowResult(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, questions]);

    const handleOptionClick = (point) => {
        setAnswers([...answers, point]);
        setTimeout(() => {
            setCurrentQuestion((prev) => prev + 1);
        }, 300);
    };

    if (!selectedTopic) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-10 backdrop-blur-md">
                <h2 className="text-2xl font-bold mb-4">Choose a topic</h2>
                <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => setSelectedTopic(topic)}
                            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600"
                        >
                            {topic}
                        </button>
                    ))}
                </div>

                {/* SVG Wave (bottom) */}
                <svg
                    className="absolute bottom-0 left-0 w-full h-40"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#D7A529"
                        d="M0,224L48,197.3C96,171,192,117,288,96C384,75,460,85,570,96C672,107,768,117,864,138.7C960,160,1056,192,1152,176C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>
        );
    }

    if (questions.length > 0 && currentQuestion >= questions.length) {
        const totalScore = answers.reduce((a, b) => a + b, 0);

        // Get the rules for the selected topic
        const rules = selectedTopic ? scoreRules[selectedTopic] : null;

        let finalScore = totalScore;

        // Apply multiplier from JSON
        if (rules?.multiplier) {
            finalScore *= rules.multiplier;
        }

        // Apply postProcess logic from JSON
        switch (rules?.postProcess) {
            case "divideBy60":
                finalScore /= 60;
                break;
            case "divideBy12":
                finalScore /= 12;
                break;
            case "divideBy15":
                finalScore /= 15;
                break;
        }

        const matchedRange = rules?.ranges.find(
            (range) => finalScore >= range.min && finalScore <= range.max
        );

        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100 backdrop-blur-md px-4">
                {!showResult ? (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-green-300 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-lg text-gray-700 font-semibold">Calculating your result...</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative p-1 roundedTwenty bg-gradient-to-br from-green-300 via-green-300 to-green-500 shadow-lg"
                    >
                        <div className="bg-white roundedEighteen p-6 text-center relative z-10 shadow-xl">
                            <h2 className="text-2xl font-bold text-green-700 mb-4">Your Result</h2>
                            {matchedRange ? (
                                <>
                                    <h2 className="text-2xl font-bold text-green-700 mb-2">
                                        {matchedRange.label}
                                    </h2>
                                    <p className="text-base text-gray-700 mb-6">
                                        {matchedRange.description}
                                    </p>
                                </>
                            ) : (
                                <p className="text-base text-gray-500 mb-6">
                                    We couldn’t determine your result.
                                </p>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                                <Link href="/">
                                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition">
                                        Go back to Home
                                    </button>
                                </Link>
                                <button
                                    onClick={() => {
                                        setSelectedTopic(null);
                                        setCurrentQuestion(0);
                                        setAnswers([]);
                                        setShowResult(false);
                                    }}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition"
                                >
                                    Take Another Quiz
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SVG Wave (bottom) */}
                <svg
                    className="absolute bottom-0 left-0 w-full h-40"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#D7A529"
                        d="M0,224L48,197.3C96,171,192,117,288,96C384,75,460,85,570,96C672,107,768,117,864,138.7C960,160,1056,192,1152,176C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 backdrop-blur-md px-4 text-center">
            {/* Progress Bar */}
            <div
                className="w-full h-2 bg-green-500 mb-4"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`, transition: 'width 0.3s ease' }}
            ></div>

            {/* Rest of the content */}
            <AnimatePresence mode="wait">
                {showResult ? (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-6 rounded-2xl shadow-xl text-center"
                    >
                        {/* Your Result Component */}
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.3 }}
                    >
                        <QuestionCard
                            question={questions[currentQuestion].question}
                            options={Object.keys(questions[currentQuestion].options)}
                            onSelect={(idx) => handleOptionClick(Object.values(questions[currentQuestion].options)[idx])}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SVG Wave (bottom) */}
            <svg
                className="absolute bottom-0 left-0 w-full h-40"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#D7A529"
                    d="M0,224L48,197.3C96,171,192,117,288,96C384,75,460,85,570,96C672,107,768,117,864,138.7C960,160,1056,192,1152,176C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </svg>
        </div>
    );
}
