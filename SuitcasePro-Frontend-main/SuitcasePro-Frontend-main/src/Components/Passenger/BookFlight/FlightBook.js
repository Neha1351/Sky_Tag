import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../../assets/css/passengerhome.css";

const FlightBook = () => {
  const navigate = useNavigate();
  const { id, day } = useParams();
  const [flightData, setFlightData] = useState({});
  const [wait, setWait] = useState("");

  useEffect(() => {
    if (localStorage.getItem("passlogid") == null) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .post(`/showflightById/${id}`)
      .then((res) => {
        console.log(res);
        setFlightData(res.data.flightdata);
        setWait("hello");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      {wait.length ? (
        <div>
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">Book Info</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-wrap table-bk">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Flight</th>
                          <th>Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Airlines</th>
                          <td>{flightData.company}</td>
                        </tr>
                        <tr>
                          <th>ID</th>
                          <td>{flightData.flightcode}</td>
                        </tr>
                        <tr>
                          <th>Boarding</th>
                          <td>{flightData.boarding?.name}</td>
                        </tr>
                        <tr>
                          <th>Depature Time</th>
                          <td>{flightData.deptime}</td>
                        </tr>
                        <tr>
                          <th>Destination</th>
                          <td>{flightData.to?.name}</td>
                        </tr>
                        <tr>
                          <th>Arrival Time</th>
                          <td>{flightData.arrtime}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pricing-section">
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-xl-5 col-lg-6 col-md-8">
                  <div className="section-title text-center title-ex1">
                    <h2>Ticket Info</h2>
                    <p>Suitcase Pro offers the best always</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="price-card">
                    <h2>Economy Class</h2>
                    <h5>{flightData.economyseat} - Available</h5>
                    <p>Most popular choice</p>
                    <p className="price">
                      <span>{flightData.economyprice}</span>/ Ticket
                    </p>
                    <ul className="pricing-offers">
                      <li>Coach / Standard</li>
                      <li>Free Wifi</li>
                      <li>Inflight entertainment</li>
                      <li>Happy meals</li>
                      <li>Economy comfort - pitch</li>
                    </ul>
                    <Link
                      className="btn btn-primary"
                      to={`/BookingFinal/${id}/${day}/ec`}
                    >
                      Book Ticket
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="price-card featured">
                    <h2>Business Class</h2>
                    <h5>{flightData.bcseat} - Available</h5>
                    <p>Premium choice</p>
                    <p className="price">
                      <span>{flightData.bcprice}</span>/ Ticket
                    </p>
                    <ul className="pricing-offers">
                      <li>World traveller plus</li>
                      <li>Greater luggage allowance</li>
                      <li>Dedicated airport lounge</li>
                      <li>Happy meals only for BC</li>
                      <li>Business comfort - pitch</li>
                    </ul>
                    <Link
                      className="btn btn-primary"
                      to={`/BookingFinal/${id}/${day}/bc`}
                    >
                      Book Ticket
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="price-card">
                    <h2>First Class</h2>
                    <h5>{flightData.fcseat} - Available</h5>
                    <p>Jack of all traffic</p>
                    <p className="price">
                      <span>{flightData.fcprice}</span>/ Ticket
                    </p>
                    <ul className="pricing-offers">
                      <li>Pinnacle of air travel</li>
                      <li>Thick layer of luxury</li>
                      <li>5X Business class</li>
                      <li>Happy meals only for FC</li>
                      <li>Cabin crew with the best</li>
                    </ul>
                    <Link
                      className="btn btn-primary"
                      to={`/BookingFinal/${id}/${day}/fc`}
                    >
                      Book Ticket
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default FlightBook;
