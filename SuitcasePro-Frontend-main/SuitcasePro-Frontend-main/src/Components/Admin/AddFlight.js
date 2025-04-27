import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/airportregister.css";

const AddFlight = () => {
  const Navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("adminlog")!=1){
      Navigate('/home')
    }
  })
  const [from, setfrom] = useState([
   
  ]);
  const [to, setto] = useState([
    
  ]);
  const [company, setcompany] = useState([
    "Air India",
    "IndiGo",
    "SpiceJet",
    "GoAir",
    "Vistara",
    "Air India Express",
    "Emirates",
    "Qatar Airways",
    "Etihad Airways",
    "Gulf Air",
  ]);

  useEffect(()=>{
    axiosInstance.post(`/viewApprovedAirports`)
    .then((res)=>{console.log(res,' Approved Airports')
    if(res.data.data!=undefined){
      setfrom(res.data.data)
      setto(res.data.data)
    }
  })
    .catch((err)=>{console.log(err);})
  },[])

  const [flightdata, setfdata] = useState([]);

  const [data, setdata] = useState({
    flightcode: "",
    company: "",
    boarding: "",
    to: "",
    days: [],
    economyseat: "",
    bcseat: "",
    fcseat: "",
    economyprice: "",
    bcprice: "",
    fcprice: "",
    deptime: "",
    arrtime: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`/admin/showflights`)
      .then((res) => {
        console.log(res, "show flights");
        setfdata(res.data.flight);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data,"data");
  

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const days = [...data.days];

    if (checked) {
      days.push(value);
    } else {
      const index = days.indexOf(value);
      if (index !== -1) {
        days.splice(index, 1);
      }
    }
    setdata({ ...data, days });
    console.log(data);
  };

  

  const submitfn = (e) => {
    e.preventDefault();
    console.log(data);
    if (data.boarding != data.to) {
      axiosInstance
        .post(`/admin/addflight`, data)
        .then((res) => {
          console.log(res);
          if(res.data.status==200){
            alert("Added new flight")
          }
          else{
            alert("Flight code must be unique. Please enter a different Flight code")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(
        "Boarding and Destination cannot be the same. Please change the value"
      );
    }
  };

  return (
    <>
      <div>
        <div class="page-wrapper bg-gra-03 p-t-45 p-b-50">
          <div class="wrapper wrapper--w790">
            <div class="card card-5">
              <div class="card-heading">
                <h2 class="title">Chart a Flight</h2>
              </div>
              <div class="card-body">
                <form onSubmit={submitfn}>
                  <div class="form-row m-b-55">
                    <div class="name">Flight Code and Company</div>
                    <div class="value">
                      <div class="row row-space">
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="number"
                              min="1"
                              name="flightcode"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">Flight Code</label>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="input-group-desc ">
                            <div class="rs-select2 js-select-simple select--no-search input--style-5 ">
                              <select
                                name="company"
                                onChange={changefn}
                                required
                                class="input--style-5"
                              >
                                <option disabled="disabled" selected="selected">
                                  Choose Company
                                </option>
                                {company.map((a) => {
                                  return <option value={a}>{a}</option>;
                                })}
                              </select>
                              <div class="select-dropdown "></div>
                            </div>
                            <label class="label--desc">Company</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row m-b-55">
                    <div class="name">Boarding and Destination</div>
                    <div class="value">
                      <div class="row row-space">
                        <div class="col-2">
                          <div class="input-group-desc">
                            <div class="rs-select2 js-select-simple select--no-search input--style-5">
                              <select
                                name="boarding"
                                onChange={changefn}
                                required
                                class="input--style-5"
                              >
                                <option disabled="disabled" selected="selected">
                                  Choose option
                                </option>
                                {from.map((a) => {
                                  return <option value={a._id}>{a.name}</option>;
                                })}
                              </select>
                              <div class="select-dropdown"></div>
                            </div>
                            <label class="label--desc">Boarding Point</label>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="input-group-desc">
                            <div class="rs-select2 js-select-simple select--no-search input--style-5">
                              <select
                                name="to"
                                onChange={changefn}
                                required
                                class="input--style-5"
                              >
                                <option disabled="disabled" selected="selected">
                                  Choose option
                                </option>
                                {to.map((a) => {
                                  return <option value={a._id}>{a.name}</option>;
                                })}
                              </select>
                              <div class="select-dropdown"></div>
                            </div>
                            <label class="label--desc">Destination Point</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row m-b-55">
                    <div class="name">Departure and Arrival Time</div>
                    <div class="value">
                      <div class="row row-space">
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="time"
                              name="deptime"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">Departure Time</label>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="time"
                              name="arrtime"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">Arrival Time</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row m-b-55">
                    <div class="name">Economy Seats and Pricing</div>
                    <div class="value">
                      <div class="row row-space">
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="number"
                              name="economyseat"
                              min="1"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">Economy Seats</label>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="text"
                              name="economyprice"
                              min="1"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">Economy Price</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row m-b-55">
                    <div class="name">Business Seats and Pricing</div>
                    <div class="value">
                      <div class="row row-space">
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="text"
                              name="bcseat"
                              min="1"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">Business Seats</label>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="number"
                              name="bcprice"
                              min="1"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">Business Price</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row m-b-55">
                    <div class="name">First Class Seats and Pricing</div>
                    <div class="value">
                      <div class="row row-space">
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="number"
                              name="fcseat"
                              min="1"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">First Class Seats</label>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="input-group-desc">
                            <input
                              class="input--style-5"
                              type="number"
                              name="fcprice"
                              min="1"
                              onChange={changefn}
                              required
                            />
                            <label class="label--desc">First Class Price</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row p-t-20">
                    <label class="label label--block name">Shedule days</label>
                    <div class="p-t-15">
                      <div
                        class="col-md-5 "
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <ul
                          class="ks-cboxtags container "
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <li>
                            <input
                              type="checkbox"
                              id="btncheck1"
                              autocomplete="off"
                              value="Monday"
                              onChange={handleCheckboxChange}
                              checked={data.days.includes("Monday")}
                            />
                            <label for="btncheck1">Monday</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              id="btncheck2"
                              autocomplete="off"
                              value="Tuesday"
                              onChange={handleCheckboxChange}
                              checked={data.days.includes("Tuesday")}
                            />
                            <label for="btncheck2">Tuesday</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              id="btncheck3"
                              autocomplete="off"
                              value="Wednesday"
                              onChange={handleCheckboxChange}
                              checked={data.days.includes("Wednesday")}
                            />
                            <label for="btncheck3">Wednesday</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              id="btncheck4"
                              autocomplete="off"
                              value="Thursday"
                              onChange={handleCheckboxChange}
                              checked={data.days.includes("Thursday")}
                            />
                            <label for="btncheck4">Thursday</label>
                          </li>
                        </ul>
                        <ul
                          class="ks-cboxtags container "
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <li>
                            <input
                              type="checkbox"
                              id="btncheck5"
                              autocomplete="off"
                              value="Friday"
                              onChange={handleCheckboxChange}
                              checked={data.days.includes("Friday")}
                            />
                            <label for="btncheck5">Friday</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              id="btncheck6"
                              autocomplete="off"
                              value="Saturday"
                              onChange={handleCheckboxChange}
                              checked={data.days.includes("Saturday")}
                            />
                            <label for="btncheck6">Saturday</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              id="btncheck7"
                              autocomplete="off"
                              value="Sunday"
                              onChange={handleCheckboxChange}
                              checked={data.days.includes("Sunday")}
                            />
                            <label for="btncheck7">Sunday</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-primary" type="submit">
                      Add Flight
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

export default AddFlight;
