const { Router } = require('express')
const jwt = require('jsonwebtoken');
const  sharp = require('sharp')
const multer = require('multer');
const {User, Image} = require('../models/user')
const path =  require('path');
// const authController = require('../controllers/authController')
const { requireAuth, checkUser } = require('../middleware/middleware'); 
const router = Router()

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

//routes

router.get('/signup',requireAuth, (req, res)=>{
    res.render('signup', {
      title: 'Signup'
    })
})
  
router.post('/signup', async(req, res) =>{
  const {name, password} = req.body

  try {
    const user = await User.create({ name, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch(err) {
    res.json({ err });
  }
})
  
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Log in'
    })
})
  
router.post('/login', async (req, res) =>{
    const { name, password } = req.body;
  
    try {
      const user = await User.login(name, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      res.json({ err });
    }
})
  
router.get('/dashboard',requireAuth, checkUser, (req, res) => {
  Image.find().sort({createdAt: -1})
  .then(function(doc){
    res.render('dashboard', {
      title : 'dashboard' , item: doc
    })
  })
})


var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, './uploads')
    },
    filename: function(req, file, callback ) {
      callback(null, file.fieldname + ' - ' + Date.now() + path.extname(file.originalname))
    }
  })
})

router.post("/uploadEventData", upload.single('image'), (req,res)=>{
  console.log(req.file)
  var eventdata = new Image();
  eventdata.eventname = req.body.eventname;
  eventdata.eventdescription = req.body.eventdescription;
  eventdata.eventdate = req.body.eventdate;
  eventdata.img =  req.file.filename

  eventdata.save((err, doc) =>{
    if(!err){
      console.log('save successfully')
      res.redirect('/dashboard')
    }else{
      console.log(err)
    }
  })
})

router.get('/form', (req, res) => {
  res.render('form', {
    title: 'form'
  })
})

router.post('ourmembersform' , (req, res) =>{
  console.log(req.body)
})

router.get('/membership',requireAuth, checkUser, (req, res) => {
  res.render('membership', {
    title: 'Membership'
  })
})
  
router.get('/baptism',requireAuth, checkUser, (req, res) => {
  res.render('baptism', {
    title: 'Baptism'
  })
})


module.exports = router