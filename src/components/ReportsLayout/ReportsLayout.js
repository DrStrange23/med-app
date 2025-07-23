import React, { useState } from 'react';
import './ReportsLayout.css';

export default function ReportsLayout() {
  const [reports] = useState([
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      doctorSpeciality: 'Cardiología',
      viewUrl: '/Reports/The_patient_report.pdf',
      downloadUrl: '/Reports/The_patient_report.pdf'
    },
    {
      id: 2,
      doctorName: 'Dra. Jane Smith',
      doctorSpeciality: 'Dermatología',
      viewUrl: '/Reports/patient_report.pdf',
      downloadUrl: '/Reports/patient_report.pdf'
    },
    // …más reportes…
  ]);

  const handleView = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="review-form__container">
      <h2>Reports</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr className="no-data">
              <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                No reports available.
              </td>
            </tr>
          ) : (
            reports.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.doctorName}</td>
                <td>{r.doctorSpeciality}</td>
                <td>
                  <button
                    type="button"
                    className="btn-feedback"
                    onClick={() => handleView(r.viewUrl)}
                  >
                    View Report
                  </button>
                </td>
                <td>
                  <a
                    href={r.downloadUrl}
                    download
                    className="btn-feedback"
                  >
                    Download Report
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}