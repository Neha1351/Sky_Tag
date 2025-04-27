import React, { useEffect, useState } from "react";
import "../../assets/css/trackflight.css";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import axiosInstance from "../baseurl";
const ScanLuggageUpdate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("stafflogid") == null) {
      navigate("/home");
    }
  });
  const [data, setData] = useState("No result");
  const [flag, setFlag] = useState(0);

  const [dataasobj, setdataobj] = useState({});
  const [passengerdetails, setpassengerdetails] = useState({});

  const [location, setlocation] = useState("");

  useEffect(() => {
    if (data.length > 10) {
      console.log(JSON.parse(data));
      alert("got data");
      setFlag(1);

      if (JSON.parse(data).seattype) {
        alert("Please prodive a valid Luggage QR");
      } else {
        axiosInstance
          .post(`/viewLuggageById/${JSON.parse(data)._id}`)
          .then((res) => {
            console.log(res, " ticket data");
            setdataobj(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });

        axiosInstance
          .post(`/getpassenger/${JSON.parse(data).passengerid}`)
          .then((res) => {
            // console.log(res, "passenger details");
            setpassengerdetails(res.data.user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [data]);

  useEffect(() => {
    // console.log(dataasobj, "luggage data ");
  });

  const subfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/updateLuggageLoc`, { location: location, id: dataasobj._id })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Updated location");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="profile-info1 col-md-9">
            <div class="panel" style={{ marginTop: "5rem" }}>
              <div class="panel-body bio-graph-info">
                {!flag ? (
                  <h1>
                    {" "}
                    <button
                      type="button"
                      className="form-control btn btn-primary submit px-3"
                      style={{ marginTop: "1rem" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Suitcase Scanner
                    </button>
                  </h1>
                ) : null}

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

                {dataasobj.status ? (
                  <>
                    <div class="row">
                      <div class="bio-row1">
                        <p>
                          <span>Passenger Name </span>:{" "}
                          {passengerdetails.firstname}{" "}
                          {passengerdetails.lastname}
                        </p>
                      </div>
                      <div class="bio-row1">
                        <p>
                          <span>Phone </span>: {passengerdetails.contactnumber}
                        </p>
                      </div>
                      <div class="bio-row1">
                        <p>
                          <span>Address </span>: {passengerdetails.housename}{" "}
                          {passengerdetails.streetname} ,
                          {passengerdetails.district}
                        </p>
                      </div>{" "}
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
                                    value={passengerdetails.age}
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
                                <h4 class="red">
                                  Passenger : {passengerdetails.firstname}
                                  {passengerdetails.lastname}
                                </h4>
                                <p>ID : {passengerdetails._id}</p>
                                {/* <p>Journey Date : {  dataasobj.date.slice(0,10)}</p> */}
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
                                <h4 class="terques">
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
                    <div className="row">
                      <div
                        className="col d-flex"
                        style={{
                          marginTop: "1rem",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <form onSubmit={subfn}>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            name="location"
                            required
                            onChange={(e) => {
                              setlocation(e.target.value);
                            }}
                          >
                            <option value="">Select Luggage location</option>
                            <option>Drop-off Point / Luggage Check-in</option>
                            <option>Baggage Tag / Luggage Tag</option>
                            <option>Baggage Sorting Area</option>
                            <option>Baggage Handling System</option>
                            <option>Tarmac / Apron Area</option>
                            <option>Aircraft Loading</option>
                            <option>Flight</option>
                            <option>Arrival Airport</option>
                            <option>Baggage Claim Area</option>
                            <option>Baggage Reclaim</option>
                            <option>Customs Inspection </option>
                          </select>
                          <button
                            className="btn btn-primary"
                            style={{
                              marginTop: "1rem",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            Update Location
                          </button>
                          {flag ? (
                            <h1>
                              {" "}
                              <button
                                type="button"
                                className=" btn btn-primary submit px-3"
                                style={{ marginTop: "1rem" }}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                Suitcase Scanner
                              </button>
                            </h1>
                          ) : null}
                        </form>
                      </div>
                    </div>
                  </>
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

export default ScanLuggageUpdate;
