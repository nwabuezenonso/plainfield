const { Router } = require('express')
const jwt = require('jsonwebtoken');
const  sharp = require('sharp')
const {User, Image} = require('../models/user')
const path =  require('path')
var fs = require('fs');
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

router.get('/me', (req, res) => {
  Image.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
        res.render('imagesPage', { items: items });
      }
  });
});


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



//setting up multer
var multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })



router.get("/me",(req,res)=>{
  res.render("index");
})
router.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
      contentType:req.file.mimetype,
      image:new Buffer.from(encode_img,'base64')
  };
  Image.create(final_img,function(err,result){
      if(err){
          console.log(err);
      }else{
          console.log(result.img.Buffer);
          console.log("Saved To database");
          res.contentType(final_img.contentType);
          res.send(final_img.image);
      }
  })
})





module.exports = router