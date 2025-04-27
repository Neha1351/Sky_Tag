import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import "./App.css";
import AboutUs from "./Components/AboutUs";
import Homenologin from "./Components/Homenologin";
import PassLog from "./Components/Login/PassLog";
import StaffLog from "./Components/Login/StaffLog";
import AirportAuthorityLogin from "./Components/Login/AirportAuthorityLogin";

import Footer from "./Components/Footer/Footer";
import Search from "./Components/Passenger/BookFlight/Search";
import FlightBook from "./Components/Passenger/BookFlight/FlightBook";

import Payment from "./Components/Passenger/BookFlight/Payment";
import AddStaff from "./Components/Airport/AddStaff";
import ViewStaff from "./Components/Airport/ViewStaff";
import FlightQR from "./Components/Passenger/BookFlight/FlightQR";
import AddLuggage from "./Components/Passenger/AddLuggage";
import LuggageQR from "./Components/Passenger/LuggageQR";
import AdminLog from "./Components/Admin/AdminLog";
import AirportRegister from "./Components/Admin/AirportRegister";
import AddFlight from "./Components/Admin/AddFlight";
import ViewFlights from "./Components/ViewFlights";
import ViewPassengers from "./Components/Admin/ViewPassengers";
import ViewStaffAdmin from "./Components/Admin/ViewStaffAdmin";
import PassengerProfile from "./Components/Passenger/PassengerProfile";
import ViewAirports from "./Components/Admin/ViewAirports";
import TrackFlight from "./Components/Passenger/TrackFlight";
import MyTickets from "./Components/Passenger/MyTickets";
import MyLuggages from "./Components/Passenger/MyLuggages";
import TrackLuggage from "./Components/Passenger/TrackLuggage";
import AirportHome from "./Components/Airport/AirportHome";
import RegisterPassenger from "./Components/Passenger/RegisterPassenger";
import AdminHome from "./Components/Admin/AdminHome";
import ScanPassengerTicket from "./Components/Staff/ScanPassengerTicket";
import ScanLuggageUpdate from "./Components/Staff/ScanLuggageUpdate";
import ViewFlyers from "./Components/Airport/ViewFlyers";
import BookingFinal from "./Components/Passenger/BookFlight/BookingFinal";
import EditProfile from "./Components/Passenger/EditProfile";
import FlightsCardList from "./Components/Passenger/BookFlight/FlightsCardList";
import PassengerHome from "./Components/Passenger/PassengerHome";
import FlyersBooked from "./Components/Admin/FlyersBooked";
import AirportFlight from "./Components/Airport/AirportFlight";

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
          <Route path="/FlightCards" element={<FlightsCardList />} />

          {/* Flyer Bookings */}
          <Route path="/BookFlight" element={<Search />} />
          <Route path="/FlightBook/:id/:day" element={<FlightBook />} />
          <Route
            path="/BookingFinal/:id/:day/:seattype"
            element={<BookingFinal />}
          />
          <Route
            path="/payment/:flightid/:seattype/:cost/:day"
            element={<Payment />}
          />
          <Route path="/FlightQR/:id" element={<FlightQR />} />
          <Route path="/MyTickets" element={<MyTickets />} />
          <Route path="/AddLuggage" element={<AddLuggage />} />
          <Route path="/LuggageQR/:id" element={<LuggageQR />} />
          <Route path="/MyLuggages" element={<MyLuggages />} />

          {/* Flyer Trackings */}
          <Route path="/TrackFlight" element={<TrackFlight />} />
          <Route path="/TrackLuggage" element={<TrackLuggage />} />

          {/* Airport Authority */}

          <Route
            path="/login/AirportAuthority"
            element={<AirportAuthorityLogin />}
          />
          <Route path="/Login/Staff" element={<StaffLog />} />
          <Route path="/viewstaff" element={<ViewStaff />} />

          <Route path="/addStaff" element={<AddStaff />} />
          <Route path="/AirportHome" element={<AirportHome />} />
          <Route path="/ViewFlyers" element={<ViewFlyers />} />
          <Route path="/AirportFlights" element={<AirportFlight/>}/>

          <Route path="/admin" element={<AdminLog />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/airportRegister" element={<AirportRegister />} />
          <Route path="/addFlight" element={<AddFlight />} />
          <Route path="/viewFlight" element={<ViewFlights />} />
          <Route path="/viewPassengers" element={<ViewPassengers />} />
          <Route path="/viewStaffAdmin" element={<ViewStaffAdmin />} />
          <Route path="/viewAirports" element={<ViewAirports />} />
          <Route path="/FlyersBooked" element={<FlyersBooked />} />

          {/* Staff Module Routes */}

          <Route path="/VerifyPassenger" element={<ScanPassengerTicket />} />
          <Route
            path="/UpdateLuggageLocation"
            element={<ScanLuggageUpdate />}
          />
        </Routes>
      </BrowserRouter>
      {isFooterVisible && <Footer />}

      {/* <Footer /> */}
    </div>
  );
}

export default App;
