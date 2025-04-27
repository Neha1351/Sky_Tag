import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div>
      <footer id="footer" className="footer">
        <div className="footer-content">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-5 col-md-12 footer-info">
                <div  className="logo d-flex align-items-center">
                  <span>Suitcase Pro</span>
                </div>
                <p>
                  We are a team of passionate travelers and technology
                  enthusiasts who understand the importance of hassle-free
                  travel. Our mission is to make travel planning easy,
                  convenient, and affordable for everyone.
                </p>
                
              </div>

              <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                <h4>Contact Us</h4>
                <p>
                  A108 Adam Street <br />
                  New York, NY 535022
                  <br />
                  Kollam <br />
                  <br />
                  <strong>Phone:</strong> +1 5589 55488 55
                  <br />
                  <strong>Email:</strong> suitcasepro@admin.com
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-legal">
          <div className="container">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Suitcase Pro</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by{" "}
              <a href="#">
               Neha
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
