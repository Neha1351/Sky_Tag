const express = require("express");
const mongoose = require("mongoose");

const airport = require("../Airport/airportSchema");
const passengerModel = require("../passenger/passengerModel");
const staffModel = require("../staff/staffModel");
const flightModel = require("../flights/flightModel");
const ticketModel = require("../tickets/ticketModel");

const addStaff = (req, res) => {
  console.log(req.body, "body");
  let timestamp = new Date();
  const newstaff = new staffModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mailid: req.body.mailid,
    password: req.body.password,
    contactnumber: req.body.contactnumber,
    doj: req.body.doj,
    address: req.body.address,
    age: req.body.age,
    designation: req.body.designation,
    username: req.body.username,
    qualification: req.body.qualification,
    aa_id: req.params.id,
    gender: req.body.gender,
  });
  newstaff
    .save()
    .then((response) => {
      console.log(response);
      res.json({
        status: 200,
        msg: "added new Staff",
        newstaff: response,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "MongoError" || err.code === 11000) {
        console.log(new Error("username must be unique"));
        res.json({
          status: 500,
          msg: "username must be unique",
          err: err,
        });
      } else {
        res.json({
          status: 500,
          msg: "not saved in db",
          err: err,
        });
      }
    });
};

const getStaff = (req, res) => {
  staffModel.findOne({ username: req.body.username }, function (err, data) {
    if (err) {
      res.json({
        status: 500,
        msg: "error",
        erorr: err,
      });
    } else {
      if (data != null) {
        console.log(data);
        res.json({
          status: 200,
          msg: "got user data",
          user: data,
        });
      } else {
        res.json({
          status: 500,
          msg: "No user Found",
          erorr: err,
        });
      }
    }
  });
};
const delPassenger = (req, res) => {
  passengerModel
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      emps = data;
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed successfully",
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

const flyerDeleteByTicket = async (req, res) => {
  const flyer = req.params.id;
  let flag = 0;

  await ticketModel
    .find({ passengerid: flyer })
    .exec()
    .then((data) => {
      console.log("Tickets available");
      if (data.length > 0){
        flag = 1;
      } 
      
    });

  if (flag == 0) {
    await passengerModel
      .findByIdAndDelete({ _id: flyer })
      .exec()
      .then((data) => {
        console.log("Deleted");
        res.json({
          status: 200,
          msg: "Passenger Terminated",
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No data obtained",
        });
      });
  } else{
    res.json({
      status:200,
      msg:"Passenger have bookings"
    })
  }
};

const editPassenger = (req, res) => {
  const id = req.body.id;
  passengerModel
    .findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mailid: req.body.mailid,
        contactnumber: req.body.contactnumber,
        address: req.body.address,
      }
    )
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        msg: "successfully updated",
        id: id,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "not updated",
      });
    });
};

const showpassengers = (req, res) => {
  passengerModel
    .find({})
    .exec()
    .then((response) => {
      if (response != null) {
        res.json({
          status: 200,
          user: response,
        });
      } else {
        res.json({
          status: 500,
          msg: "No passengers",
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
const showFlights = (req, res) => {
  flightModel
    .find({})
    .populate("boarding")
    .populate("to")
    .exec()
    .then((response) => {
      if (response != null) {
        res.json({
          status: 200,
          flight: response,
        });
      } else {
        res.json({
          status: 500,
          msg: "No flights",
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

const addFlight = (req, res, next) => {
  let date = new Date();

  const newflight = new flightModel({
    flightcode: req.body.flightcode,
    company: req.body.company,
    boarding: req.body.boarding,
    to: req.body.to,
    days: req.body.days,
    economyseat: req.body.economyseat,
    bcseat: req.body.bcseat,
    fcseat: req.body.fcseat,
    economyprice: req.body.economyprice,
    bcprice: req.body.bcprice,
    fcprice: req.body.fcprice,
    deptime: req.body.deptime,
    arrtime: req.body.arrtime,
    date: date,
  });
  newflight
    .save()
    .then((response) => {
      console.log(response);
      res.json({
        status: 200,
        msg: "added new flight",
        newflight: response,
      });
    })
    .catch((err) => {
      console.log(err);

      res.json({
        status: 500,
        msg: "aa name invalid",
        err: err,
      });
    });
};

module.exports = {
  addStaff,
  getStaff,
  delPassenger,
  showFlights,
  showpassengers,
  addFlight,
  editPassenger,
  flyerDeleteByTicket,
};
