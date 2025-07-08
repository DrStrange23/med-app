import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleClick = () => setClick((prev) => !prev);

  const handleLogout = () => {
    // Limpia sessionStorage y localStorage
    ["auth-token", "name", "email", "phone"].forEach((key) =>
      sessionStorage.removeItem(key)
    );
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("reviewFormData_") || key === "doctorData") {
        localStorage.removeItem(key);
      }
    });

    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setIsLoggedIn(true);
      // Extrae lo que hay antes de la "@"
      setUserName(storedEmail.split("@")[0]);
    }
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
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>

        {isLoggedIn ? (
          <>
            {/* Usuario logueado: muestra nombre y Logout */}
            <li className="nav__user">Hola, <strong>{userName}</strong></li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;