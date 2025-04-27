import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import "../../assets/css/passlog.css";

const PassLog = () => {
  const mainNavigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("passlogid") !== null) {
      mainNavigate("/PassengerHome");
    }
  }, [mainNavigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/loginPassenger", data)
      .then((res) => {
        console.log("Result", res);
        localStorage.setItem("passlogid", res.data.user._id);
        alert("Login successful");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    console.log(data);
  });

  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">"Travel Smart, Travel Easy"</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Welcome to Suitcase Pro</h2>
                    <p>Don't have an account?</p>
                    <Link
                      to="/RegisterPassenger"
                      className="btn btn-white btn-outline-white"
                    >
                      Register
                    </Link>
                  </div>
                </div>
                <div className="login-wrap p-4 p-lg-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div>
                  </div>
                  <form
                    className="signin-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="email">
                        Username
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
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
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-md-right my-3">
                        <Link to="/">Forgot Password</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PassLog;
