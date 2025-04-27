const mongoose = require("mongoose");

const staff = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: { type: String },
  aa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "airports",
  },
  designation: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: String,
    required: true,
  },
  mailid: {
    type: String,
    required: true,
  },

  qualification: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  doj: {
    type: Date,
  },
  timestamp: {
    type: Date,
  },
});
module.exports = mongoose.model("staffs", staff);
