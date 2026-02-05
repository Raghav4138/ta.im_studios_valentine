import React from 'react';
import { VALENTINE_DAYS, ADDONS } from '../data/catalog';

const WHATSAPP_NUMBER = '+91 9569941138';

export default function OrderSummary({
  answers,
  selectedItems,
  selectedItemsByDay,
  orderDays = VALENTINE_DAYS,
  orderType = 'hamper',
  totalPrice,
  deliveryCharge,
  formData,
  freebieItem,
  addons = {},
  onEdit,
  onBack,
}) {
  const couponDiscount = formData?.couponDiscount || 0;
  const finalTotal = totalPrice - couponDiscount + deliveryCharge;
  const fullName = [formData?.firstName, formData?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim() || formData?.name || '';

  // Get selected addons with quantities
  const selectedAddons = ADDONS.filter((addon) => addons[addon.id] > 0).map((addon) => ({
    ...addon,
    qty: addons[addon.id],
  }));

  const generateWhatsAppMessage = () => {
    // Build addons section for WhatsApp message
    const addonsSection = selectedAddons.length > 0
      ? `\n\nAdd-ons:\n${selectedAddons.map((addon) => `• ${addon.name} × ${addon.qty} — ₹${addon.price * addon.qty}`).join('\n')}`
      : '';

    // Special handling for readymade hampers
    if (orderType === 'readymade-hampers' && selectedItems.length > 0) {
      const hamper = selectedItems[0];
      const itemsList = `${hamper.name} - ₹${hamper.price}\n\nIncludes:\n${hamper.includedItems.map((item) => `• ${item}`).join('\n')}`;

      const giftMessage = formData.giftMessage
        ? `\n\nGift Message: "${formData.giftMessage}"`
        : '';

      const discountInfo =
        couponDiscount > 0
          ? `\nCoupon (${formData.couponCode}): -₹${couponDiscount}`
          : '';

      const totalLine = `Subtotal: ₹${totalPrice}${discountInfo}${deliveryCharge > 0 ? `\nDelivery: ₹${deliveryCharge}` : '\nDelivery: Free (Bathinda)'}`;
      const emailLine = formData.email ? `\nEmail: ${formData.email}` : '';

      const message = `Hello, I want to order a Readymade Hamper from Taim Studios.

Selected Hamper:
${itemsList}${addonsSection}

    Name: ${fullName}
Phone: ${formData.phone}
    ${emailLine}
City: ${formData.city}
Address: ${formData.address}
Pincode: ${formData.pincode}

${totalLine}
Total Payable: ₹${finalTotal}${giftMessage}

Please confirm.`;

      return encodeURIComponent(message);
    }

    // Existing logic for other flows
    const selectedLines = orderDays.map((day) => {
      const items = selectedItemsByDay[day.id] || [];
      if (!items.length) return null;
      const joined = items
        .map((item) => {
          if (item.isChocolateVariant) {
            return `${item.name} (₹${item.price}) (${item.qty}pcs)`;
          }
          return `${item.name} - ₹${item.price}`;
        })
        .join(' + ');
      return `${day.name}: ${joined}`;
    }).filter(Boolean);

    const itemsList = selectedLines.length
      ? selectedLines.join('\n')
      : 'No items selected';

    const giftMessage = formData.giftMessage
      ? `\n\nGift Message: "${formData.giftMessage}"`
      : '';

    const freebieInfo = freebieItem
      ? `\n\nSurprise Freebie: ${freebieItem.name} - FREE!\nCOUPON APPLIED: ${formData.couponCode}`
      : '';

    const discountInfo =
      couponDiscount > 0
        ? `\nCoupon (${formData.couponCode}): -₹${couponDiscount}`
        : '';

    const totalLine = `Subtotal: ₹${totalPrice}${discountInfo}${deliveryCharge > 0 ? `\nDelivery: ₹${deliveryCharge}` : '\nDelivery: Free (Bathinda)'}`;

    let headerLine;
    if (orderType === 'bouquets') {
      headerLine = 'Hello, I want to order a Bouquet from Taim Studios.';
    } else {
      headerLine = 'Hello, I want to order a Valentine Hamper from Taim Studios.';
    }

    const preferences =
      orderType === 'bouquets' || orderType === 'readymade-hampers'
        ? ''
        : `
For: ${answers.gender}
Age: ${answers.age}
Vibe: ${answers.vibe}
`;
    const emailLine = formData.email ? `\nEmail: ${formData.email}` : '';

    const message = `${headerLine}${preferences}
Selected Items:
${itemsList}${addonsSection}

  Name: ${fullName}
Phone: ${formData.phone}
  ${emailLine}
City: ${formData.city}
Address: ${formData.address}
Pincode: ${formData.pincode}

${totalLine}
Total Payable: ₹${finalTotal}${giftMessage}${freebieInfo}

Please confirm.`;

    return encodeURIComponent(message);
  };

  const whatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\s+/g, '')}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="screen order-summary-screen">
      <div className="day-header-box">
        <h1 className="day-title">Order Summary</h1>
        <div className="day-divider">
          <span className="line"></span>
          <span className="diamond"></span>
          <span className="line"></span>
        </div>
        <div className="day-subtitle">Review your order details</div>
      </div>
      <div className="summary-container">

        {/* Customer Details */}
        <div className="summary-section">
          <h3>Delivery To</h3>
          <div className="summary-box">
            <p>
              <strong>{fullName}</strong>
            </p>
            <p>{formData.address}</p>
            <p>
              {formData.city} - {formData.pincode}
            </p>
            <p>📱 {formData.phone}</p>
            {formData.email && <p>✉️ {formData.email}</p>}
          </div>
        </div>

        {/* Preferences - only for create your hamper flow */}
        {orderType === 'hamper' && (
          <div className="summary-section">
            <h3>Your Preferences</h3>
            <div className="summary-box">
              <p>For: <strong>{answers.gender}</strong></p>
              <p>Age: <strong>{answers.age}</strong></p>
            </div>
          </div>
        )}

        {/* Items - different display for readymade hampers */}
        {orderType === 'readymade-hampers' && selectedItems.length > 0 ? (
          <div className="summary-section">
            <h3>Selected Hamper</h3>
            <div className="summary-box items-box">
              <div className="summary-item hamper-item">
                <span className="hamper-name">{selectedItems[0].name}</span>
                <span className="price">₹{selectedItems[0].price}</span>
              </div>
              <div className="hamper-includes">
                <p className="includes-label">Includes:</p>
                <ul className="includes-list-summary">
                  {selectedItems[0].includedItems.map((item, idx) => (
                    <li key={idx}>💝 {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="summary-section">
            <h3>Selected Items ({selectedItems.length + selectedAddons.length + (freebieItem ? 1 : 0)})</h3>
            <div className="summary-box items-box">
              {selectedItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>
                    {item.isChocolateVariant
                      ? `${item.name} (₹${item.price}) (${item.qty}pcs)`
                      : item.name}
                  </span>
                  <span className="price">
                    ₹{item.isChocolateVariant ? item.price * item.qty : item.price}
                  </span>
                </div>
              ))}
              {selectedAddons.map((addon) => (
                <div key={addon.id} className="summary-item addon-item">
                  <span>{addon.name} × {addon.qty}</span>
                  <span className="price">₹{addon.price * addon.qty}</span>
                </div>
              ))}
              {freebieItem && (
                <div key={freebieItem.id} className="summary-item freebie-item freebie-enter">
                  <span className="freebie-name">
                    {freebieItem.name}
                    <span className="freebie-badge">FREE</span>
                  </span>
                  <span className="price freebie-price">₹{freebieItem.price}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add-ons for readymade hampers flow */}
        {orderType === 'readymade-hampers' && selectedAddons.length > 0 && (
          <div className="summary-section">
            <h3>Add-ons ({selectedAddons.length})</h3>
            <div className="summary-box items-box">
              {selectedAddons.map((addon) => (
                <div key={addon.id} className="summary-item addon-item">
                  <span>{addon.name} × {addon.qty}</span>
                  <span className="price">₹{addon.price * addon.qty}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gift Message */}
        {formData.giftMessage && (
          <div className="summary-section">
            <h3>Gift Message</h3>
            <div className="summary-box">
              <p className="gift-message">"{formData.giftMessage}"</p>
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="summary-section">
          <h3>Total Amount</h3>
          <div className="summary-box price-box">
            <div className="price-detail">
              <span>Subtotal:</span>
              <span>₹{totalPrice}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="price-detail">
                <span>Coupon ({formData.couponCode}):</span>
                <span>-₹{couponDiscount}</span>
              </div>
            )}
            {deliveryCharge > 0 && (
              <div className="price-detail">
                <span>Delivery Charge:</span>
                <span>₹{deliveryCharge}</span>
              </div>
            )}
            <div className="price-detail total">
              <span>Final Total:</span>
              <span className="final-total">₹{finalTotal}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="summary-actions">
          <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            Place Order on WhatsApp
          </a>
          <button className="btn btn-secondary" onClick={onEdit}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
