import React, { useEffect, useState } from "react";
import "../../../assets/css/flightcards.css";
import axiosInstance from "../../baseurl";

const FlightsCardList = () => {
  const [flightdata, setfdata] = useState([]);

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

  return (
    <div className="container">
      <div className="container h-100" style={{marginBottom:"10rem"}}>
        <div className="row align-middle">
          <div style={{ textAlign: "center", position: "relative" }}>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "300",
                marginTop: "150px",
              }}
            >
              Flights Sheduled
            </h2>
          </div>
          {flightdata.length
            ? flightdata.map((a, index) => {
                return (
                  <div className="col-md-6 col-lg-4 columnFlight" key={index}>
                    <div className={`card card-flight gr-${(index % 3) + 1}`}>
                      <div className="txt">
                        <h1>
                          {"From "}
                          {a.boarding.name} <br />
                        </h1>
                        <h1>
                          {"To "}
                          {a.to.name} <br />
                        </h1>
                        <p>
                          
                            {a.days + " "} {"only"}
                            <br />
                          
                        </p>
                      </div>

                      <div className="ico-card">
                        <div className="card-flight">
                          <i className=" bi bi-airplane-engines"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default FlightsCardList;
