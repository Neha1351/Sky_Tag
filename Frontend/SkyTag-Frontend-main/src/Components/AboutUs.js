import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/aboutus.css";
import airasia from '../assets/img/airlines/AirAsia_logo_PNG1.png';
import airindia from '../assets/img/airlines/Air_India_logo_PNG2.png';
import albatroz from '../assets/img/airlines/Albatros_Airlines_Logo_PNG1.png';
import boeing from '../assets/img/airlines/Boeing_logo_PNG11.png';
import indigo from '../assets/img/airlines/IndiGo-Logo-PNG2.png';
import jetairways from '../assets/img/airlines/Jet-Airways-Logo-PNG2.png';
import vistara from '../assets/img/airlines/Vistara-Logo-PNG1.png';
import callcargo from '../assets/img/airlines/CAL-Cargo-AirLines-Logo-PNG1.png';
import img4 from '../assets/img/img4.jpg';
import serviceimg1 from '../assets/img/serviceimg/serviceimage1.jpg';
import serviceimg2 from '../assets/img/serviceimg/serviceimage2.jpg';
import serviceimg3 from '../assets/img/serviceimg/serviceimage3.jpg';
import serviceimg4 from '../assets/img/serviceimg/serviceimage4.jpg';
import serviceimg5 from '../assets/img/serviceimg/serviceimage5.jpg';
import serviceimg6 from '../assets/img/serviceimg/serviceimage6.jpg';

