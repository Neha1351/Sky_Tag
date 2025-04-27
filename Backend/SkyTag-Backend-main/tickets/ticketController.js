const ticketModel = require("./ticketModel.js");
const mongoose = require("mongoose");
const passengerModel = require("../passenger/passengerModel.js");
const flightModel = require("../flights/flightModel.js");

const ticketdata = (req, res) => {
  let data = {};
  ticketModel
    .findById({ _id: mongoose.Types.ObjectId(req.body.id) })
    .exec()
    .then((response) => {
      if (response.isActive == true) {
        passengerModel
          .findById({ _id: mongoose.Types.ObjectId(response.passengerid) })
          .exec()
          .then((response1) => {
            flightModel
              .findById({ _id: mongoose.Types.ObjectId(response.flightid) })
              .exec()
              .then((response2) => {
                data = {
                  ticket: response,
                  passenger: response1,
                  flight: response2,
                };
                res.json({
                  status: 200,
                  data: data,
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 500,
                  msg: "no data found",
                  erorr: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "no data found",
              erorr: err,
            });
          });
      } else {
        req.json({
          status: 500,
          msg: "Ticket already cancelled",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "no data found",
        erorr: err,
      });
    });
};

const cancelTicket = (req, res) => {
  ticketModel
    .findOneAndUpdate(
      { passengerid: mongoose.Types.ObjectId(req.body.passengerid) },
      { isActive: false }
    )
    .exec()
    .then((response) => {
      if (response.seattType == "fc") {
        flightModel
          .findById({ _id: mongoose.Types.ObjectId(response.flightid) })

          .exec()
          .then((response1) => {
            flightModel
              .findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(response.flightid) },
                { fcseat: response1.fcseat + 1 }
              )

              .exec()
              .then((resp) => {
                res.json({
                  status: 200,
                  msg: "ticket cancelled succesfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 500,
                  msg: "not updated",
                  erorr: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "not updated",
              erorr: err,
            });
          });
      } else if (response.seattType == "bc") {
        flightModel
          .findById({ _id: mongoose.Types.ObjectId(response.flightid) })

          .exec()
          .then((response1) => {
            flightModel
              .findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(response.flightid) },
                { bcseat: response1.bcseat + 1 }
              )

              .exec()
              .then((resp) => {
                res.json({
                  status: 200,
                  msg: "ticket cancelled succesfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 500,
                  msg: "not updated",
                  erorr: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "not updated",
              erorr: err,
            });
          });
      } else {
        flightModel
          .findById({ _id: mongoose.Types.ObjectId(response.flightid) })

          .exec()
          .then((response1) => {
            flightModel
              .findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(response.flightid) },
                { economyseat: response1.economyseat + 1 }
              )

              .exec()
              .then((resp) => {
                res.json({
                  status: 200,
                  msg: "ticket cancelled succesfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 500,
                  msg: "not updated",
                  erorr: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "not updated",
              erorr: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "not updated",
        erorr: err,
      });
    });
};

const cancelTicketById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  ticketModel
    .findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
    { isActive: false } 
    )
    .exec()
    .then((data) => {
      if (response.seattType == "fc") {
        flightModel
          .findById({ _id: mongoose.Types.ObjectId(response.flightid) })

          .exec()
          .then((response1) => {
            flightModel
              .findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(response.flightid) },
                { fcseat: response1.fcseat + 1 }
              )

              .exec()
              .then((resp) => {
                res.json({
                  status: 200,
                  msg: "ticket cancelled succesfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 500,
                  msg: "not updated",
                  erorr: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "not updated",
              erorr: err,
            });
          });
      } else if (response.seattType == "bc") {
        flightModel
          .findById({ _id: mongoose.Types.ObjectId(response.flightid) })

          .exec()
          .then((response1) => {
            flightModel
              .findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(response.flightid) },
                { bcseat: response1.bcseat + 1 }
              )

              .exec()
              .then((resp) => {
                res.json({
                  status: 200,
                  msg: "ticket cancelled succesfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 500,
                  msg: "not updated",
                  erorr: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "not updated",
              erorr: err,
            });
          });
      } else {
        flightModel
          .findById({ _id: mongoose.Types.ObjectId(response.flightid) })

          .exec()
          .then((response1) => {
            flightModel
              .findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(response.flightid) },
                { economyseat: response1.economyseat + 1 }
              )

              .exec()
              .then((resp) => {
                res.json({
                  status: 200,
                  msg: "ticket cancelled succesfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 500,
                  msg: "not updated",
                  erorr: err,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "not updated",
              erorr: err,
            });
          });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Ticket Not Found",
      });
    });
};

//view my tickets

const viewTicketByPid = (req, res) => {
  ticketModel
    .find({ passengerid: req.params.id })
    // .populate("flightid")
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        msg: "data obtained",
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "no data found",
        erorr: err,
      });
    });
};

const viewTicketById = (req, res) => {
  ticketModel
    .findOne({ _id: req.params.id })
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        msg: "data obtained",
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "no data found",
        erorr: err,
      });
    });
};


const viewAllTicketsBooked = (req, res) =>{
  ticketModel
    .find({})
    .populate("passengerid")
    .populate({
      path: "flightid",
      populate: {
        path: "boarding to",
      },
    })
    .exec()
    .then((data)=>{
      res.json({
        status:200,
        msg:"Ticket Data retrieved",
        data:data
      })
    })
    .catch((err)=>{
      res.json({
        status:500,
        msg:"Failed",
        error:err
      })
    })
}



module.exports = {
  ticketdata,
  cancelTicket,
  viewTicketByPid,
  cancelTicketById,
  viewTicketById,
  viewAllTicketsBooked,
};
