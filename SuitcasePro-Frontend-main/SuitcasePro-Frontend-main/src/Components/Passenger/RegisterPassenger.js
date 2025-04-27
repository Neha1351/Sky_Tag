import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import "../../assets/css/payment.css";

const RegisterPassenger = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactnumber: "",
    housename: "",
    streetname: "",
    district: "",
    state: "",
    pincode: "",
    age: "",
    gender: "",
    password: "",
    uidNo: "",
    code: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axiosInstance
      .post("/addpassenger", data)
      .then((response) => {
        if (response.data.status === 500) {
          alert(response.data.msg);
        } else {
          console.log("Submitted", response);
          alert(response.data.msg);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error", error); // Changed to console.error from console.log
      });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <div>
        <div className="form-v10">
          <div className="page-content">
            <div className="form-v10-content">
              <form
                className="form-detail"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div className="form-left">
                  <h2>General Information</h2>
                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <div
                        className="inputbox-payment mt-3"
                        style={{ marginBottom: "0rem" }}
                      >
                        <input
                          type="text"
                          name="firstname"
                          onChange={handleChange}
                          id="first_name"
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[A-Za-z]+"
                          title="First Name should not contains any numbers or special symbols"
                        />
                        <span>First Name</span>
                      </div>
                    </div>
                    <div className="form-row form-row-2">
                      <div
                        className="inputbox-payment mt-3"
                        style={{ marginBottom: "0rem" }}
                      >
                        <input
                          type="text"
                          name="lastname"
                          onChange={handleChange}
                          id="last_name"
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[A-Za-z]+"
                          title="Last Name should not contains any numbers or special symbols"
                        />
                        <span>Last Name</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div
                      className="inputbox-payment mt-3"
                      style={{ marginBottom: "0rem" }}
                    >
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        id="your_email"
                        className="form-control form-control-payment"
                        required="required"
                        pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                        title="Email Id - @email.com"
                      />
                      <span>Email</span>
                    </div>
                  </div>
                  <div className="form-row">
                    <select
                      name="gender"
                      onChange={handleChange}
                      className="form-control form-control-payment"
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="select-btn">
                      <i className="zmdi zmdi-chevron-down"></i>
                    </span>
                  </div>
                  <div className="form-row">
                    <div className="inputbox-payment mt-3">
                      <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        id="your_password"
                        className="form-control form-control-payment"
                        required="required"
                        minLength={6}
                      />
                      <span>Password</span>
                    </div>
                  </div>
                </div>
                <div className="form-right">
                  <h2>Contact Details</h2>
                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <div
                        className="inputbox-payment mt-3"
                        style={{ marginBottom: "0rem" }}
                      >
                        <input
                          type="text"
                          onChange={handleChange}
                          name="housename"
                          id="house_name"
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[A-Za-z0-9 ]+"
                        />
                        <span>House Name</span>
                      </div>
                    </div>
                    <div className="form-row form-row-2">
                      <div
                        className="inputbox-payment mt-3"
                        style={{ marginBottom: "0rem" }}
                      >
                        <input
                          type="text"
                          onChange={handleChange}
                          name="streetname"
                          id="street_name"
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[A-Za-z0-9 ]+"
                          title="Street Name should not contains any special symbols"
                        />
                        <span>Street Name</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <div className="inputbox-payment">
                        <input
                          type="number"
                          name="age"
                          onChange={handleChange}
                          id="age"
                          min={1}
                          max={123}
                          maxLength={3}
                          minLength={1}
                          className="form-control form-control-payment"
                          required="required"
                        />
                        <span>Age</span>
                      </div>
                    </div>
                    <div className="form-row form-row-2">
                      <div className="inputbox-payment">
                        <input
                          type="text"
                          name="district"
                          onChange={handleChange}
                          id="district"
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[A-Za-z]+"
                          title="District Name should not contains any numbers or special symbols"
                        />
                        <span>District</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <div className="inputbox-payment">
                        <input
                          type="text"
                          name="state"
                          onChange={handleChange}
                          id="state"
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[A-Za-z]+"
                          title="State Name should not contains any numbers or special symbols"
                        />
                        <span>State</span>
                      </div>
                    </div>
                    <div className="form-row form-row-2">
                      <div className="inputbox-payment">
                        <input
                          type="text"
                          name="pincode"
                          onChange={handleChange}
                          id="pincode"
                          className="form-control form-control-payment"
                          required="required"
                          minLength={6}
                          maxLength={6}
                          pattern="[0-9]+"
                          title="Pincode should not contains any alphabets or special symbols"
                        />
                        <span>Pincode</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <div className="inputbox-payment">
                        <input
                          type="text"

                          name="uidNo"
                          onChange={handleChange}
                          id="uidNo"
                          minLength={16}
                          maxLength={16}
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[0-9]+"
                          title="Aadhaar Number should not contains any alphabets or special symbols and Unique"
                        />
                        <span>Aadhaar</span>
                      </div>
                    </div>
                    <div className="form-row form-row-2">
                      <div className="inputbox-payment">
                        {" "}
                        <input
                          type="number"
                          name="contactnumber"
                          onChange={handleChange}
                          minLength={10}
                          maxLength={10}
                          className="form-control form-control-payment"
                          required="required"
                          pattern="[0-9]+"
                          title="Phone Number should not contains any alphabets or special symbols"
                        />{" "}
                        <span>Contact Number</span>{" "}
                      </div>
                    </div>
                  </div>

                  <div className="form-row-last">
                    <input
                      type="submit"
                      name="register"
                      className="register"
                      value="Register"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPassenger;
