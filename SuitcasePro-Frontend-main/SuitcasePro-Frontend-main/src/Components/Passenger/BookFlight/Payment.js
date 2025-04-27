import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";
import "../../../assets/css/payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const { flightid, seattype, cost, day } = useParams();

  useEffect(() => {
    if (localStorage.getItem("passlogid") === null) {
      navigate("/home");
    }
  }, [navigate]);

  const [qrdata, setQrData] = useState({});

  const receivedData = {
    userid: localStorage.getItem("passlogid"),
    flightid: flightid,
    seattype: seattype,
    date: day,
  };

  const submitFn = (e) => {
    e.preventDefault();
    console.log(receivedData, "final data after payment");
    axiosInstance
      .post("/bookticket", receivedData)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res, "Payment done. Final booking details");
          alert("Payment Successfully Completed");
          setQrData(res.data.ticketdata);
          navigate(`/FlightQR/${JSON.stringify(res.data.ticketdata)}`);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((e) => {
        console.log("Error", e);
        alert("Something went wrong.");
      });
  };

  return (
    <div>
      <form onSubmit={submitFn}>
        <section className="ftco-section">
          <div className="container container-payment">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">Payment</h2>
              </div>
            </div>
            <div className="container mt-5 px-5 payment">
              <div className="mb-4">
                <h2>Confirm Booking and pay</h2>
                <span>
                  Please make the payment, after which you can access all the
                  booking details and QR.
                </span>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="card card-payment p-3">
                    <h6 className="text-uppercase">Payment details</h6>
                    <div className="inputbox-payment mt-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-payment"
                        required
                        pattern="[A-Za-z ]+"
                        title="Name should not contains any numbers or special symbols"
                      />
                      <span>Name on card</span>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="inputbox-payment mt-3 mr-2">
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-payment"
                            required
                            minLength={16}
                            maxLength={16}
                            pattern="[0-9]+"
                            title="Card Number should not contains any alphabets or special symbols and Unique"
                          />
                          <i
                            className="bi bi-credit-card-2-front"
                            style={{ fontSize: "25px", lineHeight: "10px" }}
                          ></i>
                          <span>Card Number</span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="d-flex flex-row">
                          <div className="inputbox-payment mt-3 mr-2">
                            <input
                              type="number"
                              name="name"
                              min={1}
                              max={12}
                              className="form-control form-control-payment"
                              required
                            />

                            <span>Expiry Month</span>
                          </div>
                          <div className="inputbox-payment mt-3 mr-2">
                            <input
                              type="number"
                              min={2023}
                              max={2053}
                              name="name"
                              className="form-control form-control-payment"
                              required
                            />

                            <span>Expiry Year</span>
                          </div>

                          <div className="inputbox-payment mt-3 mr-2">
                            <input
                              type="number"
                              name="name"
                              className="form-control form-control-payment"
                              required
                              min={1}
                              max={999}
                            />
                            <span>CVV</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mb-4">
                      <h6 className="text-uppercase">Billing Address</h6>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <div className="inputbox-payment mt-3 mr-2">
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-payment"
                              required
                              pattern="[A-Za-z0-9 ]+"
                              title="Address should not contains any special symbols"
                            />
                            <span>Street Address</span>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="inputbox-payment mt-3 mr-2">
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-payment"
                              required
                              pattern="[A-Za-z ]+"
                              title="City Name should not contains any numbers or special symbols"
                            />
                            <span>City</span>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-6">
                          <div className="inputbox-payment mt-3 mr-2">
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-payment"
                              required
                              pattern="[A-Za-z ]+"
                              title="State Name not contains any numbers or special symbols"
                            />
                            <span>State/Province</span>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="inputbox-payment mt-3 mr-2">
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-payment"
                              required
                              minLength={6}
                              maxLength={6}
                              pattern="[0-9]+"
                            />
                            <span>Zip code</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 mb-4 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary px-3">
                      Pay र {cost}
                    </button>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card-payment card-blue-payment p-3 text-white mb-3">
                    <span>You have to pay</span>
                    <div className="d-flex flex-row align-items-end mb-3">
                      <h1 className="mb-0  yellow-payment">र {cost} /-</h1>
                    </div>

                    <span>
                      Your ticket would be generated and seat details would be
                      informed after Flight Chart is prepared.
                    </span>

                    <div className="hightlight-payment">
                      <span>
                        *Flight Chart is prepared in accordance with user
                        demands.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Payment;
