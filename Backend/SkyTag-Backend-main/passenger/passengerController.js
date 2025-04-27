const express = require("express");
const mongoose = require("mongoose");
const flightModel = require("../flights/flightModel");
const passengerModel = require("./passengerModel");
const jwt = require("jsonwebtoken");

const secret = "your-secret-key"; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
};

const addPassenger = (req, res) => {
  let passenger = req.body;
  let date = new Date();

  const newpassenger = new passengerModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    contactnumber: req.body.contactnumber,
    housename: req.body.housename,
    streetname: req.body.streetname,
    district: req.body.district,
    state: req.body.state,
    pincode: req.body.pincode,
    age: req.body.age,
    gender: req.body.gender,
    doj: date,
    password: req.body.password,
    uidNo: req.body.uidNo,
  });
  newpassenger
    .save()
    .then((response) => {
      console.log(response);

      res.json({
        status: 200,
        msg: "added new passenger",
        newpassenger: response,
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

const getPassenger = (req, res) => {
  passengerModel.findOne({ _id: req.params.id }, function (err, data) {
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

const editPassenger = (req, res) => {
  const id = req.params.id;
  passengerModel
    .findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,

        contactnumber: req.body.contactnumber,
        housename: req.body.housename,
        streetname: req.body.streetname,
        district: req.body.district,
        state: req.body.state,
        pincode: req.body.pincode,
        age: req.body.age,
        gender: req.body.gender,
        uidNo: req.body.uidNo,
      }
    )
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        msg: "successfully updated",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "not updated",
      });
    });
};

//login applicant

const login = (req, res) => {
  const { email, password } = req.body;

  passengerModel
    .findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (user.password != password) {
        return res.status(500).json({ msg: "incorrect pwd" });
      }

      const token = createToken(user);

      res.status(200).json({ user, token });
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Something went wrong" });
    });
};
//validate

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log("t1", token);
  console.log("secret", secret);
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.status(401).json({ messamsgge: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.status(200).json({ msg: "ok", user: decodedToken.userId });
  });
  console.log(req.user);
};

const forgotPwd = (req, res) => {
  passengerModel
    .findOne({ email: req.body.email })
    .then((obj) => {
      console.log(obj);
      if (obj != null) {
        passengerModel
          .updateOne(
            { username: req.body.username },
            {
              password: req.body.password,
            }
          )
          .exec()
          .then((result) => {
            console.log(result.length);
            res.json({
              status: 200,
              msg: "successfully updated",
            });
          })
          .catch((err) => {
            res.json({
              status: 500,
              message: "not updated",
            });
          });
      } else {
        res.json({
          status: 500,
          message: "Username does not match",
        });
      }
    })

    .catch((err) => {
      res.json({
        status: 500,
        message: "not updated",
      });
    });
};

module.exports = {
  addPassenger,
  getPassenger,
  delPassenger,
  editPassenger,
  login,
  forgotPwd,
};