const AboutUs = () => {
  return (
    <div>
      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>About Us</h2>
              <p>
                We are a team of passionate travelers and technology enthusiasts
                who understand the importance of hassle-free travel. Our mission
                is to make travel planning easy, convenient, and affordable for
                everyone.
              </p>
            </div>

            <div
              className="row g-4 g-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="col-lg-5">
                <div className="about-img">
                  <img
                    src={img4}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-7">
                <h3 className="pt-0 pt-lg-5">Welcome to Suitcase Pro</h3>

                <ul className="nav nav-pills mb-3">
                  <li>
                    <Link
                      className="nav-link active"
                      data-bs-toggle="pill"
                      to="#tab1"
                    >
                      Why
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" data-bs-toggle="pill" to="#tab2">
                      How
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" data-bs-toggle="pill" to="#tab3">
                      What
                    </Link>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab1">
                    <p className="fst-italic">
                      We pride ourselves on providing excellent customer
                      service, and our knowledgeable support team is available
                      to assist you with any questions or concerns you may have
                      about your booking.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>
                        Efficiency Enhancement and Streamlined Travel Booking
                      </h4>
                    </div>
                    <p>
                      Suitcase Pro aims to enhance the efficiency of flight
                      inventory management processes. Traditional paper-based
                      methods can be time-consuming and error-prone, whereas QR
                      codes enable quick and accurate data retrieval and
                      updates.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>Real-time Access for Passenger Convenience</h4>
                    </div>
                    <p>
                      Suitcase Pro ensures that travel schedules and ticket
                      availability are updated in real time, allowing customers
                      to make informed decisions.Passengers benefit from the QR
                      code system as it facilitates quick check-ins and luggage
                      monitoring, enhancing their overall travel experience by
                      reducing wait times and offering easy access to their
                      flight information.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>Efficient Luggage Tracking and Product Tracking</h4>
                    </div>
                    <p>
                      The use of QR codes for monitoring and updating
                      passengers' luggage enhances the accuracy and efficiency
                      of luggage management at airports. This minimizes the
                      chances of mishandled or lost baggage.The QR codes
                      assigned to products enable efficient tracking of their
                      locations and ownership. This feature can have
                      applications beyond travel, potentially benefiting supply
                      chain management and inventory tracking at Suitcase Pro.
                    </p>
                  </div>

                  <div className="tab-pane fade show" id="tab2">
                    <p className="fst-italic">
                      We pride ourselves on providing excellent customer
                      service, and our knowledgeable support team is available
                      to assist you with any questions or concerns you may have
                      about your booking.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>QR Code Integration in a Web-based Platform</h4>
                    </div>
                    <p>
                      Suitcase Pro employs QR codes as the central technology
                      for various functionalities. QR codes are utilized for
                      flight information, ticket purchasing, luggage management,
                      and product tracking. The system is implemented as a web
                      page accessible via standard web browsers. This ensures
                      easy access for both customers and airport personnel
                      without the need for specialized software installations.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>
                        Online Reservation System with more Secure Payment
                        Gateway
                      </h4>
                    </div>
                    <p>
                      The online reservation system enables customers to browse
                      available flights, select their preferred options, and
                      purchase tickets electronically. This eliminates the need
                      for physical tickets and offers a user-friendly booking
                      experience.Suitcase Pro incorporates a payment gateway
                      that allows customers to securely complete transactions
                      using valid debit/credit cards. This ensures a seamless
                      and secure payment process.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>
                        Real-time Updates - Passenger and Product QR Codes
                      </h4>
                    </div>
                    <p>
                      The web-based platform ensures that travel schedules,
                      ticket availability, and luggage information are updated
                      in real time. This guarantees that customers have access
                      to the latest information and can make informed
                      decisions.Passengers are provided with individual QR codes
                      for easy check-in and luggage management. Additionally,
                      separate QR codes are assigned to products for efficient
                      tracking.
                    </p>
                  </div>

                  <div className="tab-pane fade show" id="tab3">
                    <p className="fst-italic">
                      We pride ourselves on providing excellent customer
                      service, and our knowledgeable support team is available
                      to assist you with any questions or concerns you may have
                      about your booking.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>Web-based Travel Booking</h4>
                    </div>
                    <p>
                      A web page accessible via browsers that provides customers
                      with up-to-date travel schedules and an online reservation
                      system. This allows customers to purchase tickets
                      electronically using debit/credit cards.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>QR Code Integration</h4>
                    </div>
                    <p>
                      QR codes are utilized extensively in the system. They are
                      used for monitoring and updating passengers' luggage
                      information, enabling efficient check-ins, and tracking
                      the locations and ownership of products within the
                      airport.
                    </p>

                    <div className="d-flex align-items-center mt-4">
                      <i className="bi bi-check2"></i>
                      <h4>Real-time Information: </h4>
                    </div>
                    <p>
                      The system ensures that all information, such as flight
                      schedules, ticket availability, and luggage status, is
                      updated in real time, providing customers with the latest
                      data for making travel-related decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Our Services</h2>
              <p>
                Suitcase Pro aims to transform flight inventory management by
                leveraging QR code technology to streamline processes, provide
                real-time information, enhance passenger convenience, and
                improve the accuracy of luggage and product tracking at
                airports.
              </p>
            </div>

            <div className="row gy-5">
              <div
                className="col-xl-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="service-item">
                  <div className="img">
                    <img src={serviceimg1} className="img-fluid" alt="" />
                  </div>
                  <div className="details position-relative">
                    <div className="icon">
                      <i className="bi bi-activity"></i>
                    </div>
                    <Link href="#" className="stretched-link">
                      <h3>Flight Booking</h3>
                    </Link>
                    <p>
                      Suitcase Pro ensures that travel schedules and ticket
                      availability are updated in real time, allowing customers
                      to make informed decisions
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="service-item">
                  <div className="img">
                    <img src={serviceimg2} className="img-fluid" alt="" />
                  </div>
                  <div className="details position-relative">
                    <div className="icon">
                      <i className="bi bi-broadcast"></i>
                    </div>
                    <Link href="#" className="stretched-link">
                      <h3>Smart Tickets</h3>
                    </Link>
                    <p>
                      Suitcase Pro eliminates the need for physical tickets,
                      making the reservation process more convenient for
                      customers
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="service-item">
                  <div className="img">
                    <img src={serviceimg3} className="img-fluid" alt="" />
                  </div>
                  <div className="details position-relative">
                    <div className="icon">
                      <i className="bi bi-easel"></i>
                    </div>
                    <Link href="#" className="stretched-link">
                      <h3>Fast-track Entry</h3>
                    </Link>
                    <p>
                      Passengers benefits from Suitcase Pro as it facilitates
                      quick check-ins enhancing their overall travel experience
                      by reducing wait times
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <div className="service-item">
                  <div className="img">
                    <img src={serviceimg4} className="img-fluid" alt="" />
                  </div>
                  <div className="details position-relative">
                    <div className="icon">
                      <i className="bi bi-bounding-box-circles"></i>
                    </div>
                    <Link href="#" className="stretched-link">
                      <h3>Inventory Management</h3>
                    </Link>
                    <p>
                      Suitcase Pro, for monitoring and updating luggage enhances
                      the accuracy and efficiency of luggage management at
                      airports
                    </p>
                    <Link href="#" className="stretched-link"></Link>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="service-item">
                  <div className="img">
                    <img src={serviceimg5} className="img-fluid" alt="" />
                  </div>
                  <div className="details position-relative">
                    <div className="icon">
                      <i className="bi bi-calendar4-week"></i>
                    </div>
                    <Link href="#" className="stretched-link">
                      <h3>QR by Suitcase Pro</h3>
                    </Link>
                    <p>
                      Suitcase Pro codes - are used for monitoring and updating
                      passengers information, enabling efficient check-ins, and
                      tracking the locations
                    </p>
                    <Link href="#" className="stretched-link"></Link>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                <div className="service-item">
                  <div className="img">
                    <img src={serviceimg6} className="img-fluid" alt="" />
                  </div>
                  <div className="details position-relative">
                    <div className="icon">
                      <i className="bi bi-chat-square-text"></i>
                    </div>
                    <Link href="#" className="stretched-link">
                      <h3>Track Shipments</h3>
                    </Link>
                    <p>
                      Suitcase Pro QR feature can have applications, potentially
                      benefiting supply chain management and inventory tracking
                    </p>
                    <Link href="#" className="stretched-link"></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
 <div className="section-header">
          <h2>Our Partners</h2>
          <p>
            We are a team of passionate travelers and technology enthusiasts who
            understand the importance of hassle-free travel. Our mission is to
            make travel planning easy, convenient, and affordable for everyone.
          </p>
        </div>

        <section id="clients" className="clients">
          <div className="container" data-aos="zoom-out">
            <div className="clients-slider swiper">
              <div className="swiper-wrapper align-items-center">
                <div className="swiper-slide"><img src={airasia} className="img-fluid" alt=""/></div>
                <div className="swiper-slide"><img src={airindia} className="img-fluid" alt=""/></div>
                <div className="swiper-slide"><img src={albatroz} className="img-fluid" alt=""/></div>
                <div className="swiper-slide"><img src={boeing} className="img-fluid" alt=""/></div>
                <div className="swiper-slide"><img src={jetairways} className="img-fluid" alt=""/></div>
                <div className="swiper-slide"><img src={indigo} className="img-fluid" alt=""/></div>
                <div className="swiper-slide"><img src={vistara} className="img-fluid" alt=""/></div>
                <div className="swiper-slide"><img src={callcargo} className="img-fluid" alt=""/></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
