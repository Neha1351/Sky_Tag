import React, { useEffect, useState } from "react";
import "../../assets/css/trackflight.css";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import axiosInstance from "../baseurl";

const ScanPassengerTicket = () => {

    const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("stafflogid") == null) {
      navigate("/home");
    }
  });
  const [test, settest] = useState("");
  const [data, setData] = useState("No result");
  const [dataasobj, setdataobj] = useState({});
  const [seat, setseat] = useState("");
  const [passengerdata, setpassdata] = useState({});
  const [flightdata, setflightdata] = useState({});

  useEffect(() => {
    console.log(data, "data");
    if (data.length > 10) {
      console.log(JSON.parse(data));
      setdataobj(JSON.parse(data));
      if (JSON.parse(data).seattype == "bc") {
        setseat("Business Class");
      } else if (JSON.parse(data).seattype == "fc") {
        setseat("First Class");
      } else if (JSON.parse(data).seattype == "ec") {
        setseat("Economy Class");
      }

      axiosInstance
        .post(`/getpassenger/${JSON.parse(data).passengerid}`)
        .then((res) => {
          console.log(res, "passenger id details");
          if (res.data.user != undefined) {
            setpassdata(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axiosInstance
        .post(`/showflightById/${JSON.parse(data).flightid}`)
        .then((res) => {
          console.log(res, "flight id details");
          if (res.data.flightdata != undefined) {
            setflightdata(res.data.flightdata);
            settest("hello");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);




  return (
    <>
    <div>
      <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="profile-info1 col-md-9">
            <div class="panel" style={{ marginTop: "5rem" }}>
              <div class="panel-body bio-graph-info">
                <h1>
                  {" "}
                  <button
                    type="button"
                    className="form-control btn btn-primary submit px-3"
                    style={{ marginTop: "1rem" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Verify Flyer
                  </button>
                </h1>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <div
                          style={{
                            height: "500px",
                            width: "400px",
                            margin: "auto",
                          }}
                        >
                          <QrReader
                            onResult={(result, error) => {
                              if (!!result) {
                                setData(result?.text);
                              }

                              if (!!error) {
                                // console.info(error);
                              }
                            }}
                            containerStyle={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          className="form-control btn btn-primary submit px-3"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {test.length ? (
                  <div class="row">
                    <div class="bio-row1">
                      <p>
                        <span>Passenger Name </span>: {passengerdata.firstname}{" "}
                        {passengerdata.lastname}
                      </p>
                    </div>
                    <div class="bio-row1">
                      <p>
                        <span>Phone </span>: {passengerdata.contactnumber}
                      </p>
                    </div>
                    <div class="bio-row1">
                      <p>
                        <span>Address </span>: {passengerdata.housename}{" "}
                        {passengerdata.streetname} ,{passengerdata.district}
                      </p>
                    </div>{" "}
                    <div class="bio-row1">
                      <p>
                        <span>Email </span>: {passengerdata.email}
                      </p>
                    </div>
                    <div class="bio-row1">
                      <p>
                        <span>Gender </span>: {passengerdata.gender}
                      </p>
                    </div>
                    <div class="bio-row1">
                      <p>
                        <span>Age</span>: {passengerdata.age}
                      </p>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="panel">
                          <div class="panel-body">
                            <div class="bio-chart">
                              <div
                                style={{
                                  display: "inline",
                                  width: "100px",
                                  height: "100px",
                                }}
                              >
                                <canvas width="100" height="100px"></canvas>
                                <input
                                  class="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  value={passengerdata.age}
                                  data-fgcolor="#e06b7d"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: -"77px",
                                    border: "0px",
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                    fontVariant: "normal",
                                    fontStretch: "normal",
                                    fontSize: "20px",
                                    lineHeight: "normal",
                                    fontFamily: "Arial",
                                    textAlign: "center",
                                    color: "rgb(224, 107, 125)",
                                    padding: "0px",
                                    background: "none",
                                  }}
                                />
                              </div>
                            </div>
                            <div class="bio-desk">
                              <h4 class="red">Passenger : {passengerdata.firstname}
                                {passengerdata.lastname}
                              </h4>
                              <p>ID : {passengerdata._id}</p>
                              <p>Journey Date : {  dataasobj.date.slice(0,10)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="panel">
                          <div class="panel-body">
                            <div class="bio-chart">
                              <div
                              //   style="display:inline;width:100px;height:100px;"
                              >
                                <canvas width="100" height="100px"></canvas>
                                <input
                                  class="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  value="Airport"
                                  data-fgcolor="#4CC5CD"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: -"77px",
                                    border: "0px",
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                    fontVariant: "normal",
                                    fontStretch: "normal",
                                    fontSize: "20px",
                                    lineHeight: "normal",
                                    fontFamily: "Arial",
                                    textAlign: "center",
                                    color: "rgb(76, 197, 205)",
                                    padding: "0px",
                                    background: "none",
                                  }}
                                />
                              </div>
                            </div>
                            <div class="bio-desk">
                              <h4 class="terques">Flight : {flightdata.company}</h4>
                              <p>ID : {flightdata._id}</p>
                              <p>From : {flightdata.boarding.name}</p>
                              <p>To : {flightdata.to.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="panel">
                          <div class="panel-body">
                            <div class="bio-chart">
                              <div
                              //   style="display:inline;width:100px;height:100px;"
                              >
                                <canvas width="100" height="100px"></canvas>
                                <input
                                  class="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  value="63"
                                  data-fgcolor="#4CC5CD"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: -"77px",
                                    border: "0px",
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                    fontVariant: "normal",
                                    fontStretch: "normal",
                                    fontSize: "20px",
                                    lineHeight: "normal",
                                    fontFamily: "Arial",
                                    textAlign: "center",
                                    color: "rgb(76, 197, 205)",
                                    padding: "0px",
                                    background: "none",
                                  }}
                                />
                              </div>
                            </div>
                            <div class="bio-desk">
                              <h4 class="purple">Ticket : Suitcase Pro</h4>
                              <p>ID : {  dataasobj._id}</p>
                              <p>Seat Type : {seat}</p>
                              <p>Price : {dataasobj.ticketcharge}₹</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ScanPassengerTicket