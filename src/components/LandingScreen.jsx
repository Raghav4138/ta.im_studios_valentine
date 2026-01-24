import React from "react";

export default function LandingScreen({ onStart }) {
  return (
    <div className="landing-wrapper">
      {/* Background */}
      <img src="/landing-bg.png" alt="Background" className="landing-bg" />

      {/* Content */}
      <div className="landing-content">

        <img src="/logo.png" alt="Taim Studios" className="landing-logo" />

        <h1 className="landing-title">
          Personalized<br />Valentines Hamper
        </h1>

        <div className="landing-divider">
          <span className="diamond" />
          <span className="line" />
          <span className="diamond" />
        </div>

        <p className="landing-subtitle">
          Pick gifts for each day and create a memorable week.
        </p>

        <button className="landing-cta" onClick={onStart}>
          Make your Hamper Now
        </button>

        <h2 className="landing-connect-title">Connect With Us</h2>

        <div className="landing-divider small">
          <span className="diamond" />
          <span className="line" />
          <span className="diamond" />
        </div>

        <div className="landing-socials">
          <a
            href="https://instagram.com/ta.im.studio"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            📷 @ta.im.studio
          </a>

          <a
            href="https://wa.me/919569941138"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            💬 +91 95699 41138
          </a>
        </div>

      </div>
    </div>
  );
}
