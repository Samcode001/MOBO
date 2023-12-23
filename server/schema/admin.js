const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const USER = mongoose.model("Admin", adminSchema);

module.exports = {
  USER,
};
