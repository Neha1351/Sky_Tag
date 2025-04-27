import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/passengerprofile.css'
import axiosInstance from "../baseurl";

const PassengerProfile = () => {


    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem("passlogid")==null){
        navigate('/home')
      }
    })
    let mainnavigate = useNavigate();
    const [profile, setprofile] = useState({});
  
    useEffect(() => {
      axiosInstance
        .post(`/getpassenger/${localStorage.getItem("passlogid")}`)
        .then((res) => {
          console.log(res, "get passenger by id ");
          if (res.data.status != 200) {
            mainnavigate("/home");
          } else {
            setprofile(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
   
  
    useEffect(() => {
      if (localStorage.getItem("passlogid") == null) {
        mainnavigate("/home");
      }
    });


    const dateOfJoining = new Date(profile.doj)


  return (
    <>
    <div>
    <section class="section section-profile about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text-profile go-to">
                            <h3 class="dark-color">{profile.firstname} {profile.lastname}</h3>
                            <h6 class="theme-color lead">Travelling with us since - {dateOfJoining.toDateString()}</h6>
                           
                            <div class="row about-list-profile">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Birthday</label>
                                        <p>4th april 1998</p>
                                    </div>
                                    <div class="media">
                                        <label>Age</label>
                                        <p>{profile.age} Yr</p>
                                    </div>
                                    <div class="media">
                                        <label>Gender</label>
                                        <p style={{textTransform: "capitalize"}}>{profile.gender}</p>
                                    </div>
                                    <div class="media">
                                        <label>Residence</label>
                                        <p>India</p>
                                    </div>
                                    <div class="media">
                                        <label>Address</label>
                                        <p>{profile.housename}, {profile.streetname}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{profile.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Phone</label>
                                        <p>{profile.contactnumber}</p>
                                    </div>
                                    <div class="media">
                                        <label>Skype</label>
                                        <p>skype.0404</p>
                                    </div>
                                    <div class="media">
                                        <label>Status</label>
                                        <p>Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar-profile">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt=""/>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    </div>
    </>
  )
}

export default PassengerProfile