import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import axiosInstance from "../baseurl";
import "../../assets/css/mytickets.css";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [flightData, setFlightData] = useState({});
  const today = new Date();

  useEffect(() => {
    axiosInstance
      .post(`/viewTicketByPid/${localStorage.getItem("passlogid")}`)
      .then((res) => {
        if (res.data.data) {
          setTickets(res.data.data);
          console.log(res.data.data, "ticket data");
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
        .post(`/showflightById/${ticket.flightid}`)
        .then((res) => {
          if (res.data.flightdata) {
            // console.log(res.data.flightdata);
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

  const cancelTicket = (ticketId) => {
    console.log("This code works");
    console.log(ticketId);
    axiosInstance
      .post(`/cancelticketbyid/${ticketId}`)
      .then((response) => {
        console.log("Ticket Cancelled");
        alert("Ticket Cancelled");
        //  console.log(response, "cancelled data")
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const downloadQR = (ticketId) => {
    console.log("clicked");
    const canvas = document.getElementById(ticketId);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "FlightQR.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="passenger-home">
      <div
        className="container d-flex flex-column align-items-center position-relative"
        data-aos="zoom-out"
      >
        <div className="container container-ticket d-flex align-items-center justify-content-center position-relative flex-wrap">
          {tickets.length ? (
            tickets.map((a) => {
              const ticketDate = new Date(a.date);
              const isDateExpired = ticketDate < today;

              // Determine the background color based on the date comparison
              const backgroundColor = isDateExpired ? "#ff6347" : "#8fbc8f";

              return (
                <div
                  className="card card-ticket d-flex position-relative flex-column"
                  style={{ backgroundColor }}
                  key={a._id} // Use flightid as the key
                >
                  <div className="imgContainer imgcontainer-ticket">
                    <QRCode
                      id={a._id.toString()} // Use flightid as the id
                      value={JSON.stringify(a)}
                      style={{
                        margin: "auto",
                        width: "250px",
                        height: "250px",
                      }}
                      size={250}
                      level="H"
                      includeMargin={true}
                    />
                    <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                      <h4>{a.date.slice(0, 10)}</h4>{" "}
                      <span
                        className="heart"
                        style={{color:"green", backgroundColor:"#90ee90"}}
                        onClick={() => downloadQR(a._id)}
                      >
                        <i className="bi bi-cloud-download"></i>
                      </span>
                      {
                        a.isActive ? (
                          <span
                            className="heart"
                            onClick={() => {
                              cancelTicket(a._id);
                            }}
                          >
                            <i className="bi bi-x-octagon"></i>
                          </span>
                        ) : (
                          <span
                            className="heart"
                            onClick={() => {
                              alert("The ticket was already canceled");
                            }}
                          >
                            <i className="bi bi-x-octagon-fill"></i>
                          </span>
                        )

                        // <div className="btn btn-primary">Ticket Cancelled</div>
                      }
                    </div>
                  </div>
                  <div className="content">
                    <h2>{flightData[a.flightid]?.company}</h2>

                    <table>
                      <thead>
                        <tr>
                          <th>Departure</th>
                          <th>Destination</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{flightData[a.flightid]?.boarding?.name}</td>
                          <td>{flightData[a.flightid]?.to?.name}</td>
                        </tr>
                      </tbody>
                    </table>
                    {
                      a.isActive ? (
                        <div className="btn btn-success">Ticket : Active</div>
                      ) : (
                        <div className="btn btn-danger">Ticket : Cancelled</div>
                      )

                      // <div className="btn btn-primary">Ticket Cancelled</div>
                    }
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
  );
};
export default MyTickets;
