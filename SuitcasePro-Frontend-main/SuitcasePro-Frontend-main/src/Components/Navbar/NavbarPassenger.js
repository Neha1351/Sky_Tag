import React from "react";
import "../../assets/css/navbarnolog.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import suitlogo from "../../assets/img/luggageicon.png";
import axiosInstance from "../baseurl";

const NavbarPassenger = () => {
  const deletefn = () => {
    let x = prompt("Are you sure you want to delete? (Yes/No) ");
    if (x.toLowerCase() == "yes") {
      axiosInstance
        .post(`/deletepassenger/${localStorage.getItem("passlogid")}`)
        .then((res) => {
          console.log(res);
          alert("Deleted your profile");
          localStorage.clear();
          window.location.reload(false);

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("did not delete");
    }
  };

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
    <div>
      <header
        id="header"
        className={`header fixed-top ${colorChange}`}
        data-scrollto-offset="0"
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link
            to="/PassengerHome"
            className="logo d-flex align-items-center nav-link scrollto me-auto me-lg-0"
          >
            <h1>Suitcase Pro</h1>
            <img src={suitlogo} alt="logo" />
          </Link>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link className="nav-link scrollto" to="/PassengerHome">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/BookFlight">
                  Flights
                </Link>
              </li>
              <li className="dropdown">
                <Link className="nav-link scrollto" to="/PassengerHome">
                  <span>Tickets</span>{" "}
                </Link>
                <ul>
                  <li>
                    <Link className="nav-link scrollto" to="/TrackFlight">
                      Verify Tickets
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link scrollto" to="/MyTickets">
                      My Tickets
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <Link className="nav-link scrollto" to="/PassengerHome">
                  <span>Suitcase</span>{" "}
                </Link>
                <ul>
                  <li>
                    <Link className="nav-link scrollto" to="/AddLuggage">
                      Add Luggages
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link scrollto" to="/MyLuggages">
                     My Luggages
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <Link className="nav-link scrollto" to="/PassengerHome">
                  <span>Track</span>{" "}
                </Link>
                <ul>
                  <li>
                    <Link className="nav-link scrollto" to="/TrackFlight">
                      Flight QR
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link scrollto" to="/TrackLuggage">
                      Luggage QR
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <Link className="nav-link scrollto" to="/PassengerHome">
                  <span>Profile</span>{" "}
                </Link>
                <ul>
                  <li>
                    <Link className="nav-link scrollto" to="/passengerProfile">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link scrollto" to="/EditProfile">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link scrollto" onClick={deletefn}>
                      Delete Account
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="nav-link scrollto" to="/about">
                  About
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
  );
};

export default NavbarPassenger;
