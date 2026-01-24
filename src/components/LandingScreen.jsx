import React from 'react';

export default function LandingScreen({ onStart }) {
  return (
    <div className="screen landing-screen">
      <div className="landing-content">
        <h1>💝 Taim Studios</h1>
        <h2>Valentine Hamper Builder</h2>
        <p>Create the perfect hamper for your special someone!</p>
        <button className="btn btn-secondary" onClick={onStart}>
          Make Your Valentine Hamper
        </button>
      </div>
    </div>
  );
}
