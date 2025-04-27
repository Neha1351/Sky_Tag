import React, { useEffect, useState } from "react";
import axiosInstance from "./baseurl";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/passengerhome.css";

const ViewFlights = () => {
  const [flightdata, setfdata] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/admin/showflights`)
      .then((res) => {
        console.log(res, "show flights");
        setfdata(res.data.flight);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const delfn = (id) => {
    axiosInstance
      .post(`/deleteFlight/${id}`)
      .then((res) => {
        console.log(res, "deleted");
        alert(res.data.msg);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
 
        
      });
  };

  return (
    <>
      <div>
        <section className="ftco-section">
          <div className="container">
            <div className="row">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">Flight Chart</h2>
                </div>
              </div>
              <div className="col-md-12">
                <div className="table-wrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Flight ID</th>
                        <th>Company</th>
                        <th>Boarding Point</th>

                        <th>Destination Point</th>

                        <th>Economy</th>
                        <th>Bussiness</th>
                        <th>First Class</th>
                        <th>Terminate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flightdata.length ? (
                        flightdata.map((a) => {
                          return (
                            <tr>
                              <td>{a.flightcode}</td>
                              <td>{a.company}</td>
                              <td>
                                <tr>{a.boarding.name}</tr>
                                <tr>Depature : {a.deptime}</tr>
                              </td>
                              <td>
                                <tr>{a.to.name}</tr>
                                <tr>Arrival : {a.arrtime}</tr>
                              </td>

                              <td>
                                <tr>{a.economyseat} Seats</tr>
                                <tr>₹{a.economyprice}</tr>
                              </td>
                              <td>
                                <tr>{a.bcseat} Seats</tr>
                                <tr>₹{a.bcprice}</tr>
                              </td>
                              <td>
                                <tr>{a.fcseat} Seats</tr>
                                <tr>₹{a.fcprice}</tr>
                              </td>

                              <td>
                                <button
                                  className="btn btn-primary form-control"
                                  onClick={() => {
                                    delfn(a._id);
                                  }}
                                >
                                  Cancel
                                </button>
                                
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div className="row" style={{ margin: "20px 10px" }}>
                          <div className="col-12">
                            <h1 style={{ textAlign: "center" }}>
                              {" "}
                              No data found
                            </h1>
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
    </>
  );
};

export default ViewFlights;
