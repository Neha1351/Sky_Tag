import React, { useEffect, useState } from "react";
import "../../assets/css/passengerhome.css";
// import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../baseurl";

const ViewStaffAdmin = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminlog") != 1) {
      Navigate("/home");
    }
  });
  const [data, setdata] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("/admin/viewAllStaffs")
      .then((res) => {
        console.log(res, "viewstaff");
        setdata(res.data.flightdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <section className="ftco-section">
          <div className="container">
            <div className="row">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">Staff Info</h2>
                </div>
              </div>
              <div className="col-md-12">
                <div className="table-wrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Designation</th>
                        <th>Qualification</th>

                        <th>Mail ID</th>
                        <th>Contact Number</th>
                        <th>Airport</th>
                      </tr>
                    </thead>
                    {data.length ? (
                      data.map((a) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{a.username}</td>
                              <td>
                                {a.firstname} {a.lastname}
                              </td>
                              <td>{a.designation}</td>
                              <td>{a.qualification}</td>

                              <td>{a.mailid}</td>
                              <td>{a.contactnumber}</td>
                              <td>{a.aa_id?.name}</td>

                              {/* <td>
                                <Link
                                  className="btn btn-primary form-control"
                                  to={`/FlightBook/${a._id}`}
                                >
                                  Book
                                </Link>
                              </td> */}
                            </tr>
                          </tbody>
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

export default ViewStaffAdmin;
