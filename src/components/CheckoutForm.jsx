import React, { useState, useEffect, useMemo } from 'react';
import { SURPRISE_FREEBIE } from '../data/catalog';
import { calculateDeliveryCharge, DELIVERY_CHARGES } from '../utils/deliveryCharge';

export default function CheckoutForm({ 
  totalPrice, 
  onSubmit, 
  onBack, 
  onFreebieAdd, 
  onFreebieRemove, 
  orderType = 'hamper',
  initialFormData = null,
  onDeliveryChargeChange,
}) {
  const [formData, setFormData] = useState(() => {
    const base = initialFormData || {};
    const nameParts = base.name ? base.name.trim().split(/\s+/) : [];
    const firstName = base.firstName || nameParts[0] || '';
    const lastName = base.lastName || nameParts.slice(1).join(' ') || '';

    return {
      firstName,
      lastName,
      email: base.email || '',
      phone: base.phone || '',
      city: base.city || '',
      address: base.address || '',
      pincode: base.pincode || '',
      giftMessage: base.giftMessage || '',
    };
  });

  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Calculate delivery charge dynamically based on city and pincode
  const deliveryInfo = useMemo(() => {
    return calculateDeliveryCharge(formData.city, formData.pincode);
  }, [formData.city, formData.pincode]);

  const deliveryCharge = deliveryInfo.charge;

  // Notify parent of delivery charge changes
  useEffect(() => {
    if (onDeliveryChargeChange) {
      onDeliveryChargeChange(deliveryCharge);
    }
  }, [deliveryCharge, onDeliveryChargeChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();

    // Bouquets flow: only BLOOM10 coupon
    if (orderType === 'bouquets') {
      if (trimmedCode === 'BLOOM10') {
        const discount = Math.round(totalPrice * 0.1);
        setAppliedCouponCode('BLOOM10');
        setIsCouponApplied(true);
        setCouponDiscount(discount);
        setCouponMessage('🎉 10% discount applied!');
      } else {
        setAppliedCouponCode('');
        setIsCouponApplied(false);
        setCouponDiscount(0);
        setCouponMessage('Invalid coupon code');
      }
      return;
    }

    // Readymade hampers flow: only EARLYBIRD5 coupon
    if (orderType === 'readymade-hampers') {
      if (trimmedCode === 'EARLYBIRD5') {
        setAppliedCouponCode(trimmedCode);
        setIsCouponApplied(true);
        const discount = Math.round(totalPrice * 0.05);
        setCouponDiscount(discount);
        setCouponMessage('🎉 5% discount applied!');
      } else {
        setAppliedCouponCode('');
        setIsCouponApplied(false);
        setCouponDiscount(0);
        setCouponMessage('Invalid coupon code');
      }
      return;
    }

    // Create your hamper flow: EARLYBIRD5 or LOVE14 coupons
    if (trimmedCode === 'EARLYBIRD5') {
      setAppliedCouponCode(trimmedCode);
      setIsCouponApplied(true);
      const discount = Math.round(totalPrice * 0.05);
      setCouponDiscount(discount);
      setCouponMessage('🎉 5% discount applied!');
      if (onFreebieRemove) onFreebieRemove();
    } else if (trimmedCode.endsWith('LOVE14')) {
      setAppliedCouponCode(trimmedCode);
      setIsCouponApplied(true);
      setCouponDiscount(0);
      setCouponMessage('🎉 Surprise freebie added to your order!');
      if (onFreebieAdd) {
        onFreebieAdd(SURPRISE_FREEBIE);
      }
    } else {
      setAppliedCouponCode('');
      setIsCouponApplied(false);
      setCouponDiscount(0);
      setCouponMessage('Invalid coupon code');
      if (onFreebieRemove) onFreebieRemove();
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
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
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
        deliveryCharge,
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
            couponDiscount > 0 ? (
              <div className="summary-row discount-row">
                <span>Coupon ({appliedCouponCode}):</span>
                <span>-₹{couponDiscount}</span>
              </div>
            ) : (
              <div className="summary-row freebie-added">
                <span>🎁 Surprise Freebie:</span>
                <span>FREE</span>
              </div>
            )
          )}
          {formData.city.trim() ? (
            <>
              <div className={`summary-row ${deliveryInfo.isLocal ? 'local-delivery' : 'outstation-delivery'}`}>
                <span>Delivery Charge:</span>
                <span>₹{deliveryCharge}</span>
              </div>
              {deliveryInfo.message && (
                <div className={`delivery-info-message ${deliveryInfo.isLocal ? 'local' : 'outstation'}`}>
                  {deliveryInfo.isLocal ? '✓ ' : 'ℹ️ '}{deliveryInfo.message}
                </div>
              )}
            </>
          ) : (
            <div className="summary-row pending-delivery">
              <span>Delivery Charge:</span>
              <span className="pending-text">Enter city to calculate</span>
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
              onChange={(e) => {
                setCouponCode(e.target.value);
                if (couponMessage) setCouponMessage('');
              }}
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
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
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
            {formData.city && !errors.city && (
              <span className={`delivery-hint ${deliveryInfo.isLocal ? 'local' : 'outstation'}`}>
                {deliveryInfo.isLocal 
                  ? `✓ Local delivery available - ₹${DELIVERY_CHARGES.LOCAL}` 
                  : `ℹ️ Outstation delivery - ₹${DELIVERY_CHARGES.OUTSTATION}`}
              </span>
            )}
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
