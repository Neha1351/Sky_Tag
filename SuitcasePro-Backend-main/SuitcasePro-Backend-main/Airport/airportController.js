const flightModel = require("../flights/flightModel");
const ticketModel = require("../tickets/ticketModel");
const airports = require("./airportSchema");

//Customer Registration

const addAirport = (req, res) => {
  const newAirport = new airports({
    name: req.body.name,
    regNo: req.body.regNo,
    username: req.body.username,
    password: req.body.password,
    ho: req.body.ho,
  });
  newAirport
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Airport Added",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Airport not Added",
        Error: err,
      });
    });
};
// Registration -- finished

//Login Airport
const loginAirport = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  airports
    .findOne({ username: username })
    .exec()
    .then((data) => {
      if (password == data.password) {
        res.json({
          status: 200,
          msg: "Login successfully",
          data: data,
        });
      } else {
        res.json({
          status: 500,
          msg: "password Mismatch",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "User not found",
        Error: err,
      });
    });
};

//Login Airport --finished

//View all Airports

const viewAirports = (req, res) => {
  airports
    .find({ isactive: true })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view Airports finished

//update Airport by id
const editAirportById = (req, res) => {
  airports
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        regNo: req.body.regNo,
        username: req.body.username,

        ho: req.body.ho,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
// view cust by id
const viewAirportById = (req, res) => {
  airports
    .findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      emps = data;
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
const deleteAirportById = async (req, res) => {
  let flag = 0;
  await flightModel
    .find({ $or: [{ boarding: req.params.id }, { to: req.params.id }] })
    .exec()
    .then((dataa) => {
      if (dataa.length > 0) flag = 1;
    });
  if (flag == 0) {
    await airports
      .findByIdAndDelete({ _id: req.params.id })
      .exec()
      .then((data) => {
        emps = data;
        console.log(data);
        res.json({
          status: 200,
          msg: "Airport removed successfully",
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
  } else {
    res.json({
      status: 500,
      msg: "Airport cannot be deleted, as we have flights here",
    });
  }
};

//forgotvPawd Customer by id
const forgotPwd = (req, res) => {
  airports
    .findOneAndUpdate(
      { username: req.body.username },
      {
        password: req.body.password,
      }
    )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

//approve Airport by id
const approveAirport = (req, res) => {
  airports
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        isactive: true,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
//View all Airport requests

const viewAirportReqs = (req, res) => {
  airports
    .find({ isactive: false })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewAirportNames = (req, res) => {
  airports
    .find({ isactive: true }, { name: 1, _id: 0 })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewPassengersByAid = async (req, res) => {
  let date = req.body.date;
  let datas = [];
  let flights = [];
  await ticketModel
    .find({ date: { $eq: date } })
    .exec()
    .then((data) => {
      datas = data;
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
  await flightModel
    .find({ $or: [{ boarding: req.params.id }, { to: req.params.id }] })

    .exec()
    .then((dataas) => {
      console.log(dataas);
      dataas.map((x) => {
        flights.push(x._id.toString());
      });
    });
  console.log("flights", flights);
  await ticketModel
    .find({ flightid: { $in: flights } })
    .populate("passengerid")
    .exec()
    .then((dataaaas) => {
      res.json({
        status: 200,
        msg: "Data obtained",
        data: dataaaas,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// Arrival and Departure apis
// -----------------------------------

const viewArrivalOfPassengersByAid = async (req, res) => {
  let date = new Date(req.body.date);
  let datas = [];
  let flights = [];

  await flightModel
    .find({ to: req.params.id })
    .exec()
    .then((dataas) => {
      console.log(dataas);
      dataas.map((x) => {
        flights.push(x._id.toString());
      });
    });
  console.log("flights", flights);
  await ticketModel
    .find({ flightid: { $in: flights } })
    .populate("flightid")
    .populate("passengerid")

    .exec()
    .then((dataaaas) => {
      dataaaas.map((x) => {
        if (
          x.date.getDate() == date.getDate() &&
          x.date.getMonth() == date.getMonth() &&
          x.date.getYear() == date.getYear()
        )
          datas.push(x);
      });

      res.json({
        status: 200,
        msg: "Data obtained",
        data: datas,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewdepartueOfPassengersByAid = async (req, res) => {
  let date = new Date(req.body.date);
  let datas = [];
  let flights = [];

  await flightModel
    .find({ boarding: req.params.id })
    .exec()
    .then((dataas) => {
      console.log(dataas);
      dataas.map((x) => {
        flights.push(x._id.toString());
      });
    });
  console.log("flights", flights);
  await ticketModel
    .find({ flightid: { $in: flights } })
    .populate("flightid")
    .populate("passengerid")

    .exec()
    .then((dataaaas) => {
      dataaaas.map((x) => {
        console.log("x=", x.date, "", date);
        if (
          x.date.getDate() == date.getDate() &&
          x.date.getMonth() == date.getMonth() &&
          x.date.getYear() == date.getYear()
        )
          datas.push(x);
      });
      res.json({
        status: 200,
        msg: "Data obtained",
        data: datas,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewAirportFlights = (req, res) => {
  const aId = req.params.id;
  console.log(aId);
  flightModel
    .find({ $or: [{ boarding: req.params.id }, { to: req.params.id }] })
    .populate("boarding")
    .populate("to")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Flights retrieved",
        airportFlights: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status: 500,
        msg: "Internal Error",
        Error: err,
      });
    });
};

module.exports = {
  addAirport,
  viewAirportById,
  editAirportById,
  loginAirport,
  forgotPwd,
  viewAirports,
  deleteAirportById,
  viewAirportReqs,
  approveAirport,
  viewAirportNames,
  viewPassengersByAid,
  viewArrivalOfPassengersByAid,
  viewdepartueOfPassengersByAid,
  viewAirportFlights,
};
