import React, { useState } from 'react';
import './FAQsElement.css'; // Import your CSS file for styling

const FAQsElement = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="heading"><h2>FAQs</h2></div>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <div  className={`faq-question ${activeIndex === index ? 'active' : ''}`} onClick={() => handleToggle(index)}>
            {faq.question}
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQsElement;
