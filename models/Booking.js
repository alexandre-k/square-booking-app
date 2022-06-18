const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: String,
  customerId: String,
  orderId: String,
  bookingId: String,
  status: String,
});

module.exports = mongoose.model("Booking", schema);
