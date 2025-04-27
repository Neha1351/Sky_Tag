const express = require("express");
const mongoose = require("mongoose");
const flightModel = require("../flights/flightModel");
const passengerModel = require("../passenger/passengerModel");
const luggageModel = require("./luggageModel");
const nodemailer = require("nodemailer");
const ticketModel = require("../tickets/ticketModel");

const addLuggage = async (req, res) => {
  let timestamp = new Date();
  let location = "Did not recived at airport";
  let tdate;
  let flag = 0;

  await ticketModel
    .findById({ _id: req.body.ticketid })
    .exec()
    .then((datas) => {
      tdate = datas.date;
    });

  let expdate = new Date();

  expdate.setDate(tdate.getDate() - 1);

  if (tdate.getDate() <= 5) {
    expdate.setMonth(expdate.getMonth() + 1);
  }

  console.log('tdate',tdate,tdate.getMonth()+1, tdate.getDate());

  console.log("expdate", expdate, expdate.getMonth()+1, expdate.getDate());
  console.log(
    "timestamp",
    timestamp,
    timestamp.getMonth()+1,
    timestamp.getDate()
  );

  if (
    timestamp.getMonth() == expdate.getMonth() &&
    timestamp.getDate() < expdate.getDate()
  ) {
    flag = 1;
  } else if (timestamp.getMonth() > expdate.getMonth()) {
    flag = 1;
  } else if (timestamp.getMonth() < expdate.getMonth()) {
    flag = 0;
  } else if (
    timestamp.getMonth() == expdate.getMonth() &&
    timestamp.getDate() > expdate.getDate()
  ) {
    flag = 0;
  }

  await luggageModel
    .findOne({ ticketid: req.body.ticketid })
    .then((response) => {
      console.log(response, "res");
      if (!response) {
        const newLuggage = new luggageModel({
          passengerid: req.body.passengerid,
          timestamp: timestamp,
          ticketid: req.body.ticketid,
          weight: req.body.weight,
          count: req.body.count,
          status: true,
          location: location,
        });
        if (flag == 1) {
          newLuggage
            .save()
            .then((response) => {
              console.log(response);

              res.json({
                status: 200,
                msg: "added Luggages",
                newLuggage: response,
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: 500,
                msg: "Luggages not added",
              });
            });
        } else {
          console.log("can't be added");
          res.json({
            status: 500,
            msg: "Luggages cannot be updated as the date has been exceeded",
          });
        }
      } else {
        res.json({
          status: 500,
          msg: "passenger already added their luggages",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Luggages not added",
      });
    });
};

// const addLuggage = async (req, res) => {
//   try {
//     const timestamp = new Date();
//     const location = "Did not receive at the airport";
//     const ticketId = req.body.ticketid;

//     // Find the ticket information
//     const ticketData = await ticketModel.findById(ticketId).exec();
//     if (!ticketData) {
//       return res.status(400).json({ status: 400, msg: "Ticket not found" });
//     }

//     const ticketBookingDate = new Date(ticketData.date);
//     const oneDayBeforeBooking = new Date(ticketBookingDate);
//     oneDayBeforeBooking.setDate(oneDayBeforeBooking.getDate() - 1);

//     if (timestamp <= oneDayBeforeBooking) {
//       const existingLuggage = await luggageModel.findOne({ ticketid: ticketId }).exec();
//       if (!existingLuggage) {
//         const newLuggage = new luggageModel({
//           passengerid: req.body.passengerid,
//           timestamp: timestamp,
//           ticketid: ticketId,
//           weight: req.body.weight,
//           count: req.body.count,
//           status: true,
//           location: location,
//         });

//         await newLuggage.save();

//         return res.status(200).json({
//           status: 200,
//           msg: "Luggage added successfully",
//           newLuggage: newLuggage,
//         });
//       } else {
//         return res.status(400).json({
//           status: 400,
//           msg: "Passenger has already added their luggage",
//         });
//       }
//     } else {
//       return res.status(400).json({
//         status: 400,
//         msg: "Luggage cannot be added as the date has been exceeded",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: 500,
//       msg: "Error adding luggage",
//     });
//   }
// };



//edit luggage by staff

const updateLuggageLoc = (req, res) => {
  let timestamp = new Date();
  let location = req.body.location;
  luggageModel
    .findByIdAndUpdate({ _id: req.body.id }, { location: location })
    .then((response) => {
      res.json({
        status: 200,
        msg: "Luggages Updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Luggages not updated",
      });
    });
};

//
const viewLuggageById = (req, res) => {
  luggageModel
    .findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//view luggage by ticketid
const viewLuggageByTicketId = (req, res) => {
  luggageModel
    .find({ ticketid: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        luggage: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const viewLuggageByPid = (req, res) => {
  luggageModel
    .find({ passengerid: req.params.id })
    .populate("ticketid")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
module.exports = {
  addLuggage,
  updateLuggageLoc,
  viewLuggageById,
  viewLuggageByTicketId,
  viewLuggageByPid,
};
