const mongoose = require("mongoose");

const luggage = mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
  },
  passengerid: {
    type: mongoose.Types.ObjectId,
    ref: "passengers",
  },
   ticketid: {
    type: mongoose.Types.ObjectId,
    ref: "tickets",
  },
  status: {
    type: Boolean,
  },
  location: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
  },
});
module.exports = mongoose.model("luggages", luggage);
