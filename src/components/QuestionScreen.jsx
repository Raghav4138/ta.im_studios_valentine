import React from 'react';

export default function QuestionScreen({ question, subtitle, options, onSelect, onBack }) {
  return (
    <div className="screen question-screen">
      <div className="question-header-box">
        <img src="/logo.png" alt="Logo" className="question-logo" />
        <h2 className="question-title">{question}</h2>
        <div className="question-divider">
          <span className="diamond" />
          <span className="line" />
          <span className="diamond" />
        </div>
        <p className="question-subtitle">{subtitle}</p>
      </div>

      <div className="question-options">
        {options.map((option) => (
          <button
            key={option.value}
            className="question-option-card"
            onClick={() => onSelect(option.value)}
          >
            {option.image && (
              <img src={option.image} alt={option.label} className="option-crown" />
            )}
            <div className="option-divider">
              <span className="diamond" />
              <span className="line" />
              <span className="diamond" />
            </div>
            <span className="option-label">{option.label}</span>
            {option.subtext && (
              <span className="option-subtext">{option.subtext}</span>
            )}
          </button>
        ))}
      </div>

      {onBack && (
        <button className="question-back-btn" onClick={onBack}>
          &lt; Back
        </button>
      )}
    </div>
  );
}
