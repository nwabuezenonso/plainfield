const { Router } = require('express')
const jwt = require('jsonwebtoken');
const  sharp = require('sharp')
const User = require('../models/user')
const Image = require('../models/uploadevent')
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

const multer = require('multer');
// const res = require('express/lib/response');
const upload =  multer({})

router.post('/uploadData',upload.single('upload'), (req,res)=>{
  req.body.upload = req.file.buffer
 const img = new Image(req.body.upload)
  
  img.save()
    .then((result)=>{
      res.json({result})
    })
    .catch((err)=>{
      console.log(err)
    })
})

module.exports = router