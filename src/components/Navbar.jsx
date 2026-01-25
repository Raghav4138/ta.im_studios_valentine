import React from 'react';

/**
 * Navbar component
 * Variants:
 * - landing: white background, Instagram (left) + WhatsApp (right) icon buttons, logo centered
 * - default: pink background (#F09BC5), logo centered only
 */
export default function Navbar({ variant = 'default' }) {
  const isLanding = variant === 'landing';

  return (
    <header className={`navbar ${isLanding ? 'navbar--landing' : 'navbar--default'}`}>
      {isLanding ? (
        <div className="navbar-inner">
          <a
            className="social-icon-btn"
            href="https://wa.me/919569941138"
            target="_blank"
            rel="noreferrer"
            aria-label="Contact on WhatsApp"
          >
            <WhatsAppIcon />
          </a>

          <div className="navbar-logo-container">
            <img src="/logo.png" alt="Taim Studios" className="navbar-logo" />
          </div>

          <a
            className="social-icon-btn"
            href="https://instagram.com/ta.im.studio"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      ) : (
        <div className="navbar-inner">
          <span className="navbar-spacer" />
          <div className="navbar-logo-container">
            <img src="/logo.png" alt="Taim Studios" className="navbar-logo" />
          </div>
          <span className="navbar-spacer" />
        </div>
      )}
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="#F09BC5" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="#F09BC5" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.5" fill="#F09BC5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12c0 4.418-3.582 8-8 8a7.96 7.96 0 0 1-3.833-.987L4 20l1.05-4.067A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8Z" stroke="#F09BC5" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.5 9.5c.3-.3.8-.3 1.1 0l.7.7c.2.2.2.5.1.8-.1.2-.1.3 0 .5.4.6 1 .9 1.6 1.1.2.1.3 0 .5 0 .3-.1.6-.1.8.1l.7.7c.3.3.3.8 0 1.1-.5.5-1.2.7-1.9.6-1.3-.2-2.5-.9-3.5-1.9-1-1-1.7-2.2-1.9-3.5-.1-.7.1-1.4.6-1.9Z" fill="#F09BC5" />
    </svg>
  );
}
