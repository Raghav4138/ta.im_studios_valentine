import React from 'react';

export default function HamperCard({ hamper, onViewDetails }) {
  return (
    <div className="hamper-card" onClick={() => onViewDetails(hamper)}>
      <div className="hamper-card-image">
        <img src={hamper.image} alt={hamper.name} />
      </div>
      <div className="hamper-card-content">
        <h3 className="hamper-card-name">{hamper.name}</h3>
        <p className="hamper-card-description">{hamper.description}</p>
        <p className="hamper-card-price">₹{hamper.price}</p>
        <button className="btn btn-view-details">View Details</button>
      </div>
    </div>
  );
}
