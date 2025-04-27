import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

import "../../assets/css/viewflyers.css";
const ViewFlyers = () => {
  const [pass, setpass] = useState([]);
  const [date, setdate] = useState("");
  const [location, setloc] = useState("");
  const [allflight, setallflight] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("airportauthoritylogid") == null) {
      navigate("/home");
    }
  });

  useEffect(() => {
    axiosInstance
      .post(`/admin/showflights`)
      .then((res) => {
        console.log(res, "All flight");
        if (res.data.flight != undefined) {
          setallflight(res.data.flight);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const searchfn = () => {
    if (location != "" && date != "") {
      if (location == "Arrival") {
        axiosInstance
          .post(
            `/viewArrivalOfPassengersByAid/${localStorage.getItem(
              "airportauthoritylogid"
            )}`,
            { date: date }
          )
          .then((res) => {
            console.log(res, " arrival passenger list");
            if (res.data.data != undefined) {
              setpass(res.data.data);
            } else {
              setpass([]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (location == "Departure") {
        axiosInstance
          .post(
            `/viewdepartueOfPassengersByAid/${localStorage.getItem(
              "airportauthoritylogid"
            )}`,
            { date: date }
          )
          .then((res) => {
            console.log(res, " Departure passenger list");
            if (res.data.data != undefined) {
              setpass(res.data.data);
            } else {
              setpass([]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div>
      <div class="container" style={{marginTop:"5rem"}}>
        <div class="row">
          <div class="col-md-12">
            <div class="grid-flyers search-flyers">
              <div class="grid-flyers-body">
                <div class="row">
                  <div class="col-md-3">
                    <h2 class="grid-flyers-title">
                      <i class="fa fa-filter"></i> Filters
                    </h2>
                    <hr />
                    <h4>By category:</h4>
                    <div class="checkbox">
                      <select
                        required
                        class="form-select"
                        onChange={(e) => {
                          setloc(e.target.value);
                        }}
                      >
                        <option value="">Select Type</option>
                        <option>Arrival</option>
                        <option>Departure</option>
                      </select>
                    </div>
                    <div class="padding"></div>
                    <h4>By date:</h4>
                    {location}
                    <input
                      type="date"
                      required
                      class="form-control"
                      onChange={(e) => {
                        setdate(e.target.value);
                      }}
                    />
                    <button onClick={searchfn} className="btn btn-primary">
                      {" "}
                      Search{" "}
                    </button>

                    <input type="hidden" id="dtp_input2" value="" />
                    <div class="padding"></div>
                    <div class="slider-primary">
                      <div
                        class="slider slider-horizontal"
                        // style="width: 152px;"
                      >
                        <div class="slider-track">
                          <div
                            class="slider-selection"
                            // style="left: 30%; width: 50%;"
                          ></div>
                          <div
                            class="slider-handle round"
                            // style="left: 30%;"
                          ></div>
                          <div
                            class="slider-handle round"
                            // style="left: 80%;"
                          ></div>
                        </div>
                        <div
                          class="tooltip top hide"
                          //   style="top: -30px; left: 50.1px;"
                        >
                          <div class="tooltip-arrow"></div>
                          <div class="tooltip-inner">300 : 800</div>
                        </div>
                        <input
                          type="text"
                          class="slider"
                          value=""
                          data-slider-min="0"
                          data-slider-max="1000"
                          data-slider-step="1"
                          data-slider-value="[300,800]"
                          data-slider-tooltip="hide"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-9">
                    <h2>
                      <i class="fa fa-file-o"></i> Result
                    </h2>
                    <hr />

                    <div class="padding"></div>

                    <div class="table-responsive">
                      <table class="table table-hover">
                        <tbody>
                          {pass.length ? (
                            pass.map((a) => {
                              let arr;
                              let dept;
                              for (let i of allflight) {
                                console.log(i);
                                if (i._id == a.flightid._id) {
                                  arr = i.to.name;
                                  dept = i.boarding.name;
                                }
                              }
                              console.log(arr, dept);
                              return (
                                <>
                                  <tr>
                                    <td class="number text-center">1</td>
                                    <td class="image">
                                      <img
                                        src="https://www.bootdey.com/image/400x300/FF8C00"
                                        alt=""
                                      />
                                    </td>
                                    <td class="product">
                                      <strong>
                                        {a.passengerid.firstname}{" "}
                                        {a.passengerid.lastname}
                                      </strong>
                                      <br />
                                      Email : {a.passengerid.email}
                                      <br />

                                      Contact : {a.passengerid.contactnumber}
                                    </td>
                                    <td class="rate text-right">
                                      <span>
                                      Arrival : {arr}
                                      </span>
                                    </td>
                                    <td class="rate text-right">
                                      <span>
                                      Departure : {dept}
                                      </span>
                                    </td>
                                    <td class="price text-right">Ticket Date : {a.date.slice(0, 10)}</td>
                                  </tr>
                                </>
                              );
                            })
                          ) : (
                            <div className="col-12">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">No Data</h5>
                                </div>
                              </div>
                            </div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFlyers;
