let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  role: String,
  email: String,
  uuid: String,
});
let User = mongoose.model("User", Schema);
module.exports = User;