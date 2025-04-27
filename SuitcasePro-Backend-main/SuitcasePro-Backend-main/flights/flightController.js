const express = require("express");
const mongoose = require("mongoose");
const flightModel = require("../flights/flightModel");

const ticketModel = require("../tickets/ticketModel");
const passengerModel = require("../passenger/passengerModel");

const checkDay = (day, arr) => {
  const flightList = [];
  let count = 0;
  arr.forEach((val) => {
    console.log(val.days);
    if (val.days.indexOf(day) >= 0) {
      console.log(`code ${val.flightcode}`);
      count++;
    }
  });
  return count;
};
const checkDayFLightsList = (day, arr) => {
  const flightList = [];

  arr.forEach((val) => {
    console.log(val.days);
    if (val.days.indexOf(day) >= 0) {
      flightList.push(`${val.flightcode}`);
    }
  });
  console.log(flightList);
  return flightList;
};

const searchFlights = (req, res) => {
  // const pid=req.body.pid
  console.log(req.body.day);
  let d = new Date(req.body.day).getDay();
  console.log(d + 1);
  let days = "";
  switch (d + 1) {
    case 1:
      days = "Sunday";
      break;
    case 2:
      days = "Monday";
      break;
    case 3:
      days = "Tuesday";
      break;
    case 4:
      days = "Wednesday";
      break;
    case 5:
      days = "Thursday";
      break;
    case 6:
      days = "Friday";
      break;
    case 7:
      days = "Saturday";
      break;
  }
  console.log("days :", days);
  flightModel
    .find({
      to: req.body.to,
      boarding: req.body.from,
    })
    .exec()
    .then((response) => {
      const countOfFlights = checkDay(days, response);
      const FlightsAvailable = checkDayFLightsList(days, response);
      console.log(countOfFlights, "countOfFlights");
      console.log(FlightsAvailable, "FlightsAvailable");
      // if (response.length != 0 && countOfFlights > 0) {
      //   res.json({
      //     status: 200,
      //     flight: response,
      //   });
      // } else {
      //   res.json({
      //     status: 500,
      //     msg: "No flights found",
      //   });
      // }
      if (response.length != 0 && FlightsAvailable.length > 0) {
        flightModel
          .find({
            flightcode: { $in: FlightsAvailable },
          })
          .exec()
          .then((data) => {
            res.json({
              status: 200,
              msg: "Flights Found",
              flight: data,
            });
          })
          .catch((err) => {
            res.json({
              status: 500,
              msg: "Flight Fetch Error",
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        erorr: err,
      });
    });
};
const checkSeatAvailability = (req, res) => {
  console.log(req.params.flightcode);
  flightModel
    .findOne({
      flightcode: req.params.flightcode,
    })
    .populate("from")
    .populate("to")
    .exec()
    .then((response) => {
      console.log(response);
      if (
        response.economyseat > 0 ||
        response.bcseat > 0 ||
        response.fcseat > 0
      ) {
        res.json({
          status: 200,
          filghtdata: response,
        });
      } else {
        res.json({
          status: 500,
          msg: "sorry no seats available",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "error",
        erorr: err,
      });
    });
};
const showboarding = (req, res) => {
  flightModel
    .aggregate([{ $project: { boarding: 1, _id: 0 } }])
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        flightdata: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "error",
        erorr: err,
      });
    });
};
const showdestinations = (req, res) => {
  flightModel
    .aggregate([{ $project: { to: 1, _id: 0 } }])
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        flightdata: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "error",
        erorr: err,
      });
    });
};

const bookTicket = (req, res) => {
  let bc,
    fc,
    ec,
    ticketcost = 0;
  passengerModel
    .findById({ _id: req.body.userid })
    .exec()
    .then((resp) => {
      flightModel
        .findById({ _id: req.body.flightid })
        .exec()
        .then((response) => {
          if (req.body.seattype == "bc") {
            bc = response.bcseat - 1;
            ticketcost = response.bcprice;
          } else if (req.body.seattype == "fc") {
            fc = response.fcseat - 1;
            ticketcost = response.fcprice;
          } else if (req.body.seattype == "ec") {
            ec = response.economyseat - 1;
            ticketcost = response.economyprice;
          }
          flightModel
            .findByIdAndUpdate(
              { _id: req.body.flightid },
              {
                bcseat: bc,
                fcseat: fc,
                economyseat: ec,
              }
            )
            .exec()
            .then((response) => {
              let tcost = ticketcost + (25 / 100) * ticketcost;
              let newTicket = new ticketModel({
                passengerid: resp._id,
                flightid: req.body.flightid,
                seattype: req.body.seattype,
                ticketcharge: ticketcost,
                totalamount: tcost,
                isActive: true,
                date: req.body.date, //booking date
              });
              newTicket
                .save()
                .then((response1) => {
                  res.json({
                    status: 200,
                    ticketdata: response1,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    status: 500,
                    msg: "ticket not generated",
                    erorr: err,
                  });
                });
            });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: 500,
            msg: "error",
            erorr: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "none loggedin",
      });
    });
};

const viewFlightById = (req, res) => {
  flightModel
    .findById({ _id: req.params.id })
    .populate("boarding")
    .populate("to")
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        flightdata: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "error",
        erorr: err,
      });
    });
};

const deleteFlight = async (req, res) => {
  try {
    // Check if there are any tickets associated with the flight
    const tickets = await ticketModel.find({ flightid: req.params.id }).exec();

    if (tickets.length > 0) {
      // If there are tickets, don't allow flight deletion
      console.log("Tickets");
      res.status(200).json({
        status: 200,
        msg: "Flight cannot be deleted, as there are tickets booked",
      });
    } else {
      // If no tickets are associated, proceed with flight deletion
      const deletedFlight = await flightModel
        .findByIdAndDelete(req.params.id)
        .exec();

      if (deletedFlight) {
        res.status(200).json({
          status: 200,
          msg: "Flight cancelled successfully",
          data: deletedFlight,
        });
      } else {
        res.status(500).json({
          status: 500,
          msg: "Flight not found or could not be deleted",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      Error: err.message,
    });
  }
};

// const deleteFlight = (req, res) => {

//   flightModel
//     .findByIdAndDelete({ _id: req.params.id })
//     .exec()
//     .then((data) => {
//       console.log(data);
//       res.json({
//         status: 200,
//         msg: "Data removed successfully",
//         data: data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({
//         status: 500,
//         msg: "No Data obtained",
//         Error: err,
//       });
//     });
// };

module.exports = {
  searchFlights,
  checkSeatAvailability,
  bookTicket,
  showdestinations,
  showboarding,
  viewFlightById,
  deleteFlight,
};
