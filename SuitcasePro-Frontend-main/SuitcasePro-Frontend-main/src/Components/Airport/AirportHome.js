import React, { useEffect, useState } from "react";
import "../../assets/css/airporthome.css";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

const AirportHome = () => {
  const navigate = useNavigate
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("airportauthoritylogid") == null) {
      navigate("/home");
    }
  });

  useEffect(() => {
    axiosInstance
      .post(`/getairport/${localStorage.getItem("airportauthoritylogid")}`)
      .then((data) => {
        console.log(data);
        setData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);

  return (
    <div>
      <section id="hero-airport" class="hero-airport d-flex align-items-center">
        <div class="container">
          <div class="row gy-4 d-flex justify-content-between">
            <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h2 data-aos="fade-up">{data.name}</h2>
              <p data-aos="fade-up" data-aos-delay="100">
                We are a team of passionate travelers and technology enthusiasts
                who understand the importance of hassle-free travel. Our mission
                is to make travel planning easy, convenient, and affordable for
                everyone.s
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="featured-services-airport" class="featured-services-airport">
        <div class="container">
          <div class="row gy-4">
            <div
              class="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
            >
              <div class="icon flex-shrink-0">
                <i class="bi bi-airplane-fill"></i>
              </div>
              <div>
                <h4 class="title">Username</h4>
                <p class="description">{data.username}</p>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="icon flex-shrink-0">
                <i class="bi bi-person-badge"></i>
              </div>
              <div>
                <h4 class="title">Airport ID</h4>
                <p class="description">{data._id}</p>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="icon flex-shrink-0">
                <i class="bi bi-buildings"></i>
              </div>
              <div>
                <h4 class="title">Register Number & Head-Office</h4>
                <p class="description">
                  {data.regNo} -- {data.ho}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirportHome;
