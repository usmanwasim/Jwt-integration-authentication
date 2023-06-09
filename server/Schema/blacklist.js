const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  token: { type: "string", require: true },
});

module.exports = mongoose.model("blacklist", Schema);
