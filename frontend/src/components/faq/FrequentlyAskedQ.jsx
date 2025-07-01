'use client';
import { useState } from 'react';
import FAQItem from './FAQItem';
import FadeInOnScroll from "../../components/FadeInOnScroll";

const FrequentlyAskedQ = () => {
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: "What is Brighter Beyond?",
      answer: "Brighter Beyond is a safe and supportive space where you can share your thoughts without fear or judgment. Whether you're feeling lost, overwhelmed, or just need someone to listen, we're here for you. Connect with compassionate listeners who truly understand—because sometimes, a conversation can be the first step toward healing. You are not alone, and your feelings matter. 💙"
    },
    {
      question: "Who is Brighter Beyond for?",
      answer: "Brighter Beyond is here for anyone experiencing mild emotional distress, feeling overwhelmed, or simply needing a safe space to talk. Research shows that compassionate conversations can be just as effective as traditional therapy for those seeking support and understanding.However, if you're looking for structured counseling, therapy may be a better option. If you are in severe distress or facing a crisis, please seek immediate help from professional resources. You are not alone, and there is always support available for you. 💙"
    },
    {
      question: "What Brighter Beyond is Not?",
      answer: "Brighter Beyond is not a substitute for professional therapy. While our platform provides a safe space for emotional support and understanding, it is not a replacement for structured counseling. If you're considering therapy, we encourage you to explore professional options that may better suit your needs. 💙"
    },
    {
      question: "Peer Support or Therapy - Which One is Right for You?",
      answer: "If you're dealing with deep-rooted mental health concerns, therapy is the best choice. A licensed therapist can provide structured, long-term support tailored to your needs. Therapy can take weeks, months, or even years, depending on your journey. Peer support, on the other hand, is ideal for immediate emotional distress—when you just need someone to listen. It's instant, anonymous, and always available to help you process your thoughts in the moment. 💙"
    },
    {
      question: "Do We Provide Therapy?",
      answer: "Yes! While we currently focus on peer support, we are planning to add therapy services in the future to provide even more comprehensive mental health support. Stay tuned! 💙"
    },
    {
      question: "Can I Become a Listener?",
      answer: "Yes! We welcome compassionate individuals who want to support others in times of need. As a volunteer listener, you'll play a vital role in providing emotional support while gaining invaluable communication and active listening skills. We also offer free industry-vetted training to help you along the way.If you feel called to be a part of this, click here to learn more about your next steps. 💙"
    },
    {
      question: "How Can I Support?",
      answer: "We deeply appreciate your willingness to contribute! BuddyHelp is entirely volunteer-run, built on kindness and the desire to support those in need. Your donation helps us expand our reach and continue making a difference.Click here to learn more about how you can support us. 💙"
    },
  ];

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <FadeInOnScroll>
      <div id='faqs' className='wrapper'>
          <div className="faq-header">
              <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
          {displayedFaqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
          <div className="toggle-questions-btn mb-20">
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less Questions' : 'More Questions +'}
            </button>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
};

export default FrequentlyAskedQ;
