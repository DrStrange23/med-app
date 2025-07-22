import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import './ReviewForm.css';

export default function ReviewForm() {
  const [reviews] = useState([
    { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiología' },
    { id: 2, doctorName: 'Dra. Jane Smith', speciality: 'Dermatología' },
  ]);

  const [reviewState, setReviewState] = useState({});
  const [modalReview, setModalReview] = useState(null);

  const openModal = rev => {
    if (!reviewState[rev.id]?.submitted) {
      setModalReview(rev);
    }
  };
  const closeModal = () => setModalReview(null);

  const saveReview = (id, feedback) => {
    setReviewState(prev => ({
      ...prev,
      [id]: { submitted: true, feedback }
    }));
    closeModal();
  };

  return (
    <div className="review-form__container">
      <h2>Reseñas de doctores</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>S.No.</th><th>Doctor Name</th><th>Doctor Speciality</th>
            <th>Provide Review</th><th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev, i) => {
            const state = reviewState[rev.id] || { submitted: false, feedback: '' };
            return (
              <tr key={rev.id}>
                <td>{i+1}</td>
                <td>{rev.doctorName}</td>
                <td>{rev.speciality}</td>
                <td>
                  <button
                    className="btn-feedback"
                    onClick={() => openModal(rev)}
                    disabled={state.submitted}
                  >
                    {state.submitted ? '✔ Enviado' : 'Haz clic aquí'}
                  </button>
                </td>
                <td>
                  {state.submitted ? state.feedback : 'Pendiente'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalReview && (
        <ReviewModal
          review={modalReview}
          onClose={closeModal}
          onSave={saveReview}
        />
      )}
    </div>
  );
}