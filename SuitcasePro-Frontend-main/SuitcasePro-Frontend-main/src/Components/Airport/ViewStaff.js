import React, { useEffect, useState } from "react";
import "../../assets/css/passengerhome.css";
import { Link } from "react-router-dom";
import axiosInstance from "../baseurl";

const ViewStaff = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewStaffByAaid/${localStorage.getItem("airportauthoritylogid")}`)
      .then((res) => {
        console.log(res, "viewstaff");
        setData(res.data.flightdata);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const deleteStaff = (id) => {
    axiosInstance
      .post(`/deletestaff/${id}`)
      .then((data)=>{
        alert(data.data.msg)
        window.location.reload(false);
      })
      .catch((err)=>{
        console.log(err)
      })

  }

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
                      <tr >
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Designation</th>
                        <th>Qualification</th>
        
                        
                        <th>Mail ID</th>
                        <th>Contact Number</th>
                        <th>Terminate</th>
                      </tr>
                    </thead>
                    {data.length ? (
                      data.map((a) => {
                        return (
                          <tbody>
                            <tr key={a._id}>
                              <td>{a.username}</td>
                              <td>{a.firstname} {a.lastname}</td>
                              <td>{a.designation}</td>
                              <td>{a.qualification}</td>
            
                            

                              <td>{a.mailid}</td>
                              <td>{a.contactnumber}</td>

                              <td>
                                <Link
                                  className="btn btn-primary form-control"
                                  onClick={() => deleteStaff(a._id)}
                                >
                                  Delete
                                </Link>
                              </td>
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

export default ViewStaff;
