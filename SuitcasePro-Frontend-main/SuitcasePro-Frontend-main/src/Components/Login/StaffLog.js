import React from "react";
import "../../assets/css/passlog.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

const StaffLog = () => {
  const Navigate = useNavigate();
  const [data, setdata] = useState({
    username: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/stafflogin", data)

      .then((res) => {
        console.log("Result", res);
        if (res.data.status == 200) {
          localStorage.setItem("stafflogid", res.data.user._id);
          alert("Logged in");
          window.location.reload(false);
        } else {
          alert(
            "something went wrong. Please try again using the correct credentials"
          );
        }
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Something went wrong. ");
      });
  };
  useEffect(() => {
    console.log(data);
    if (localStorage.getItem("stafflogid") != null) {
      Navigate("/VerifyPassenger");
    }
  });

  return (
    <>
      <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section"></h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Welcome to Suitcase Pro</h2>
                    <h2>Cargo</h2>
                    
                  </div>
                </div>
                <div className="login-wrap p-4 p-lg-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div>
                  </div>
                  <form className="signin-form" onSubmit={submitfn} autoComplete="off">
                    <div className="form-group mb-3">
                      <label className="label" for="name">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        onChange={changefn}
                        className="form-control"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" for="password">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={changefn}
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary submit px-3"
                      >
                        Sign In
                      </button>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default StaffLog;
