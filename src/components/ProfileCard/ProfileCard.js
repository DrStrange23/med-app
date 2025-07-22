import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

export default function ProfileCard() {
  return (
    <ul className="profile-card-menu">
      <li>
        <Link to="/profile">Your Profile</Link>
      </li>
      <li>
        <Link to="/reports">Your Reports</Link>
      </li>
    </ul>
  );
}