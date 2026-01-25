import React, { useState } from "react";

export default function LandingScreen({ onStartHamper, onStartBouquets }) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 1500);
  };

  return (
    <div className="landing-wrapper">
      {/* Content */}
      <div className="landing-content landing-simple">
        <img
          src="../landing-hero.png"
          alt="Taim Studio"
          className="landing-hero"
        />

        <div className="landing-actions">
          <button className="landing-action" onClick={onStartHamper}>
            Personalized 7 Days Hamper
          </button>
          <button className="landing-action" onClick={onStartBouquets}>
            Bouquets
          </button>
          <button
            className="landing-action landing-action--disabled"
            onClick={handleComingSoon}
          >
            {showComingSoon ? 'Coming Soon' : 'Hampers'}
          </button>
        </div>
      </div>
    </div>
  );
}
