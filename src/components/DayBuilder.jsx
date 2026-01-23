import React, { useEffect, useState } from 'react';

export default function DayBuilder({
  day,
  selectedItems,
  onSelectProduct,
  onRemoveItem,
  totalPrice,
  onNext,
  onSkip,
  isLastDay,
}) {
  const [selected, setSelected] = useState(new Set(selectedItems.map((item) => item.id)));

  useEffect(() => {
    setSelected(new Set(selectedItems.map((item) => item.id)));
  }, [selectedItems, day.id]);

  const handleSelectProduct = (product) => {
    if (selected.has(product.id)) {
      selected.delete(product.id);
      onRemoveItem(product.id);
    } else {
      selected.add(product.id);
      onSelectProduct(product);
    }
    setSelected(new Set(selected));
  };

  return (
    <div className="screen day-builder-screen">
      {/* Header */}
      <div className="day-header">
        <h1>{day.name}</h1>
        <p className="day-date">{day.date}</p>
      </div>

      {/* Main Content */}
      <div className="day-content">
        {/* Selected Items Panel */}
        {selectedItems.length > 0 && (
          <div className="selected-panel">
            <h3>Selected Items</h3>
            <div className="items-list">
              {selectedItems.map((item) => (
                <div key={item.id} className="item-pill">
                  <span className="item-text">
                    {item.name} - ₹{item.price}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => handleSelectProduct(item)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {day.products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                selected.has(product.id) ? 'selected' : ''
              }`}
            >
              <div className="product-image">{product.image}</div>
              <h4>{product.name}</h4>
              <p className="product-price">₹{product.price}</p>
              <button
                className={`product-select-btn ${
                  selected.has(product.id) ? 'selected' : ''
                }`}
                onClick={() => handleSelectProduct(product)}
              >
                {selected.has(product.id) ? '✓ Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky-footer">
        <div className="footer-content">
          <div className="total-section">
            <span>Total Price:</span>
            <span className="total-amount">₹{totalPrice}</span>
          </div>
          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={onSkip}>
              Skip Day
            </button>
            <button className="btn btn-primary" onClick={onNext}>
              {isLastDay ? 'Proceed to Checkout' : 'Next Day'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
