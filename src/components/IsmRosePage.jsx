import React, { useEffect, useState } from "react";
import "../App.css";

const WHATSAPP_NUMBER = "919417149638";

// Product data
const ISM_ROSE_PRODUCTS = [
  {
    id: "classic-rose",
    name: "The Classic Rose",
    subtext: "",
    price: 79,
    originalPrice: 99,
    tags: ["1 BLR Rose"],
    image: "/ism-rose/classic-rose.jpg",
  },
  {
    id: "wrapped-love",
    name: "Wrapped with Love",
    subtext: "Single Rose Bouquet",
    price: 99,
    originalPrice: 149,
    tags: ["Cute", "Simple Gift"],
    image: "/ism-rose/single-rose-bqt.png",
  },
  {
    id: "sweet-gesture",
    name: "Sweet Gesture",
    subtext: "3–4 Fresh Roses",
    price: 199,
    originalPrice: 299,
    tags: [],
    popular: true,
    image: "/ism-rose/classic-bqt.png",
  },
  {
    id: "heart-stealer",
    name: "Heart Stealer",
    subtext: "Premium Rose Bouquet",
    price: 419,
    originalPrice: 499,
    tags: ["Premium", "Best Seller"],
    image: "/ism-rose/premium-rose-bqt.png",
  },
  // {
  //   id: "yellow-delight",
  //   name: "Yellow Delight",
  //   subtext: "Paper Wrapper Rose Bouquet",
  //   price: 519,
  //   originalPrice: 599,
  //   tags: ["Premium", "Colorful"],
  //   image: "/ism-rose/",
  // },
  {
    id: "grand-confession",
    name: "Grand Confession",
    subtext: "Luxury Paper-Wrapped Bouquet",
    price: 599,
    originalPrice: 999,
    tags: ["Luxury", "Special Gift"],
    image: "/ism-rose/premium-rose-bqt-paper.png",
  },
];

// Combo product - price auto-calculated
const COMBO_PRODUCT = {
  id: "ultimate-combo",
  name: "The Ultimate Rose Day Combo",
  subtext: "All 5 bouquets • ₹100 combo savings",
  get price() {
    const total = ISM_ROSE_PRODUCTS.reduce((sum, p) => sum + p.price, 0);
    return total - 100;
  },
  get originalPrice() {
    return ISM_ROSE_PRODUCTS.reduce((sum, p) => sum + p.originalPrice, 0);
  },
  tags: ["Best Value", "Rose Day Special"],
  image: "/ism-rose/grand-combo.png",
  isCombo: true,
};

const ALL_PRODUCTS = [...ISM_ROSE_PRODUCTS, COMBO_PRODUCT];

