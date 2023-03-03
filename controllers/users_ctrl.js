const User = require("../models/users");
const fs = require("fs");

exports.getAllUsers = (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message });
      return res.sendStatus(500);
    });
};

exports.insertUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });
  user
    .save()
    .then(() => {
      req.session.message = {
        type: "success",
        message: "User added successfully!",
      };
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, type: "danger" });
    });
};

exports.editUserPage = (req, res) => {
  let id = req.params.id;
  User.findById({ _id: id })
    .then((user) => {
      if (user == null) {
        res.redirect("/users");
      } else {
        return res.send(user);
      }
    })
    .catch((err) => {
      res.redirect("/users");
    });
};

exports.updateUser = (req, res) => {
  let id = req.params.id;
  let new_image = "";

  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("./client/assets/img/" + req.body.old_image);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }

  User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: new_image,
  })
    .then((obj) => {
      req.session.message = {
        type: "success",
        message: "User updated successfully!",
      };
      return res.send(obj);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, type: "danger" });
    });
};

exports.deleteUser = (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id)
    .then((result) => {
      if (result.image != "") {
        try {
          fs.unlinkSync("./client/assets/img/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      req.session.message = {
        type: "info",
        message: "User deleted successfully!",
      };
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, type: "danger" });
    });
};
