import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../../assets/css/passlog.css";

const AdminLog = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    if (
      localStorage.getItem("passlogid") != null ||
      localStorage.getItem("airportauthoritylogid") != null ||
      localStorage.getItem("stafflogid") != null
    ) {
      alert(
        "Please logout from your current account and login as an admin,if you want to access admin panel"
      );
      navigate("/home");
    } else if (localStorage.getItem("adminlog") == 1) {
      navigate("/AdminHome");
    }
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submitfn = (e) => {
    e.preventDefault();
    if (data.name == "admin" && data.password == "admin12345") {
      localStorage.setItem("adminlog", 1);
      alert("Logged in ");
      window.location.reload(false);
    } else {
      alert("Invalid credentials");
    }
  };

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
                      <h2>Administrator</h2>
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
                      onSubmit={submitfn}
                      autoComplete="off"
                    >
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="name">
                          Username
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={changefn}
                          className="form-control"
                          placeholder="admin"
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

export default AdminLog;
