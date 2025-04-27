import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";
import "../../assets/css/passlog.css";

const AddLuggage = () => {

  const navigate = useNavigate();

  const [isQRScanned, setIsQRScanned] = useState(false);
  const [qrdata, setqrdata] = useState("");
  const [flightdata, setfdata] = useState({});
  const [luggagedata, setluggagedata] = useState({
    count: "",
    weight: "",
    passengerid: "",
    ticketid: "",
  });
  const [qrscandata, setqrscan] = useState({});

  useEffect(() => {
    // Redirect to "/home" if "passlogid" is not found in localStorage
    if (!localStorage.getItem("passlogid")) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    // Parse and update flightdata when qrdata has a valid length
    if (qrdata.length > 10) {
      alert("Got Data");
      const parsedData = JSON.parse(qrdata);
      setfdata(parsedData);
      console.log(parsedData);
      setIsQRScanned(true);
    }
  }, [qrdata]);

  useEffect(() => {
    // Update luggagedata with ticketid and passengerid from flightdata
    setluggagedata({
      ...luggagedata,
      ticketid: flightdata._id,
      passengerid: flightdata.passengerid,
    });
  }, [flightdata]);

  const changefn = (e) => {
    // Update luggagedata when input fields change
    setluggagedata({ ...luggagedata, [e.target.name]: e.target.value });
  };

  const submitfn = (e) => {
    e.preventDefault();
    if (luggagedata.passengerid) {
      axiosInstance
        .post(`/addluggage`, luggagedata)
        .then((res) => {
          if (res.data.status !== 500) {
            setqrscan(res.data.newLuggage);

            navigate(`/LuggageQR/${JSON.stringify(res.data.newLuggage)}`);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Please scan your Ticket to add luggage");
    }
  };

  return (
    <>
      <div
        className="row justify-content-center p-5 m-5"
        style={{ height: "100vh" }}
      >
        <div className="login-wrap p-4 p-lg-5" style={{ height: "100vh" }}>
          <div className="d-flex">
            <div className="w-100">
              <h3 className="mb-4">Suitcase Pro {luggagedata.ticketid}</h3>
            </div>
          </div>

          
          <form className="signin-form" autoComplete="off" onSubmit={submitfn}>
            <div className="form-group mb-3">
              <label className="label" htmlFor="count">
                Luggage Count
              </label>
              <input
                type="number"
                name="count"
                className="form-control"
                placeholder="Count"
                onChange={changefn}
                min="1"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="label" htmlFor="weight">
                Luggage Weight
              </label>
              <input
                type="number"
                name="weight"
                className="form-control"
                placeholder="Weight"
                min="1"
                onChange={changefn}
                required
              />
            </div>

            <div className="form-group">
              {!isQRScanned ? (
                <button
                  type="button"
                  className="form-control btn btn-primary submit px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ marginTop: "1rem" }}
                >
                  Scan QR
                </button>
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
                          onResult={(result, error) => {
                            if (!!result) {
                              setqrdata(result?.text);
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
            </div>
            {isQRScanned ? (
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control btn btn-primary submit px-3"
                  style={{ marginTop: "1rem" }}
                >
                  Get QR
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLuggage;
