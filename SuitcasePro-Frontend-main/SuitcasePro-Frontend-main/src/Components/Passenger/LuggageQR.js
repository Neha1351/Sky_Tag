import QRCode from "qrcode.react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/css/flightqr.css";

const LuggageQR = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to "/home" if "passlogid" is not found in localStorage
    if (!localStorage.getItem("passlogid")) {
      navigate("/home");
    }
  }, [navigate]);

  const { id } = useParams();

  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "Luggage.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
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
              <h4>Luggage QR</h4>{" "}
              <span className="heart" onClick={downloadQR}>
                <i className="bi bi-file-earmark-arrow-down"></i>
              </span>
            </div>
          </div>
          {" "}
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
  );
};

export default LuggageQR;
