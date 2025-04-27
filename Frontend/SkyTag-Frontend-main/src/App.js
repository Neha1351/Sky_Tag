import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import "./App.css";
import AboutUs from "./Components/AboutUs";
import Homenologin from "./Components/Homenologin";
import PassLog from "./Components/Login/PassLog";

import Footer from "./Components/Footer/Footer";
import AddStaff from "./Components/Airport/AddStaff";




import AdminLog from "./Components/Admin/AdminLog";
import AirportRegister from "./Components/Admin/AirportRegister";
import PassengerProfile from "./Components/Passenger/PassengerProfile";
import AirportHome from "./Components/Airport/AirportHome";
import RegisterPassenger from "./Components/Passenger/RegisterPassenger";
import AdminHome from "./Components/Admin/AdminHome";
import EditProfile from "./Components/Passenger/EditProfile";
import PassengerHome from "./Components/Passenger/PassengerHome";

function App() {
  const [auth, setauth] = useState(0);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("adminlog") == 1) {
      setauth(4);
      // setprofile("Admin")
    } else if (localStorage.getItem("passlogid") != null) {
      setauth(1);
      // setprofile("Passenger")
    } else if (localStorage.getItem("airportauthoritylogid") != null) {
      setauth(2);
      // setprofile("Airport")
    } else if (localStorage.getItem("stafflogid") != null) {
      setauth(3);
      // setprofile("Staff")
    } else {
      setauth(0);
      // setprofile("no log")
    }
  });

  const isFooterVisible = auth !== 3 && auth !== 4;

  return (
    <div>
      <BrowserRouter basename="/projects/flight_ims">
     

        <Navbar auth={auth} />

        <Routes>
          {/* Home Login */}
          <Route path="/" element={<Homenologin/>}/>
          {/* <Route index element={<Homenologin />} /> */}
          <Route path="/home" element={<Homenologin />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Flyer Login */}
          <Route path="/RegisterPassenger" element={<RegisterPassenger />} />
          <Route path="/Login" element={<PassLog />} />
          <Route path="/passengerProfile" element={<PassengerProfile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/PassengerHome" element={<PassengerHome />} />

          {/* Flyer Bookings */}
          

          {/* Flyer Trackings */}

          {/* Airport Authority */}


          {/* <Route path="/addStaff" element={<AddStaff />} /> */}
          <Route path="/AirportHome" element={<AirportHome />} />


          <Route path="/admin" element={<AdminLog />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/airportRegister" element={<AirportRegister />} />
   

          
        </Routes>
      </BrowserRouter>
      {isFooterVisible && <Footer />}

      {/* <Footer /> */}
    </div>
  );
}

export default App;
