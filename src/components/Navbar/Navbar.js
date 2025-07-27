import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from '../ProfileCard/ProfileCard';
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClick = () => setClick(prev => !prev);

  const handleLogout = () => {
    ["auth-token", "name", "email", "phone"].forEach(key =>
      sessionStorage.removeItem(key)
    );
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("reviewFormData_") || key === "doctorData") {
        localStorage.removeItem(key);
      }
    });
    setIsLoggedIn(false);
    setUserName("");
    setShowProfile(false);
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setIsLoggedIn(true);
      setUserName(storedEmail.split("@")[0]);
      setUserEmail(storedEmail);
      setUserPhone(sessionStorage.getItem("phone") || "");
    }
  }, []);

  // Cierra el dropdown si haces click fuera
  useEffect(() => {
    const onClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i className="fa fa-user-md" style={{ color: "#2190FF" }} />
        </Link>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"} />
      </div>

      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/BookingConsultation">Appointments</Link></li>
        <li className="link"><Link to="/healthblog">Health Blog</Link></li>
        <li className="link"><Link to="/Reviews">Reviews</Link></li>

        {isLoggedIn ? (
          <>
            {/* Saludo dispara el ProfileCard */}
            <li className="nav__user profile-dropdown" ref={dropdownRef} >
              <span
                onClick={() => setShowProfile(v => !v)}
                style={{ cursor: 'pointer' }}
              >
                Welcome, <strong>{userName}</strong>
              </span>

              {showProfile && (
                <ul className="profile-dropdown-menu">
                <li>
                  <Link to="/profile">Your Profile</Link>
                </li>
                <li>
                  <Link to="/reports">Your Reports</Link>
                </li>
              </ul>
            )}
            </li>

            {/* Logout */}
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup"><button className="btn1">Sign Up</button></Link>
            </li>
            <li className="link">
              <Link to="/login"><button className="btn1">Login</button></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
