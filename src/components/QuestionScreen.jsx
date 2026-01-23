import React from 'react';

export default function QuestionScreen({ question, options, onSelect, onSkip }) {
  return (
    <div className="screen question-screen">
      <div className="question-content">
        <h2>{question}</h2>
        <div className="options-grid">
          {options.map((option) => (
            <button
              key={option.value}
              className="option-btn"
              onClick={() => onSelect(option.value)}
            >
              {option.emoji && <span className="emoji">{option.emoji}</span>}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        {onSkip && (
          <button className="btn btn-secondary" onClick={onSkip}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
