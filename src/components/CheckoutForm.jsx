import React, { useState } from 'react';
import { SURPRISE_FREEBIE } from '../data/catalog';

export default function CheckoutForm({ totalPrice, deliveryCharge, onSubmit, onBack, onFreebieAdd, onFreebieRemove, orderType = 'hamper' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    pincode: '',
    giftMessage: '',
  });

  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();
    if (orderType === 'bouquets') {
      if (trimmedCode === 'BLOOM10') {
        const discount = Math.round(totalPrice * 0.1);
        setAppliedCouponCode('BLOOM10');
        setIsCouponApplied(true);
        setCouponDiscount(discount);
        setCouponMessage('🎉 10% discount applied!');
      } else {
        setIsCouponApplied(false);
        setCouponDiscount(0);
        setCouponMessage('Invalid coupon code');
      }
      return;
    }

    if (trimmedCode.endsWith('LOVE14')) {
      setAppliedCouponCode(couponCode.trim());
      setIsCouponApplied(true);
      setCouponMessage('🎉 Surprise freebie added to your order!');
      if (onFreebieAdd) {
        onFreebieAdd(SURPRISE_FREEBIE);
      }
    } else {
      setIsCouponApplied(false);
      setCouponMessage('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedCouponCode('');
    setIsCouponApplied(false);
    setCouponMessage('');
    setCouponDiscount(0);
    if (orderType !== 'bouquets' && onFreebieRemove) {
      onFreebieRemove();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = 'Valid phone number required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6)
      newErrors.pincode = 'Valid pincode required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        couponCode: appliedCouponCode,
        couponDiscount,
      });
    }
  };

  const subtotal = totalPrice;
  const finalTotal = subtotal - couponDiscount + deliveryCharge;

  return (
    <div className="screen checkout-screen">
      <div className="day-header-box">
        <h1 className="day-title">Delivery Details</h1>
        <div className="day-divider">
          <span className="line"></span>
          <span className="diamond"></span>
          <span className="line"></span>
        </div>
        <div className="day-subtitle">Please provide your delivery details</div>
      </div>
      <div className="checkout-container">

        {/* Price Summary */}
        <div className="price-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          {isCouponApplied && (
            orderType === 'bouquets' ? (
              <div className="summary-row discount-row">
                <span>Coupon (BLOOM10) - 10%:</span>
                <span>-₹{couponDiscount}</span>
              </div>
            ) : (
              <div className="summary-row freebie-added">
                <span>🎁 Surprise Freebie:</span>
                <span>FREE</span>
              </div>
            )
          )}
          {deliveryCharge > 0 && (
            <div className="summary-row">
              <span>Delivery Charge:</span>
              <span>₹{deliveryCharge}</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>

        <div className="coupon-section">
          <h3>Have a Coupon Code?</h3>
          <div className="coupon-input-group">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder={orderType === 'bouquets' ? 'Enter Coupon Code' : 'Enter coupon code'}
              className="coupon-input"
              disabled={isCouponApplied}
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="btn btn-apply"
              disabled={isCouponApplied}
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <p className={`coupon-message ${isCouponApplied ? 'success' : 'error'}`}>
              {couponMessage}
            </p>
          )}
          {isCouponApplied && (
            <p className="remove-coupon" onClick={handleRemoveCoupon}>
              Remove coupon
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit number"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your city"
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address"
              rows="3"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode *</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
            />
            {errors.pincode && <span className="error">{errors.pincode}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="giftMessage">Gift Message</label>
            <textarea
              id="giftMessage"
              name="giftMessage"
              value={formData.giftMessage}
              onChange={handleChange}
              placeholder="Personal message for the recipient (optional)"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Continue to Order Summary
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
