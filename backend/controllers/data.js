const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: { type: 'String', required: true },
  price: { type: 'Number', default: 0 }
});

const data = mongoose.model("data", dataSchema);

module.exports = data;