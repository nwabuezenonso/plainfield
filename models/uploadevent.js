const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const imageSchema  = new mongoose.Schema({
  eventname: {
    type: String,
  },
  eventdescription: {
    type: String,
  },
  eventdate: {
    type: Date,
  },
  upload:{
    type: Buffer
  }
});






const Image = mongoose.model('img', imageSchema);

module.exports = Image;