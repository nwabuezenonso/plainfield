const mongoose = require('mongoose');
// const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true
  }
});


const imageSchema  = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  img:{
    type: String
  }
});


//fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user
userSchema.statics.login = async function(name, password) {
  const user = await this.findOne({ name });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect name');
};


const User = mongoose.model('user', userSchema);
const Image = mongoose.model('img', imageSchema);



module.exports = {
  User,
  Image
};