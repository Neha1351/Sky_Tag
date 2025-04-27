import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/passengerhome.css";
const ViewPassengers = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminlog") != 1) {
      Navigate("/home");
    }
  });
  const [data, setdata] = useState([]);
  useEffect(() => {
    axiosInstance
      .post("/admin/showpassengers")
      .then((res) => {
        console.log(res, "pass");
        setdata(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletefn = (id) => {

    axiosInstance
      .post(`/admin/flyerdeletebyticket/${id}`)
      .then((res) => {
        console.log(res);
        alert(res.data.msg)
        window.location.reload(false)
      })
      .catch((err) => {
        console.log(err);
      });

    // axiosInstance
    //   .post(`/deletepassenger/${id}`)
    //   .then((res) => {
    //     console.log(res);
    //     window.location.reload(false)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    
  };

  return (
    <>
      <div>
        <section className="ftco-section">
          <div className="container">
            <div className="row">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">Flyers Registered</h2>
                </div>
              </div>
              <div className="col-md-12">
                <div className="table-wrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Mail ID</th>
                        <th>Contact Number</th>
                        <th>District</th>
                        <th>Age</th>
                        <th>Terminate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length ? (
                        data.map((a) => {
                          return (
                            <tr>
                              <td>
                                {a.firstname} {a.lastname}
                              </td>
                              <td>{a.email}</td>

                              <td>{a.contactnumber}</td>
                              <td>{a.district}</td>
                              
                              <td>{a.age}</td>

                              <td>
                                <button
                                  className="btn btn-primary form-control"
                                  style={{maxWidth:"80px", maxHeight:"40px", }}
                                  onClick={()=>{deletefn(a._id)}}
                                >
                                  Delete
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

export default ViewPassengers;
