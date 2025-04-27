import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/bookingfinal.css";

const BookingFinal = () => {
  const { id, seattype, day } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("passlogid") == null) {
      navigate("/home");
    }
  }, [navigate]);

  const [data, setData] = useState({
    flightid: id,
    seattype: seattype,
  });

  const [flightData, setFlightData] = useState({});
  const [cost, setCost] = useState("0");
  const [seatName, setSeatName] = useState("");

  useEffect(() => {
    axiosInstance
      .post(`/showflightById/${id}`)
      .then((res) => {
        console.log(res, "flight by id");
        if (res.data.flightdata !== undefined) {
          setFlightData(res.data.flightdata);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (data.seattype === "bc" && flightData.bcprice !== undefined) {
      setCost(flightData.bcprice);
      setSeatName("Business Class");
    } else if (data.seattype === "fc" && flightData.fcprice !== undefined) {
      setCost(flightData.fcprice);
      setSeatName("First Class");
    } else if (
      data.seattype === "ec" &&
      flightData.economyprice !== undefined
    ) {
      setCost(flightData.economyprice);
      setSeatName("Economy Class");
    }
  }, [data.seattype, flightData]);

  const submitFn = (e) => {
    e.preventDefault();

    navigate(`/payment/${data.flightid}/${data.seattype}/${cost}/${day}`);
  };

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">
                Ticket Confirmation - Suitcase Pro
              </h2>
            </div>
          </div>
          <form onSubmit={submitFn}>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-xl-3">
                  <div className="card bg-c-blue order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Departure</h6>
                      <i className="bi bi-box-arrow-up-right"></i>
                      <h2 className="text-right">
                        <span>{flightData.boarding?.name}</span>
                      </h2>
                      <p className="m-b-0">
                        {flightData.boarding?.regNo}
                        <span className="f-right">{flightData.deptime}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xl-3">
                  <div className="card bg-c-green order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Arrival</h6>
                      <i className="bi bi-box-arrow-in-down-right"></i>
                      <h2 className="text-right">
                        <span>{flightData.to?.name}</span>
                      </h2>
                      <p className="m-b-0">
                        {flightData.to?.regNo}
                        <span className="f-right">{flightData.arrtime}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xl-3">
                  <div className="card bg-c-yellow order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Travel Companion</h6>
                      <i className="bi bi-airplane-engines"></i>
                      <h2 className="text-right">
                        <span>{flightData.company} Airlines Crew</span>
                      </h2>
                      <p className="m-b-0">
                        Code: {flightData.flightcode}
                        <span className="f-right">
                          {day}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xl-3">
                  <div className="card bg-c-pink order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">{flightData.company} Airlines</h6>
                      <i className="bi bi-segmented-nav"></i>
                      <h2 className="text-right">
                        <i className="fa fa-credit-card f-left"></i>
                        <span>
                          {seatName} ₹{cost}
                        </span>
                      </h2>

                      <p className="m-b-0">
                        {flightData._id}
                        <span className="f-right">351</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="book-btn">
              <button className="btn btn-primary" type="submit">
                <span className="button__text">Proceed to Payment</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookingFinal;
