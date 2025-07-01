
import { motion } from "framer-motion";

export default function QuestionCard({ question, options, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mx-auto text-center maxh overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className="block w-full bg-green-100 hover:bg-green-200 px-4 py-3 rounded-xl transition-all duration-200"
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );

}
