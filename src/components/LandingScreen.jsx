import React, { useState, useEffect, useRef } from "react";

const CAROUSEL_IMAGES = [
  'landing_page/carousel/slide1.png',
  'landing_page/carousel/slide2.png',
  'landing_page/carousel/slide3.png',
];

const CAROUSEL_INTERVAL = 3000; // 3 seconds
const SLIDE_GAP = 16;

const TESTIMONIALS = [
  "Absolutely loved the gift hamper! It made my day and was a perfect surprise. I would highly recommend these hampers to anyone looking for a beautiful and thoughtful gift.",
  "The products are amazing and the creativity you guys have is awesome. Everything was finely detailed and super cute. The whole experience was extremely fun. Wishing you great success!",
  "I am so happy with your collection. Wonderful experience and very satisfying. Thank you so much!",
  "It was really very good! I loved your collection. ❤️",
  "Thank you so much for making such a special memory for us. We collected great memories. Great work!"
];

const TESTIMONIAL_CARD_WIDTH = 344;
const TESTIMONIAL_GAP = 16;

export default function LandingScreen({ onStartHamper, onStartBouquets, onStartReadymadeHampers }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(Math.min(window.innerWidth - 32, 400));
  const timeoutRef = useRef(null);
  const trackRef = useRef(null);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialTransitioning, setIsTestimonialTransitioning] = useState(true);
  const testimonialTimeoutRef = useRef(null);

  const slides = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];
  const testimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  // Handle responsive slide width
  useEffect(() => {
    const handleResize = () => {
      setSlideWidth(Math.min(window.innerWidth - 32, 400));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prev) => prev + 1);
    };

    timeoutRef.current = setInterval(nextSlide, CAROUSEL_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const nextTestimonial = () => {
      setCurrentTestimonial((prev) => prev + 1);
    };

    testimonialTimeoutRef.current = setInterval(nextTestimonial, CAROUSEL_INTERVAL);

    return () => {
      if (testimonialTimeoutRef.current) {
        clearInterval(testimonialTimeoutRef.current);
      }
    };
  }, []);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    timeoutRef.current = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, CAROUSEL_INTERVAL);
  };

  const handleTransitionEnd = () => {
    if (currentSlide >= CAROUSEL_IMAGES.length) {
      setIsTransitioning(false);
      setCurrentSlide(0);
      // Re-enable transition on next tick
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }
  };

  const handleTestimonialTransitionEnd = () => {
    if (currentTestimonial >= TESTIMONIALS.length) {
      setIsTestimonialTransitioning(false);
      setCurrentTestimonial(0);
      // Re-enable transition on next tick
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTestimonialTransitioning(true));
      });
    }
  };

  return (
    <div className="landing-wrapper-new">
      {/* 1. Hero Image - Full Width */}
      <section className="landing-hero-section">
        <img
          src="landing_page/landing-hero.png"
          alt="Complete Valentine's Solution"
          className="landing-hero-img"
        />
      </section>

      {/* 2. Image Carousel with Auto-scroll */}
      <section className="landing-carousel-section">
        <div className="carousel-container">
          <div
            ref={trackRef}
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * (slideWidth + SLIDE_GAP)}px)`,
              gap: `${SLIDE_GAP}px`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((img, idx) => (
              <div
                key={idx}
                className="carousel-slide"
                style={{ width: `${slideWidth}px`, height: `${slideWidth * 0.75}px` }}
              >
                <img src={img} alt={`Slide ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Dots Navigation */}
        <div className="carousel-dots">
          {CAROUSEL_IMAGES.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${(currentSlide % CAROUSEL_IMAGES.length) === idx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 4. Action Buttons */}
      <section className="landing-buttons-section">
        <button className="landing-btn landing-btn-primary" onClick={onStartHamper}>
          BUILD YOUR HAMPER NOW →
        </button>
        <button className="landing-btn landing-btn-secondary" onClick={onStartReadymadeHampers}>
          BROWSE GIFT HAMPERS
        </button>
        <button className="landing-btn landing-btn-secondary" onClick={onStartBouquets}>
          SHOP BOUQUETS
        </button>
      </section>

      {/* 5. Complete Solution Section */}
      <section className="landing-solution-section">
        <img src="landing_page/heart-icon2.svg" alt="" className="solution-heart" />
        <h2 className="solution-heading">A COMPLETE SOLUTION</h2>
        <img
          src="landing_page/complete-solution.png"
          alt="Valentine's Week - Rose Day to Valentine's Day"
          className="solution-img"
        />
      </section>

      {/* 6. Discount Section */}
      <section className="landing-discount-section">
        <h2 className="discount-heading">
          GET AMAZING <br />
          DISCOUNTS!
        </h2>
        <div className="discount-card">
          <img
            src="landing_page/coupon.png"
            alt="Use coupon code EARLYBIRD5 for 5% instant discount"
            className="discount-img"
          />
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="landing-testimonials-section">
        <p className="testimonials-subheading">TRUSTED BY 100+ HAPPY CUSTOMERS</p>
        <h2 className="testimonials-heading">TESTIMONIALS</h2>
        <div className="testimonials-carousel">
          <div
            className="testimonials-track"
            style={{
              transform: `translateX(-${currentTestimonial * (TESTIMONIAL_CARD_WIDTH + TESTIMONIAL_GAP)}px)`,
              transition: isTestimonialTransitioning ? 'transform 0.5s ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTestimonialTransitionEnd}
          >
            {testimonials.map((text, idx) => (
              <div key={idx} className="testimonial-card">
                <img src="landing_page/heart-icon.svg" alt="" className="testimonial-heart" />
                <p className="testimonial-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA2 Section */}
      <section className="landing-cta2-section">
        <p className="cta2-subheading">OFFER AVAILABLE FOR LIMITED TIME</p>
        <h2 className="cta2-heading">BOOK NOW!!</h2>
        <button className="cta2-button" onClick={onStartHamper}>
          Build your Hamper Now →
        </button>
      </section>

      {/* 8. Connect With Us */}
      <section className="landing-connect-section">
        <h2 className="connect-heading">Connect With Us</h2>
        <div className="connect-buttons">
          <a
            href="https://instagram.com/ta.im.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-btn connect-btn-instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @ta.im.studio
          </a>
          <a
            href="https://wa.me/919569941138"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-btn connect-btn-whatsapp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            +91 95699 41138
          </a>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <img src="/logo.png" alt="Taim Studios" className="footer-logo" />
          <p className="footer-tagline">Crafting moments of love</p>
          <div className="footer-divider"></div>
          <p className="footer-copyright">© 2026 Taim Studios. All rights reserved.</p>
          <p className="footer-location">Made with ❤️ in Bathinda</p>
        </div>
      </footer>
    </div>
  );
}