export default function IsmRosePage() {
  const ordersDisabled = true;
  const [cart, setCart] = useState({}); // { productId: quantity }
  const [screen, setScreen] = useState("products"); // 'products' | 'summary'
  const [toastMessage, setToastMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date("2026-02-07T12:00:00").getTime();

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

  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(showToast._timeoutId);
    showToast._timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2400);
  };

  const handleSelect = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: 1,
    }));
  };

  const handleIncrement = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setCart((prev) => {
      const newQty = (prev[productId] || 0) - 1;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, qty]) => {
      const product = ALL_PRODUCTS.find((p) => p.id === productId);
      return total + (product?.price || 0) * qty;
    }, 0);
  };

  const getTotalOriginalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, qty]) => {
      const product = ALL_PRODUCTS.find((p) => p.id === productId);
      return total + (product?.originalPrice || 0) * qty;
    }, 0);
  };

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const hasSelection = Object.keys(cart).length > 0;
  const totalOriginal = getTotalOriginalPrice();
  const totalPayable = getTotalPrice();
  const totalSavings = Math.max(totalOriginal - totalPayable, 0);

  const generateWhatsAppMessage = () => {
    let message = `Hello, I want to place an order for Rose Day \n\n`;
    message += `Items:\n`;

    Object.entries(cart).forEach(([productId, qty]) => {
      const product = ALL_PRODUCTS.find((p) => p.id === productId);
      if (product) {
        const subtotal = product.price * qty;
        message += `${product.name} × ${qty} — ₹${subtotal}\n`;
      }
    });

    message += `\n*Total Payable: ₹${getTotalPrice()}*\n\n`;
    message += `Please confirm this order.`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  const getDiscountPercent = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

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

      {screen === "products" ? (
        <>
          {/* Hero Section */}
          <section
            className="ism-hero"
            style={{ backgroundImage: `url(/ism-rose/ism-rose-hero.png)` }}
          >
            <div className="ism-hero-overlay"></div>
            <div className="ism-hero-content">
              <span className="ism-hero-pill">Order Now</span>
              <h1 className="ism-hero-title">
                Rose Day,
                <br />
                <span className="ism-hero-title-italic">sorted.</span>
              </h1>
              <p className="ism-hero-subtitle">
                No running around during <span className="ism-highlight-basant">Basant</span>.
                <br />
                Order your rose bouquet now.
                <br />
                Collect it inside campus on Rose Day.
              </p>
              <button
                className={`ism-hero-cta ${ordersDisabled ? "ism-hero-cta--disabled" : ""}`}
                onClick={ordersDisabled ? () => showToast("Orders are currently closed") : scrollToProducts}
                aria-disabled={ordersDisabled}
              >
                {ordersDisabled ? "ORDERS CLOSED" : "PLACE ORDERS NOW"}
                <span className="ism-cta-arrow">↓</span>
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

          {/* Products Section */}
          <section className="ism-products-section" id="products-section">
            <div className="ism-products-header">
              <h2 className="ism-products-title">Select for Your Love 🌹</h2>
              <p className="ism-products-subtitle">
                Pre-book now. Pick up inside campus on Rose Day.
              </p>
              <span className="ism-products-microtext">
                Limited quantities • No last-minute chaos
              </span>
            </div>

            <div className="ism-products-grid">
              {ALL_PRODUCTS.map((product) => {
                const qty = cart[product.id] || 0;
                const isSelected = qty > 0;
                const discount = getDiscountPercent(product.originalPrice, product.price);

                return (
                  <div
                    key={product.id}
                    className={`ism-product-card ${isSelected ? "ism-product-selected" : ""} ${ordersDisabled ? "ism-product-disabled" : ""}`}
                  >
                    <div className="ism-product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="ism-product-image"
                        // onError={(e) => {
                        //   e.target.onerror = null;
                        //   e.target.src = "/ism-rose/placeholder.jpg";
                        // }}
                      />
                      {ordersDisabled && (
                        <div className="ism-out-of-stock">OUT OF STOCK</div>
                      )}
                    </div>
                    <div className="ism-product-info">
                      <div className="ism-product-name-row">
                        <div className="ism-product-name-block">
                          <h3 className="ism-product-name">{product.name}</h3>
                          {product.subtext && (
                            <p className="ism-product-subtext">{product.subtext}</p>
                          )}
                        </div>
                        <div className="ism-product-price-block">
                          <span className="ism-product-original-price">
                            ₹{product.originalPrice}
                          </span>
                          <span className="ism-product-price">₹{product.price}</span>
                        </div>
                      </div>
                      <div className="ism-product-tags-row">
                        <div className="ism-product-tags">
                          {product.popular && (
                            <span className="ism-tag ism-tag-popular">Most Popular</span>
                          )}
                          {product.tags.map((tag, idx) => (
                            <span key={idx} className="ism-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="ism-discount-badge">{discount}% off</span>
                      </div>
                      <div className="ism-product-action">
                        {!isSelected ? (
                          <button
                            className="ism-select-btn"
                            onClick={() => handleSelect(product.id)}
                            disabled={ordersDisabled}
                          >
                            Select
                          </button>
                        ) : (
                          <div className="ism-qty-controls">
                            <button
                              className="ism-qty-btn"
                              onClick={() => handleDecrement(product.id)}
                              disabled={ordersDisabled}
                            >
                              −
                            </button>
                            <span className="ism-qty-value">{qty}</span>
                            <button
                              className="ism-qty-btn"
                              onClick={() => handleIncrement(product.id)}
                              disabled={ordersDisabled}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Floating Footer */}
          {hasSelection && (
            <div className="ism-floating-footer">
              <div className="ism-floating-footer-content">
                <div className="ism-total-block">
                  <span className="ism-total-label">Total Price:</span>
                  <span className="ism-total-value">₹{getTotalPrice()}</span>
                </div>
                <button
                  className="ism-continue-btn"
                  onClick={() => setScreen("summary")}
                  disabled={ordersDisabled}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Order Summary Screen */
        <div className="ism-summary-screen">
          <div className="ism-summary-header">
            <button className="ism-back-btn" onClick={() => setScreen("products")}>
              ← Back
            </button>
          </div>
          <h2 className="ism-summary-title">Order Summary</h2>

          <div className="ism-summary-content">
            <div className="ism-summary-items">
              {Object.entries(cart).map(([productId, qty]) => {
                const product = ALL_PRODUCTS.find((p) => p.id === productId);
                if (!product) return null;
                const subtotal = product.price * qty;

                return (
                  <div key={productId} className="ism-summary-item">
                    <div className="ism-summary-item-info">
                      <span className="ism-summary-item-name">{product.name}</span>
                      <span className="ism-summary-item-qty">× {qty}</span>
                    </div>
                    <span className="ism-summary-item-price">₹{subtotal}</span>
                  </div>
                );
              })}
            </div>

            <div className="ism-summary-divider"></div>

            <div className="ism-summary-total">
              <span className="ism-summary-total-label">Total Amount</span>
              <span className="ism-summary-total-value">₹{totalPayable}</span>
            </div>

            {totalSavings > 0 && (
              <p className="ism-summary-savings">You saved ₹{totalSavings}</p>
            )}

            <div className="ism-summary-pickup-note">
              <p>🌹 Pickup: IIT ISM Campus on Rose Day (Feb 7)</p>
              <p className="ism-pickup-subtext">Delivery updates will be shared in the WhatsApp group.</p>
            </div>

            <button
              className="ism-whatsapp-btn"
              onClick={handleWhatsAppOrder}
              disabled={ordersDisabled}
            >
              <svg
                className="ism-whatsapp-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Place Order on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="ism-footer">
        <div className="ism-footer-content">
          <span className="ism-footer-text">Taim Studio</span>
          <span className="ism-footer-divider">×</span>
          <span className="ism-footer-text">IIT ISM</span>
        </div>
      </footer>

      <div className={`ism-toast ${toastMessage ? "is-visible" : ""}`}>
        {toastMessage}
      </div>
    </div>
  );
}
