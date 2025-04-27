import React, { useState,useEffect } from 'react'
import axiosInstance from "../baseurl";
import "../../assets/css/registeration.css";
import { useNavigate } from 'react-router-dom'


const AddStaff = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("airportauthoritylogid")==null){
      navigate('/home')
    }
  })
  const [data,setdata] = useState({ 
    firstname: "",
    lastname: "",
    mailid: "",
    password: "",
    contactnumber: "",
    doj: "",
    address: "",
    age: "",
    designation: "",
    username: "",
    qualification: "",
    gender: "",
})

    const changefn= (e)=>{
      setdata({...data, [e.target.name]:e.target.value})
    }
    const submitfn = (e)=>{
      e.preventDefault()
      console.log(data);
      console.log(localStorage.getItem('airportauthoritylogid'));
      axiosInstance.post(`/addstaff/${localStorage.getItem('airportauthoritylogid')}`, data)
      .then((res)=>{
        console.log(res,'staffadd');
        if(res.data.status==200){
          alert("Added new staff")
          // window.location.reload(false)
        }
      })
      .catch((err)=>{
        console.log(err, 'staffadderr');
      })
    };

  return (
    <>
      <div>
        <div className="form-v10">
          <div className="page-content">
            <div className="form-v10-content">
              {/* <form className="form-detail" action="#" method="post" id="myform"> */}
              <form className="form-detail" autoComplete="off" onSubmit={submitfn}>
                <div className="form-left">
                  <h2>Staff Infomation</h2>

                  <div className="form-group">
                    <div className="form-row form-row-1 ">
                      <input
                        type="text"
                        name="firstname"
                        onChange={changefn}
                        id="first_name"
                        className="input-text"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="form-row form-row-2">
                      <input
                        type="text"
                        name="lastname"
                        onChange={changefn}
                        id="last_name"
                        className="input-text"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row form-row-1">
                    <input
                      type="text"
                      onChange={changefn}
                      name="address"
                      id="house_name"
                      className="input-text"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <input
                        type="text"
                        name="age"
                        onChange={changefn}
                        id="age"
                        className="input-text"
                        placeholder="age"
                        required
                      />
                    </div>
                    <div className="form-row form-row-2">
                      <input
                        type="date"
                        className="input-text"
                        placeholder="Date"
                        name="doj"
                        onChange={changefn}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <select name="gender" onChange={changefn}>
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Preffer not to say</option>
                    </select>
                    <span className="select-btn">
                      <i className="zmdi zmdi-chevron-down"></i>
                    </span>
                  </div>
                  <div className="form-row form-row-2">
                    <input
                      type="text"
                      name="contactnumber"
                      onChange={changefn}
                      className="phone"
                      id="phone"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="form-right">
                  <h2>Staff Login</h2>

                  <div className="form-row">
                    <input
                      type="text"
                      name="username"
                      onChange={changefn}
                      id="username"
                      className="input-text"
                      required
                      placeholder="User Name"
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      name="mailid"
                      onChange={changefn}
                      id="your_email"
                      className="input-text"
                      required
                      pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="password"
                      onChange={changefn}
                      name="password"
                      id="your_password"
                      className="input-text"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group">
                    <div className="form-row form-row-1">
                      <input
                        type="text"
                        name="designation"
                        onChange={changefn}
                        className="designation"
                        id="designation"
                        placeholder="Designation"
                        required
                      />
                    </div>
                    <div className="form-row form-row-2">
                      <input
                        type="text"
                        name="qualification"
                        onChange={changefn}
                        className="qualification"
                        id="qualification"
                        placeholder="Qualification"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-last">
                    <input
                      type="submit"
                      name="register"
                      className="register"
                      value="ADD STAFF"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
