const mongoose = require("mongoose");

const passenger = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
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
  housename: {
    type: String,
  },
  streetname: {
    type: String,
  },
  district: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },

  contactnumber: {
    type: String,
    required: true,
  },

  uidNo:{
    type:Number,
    required:true,
  },

  email: {
    type: String,
    unique: true,
    required: true,

    dropDups: true,
  },
  doj: {
    type: Date,
  },
});
module.exports = mongoose.model("passengers", passenger); //parse as a model  
