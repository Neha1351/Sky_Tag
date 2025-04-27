const mongoose = require("mongoose");

const flight = mongoose.Schema({
  flightcode: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  company: {
    type: String,
    required: true,
  },
  boarding: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "airports",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "airports",
  },
  days: {
    type: Array,
    required: true,
  },
  deptime: {
    type: String,
    required: true,
  },
  arrtime: {
    type: String,
    required: true,
  },
  economyseat: {
    type: Number,
    required: true,
  },
  bcseat: {
    type: Number,
    required: true,
  },
  fcseat: {
    type: Number,
    required: true,
  },
  economyprice: {
    type: Number,
    required: true,
  },
  bcprice: {
    type: Number,
    required: true,
  },
  fcprice: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
  },
  date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("flights", flight);
