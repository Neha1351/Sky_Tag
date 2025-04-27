import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/passengerhome.css";
import axiosInstance from "../../baseurl";

const ShowFlights = ({ flights, day }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("passlogid") == null) {
      navigate("/home");
    }
  }, [navigate]);

  const [allAirports, setAllAirports] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewApprovedAirports`)
      .then((res) => {
        if (res.data.data !== undefined) {
          setAllAirports(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {flights.length ? (
        <section className="ftco-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-wrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Flight ID</th>
                        <th>Company</th>
                        <th>Boarding Point</th>
                        <th>Depature</th>
                        <th>Destination Point</th>
                        <th>Arrival</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flights.map((flight) => {
                        let boardingPoint;
                        let destinationPoint;

                        for (let airport of allAirports) {
                          if (airport._id === flight.boarding) {
                            boardingPoint = airport.name;
                          }
                          if (airport._id === flight.to) {
                            destinationPoint = airport.name;
                          }
                        }

                        return (
                          <tr key={flight._id}>
                            <td>{flight.flightcode}</td>
                            <td>{flight.company}</td>
                            <td>{boardingPoint}</td>
                            <td>{flight.deptime}</td>
                            <td>{destinationPoint}</td>
                            <td>{flight.arrtime}</td>
                            <td>
                              <Link
                                className="btn btn-primary form-control"
                                to={`/FlightBook/${flight._id}/${day}`}
                              >
                                Book
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="row" style={{ margin: "20px 10px" }}>
            <div className="col-12">
              <h1 style={{ textAlign: "center" }}>Search Your Destination</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShowFlights;
