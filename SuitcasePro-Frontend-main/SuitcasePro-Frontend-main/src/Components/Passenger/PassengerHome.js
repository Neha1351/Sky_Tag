import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../baseurl";
import FlightsCardList from "./BookFlight/FlightsCardList";

const PassengerHome = () => {
  return (
    <div>
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
              <Link
                to="/BookFlight"
                className="btn-get-started scrollto"
              >
                Flyer Booking
              </Link>
            </div>
          </div>
        </section>

        <main id="main">
          <section id="featured-services" className="featured-services">
           <FlightsCardList/>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PassengerHome;
