import React from "react";
import "../../assets/css/navbarnolog.css";
import { useState, useEffect } from "react";
import { Link,  } from "react-router-dom";
import suitlogo from "../../assets/img/luggageicon.png";

const NavbarAdmin = () => {




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

  useEffect(() => {
    const handleDropdownClick = (event) => {
      const mobileNavActive = document.querySelector(".mobile-nav-active");
      if (mobileNavActive) {
        event.preventDefault();
        const currentElement = event.currentTarget;
        currentElement.classList.toggle("active");
        currentElement.nextElementSibling.classList.toggle("dropdown-active");
      }
    };

    const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");
    navDropdowns.forEach((el) =>
      el.addEventListener("click", handleDropdownClick)
    );

    return () => {
      navDropdowns.forEach((el) =>
        el.removeEventListener("click", handleDropdownClick)
      );
    };
  }, []);

  return (
    <>
      <div>
        <header
          id="header"
          className={`header fixed-top ${colorChange}`}
          data-scrollto-offset="0"
        >
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <Link
              to="/AdminHome"
              className="logo d-flex align-items-center scrollto me-auto me-lg-0"
              style={{ textDecoration: "none" }}
            >
              <h1>Suitcase Admin</h1>
              <img src={suitlogo} alt="logo" />
            </Link>

            <nav id="navbar" className="navbar">
              <ul >
                <li>
                  <Link  className="nav-link scrollto" to="/AdminHome">
                    Home
                  </Link> 
                </li>
                <li className="dropdown">
                  <Link className="nav-link scrollto" to="/AdminHome">
                    <span>Airport</span>{" "}
                  </Link>
                  <ul>
                    <li>
                      <Link className="nav-link scrollto" to="/airportRegister">Register New</Link>
                    </li>
                    <li>
                      <Link className="nav-link scrollto" to="/viewAirports">Airports</Link>
                    </li>
              
                  </ul>
                </li>
                <li className="dropdown">
                  <Link className="nav-link scrollto" to="/AdminHome">
                    <span>Flight</span>{" "}
                  </Link>
                  <ul>
                    <li>
                      <Link className="nav-link scrollto" to="/addFlight">Chart a Flight</Link>
                    </li>
                    <li>
                      <Link className="nav-link scrollto" to="/viewFlight">Flight Schedules</Link>
                    </li>
              
                  </ul>
                </li>
                <li className="dropdown">
                  <Link className="nav-link scrollto" to="/AdminHome">
                    <span>Passenger</span>{" "}
                  </Link>
                  <ul>
                    <li>
                      <Link className="nav-link scrollto" to="/viewPassengers">Passenger</Link>
                    </li>
                    <li>
                      <Link className="nav-link scrollto" to="/FlyersBooked">Flyers Booked</Link>
                    </li>
              
                  </ul>
                </li>
                
                
                <li>
                  <Link className="nav-link scrollto" to="/viewStaffAdmin">
                    Staff
                  </Link>
                </li>
              </ul>
              <i
                className="bi bi-list mobile-nav-toggle d-none"
                onClick={mobNav}
              ></i>
            </nav>

            <Link
              className="btn-getstarted scrollto"
              onClick={() => {
                localStorage.clear();
                alert("Logged out");
                window.location.reload(false);
              }}
            >
              Logout <i className="bi bi-box-arrow-right"></i>
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavbarAdmin;
