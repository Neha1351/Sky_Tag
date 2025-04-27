import React, { useEffect, useState } from "react";
import "../../assets/css/trackflight.css";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import axiosInstance from "../baseurl";

const TrackLuggage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("passlogid") === null) {
      navigate("/home");
    }
  }, [navigate]);

  const [data, setData] = useState("No result");
  const [dataasobj, setdataobj] = useState({});
  const [passengerdetails, setpassengerdetails] = useState({});

  useEffect(() => {
    if (data.length > 10) {
      const parsedData = JSON.parse(data);
      if (parsedData.seattype) {
        alert("Please provide a valid Luggage QR");
      } else {
        axiosInstance
          .post(`/viewLuggageById/${parsedData._id}`)
          .then((res) => {
            console.log(res, " ticket data");
            setdataobj(res.data.data);
          })
          .catch((err) => {
            console.error(err);
          });
        axiosInstance
          .post(`/getpassenger/${parsedData.passengerid}`)
          .then((res) => {
            console.log(res, "passenger details");
            setpassengerdetails(res.data.user);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [data]);

  useEffect(() => {
    console.log(dataasobj, "luggage data ");
  }, [dataasobj]);

  return (
    <>
      <div className="container bootstrap snippets bootdey">
        <div className="row">
          <div className="profile-info1 col-md-9">
            <div className="panel" style={{ marginTop: "5rem" }}>
              <div className="panel-body bio-graph-info" style={{minHeight:"30vh"}}>
                <h1>
                  <button
                    type="button"
                    className="form-control btn btn-primary submit px-3"
                    style={{ marginTop: "1rem" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Track your Luggage
                  </button>
                </h1>
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
                            onResult={(result, error) => {
                              if (result) {
                                setData(result.text);
                              }

                              if (error) {
                                // console.error(error);
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

                {dataasobj.status ? (
                  <div className="row">
                    <div className="bio-row1">
                      <p>
                        <span>Passenger Name </span>:{" "}
                        {passengerdetails.firstname} {passengerdetails.lastname}
                      </p>
                    </div>
                    <div className="bio-row1">
                      <p>
                        <span>Phone </span>: {passengerdetails.contactnumber}
                      </p>
                    </div>
                    <div className="bio-row1">
                      <p>
                        <span>Address </span>: {passengerdetails.housename}{" "}
                        {passengerdetails.streetname},{" "}
                        {passengerdetails.district}
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
                                <canvas width="100" height="100"></canvas>
                                <input
                                  className="knob"
                                  data-width="100"
                                  data-height="100"
                                  data-displayprevious="true"
                                  data-thickness=".2"
                                  value="Flyer"
                                  data-fgcolor="#e06b7d"
                                  data-bgcolor="#e8e8e8"
                                  style={{
                                    width: "54px",
                                    height: "33px",
                                    position: "absolute",
                                    verticalAlign: "middle",
                                    marginTop: "33px",
                                    marginLeft: "-77px",
                                    border: "0",
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                    fontVariant: "normal",
                                    fontStretch: "normal",
                                    fontSize: "20px",
                                    lineHeight: "normal",
                                    fontFamily: "Arial",
                                    textAlign: "center",
                                    color: "rgb(224, 107, 125)",
                                    padding: "0",
                                    background: "none",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="bio-desk">
                              <h4 className="red">
                                Passenger : {passengerdetails.firstname}{" "}
                                {passengerdetails.lastname}
                              </h4>
                              <p>ID : {passengerdetails._id}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="panel">
                          <div className="panel-body">
                            <div className="bio-chart">
                              <div>
                                <canvas width="100" height="100"></canvas>
                                <input
                                  className="knob"
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
                                    marginLeft: "-77px",
                                    border: "0",
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                    fontVariant: "normal",
                                    fontStretch: "normal",
                                    fontSize: "20px",
                                    lineHeight: "normal",
                                    fontFamily: "Arial",
                                    textAlign: "center",
                                    color: "rgb(76, 197, 205)",
                                    padding: "0",
                                    background: "none",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="bio-desk">
                              <h4 className="terques">
                                Luggage Location : {dataasobj.location}
                              </h4>
                              <p>Luggage Count : {dataasobj.count}</p>
                              <p>Luggage Weight : {dataasobj.weight}</p>
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
    </>
  );
};

export default TrackLuggage;
