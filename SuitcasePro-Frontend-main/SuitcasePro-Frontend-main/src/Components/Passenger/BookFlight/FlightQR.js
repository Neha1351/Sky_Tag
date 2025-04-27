import React, { useEffect } from "react";
import QRCode from "qrcode.react";
import "../../../assets/css/flightqr.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const FlightQR = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("passlogid") === null) {
      navigate("/home");
    }
  }, [navigate]);

  const downloadQR = () => {
    const canvas = document.getElementById("123456");
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
    <>
      <div>
        <div className="container container-qr mt-5 mb-5 d-flex justify-content-center align-items-center">
          <div className="card card-qr">
            <div className="inner-card inner-card-qr">
              <QRCode
                id="123456"
                value={id}
                size={250}
                level={"H"}
                includeMargin={true}
              />
              <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                <h4>Ticket QR </h4>{" "}
                <span className="heart" onClick={downloadQR}>
                  <i className="bi bi-file-earmark-arrow-down"></i>
                </span>
              </div>
            </div>{" "}
            <Link
              to="/AddLuggage"
              className="btn btn-primary"
              style={{ margin: "20px auto" }}
            >
              Load Suitcase
            </Link>
            <Link
              to="/MyTickets"
              className="btn btn-primary"
              style={{ margin: "5px auto" }}
            >
              My Bookings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightQR;