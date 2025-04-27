import React from "react";
import "../../assets/css/navbarnolog.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import suitlogo from "../../assets/img/luggageicon.png";

const Navbarnolog = () => {
  const [colorChange, setColorchange] = useState("");
  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setColorchange("sticked");
    } else {
      setColorchange("");
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const mobNav = (e) => {
    console.log("clicked");
    e.preventDefault();
    document.querySelector("body").classList.toggle("mobile-nav-active");
    e.target.classList.toggle("bi-list");
    e.target.classList.toggle("bi-x");
    
  };

  return (
    <div>
      <header
        id="header"
        className={`header fixed-top ${colorChange}`}
        data-scrollto-offset="0"
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link
            to="/home"
            className="logo d-flex align-items-center scrollto me-auto me-lg-0"
            style={{textDecoration:"none"}}
          >
            <h1>SkyTag</h1>
            <img src={suitlogo} alt="logo" />
          </Link>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto" to="/home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="#">
                  About Us
                </Link>
              </li>
            </ul>
            <i
              className="bi bi-list mobile-nav-toggle d-none"
              onClick={mobNav}
            ></i>
          </nav>

          <Link className="btn-getstarted scrollto" to="/Login">
            Login <i className="bi bi-box-arrow-in-right"></i>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbarnolog;
