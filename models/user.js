const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true});


const imageSchema  = new mongoose.Schema({
  eventname: {
    type: String,
  },
  eventdescription: {
    type: String,
  },
  eventdate:{
    type: String
  },
  img:{
    type: String
  }
}, {timestamps: true});


const MemberSchema  = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  mname:{
    type: String
  },
  address:{
    type: String
  },
  maritalstatus:{
    type: String
  },
  sex:{
    type: String
  },
  homeaddress:{
    type: String
  },
  City:{
    type: String
  },
  Dob:{
    type: String
  },
  country:{
    type: String
  },
  Zip:{
    type: String
  },
  email:{
    type: String
  },
  occupation:{
    type: String
  },
  gender:{
    type: String
  },
  Baptized:{
    type: String
  },
  confirmed:{
    type: String
  },
  no_of_children:{
    type: String
  },
  children_name:{
    type: String
  },
  children_dob:{
    type: String
  },
  gender_of_children:{
    type: String
  },
  Baptized_kids:{
    type: String
  },
  kid_confirmed:{
    type: String
  },
  interested_ministries:{
    type: String
  },
  Former_church:{
    type: String
  }
}, {timestamps: true});


const BaptismSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  pob: {
    type: String,
  },
  fathername: {
    type: String,
  },
  mothername: {
    type: String,
  },
  address: {
    type: String,
  },
  telephone: {
    type: String,
  },
  father_occupation: {
    type: String,
  },
}, {timestamps: true});




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
const Member = mongoose.model('member', MemberSchema);
const Baptism = mongoose.model('baptism', BaptismSchema)



module.exports = {
  User,
  Image,
  Member,
  Baptism
};