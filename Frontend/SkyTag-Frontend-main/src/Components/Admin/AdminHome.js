import React from "react";
import adminlogo from "../../assets/img/adminlogo.png";
import "../../assets/css/airporthome.css";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      <section className="hero-admin" id="hero">
        <div class="hero-container">
          <Link to="/AdminHome" class="hero-logo" data-aos="zoom-in">
            <img src={adminlogo} alt="" />
          </Link>
          <h1 data-aos="zoom-in">Welcome To SkyTag Administration</h1>
          <h2 data-aos="fade-up">
            We are team of talented designers making websites with Bootstrap
          </h2>
         
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
