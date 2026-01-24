import React, { useEffect, useState } from 'react';

export default function DayBuilder({
  day,
  selectedItems,
  onSelectProduct,
  onRemoveItem,
  totalPrice,
  onNext,
  onBack,
  isLastDay,
}) {
  const [selected, setSelected] = useState(new Set(selectedItems.map((item) => item.id)));

  useEffect(() => {
    setSelected(new Set(selectedItems.map((item) => item.id)));
  }, [selectedItems, day.id]);

  const handleSelectProduct = (product) => {
    // For Valentine's Day, allow multiple selections
    if (day.isMultiSelect) {
      if (selected.has(product.id)) {
        selected.delete(product.id);
        onRemoveItem(product.id);
      } else {
        selected.add(product.id);
        onSelectProduct(product);
      }
      setSelected(new Set(selected));
    } else {
      // For other days, single selection
      if (selected.has(product.id)) {
        selected.delete(product.id);
        onRemoveItem(product.id);
      } else {
        // Clear previous selection
        selected.clear();
        selected.add(product.id);
        setSelected(new Set(selected));
        onSelectProduct(product);
      }
    }
  };

  const isValentinesDay = day.isMultiSelect;

  return (
    <div className="screen day-builder-screen">
      {/* Header */}
      <div className="day-header-box">
        <img src="/logo.png" alt="Logo" className="day-logo" />
        <h1 className="day-title">{day.name}</h1>
        <div className="day-divider">
          <span className="diamond" />
          <span className="line" />
          <span className="diamond" />
        </div>
        <p className="day-subtitle">Say it With {day.name.split(' ')[0]}s</p>
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
        {isValentinesDay ? (
          // Valentine's Day - Show categories
          <div className="valentines-categories">
            {day.options.map((category) => (
              <div key={category.category} className="category-section">
                <h3 className="category-title">{category.category}</h3>
                <div className="products-grid">
                  {category.items.map((product) => (
                    <div
                      key={product.id}
                      className={`product-card ${
                        selected.has(product.id) ? 'selected' : ''
                      }`}
                    >
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
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
            ))}
          </div>
        ) : (
          // Regular days - Show flat product list
          <div className="products-grid">
            {day.options.map((product) => (
              <div
                key={product.id}
                className={`product-card ${
                  selected.has(product.id) ? 'selected' : ''
                }`}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
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
        )}
      </div>

      {/* Footer */}
      <div className="day-footer">
        <div className="day-total-box">
          <span className="total-label">Total Price:</span>
          <span className="total-value">₹{totalPrice}</span>
        </div>
        <div className="day-nav-buttons">
          <button className="day-back-btn" onClick={onBack}>
            &lt; Back
          </button>
          <button className="day-next-btn" onClick={onNext}>
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
