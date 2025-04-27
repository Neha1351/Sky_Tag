const mongoose = require("mongoose");
const staffModel = require("./staffModel");
const editStaff = (req, res) => {
  const id = mongoose.Types.ObjectId(req.body.id);
  staffModel.findByIdAndUpdate(
    { _id: id },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mailid: req.body.mailid,
      contactnumber: req.body.contactnumber,
      address: req.body.address,
      age: req.body.age,
      gender: req.body.gender,
      username: req.body.username,
      aa_id: req.body.aa_id,
    }
  ),
    function (err, data) {
      if (err) {
        res.json({
          status: false,
          message: "AN ERROR OCCURED",
        });
      } else {
        res.json({
          status: true,
          message: " edited Successfully",
        });
      }
    };
};
const loginStaff = (req, res) => {
  const pwd = req.body.password;
  staffModel.findOne({ username: req.body.username }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.json({
          status: 500,
          msg: "No user",
          erorr: error,
        });
      } else if (user.password !== pwd) {
        res.json({
          status: 500,
          msg: "pwd mismatch",
          erorr: error,
        });
      } else {
        res.json({
          status: 200,
          msg: "found Staff",
          user: user, 
        });
      }
    }
  });
};
const forgotPwd = (req, res) => {
  staffModel
    .findOne({ username: req.body.username })
    .then((obj) => {
      console.log(obj);
      if (obj != null) {
        staffModel
          .updateOne(
            { username: req.body.username },
            {
              password: req.body.password,
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
const viewStaffs = (req, res) => {
  staffModel
    .find({})
    .populate("aa_id")
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        flightdata: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "error",
        erorr: err,
      });
    });
};

const viewStaffByAaid = (req, res) => {
  staffModel
    .find({ aa_id: req.params.id })
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        flightdata: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "error",
        erorr: err,
      });
    });
};
const deleteStaff = (req, res) => {
  staffModel
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      emps = data;
      console.log(data);
      res.json({
        status: 200,
        msg: "Staff terminated successfully",
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
  editStaff,
  loginStaff,
  forgotPwd,
  viewStaffByAaid,
  viewStaffs,
  deleteStaff,
};
