import React, { useState } from 'react';

export default function CheckoutForm({ totalPrice, deliveryCharge, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    pincode: '',
    giftMessage: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
      onSubmit(formData);
    }
  };

  const finalTotal = totalPrice + deliveryCharge;

  return (
    <div className="screen checkout-screen">
      <div className="checkout-container">
        <h1>Delivery Details</h1>

        {/* Price Summary */}
        <div className="price-summary">
          <div className="summary-row">
            <span>Items Total:</span>
            <span>₹{totalPrice}</span>
          </div>
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBack}
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Continue to Order Summary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
