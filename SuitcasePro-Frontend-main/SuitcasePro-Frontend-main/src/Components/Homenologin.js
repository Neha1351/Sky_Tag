import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/homenologin.css";

const Homenologin = () => {
  return (
    <div>
      <section
        id="hero-fullscreen"
        className="hero-fullscreen d-flex align-items-center"
      >
        <div
          className="container d-flex flex-column align-items-center position-relative"
          data-aos="zoom-out"
        >
          <h2>
            Welcome to <span>Suitcase Pro</span>
          </h2>
          <p>Pack your dreams - Adventure awaits - Explore the world</p>
          <div className="d-flex">
            <Link to="/RegisterPassenger" className="btn-get-started scrollto">
              Flyer Register
            </Link>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="featured-services" className="featured-services">
          <div className="container">
            <div className="row gy-4">
              <div className="col-xl-3 col-md-6 d-flex" data-aos="zoom-out">
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-person-vcard"></i>
                  </div>
                  <h4>
                    <Link to="/Login" className="stretched-link homepg-card">
                      Passenger
                    </Link>
                  </h4>
                  <p>
                    We collaborate with reputable airlines to ensure reliable
                    and quality services. Our partnerships enable us to provide
                    you with comprehensive information on baggage policies,
                    restrictions, and airline contact details. We strive to keep
                    you informed and provide a seamless travel experience.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6 d-flex"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-airplane-engines"></i>
                  </div>
                  <h4>
                    <Link
                      to="/Login/AirportAuthority"
                      className="stretched-link homepg-card"
                    >
                      Airport Authority
                    </Link>
                  </h4>
                  <p>
                    Flight IMS offers a comprehensive flight management system
                    that allows you to search, compare, and book flights from
                    multiple airlines. With our platform, you have access to a
                    wide range of options to find the best flights that suit
                    your travel preferences and budget.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6 d-flex"
                data-aos="zoom-out"
                data-aos-delay="400"
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-briefcase-fill"></i>
                  </div>
                  <h4>
                    <Link
                      to="/Login/Staff"
                      className="stretched-link homepg-card"
                    >
                      Cargo
                    </Link>
                  </h4>
                  <p>
                    We prioritize user convenience and provide a seamless
                    booking experience. Our user-friendly interface makes it
                    easy to search for flights, select seat preferences, and
                    even reserve additional luggage space, all in just a few
                    simple steps.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6 d-flex"
                data-aos="zoom-out"
                data-aos-delay="600"
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-person-fill-gear"></i>
                  </div>
                  <h4>
                    <Link to="/Admin" className="stretched-link homepg-card">
                      Administrator
                    </Link>
                  </h4>
                  <p>
                    We are a team of passionate travelers and technology
                    enthusiasts who understand the importance of hassle-free
                    travel. Our mission is to make travel planning easy,
                    convenient, and affordable for everyone.s
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homenologin;
