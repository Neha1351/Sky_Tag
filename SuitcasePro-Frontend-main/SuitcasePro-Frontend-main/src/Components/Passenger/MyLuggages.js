import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import "../../assets/css/mytickets.css";

const MyLuggages = () => {
  const [tickets, setTickets] = useState([]);
  const [flightData, setFlightData] = useState({});
  const today = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to "/home" if "passlogid" is not found in localStorage
    if (!localStorage.getItem("passlogid")) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .post(`/viewLuggageByPid/${localStorage.getItem("passlogid")}`)
      .then((res) => {
        console.log(res, " My Luggages");
        if (res.data.data) {
          setTickets(res.data.data);
          fetchFlightDetails(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    


  }, []);

  const fetchFlightDetails = (ticketData) => {
    // Fetch flight details for each ticket
    ticketData.forEach((ticket) => {
      axiosInstance
        .post(`/showflightById/${ticket.ticketid?.flightid}`)
        .then((res) => {
          if (res.data.flightdata) {
            console.log("Flight Data",res.data.flightdata);

            setFlightData((prevData) => ({
              ...prevData,
              [ticket.flightid]: res.data.flightdata,
            }));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  const downloadQR = (ticketId) => {
    const canvas = document.getElementById(ticketId);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "FlightQR.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <div className="passenger-home">
        <div
          className="container d-flex flex-column align-items-center position-relative"
          data-aos="zoom-out"
        >
          <div className="container container-ticket d-flex align-items-center justify-content-center position-relative flex-wrap">
            {tickets.length ? (
              tickets.map((a) => {
                const ticketDate = new Date(a.ticketid.date.slice(0, 10));
                const isDateExpired = ticketDate < today;

                // Determine the background color based on the date comparison
                const backgroundColor = isDateExpired ? "#ff6347" : "#8fbc8f";

                return (
                  <div
                    className="card card-ticket d-flex position-relative flex-column"
                    style={{ backgroundColor }}
                    key={a._id} // Added a unique key to each card
                  >
                    <div className="imgContainer imgcontainer-ticket">
                      <QRCode
                        id={a._id.toString()}
                        value={JSON.stringify(a)}
                        style={{
                          margin: "auto",
                          width: "250px",
                          height: "250px",
                        }}
                        size={250}
                        level={"H"}
                        includeMargin={true}
                      />
                      <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                        <h4>{a.ticketid.date.slice(0, 10)}</h4>{" "}
                        <span
                          className="heart"
                          onClick={() => downloadQR(a._id)}
                        >
                          <i className="bi bi-file-earmark-arrow-down"></i>
                        </span>
                      </div>
                    </div>
                    <div className="content">
                    {
                      a.ticketid.isActive ? (  <h2>Suitcase Pro</h2>) :  (<div className="btn btn-danger">This ticket has been cancelled</div>)
                    }
                 

                      <table>
                        <thead>
                          <tr>
                            <th>Boarding</th>
                            <th>Arrival</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{flightData[a.flightid]?.boarding?.name}</td>
                            <td>{flightData[a.flightid]?.to?.name}</td>
                          </tr>

                          <tr>
                            <th>Suitcase</th>
                            <th>Weight</th>
                          </tr>
                          <tr>
                            <td>{a.count}</td>
                            <td>{a.weight} Kg</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <div className="card">
                  <h1 style={{ textAlign: "center" }}>No Tickets to display</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLuggages;
