import React, { useEffect, useState } from "react";
import "../../assets/css/trackflight.css";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import axiosInstance from "../baseurl";
import axios from "axios";

const TrackFlight = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to "/home" if "passlogid" is not found in localStorage
    if (!localStorage.getItem("passlogid")) {
      navigate("/home");
    }
  }, [navigate]);

  const [test, setTest] = useState("");
  const [data, setData] = useState("No result");
  const [dataAsObj, setDataObj] = useState({});
  const [seat, setSeat] = useState("");
  const [passengerData, setPassData] = useState({});
  const [flightData, setFlightData] = useState({});
  const [isQRScanned, setIsQRScanned] = useState(false);
  const [ticketActive, setTicketActive] = useState({});
  const [cancel, setCancel] = useState("Cancel Ticket");

  useEffect(() => {
    console.log(data, "data");
    if (data.length > 10) {
      const parsedData = JSON.parse(data);

      console.log(parsedData);
      if (parsedData.location) {
        alert("Show Flyer QR");
      } else {
        if (parsedData.passengerid == localStorage.getItem("passlogid")) {
          setDataObj(parsedData);
          console.log("TicketScannedData", dataAsObj);
          let seatType;

          switch (parsedData.seattype) {
            case "bc":
              seatType = "Business Class";
              break;
            case "fc":
              seatType = "First Class";
              break;
            case "ec":
              seatType = "Economy Class";
              break;
            default:
              seatType = "Unknown";
          }
          setSeat(seatType);

          Promise.all([
            axiosInstance.post(`/viewTicketById/${parsedData._id}`),
            axiosInstance.post(`/getpassenger/${parsedData.passengerid}`),
            axiosInstance.post(`/showflightById/${parsedData.flightid}`),
          ])
            .then((responses) => {
              const ticketData = responses[0].data.data;
              const passengerData = responses[1].data.user;
              const flightData = responses[2].data.flightdata;

              console.log("TicketData", ticketData);
              console.log("passenger id details", passengerData);
              console.log("flight id details", flightData);

              setTicketActive(ticketData);
              setPassData(passengerData);
              setFlightData(flightData);
              setIsQRScanned(true);
              setTest("hello");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(
            "This QR Code does not belong to you. Please provide a valid QR Code"
          );
        }
      }
    }
  }, [data]);

  const cancelTicket = (ticketId) => {
    console.log(ticketId);

    axiosInstance
      .post(`/cancelticketbyid/${ticketId}`)
      .then((response) => {
        console.log("Ticket Cancelled");
        setCancel("  Ticket cancelled");
        alert("Ticket Cancelled");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="container bootstrap snippets bootdey">
        <div className="row">
          <div className="profile-info1 col-md-9">
            <div className="panel" style={{ marginTop: "5rem" }}>
              <div className="panel-body bio-graph-info" style={{minHeight:"30vh"}}>
                {!isQRScanned ? (
                  <h1>
                    <button
                      type="button"
                      className="form-control btn btn-primary submit px-3"
                      style={{ marginTop: "1rem", }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Track your Flight
                    </button>
                  </h1>
                ) : null}

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div
                          style={{
                            height: "500px",
                            width: "400px",
                            margin: "auto",
                          }}
                        >
                          <QrReader
                            scanDelay={200}
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
                      <div className="modal-footer">
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
                  <div className="row">
                    <div className="bio-row1">
                      <p>
                        <span>Passenger Name </span>: {passengerData.firstname}{" "}
                        {passengerData.lastname}
                      </p>
                    </div>
                    <div className="bio-row1">
                      <p>
                        <span>Phone </span>: {passengerData.contactnumber}
                      </p>
                    </div>
                    <div className="bio-row1">
                      <p>
                        <span>Address </span>: {passengerData.housename}{" "}
                        {passengerData.streetname}, {passengerData.district}
                      </p>
                    </div>{" "}
                    <div className="bio-row1">
                      <p>
                        <span>Email </span>: {passengerData.email}
                      </p>
                    </div>
                    <div className="bio-row1">
                      <p>
                        <span>Gender </span>: {passengerData.gender}
                      </p>
                    </div>
                    <div className="bio-row1">
                      <p>
                        <span>Age</span>: {passengerData.age}
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="panel">
                          <div className="panel-body">
                            <div className="bio-chart">
                              <div
                                style={{
                                  display: "inline",
                                  width: "100px",
                                  height: "100px",
                                }}
                              >
                                <canvas width="100" height="100px"></canvas>
                                <input
                                  className="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  defaultValue="Flyer"
                                  data-fgcolor="#e06b7d"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: "-77px",
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
                            <div className="bio-desk">
                              <h4 className="red">
                                Passenger : {passengerData.firstname}{" "}
                                {passengerData.lastname}
                              </h4>
                              <p>ID : {passengerData._id}</p>
                              <p>
                                Journey Date : {dataAsObj.date.slice(0, 10)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="panel">
                          <div className="panel-body">
                            <div className="bio-chart">
                              <div>
                                <canvas width="100" height="100px"></canvas>
                                <input
                                  className="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  defaultValue="Airpt"
                                  data-fgcolor="#4CC5CD"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: "-77px",
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
                            <div className="bio-desk">
                              <h4 className="terques">
                                Flight : {flightData.company}
                              </h4>
                              <p>ID : {flightData._id}</p>
                              <p>From : {flightData.boarding.name}</p>
                              <p>To : {flightData.to.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="panel">
                          <div className="panel-body">
                            <div className="bio-chart">
                              <div>
                                <canvas width="100" height="100px"></canvas>
                                <input
                                  className="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  defaultValue="Suitcase"
                                  data-fgcolor="#4CC5CD"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: "-77px",
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
                            <div className="bio-desk">
                              <h4 className="purple">Ticket : Suitcase Pro</h4>
                              <p>ID : {dataAsObj._id}</p>
                              <p>Seat Type : {seat}</p>
                              <p>Price : {dataAsObj.ticketcharge}₹</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="panel">
                          <div className="panel-body">
                            <div className="bio-chart">
                              <div>
                                <canvas width="100" height="100px"></canvas>
                                <input
                                  className="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  defaultValue="Scan"
                                  data-fgcolor="#4CC5CD"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: "-77px",
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
                            <div className="bio-desk">
                              <h4 className="purple">SUITCASE PRO</h4>
                              {ticketActive.isActive ? (
                                <h1>
                                  <button
                                    type="button"
                                    className="form-control btn btn-primary submit px-3"
                                    style={{ marginTop: "1rem" }}
                                    onClick={() => {
                                      cancelTicket(dataAsObj._id);
                                    }}
                                  >
                                    {" "}
                                    {cancel}
                                  </button>
                                </h1>
                              ) : (
                                <div>
                                  <button className="form-control btn btn-primary">
                                    Ticket cancelled
                                  </button>
                                </div>
                              )}

                              {isQRScanned ? (
                                <h1>
                                  <button
                                    type="button"
                                    className="form-control btn btn-primary submit px-3"
                                    style={{ marginTop: "1rem" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    {" "}
                                    Scan Flyer
                                  </button>
                                </h1>
                              ) : null}
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
  );
};

export default TrackFlight;
