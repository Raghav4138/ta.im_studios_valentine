import React from 'react';

export default function HamperDetails({ hamper, onProceed, onBack }) {
  if (!hamper) return null;

  return (
    <div className="screen hamper-details-screen">
      <div className="day-header-box">
        <h1 className="day-title">{hamper.name}</h1>
        <div className="day-divider">
          <span className="line"></span>
          <span className="diamond"></span>
          <span className="line"></span>
        </div>
        <div className="day-subtitle">{hamper.description}</div>
      </div>

      <div className="hamper-details-container">
        {/* Hamper Image */}
        <div className="hamper-details-image">
          <img src={hamper.image} alt={hamper.name} />
        </div>

        {/* Price Badge */}
        <div className="hamper-details-price-badge">
          <span className="price-label">Price</span>
          <span className="price-value">₹{hamper.price}</span>
        </div>

        {/* What's Included */}
        <div className="hamper-details-includes">
          <h3 className="includes-title">What's Included</h3>
          <div className="includes-list">
            {hamper.includedItems.map((item, index) => (
              <div key={index} className="includes-item">
                <span className="includes-icon">💝</span>
                <span className="includes-name">{item}</span>
              </div>
            ))}
          </div>
          <p className="includes-count">
            {hamper.includedItems.length} items included in this hamper
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hamper-details-actions">
          <button className="btn btn-primary" onClick={onProceed}>
            Continue to Checkout
          </button>
          <button className="btn btn-secondary back-button" onClick={onBack}>
            Back to Hampers
          </button>
        </div>
      </div>
    </div>
  );
}
