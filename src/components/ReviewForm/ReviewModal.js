import React, { useState } from 'react';
import './ReviewModal.css';

export default function ReviewModal({ review, onClose, onSave }) {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = e => {
    e.preventDefault();
    onSave(review.id, feedback);
  };

  return (
    <div className="rm-overlay" onClick={onClose}>
      <div className="rm-card" onClick={e => e.stopPropagation()}>
        <h3>Give Your Feedback</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={review.doctorName} readOnly />

          <label>Review:</label>
          <textarea
            rows="4"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
          />

          <label>Rating:</label>
          <div className="rm-stars">
            {[1,2,3,4,5].map(n => (
              <span
                key={n}
                className={n <= rating ? 'star filled' : 'star'}
                onClick={() => setRating(n)}
              >★</span>
            ))}
          </div>

          <button type="submit" className="rm-btn-save">Submit</button>
          <button type="button" className="rm-btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}