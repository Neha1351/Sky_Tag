import React, { useState, useEffect } from "react";
import "../../assets/css/viewairport.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

const ViewAirports = () => {
  const navigate = useNavigate();

  const [approvedAirports, setApprovedAirports] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("adminlog") !== "1") {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .post(`/viewApprovedAirports`)
      .then((res) => {
        console.log(res, "view all airports");
        if (res.data.data !== undefined) {
          setApprovedAirports(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const deleteAirport = (id) => {
    axiosInstance
      .post(`/deleteairport/${id}`)
      .then((data) => {
        alert(data.data.msg);
        window.location.reload(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="container mt-5 mb-3" style={{ paddingTop: "5rem" }}>
        <div className="row">
          {approvedAirports.length
            ? approvedAirports.map((airport) => {
                return (
                  <div className="col-md-4" key={airport._id}>
                    <div className="card card-airport p-3 mb-2">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <div className="icon icon-airport">
                            <i className="bi bi-airplane-engines"></i>
                          </div>
                          <div className="ms-2 c-details">
                            <h6 className="mb-0">{airport.name}</h6>
                            <span>1 day ago</span>
                          </div>
                        </div>
                        <div className="badge badge-airport">
                          <span>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                deleteAirport(airport._id);
                              }}
                            >
                              Delete
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="mt-5">
                        <h3 className="heading">
                          Registration: {airport.regNo}
                          <br />
                          Office: {airport.ho}
                          <br />
                          Username: {airport.username}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ViewAirports;
