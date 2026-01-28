import React from 'react';
import { ADDONS } from '../data/catalog';

export default function AddonsScreen({ addons, setAddons, onSkip, onContinue, onBack }) {
  const handleQtyChange = (addonId, delta) => {
    setAddons((prev) => {
      const currentQty = prev[addonId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      if (newQty === 0) {
        const { [addonId]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [addonId]: newQty };
    });
  };

  // Calculate total for display
  const addonsTotal = ADDONS.reduce((sum, addon) => {
    const qty = addons[addon.id] || 0;
    return sum + addon.price * qty;
  }, 0);

  const selectedCount = Object.values(addons).filter((qty) => qty > 0).length;

  return (
    <div className="screen addons-screen">
      {/* Header */}
      <div className="day-header-box">
        <h1 className="day-title">Small Add-ons. Big Impact.</h1>
        <div className="day-divider">
          <span className="diamond" />
          <span className="line" />
          <span className="diamond" />
        </div>
        <p className="day-subtitle">These tiny touches often make the difference between a ‘nice gift’ and a ‘wow gift’.</p>
      </div>

      {/* Main Content */}
      <div className="day-content addons-content">
        {/* Selected Items Summary */}
        {selectedCount > 0 && (
          <div className="selected-panel">
            <h3>Selected Add-ons</h3>
            <div className="items-list">
              {ADDONS.filter((addon) => addons[addon.id] > 0).map((addon) => (
                <div key={addon.id} className="item-pill">
                  <span className="item-text">
                    {addon.name} × {addons[addon.id]} — ₹{addon.price * addons[addon.id]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-ons Grid */}
        <div className="products-grid addons-grid">
          {ADDONS.map((addon) => {
            const qty = addons[addon.id] || 0;
            return (
              <div
                key={addon.id}
                className={`product-card addon-card ${qty > 0 ? 'selected' : ''}`}
              >
                <div className="product-image">
                  <img src={addon.image} alt={addon.name} />
                </div>
                <h4>{addon.name}</h4>
                <p className="product-price">₹{addon.price}</p>
                <div className="qty-control">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => handleQtyChange(addon.id, -1)}
                    disabled={qty === 0}
                  >
                    −
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => handleQtyChange(addon.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="day-footer addons-footer">
        <div className="day-total-box">
          <span className="total-label">Add-ons Total:</span>
          <span className="total-value">₹{addonsTotal}</span>
        </div>
        <div className="day-nav-buttons">
          <button className="day-back-btn" onClick={onBack}>
            &lt; Back
          </button>
          {selectedCount === 0 ? (
            <button className="day-next-btn skip-btn" onClick={onSkip}>
              Skip &gt;
            </button>
          ) : (
            <button className="day-next-btn" onClick={onContinue}>
              Continue &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
