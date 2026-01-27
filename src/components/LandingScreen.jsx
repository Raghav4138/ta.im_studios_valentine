import React from "react";

export default function LandingScreen({ onStartHamper, onStartBouquets, onStartReadymadeHampers }) {
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
            CREATE YOUR HAMPER
          </button>
          <button className="landing-action" onClick={onStartBouquets}>
            BOUQUETS
          </button>
          <button className="landing-action" onClick={onStartReadymadeHampers}>
            READYMADE HAMPERS
          </button>
        </div>
      </div>
    </div>
  );
}
