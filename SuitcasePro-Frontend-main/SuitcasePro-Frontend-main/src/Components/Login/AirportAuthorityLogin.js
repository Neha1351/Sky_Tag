import React from 'react'
import { useState, useEffect } from "react";
import "../../assets/css/passlog.css";


import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axiosInstance from "../baseurl";

const AirportAuthorityLogin = () => {


    const Navigate = useNavigate()
  const [data, setdata] = useState({
    username: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
useEffect(()=>{
if(localStorage.getItem('airportauthoritylogid')!=null){
    Navigate("/AirportHome")
}
})
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/loginairport", data)

      .then((res) => {
        console.log("Result airport login", res)
        localStorage.setItem("airportauthoritylogid", res.data.data._id);
        alert("Logged in")
        window.location.reload(false)
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    console.log(data);
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
                    <h2>Airport Authority</h2>
                    
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
                      <label className="label" htmlFor="name">
                        Username
                      </label>
                      <input
                        type="email"
                        name="username"
                        onChange={changefn}
                        className="form-control"
                        placeholder="IATA"
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
  )
}

export default AirportAuthorityLogin