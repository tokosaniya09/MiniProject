'use client';
import { useState, useRef } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        {question}
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      <div
        ref={contentRef}
        className="faq-answer-wrapper"
        style={{
          height: isOpen ? `${contentRef.current.scrollHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
