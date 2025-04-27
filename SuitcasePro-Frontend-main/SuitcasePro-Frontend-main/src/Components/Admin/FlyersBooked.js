import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/passengerhome.css";

const FlyersBooked = () => {
  const [luggageData, setLuggageData] = useState({});
  const [ticketData, setTicketData] = useState([]);
 

  useEffect(() => {
    const fetchLuggageData = async (ticketData) => {
      try {
        const promises = ticketData.map(async (ticket) => {
          console.log("Ticket ID", ticket._id);
          const res = await axiosInstance.post(
            `/viewLuggageByTicketId/${ticket._id}`
          );
          if (res.data.luggage) {
            console.log(res.data.luggage, "L");
            setLuggageData((prevData) => ({
              ...prevData,
              [ticket._id]: res.data.luggage,
            }));
          }
        });

        await Promise.all(promises);
        console.log(luggageData);
      } catch (err) {
        console.log(err);
      }
    };

    axiosInstance
      .post(`/viewallticketsbooked`)
      .then((res) => {
        console.log("tickets", res.data.data);
        setTicketData(res.data.data);
        fetchLuggageData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
          <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">Flyers Travelling</h2>
                </div>
              </div>
            <div className="col-md-12">
              <div className="table-wrap">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Passenger</th>
                      <th>Airlines</th>
                      <th>Destination</th>

                      <th>Ticket</th>
                      <th>Luggages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData.length ? (
                      ticketData.map((a) => (
                        <tr key={a._id}>
                          <td>
                            <tr>
                              <th>Id-</th>
                              <td>{a.passengerid?._id}</td>
                            </tr>
                            <tr>
                              <th>Name-</th>
                              <td>
                                {a.passengerid?.firstname}{" "}
                                {a.passengerid?.lastname}
                              </td>
                            </tr>
                          </td>
                          <td>
                            <tr>
                              <th>Code-</th>
                              <td>{a.flightid?.flightcode}</td>
                            </tr>
                            <tr>
                              <th>Company-</th>
                              <td>{a.flightid?.company}</td>
                            </tr>
                          </td>
                          <td>
                            <tr>
                              <th>Departure-</th>
                              <td>{a.flightid?.boarding?.name}</td>
                            </tr>
                            <tr>
                              <th>Arrival-</th>
                              <td>{a.flightid?.to?.name}</td>
                            </tr>
                          </td>
                          <td>
                            <tr>
                              <th>Status:</th>
                              <td>{a.isActive ? "Active" : "Cancelled"}</td>
                            </tr>
                            <tr>
                              <th>Date:</th>
                              <td>{a.date.slice(0, 10)}</td>
                            </tr>
                          </td>

                          <td>
                            <tr>
                              <th>Count:</th>
                              <td>{luggageData[a._id]?.[0]?.count || 0}</td>
                            </tr>
                            <tr>
                              <th>Weight:</th>
                              <td>{luggageData[a._id]?.[0]?.weight || 0}</td>
                            </tr>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div className="row" style={{ margin: "20px 10px" }}>
                        <div className="col-12">
                          <h1 style={{ textAlign: "center" }}>No data found</h1>
                        </div>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlyersBooked;
