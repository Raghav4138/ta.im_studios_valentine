import React from 'react';
import { VALENTINE_DAYS } from '../data/catalog';

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
  onEdit,
  onBack,
}) {
  const couponDiscount = formData?.couponDiscount || 0;
  const finalTotal = totalPrice - couponDiscount + deliveryCharge;

  const generateWhatsAppMessage = () => {
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

    const headerLine =
      orderType === 'bouquets'
        ? 'Hello, I want to order a Bouquet from Taim Studios.'
        : 'Hello, I want to order a Valentine Hamper from Taim Studios.';

    const preferences =
      orderType === 'bouquets'
        ? ''
        : `
For: ${answers.gender}
Age: ${answers.age}
Vibe: ${answers.vibe}
`;

    const message = `${headerLine}${preferences}
Selected Items:
${itemsList}

Name: ${formData.name}
Phone: ${formData.phone}
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
              <strong>{formData.name}</strong>
            </p>
            <p>{formData.address}</p>
            <p>
              {formData.city} - {formData.pincode}
            </p>
            <p>📱 {formData.phone}</p>
          </div>
        </div>

        {/* Preferences */}
        {orderType !== 'bouquets' && (
          <div className="summary-section">
            <h3>Your Preferences</h3>
            <div className="summary-box">
              <p>For: <strong>{answers.gender}</strong></p>
              <p>Age: <strong>{answers.age}</strong></p>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="summary-section">
          <h3>Selected Items ({selectedItems.length + (freebieItem ? 1 : 0)})</h3>
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
