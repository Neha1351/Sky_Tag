import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import "../../../assets/css/passengerhome.css";
import axiosInstance from "../../baseurl";
import ShowFlights from "./ShowFlights";

const Search = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("passlogid") == null) {
      navigate("/home");
    }
  }, [navigate]);

  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Add 1 day to the current date
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState({
    to: "",
    from: "",
    day: "",
  });

  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] =useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [allAirports, setAllAirports] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewApprovedAirports`)
      .then((res) => {
        console.log(res, "all airports");
        if (res.data.data !== undefined) {
          setAllAirports(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post("/showboardings")
      .then((res) => {
        console.log(res, "boardings");
        const uniqueData = res.data.flightdata.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (obj) => JSON.stringify(obj) === JSON.stringify(value)
            )
        );
        setFrom(uniqueData);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/showdestinations`)
      .then((res) => {
        console.log(res, "destinations");
        const uniqueData = res.data.flightdata.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (obj) => JSON.stringify(obj) === JSON.stringify(value)
            )
        );
        setTo(uniqueData);
      })
      .catch((err) => {
        console.log(err);
        setTo([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/searchflights`, data)
      .then((res) => {
        console.log(res, "search result");
        if (res.data.status === 500) {
          setSearchResult([]);
          setSearch(false)
        } else {
          setSearchResult(res.data.flight);
          setSearch(true)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="passenger-home">
        <div
          className="container d-flex flex-column align-items-center position-relative"
          data-aos="zoom-out"
        >
          <form className="search-destination" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md align-items-end">
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <div className="form-field">
                    <select
                      className="form-control"
                      onChange={handleChange}
                      name="from"
                      value={data.from}
                    >
                      <option value="">Boarding</option>
                      {from.map((a) => {
                        const airport = allAirports.find(
                          (i) => i._id === a.boarding
                        );
                        return (
                          <option key={a.boarding} value={a.boarding}>
                            {airport ? airport.name : ""}
                          </option>
                        );
                      })}
                    </select>
                    <div className="icon">
                      <span>
                        <i className="bi bi-geo-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md align-items-end">
                <div className="form-group">
                  <label htmlFor="to">To</label>
                  <div className="form-field">
                    <div className="icon">
                      <span>
                        <i className="bi bi-geo-alt"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      onChange={handleChange}
                      name="to"
                      value={data.to}
                    >
                      <option value="">Destination</option>
                      {to.map((a) => {
                        const airport = allAirports.find((i) => i._id === a.to);
                        return (
                          <option key={a.to} value={a.to}>
                            {airport ? airport.name : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md align-items-end">
                <div className="form-group">
                  <label htmlFor="day">Date</label>
                  <div className="form-field">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date"
                      name="day"
                      value={data.day}
                      min={getCurrentDate()} // Set the min attribute to the current date
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md align-self-end">
                <div className="form-group">
                  <div className="form-field">
                    <input
                      type="submit"
                      value="Search"
                      className="form-control btn btn-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        
        <ShowFlights flights={searchResult} day={data.day} />
      </div>
    </>
  );
};

export default Search;
