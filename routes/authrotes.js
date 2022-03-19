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

router.get('/signup', (req, res)=>{
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
    res.render('dashboard', {
      title: 'Dashboard'
    })
})

// router.get('/me', (req, res) => {
//   Image.find({}, (err, items) => {
//       if (err) {
//           console.log(err);
//           res.status(500).send('An error occurred', err);
//       }
//       else {
//         res.render('imagesPage', { items: items });
//       }
//   });
// });


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


var upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, cb) =>{
      cb(null, './uploads')
    },
    filename: function(req, file, callback ) {
      callback(null, file.fieldname + '-' + Date.now + path.extname(file.originalname))
    }
  })
})

router.post("/uploadphoto", upload.single('image'), (req,res)=>{
  console.log(req.file)
  var x = new Image();
  x.fname = req.body.fname;
  x.lname = req.body.lname;
  x.img =  req.file.filename

  x.save((err, doc) =>{
    if(!err){
      console.log('save successfully')
      res.redirect('/working')
    }else{
      console.log(err)
    }
  })
})

router.get("/learn",(req,res)=>{
  res.render("imagesPage");
})

router.get("/working",(req,res)=>{
  Image.find()
  .then(function(doc){
    res.render('working', {
      item: doc
    })
  })
})



module.exports = router