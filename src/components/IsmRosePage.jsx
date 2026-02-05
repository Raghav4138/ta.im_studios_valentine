import React, { useEffect, useState } from "react";
import "../App.css";

export default function IsmRosePage() {
  const heroBackground = "/ism-rose/hero-bg.jpg";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    quantity: "Classic Bouquet – 4 to 5 roses",
    recipient: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date("2026-02-06T15:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(targetTime - now, 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleQuantitySelect = (quantity) => {
    setFormData((prev) => ({ ...prev, quantity }));
  };

  const handleRecipientSelect = (recipient) => {
    setFormData((prev) => ({ ...prev, recipient }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 10) {
      newErrors.whatsapp = "Valid WhatsApp number required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToForm = () => {
    document.getElementById("priority-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Google Form submission (optimistic UI - show success immediately)
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSf9SR4RyG9vp2qb_YX6HygJXogvyZfW_k1EL-_zyqVznn4FlQ/formResponse";

    const formBody = new URLSearchParams({
      "entry.990595197": formData.firstName,
      "entry.1699669172": formData.lastName,
      "entry.788427751": formData.whatsapp,
      "entry.1036239347": formData.email,
      "entry.476302456": formData.quantity,
      "entry.2138304947": formData.recipient,
    });

    // Fire and forget - don't wait for response
    fetch(googleFormUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    }).catch(() => {
      // Silently fail - optimistic UI already shown
    });

    // Immediately show success
    setIsSubmitted(true);
  };

  const quantityOptions = [
    {
      value: "Mini Bouquet – 2 to 3 roses",
      label: "Mini Bouquet",
      range: "2 to 3 roses",
      emoji: "🌹",
    },
    {
      value: "Classic Bouquet – 4 to 5 roses",
      label: "Classic Bouquet",
      range: "4 to 5 roses",
      emoji: "💐",
      popular: true,
    },
    {
      value: "Grand Bouquet – 8 to 10 roses",
      label: "Grand Bouquet",
      range: "8 to 10 roses",
      emoji: "💝",
    },
  ];

  const recipientOptions = [
    { value: "Someone Special", label: "Someone Special", emoji: "❤️" },
    { value: "Just Friends", label: "Just Friends", emoji: "🤝" },
    { value: "It's Complicated", label: "It's Complicated", emoji: "😅" },
  ];

  return (
    <div className="ism-rose-page">
      {/* Sticky Header */}
      <header className="ism-header">
        <div className="ism-header-left">
          <img
            src="/logo.png"
            alt="Taim Studio"
            className="ism-logo-taim"
          />
          <span className="ism-logo-divider">×</span>
          <img
            src="/ism-logo.svg"
            alt="IIT ISM"
            className="ism-logo-ism"
          />
        </div>
        <div className="ism-header-right">
          <span className="ism-urgency-badge">🌹 Rose Day: Feb 7</span>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="ism-hero"
        style={{ backgroundImage: `url(/ism-rose/ism-rose-hero.png)` }}
      >
        <div className="ism-hero-overlay"></div>
        <div className="ism-hero-content">
          <span className="ism-hero-pill">Pre-book Now</span>
          <h1 className="ism-hero-title">
            Rose Day,
            <br />
            <span className="ism-hero-title-italic">sorted.</span>
          </h1>
          <p className="ism-hero-subtitle">
            No running around during <span className="ism-highlight-basant">Basant</span>.
            <br />
            Pre-book your rose bouquet.
            <br />
            Collect it inside campus on Rose Day.
          </p>
          <button className="ism-hero-cta" onClick={scrollToForm}>
            RESERVE MY SPOT <span className="ism-cta-arrow">↓</span>
          </button>
        </div>
      </section>

      {/* Timer Section */}
      <section className="ism-timer-section">
        <h2 className="ism-section-title">Limited time left</h2>
        <div className="ism-timer">
          <div className="ism-timer-block">
            <span className="ism-timer-value">{timeLeft.days}</span>
            <span className="ism-timer-label">Days</span>
          </div>
          <div className="ism-timer-block">
            <span className="ism-timer-value">{timeLeft.hours}</span>
            <span className="ism-timer-label">Hours</span>
          </div>
          <div className="ism-timer-block">
            <span className="ism-timer-value">{timeLeft.minutes}</span>
            <span className="ism-timer-label">Minutes</span>
          </div>
          <div className="ism-timer-block">
            <span className="ism-timer-value">{timeLeft.seconds}</span>
            <span className="ism-timer-label">Seconds</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="ism-how-it-works">
        <h2 className="ism-section-title">How it works</h2>
        <div className="ism-steps">
          <div className="ism-step">
            <div className="ism-step-icon">📝</div>
            <div className="ism-step-content">
              <h3 className="ism-step-title">Today (Feb 5)</h3>
              <p className="ism-step-desc">Fill the form to secure your slot.</p>
            </div>
          </div>
          <div className="ism-step">
            <div className="ism-step-icon">💬</div>
            <div className="ism-step-content">
              <h3 className="ism-step-title">Tomorrow (Feb 6)</h3>
              <p className="ism-step-desc">Get payment link via WhatsApp.</p>
            </div>
          </div>
          <div className="ism-step">
            <div className="ism-step-icon">🌹</div>
            <div className="ism-step-content">
              <h3 className="ism-step-title">Rose Day (Feb 7)</h3>
              <p className="ism-step-desc">Collect your fresh bouquet on campus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Booking Form Section */}
      <section className="ism-form-section" id="priority-form">
        {!isSubmitted ? (
          <div className="ism-form-card">
            <div className="ism-form-header">
              <h2 className="ism-form-title">Priority Booking</h2>
              <p className="ism-form-subtitle">Secure high-quality roses now.</p>
              <span className="ism-freshness-badge">🌹 FRESHNESS GUARANTEED</span>
            </div>

            <form className="ism-form" onSubmit={handleSubmit}>
              <div className="ism-form-group">
                <label htmlFor="firstName" className="ism-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`ism-input ${errors.firstName ? "ism-input-error" : ""}`}
                  placeholder="Rahul"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <span className="ism-error">{errors.firstName}</span>}
              </div>

              <div className="ism-form-group">
                <label htmlFor="lastName" className="ism-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`ism-input ${errors.lastName ? "ism-input-error" : ""}`}
                  placeholder="Kumar"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="ism-error">{errors.lastName}</span>}
              </div>

              <div className="ism-form-group">
                <label htmlFor="email" className="ism-label">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="ism-input"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="ism-form-group">
                <label htmlFor="whatsapp" className="ism-label">WhatsApp Number</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  className={`ism-input ${errors.whatsapp ? "ism-input-error" : ""}`}
                  placeholder="9876543210"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
                <span className="ism-input-hint">🔒 We only use this for the payment link.</span>
                {errors.whatsapp && <span className="ism-error">{errors.whatsapp}</span>}
              </div>

              <div className="ism-form-group">
                <label className="ism-label">Select Quantity</label>
                <div className="ism-quantity-options">
                  {quantityOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={`ism-quantity-card ${
                        formData.quantity === option.value ? "ism-quantity-selected" : ""
                      }`}
                      onClick={() => handleQuantitySelect(option.value)}
                    >
                      <span className="ism-quantity-emoji">{option.emoji}</span>
                      <span className="ism-quantity-text">
                        <span className="ism-quantity-label">{option.label}</span>
                        <span className="ism-quantity-range">{option.range}</span>
                      </span>
                      {option.popular && (
                        <span className="ism-quantity-popular">Most Popular ⭐</span>
                      )}
                      <span className="ism-quantity-check">
                        {formData.quantity === option.value ? "●" : "○"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ism-form-group">
                <label className="ism-label">Who is this for?</label>
                <div className="ism-recipient-options">
                  {recipientOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={`ism-recipient-btn ${
                        formData.recipient === option.value ? "ism-recipient-selected" : ""
                      }`}
                      onClick={() => handleRecipientSelect(option.value)}
                    >
                      {option.label} {option.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="ism-submit-btn">
                SECURE MY ROSES
              </button>
              <p className="ism-form-disclaimer">Limited quantity available.
                <br></br>
                Important updates (pickup point & timing) will be shared only on WhatsApp.
              </p>
            </form>
          </div>
        ) : (
          <div className="ism-success-card">
            <div className="ism-success-icon">🌹</div>
            <h2 className="ism-success-title">You're on the list!</h2>
            <p className="ism-success-text">
              We have reserved your spot.
              <br />
              Please join the WhatsApp Group for Further Updates. Official Payments Links will be shared personally.
            </p>
            <div className="ism-success-warning">
              ⚠️ Payment links will only be valid for 6 hours. Incomplete payments will lead to cancellation of the order.
            </div>
            <a
              href="https://chat.whatsapp.com/EtZFFXIyCxZDo5njLtmYyp"
              className="ism-cta-fill"
              target="_blank"
              rel="noreferrer"
            >
              Join WhatsApp Group for Updates
            </a>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="ism-footer">
        <div className="ism-footer-content">
          <span className="ism-footer-text">Taim Studio</span>
          <span className="ism-footer-divider">×</span>
          <span className="ism-footer-text">IIT ISM</span>
        </div>
      </footer>
    </div>
  );
}
