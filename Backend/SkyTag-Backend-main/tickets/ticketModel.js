const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  passengerid: {
    type: mongoose.Types.ObjectId,
    ref: "passengers",
    required: true,
  },
  flightid: {
    type: mongoose.Types.ObjectId,
    ref: "flights",
  },
  seattype: {
    type: String,
    required: true,
  },
  ticketcharge: {
    type: Number,
  },
  totalamount: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  date:{
    type:Date,
    required:true
  }
});
module.exports = mongoose.model("tickets", ticketSchema);
