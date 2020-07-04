const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for log
const LogSchema = new Schema({
  logData: {
    type: String,
    required: [true, 'The log text field is required']
  }
})

//create model for log
const Log = mongoose.model('log', LogSchema);

module.exports = Log;