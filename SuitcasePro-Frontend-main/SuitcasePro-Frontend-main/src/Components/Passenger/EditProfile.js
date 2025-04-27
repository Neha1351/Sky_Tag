import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("passlogid") == null) {
      navigate("/home");
    }
  });

  const [data, setdata] = useState({
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
  });
  useEffect(() => {
    axiosInstance
      .post(`/getpassenger/${localStorage.getItem("passlogid")}`)
      .then((res) => {
        console.log(res, "get passenger by id ");
        if (res.data.status != 200) {
          navigate("/home");
        } else {
          setdata(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/editpassenger/${localStorage.getItem("passlogid")}`, data)
      .then((res) => {
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          console.log("Submitted", res);
          alert(res.data.msg);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span class="font-weight-bold">{data.firstname} {data.lastname}</span>
              <span class="text-black-50">{data.email}</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <form onSubmit={submitfn}>
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels-editProfile">Name</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="first name"
                      name="firstname"
                      value={data.firstname}
                      onChange={changefn}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels-editProfile">Surname</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      name="lastname"
                      value={data.lastname}
                      onChange={changefn}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels-editProfile">Email ID</label>
                    <input
                      type="email"
                      class="form-control-editProfile"
                      placeholder="enter email id"
                      name="email"
                      value={data.email}
                      onChange={changefn}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels-editProfile">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="Mobile Number"
                      name="contactnumber"
                      value={data.contactnumber}
                      onChange={changefn}
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels-editProfile">House Name</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="House Name"
                      name="housename"
                      value={data.housename}
                      onChange={changefn}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels-editProfile">Street Name</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="Street Name"
                      name="streetname"
                      value={data.streetname}
                      onChange={changefn}
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels-editProfile">State</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="State"
                      name="state"
                      value={data.state}
                      onChange={changefn}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels-editProfile">Postcode</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="Postcode"
                      name="pincode"
                      value={data.pincode}
                      onChange={changefn}
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels-editProfile">UID</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="Aadhaar Number"
                      name="uidNo"
                      value={data.uidNo}
                      onChange={changefn}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels-editProfile">Age</label>
                    <input
                      type="text"
                      class="form-control-editProfile"
                      placeholder="Age"
                      name="age"
                      value={data.age}
                      onChange={changefn}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="labels-editProfile">Gender</label>

                  <select
                    onChange={changefn}
                    name="gender"
                    class="form-control-editProfile"
                    required
                    value={data.gender}
                  >
                    <option value="">{data.gender}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="row mt-3"></div>
                <div class="col-md-6">
                  <label class="labels-editProfile">Password</label>
                  <input
                    type="text"
                    class="form-control-editProfile"
                    name="password"
                    value={data.password}
                    onChange={changefn}
                    placeholder="password"
                  />
                </div>
                <div class="mt-5 text-center">
                  <button class="btn btn-primary profile-button" type="submit">
                    Save Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
