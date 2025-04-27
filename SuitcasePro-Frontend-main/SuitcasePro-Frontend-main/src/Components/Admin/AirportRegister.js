import React, { useState, useEffect } from "react";
import axiosInstance from "../baseurl";

import "../../assets/css/airportregister.css";
import { Link, useNavigate } from "react-router-dom";

const AirportRegister = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminlog") != 1) {
      Navigate("/home");
    }
  });
  const [data, setdata] = useState({
    name: "",
    regNo: "",
    username: "",
    password: "",
    ho: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submitfn = (e) => {
    e.preventDefault();
    console.log(data, "pass reg data");
    axiosInstance
      .post("/addairport", data)
      .then((e) => {
        if (e.data.status == 500) {
          alert(e.data.msg);
          document.getElementById("airportReg").reset();
        } else {
          console.log("Submitted", e);
          alert(e.data.msg);

          document.getElementById("airportReg").reset();
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  return (
    <>
      <div>
        <div class="page-wrapper p-t-45 p-b-50">
          <div class="wrapper wrapper--w790">
            <div class="card card-5">
              <div class="card-heading">
                <h2 class="title">Airport Registration</h2>
              </div>
              <div class="card-body">
                <form onSubmit={submitfn} id="airportReg">
                  <div class="form-row">
                    <div class="name">Name</div>
                    <div class="value">
                      <div class="input-group">
                        <input
                          class="input--style-5"
                          type="text"
                          name="name"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="name">IATA Code</div>
                    <div class="value">
                      <div class="input-group">
                        <input
                          class="input--style-5"
                          type="text"
                          name="regNo"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="name">Username</div>
                    <div class="value">
                      <div class="input-group">
                        <input
                          class="input--style-5"
                          type="text"
                          name="username"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="name">Password</div>
                    <div class="value">
                      <div class="input-group">
                        <input
                          class="input--style-5"
                          type="password"
                          name="password"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="name">Head Office</div>
                    <div class="value">
                      <div class="input-group">
                        <input
                          class="input--style-5"
                          type="text"
                          name="ho"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button class="btn  btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirportRegister;
