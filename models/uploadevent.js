const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const imageSchema  = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
  },
  eventdescription: {
    type: String,
    required: true
  },
  eventdate: {
    type: Date,
    required: true
  },
  upload:{
    type: Buffer,
    contentType: String
  }
});






const Image = mongoose.model('img', imageSchema);

module.exports = Image;