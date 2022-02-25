const express = require('express');
// const mongoose = require('mongoose')
// const User = require('./models/model')
// const Authrouters = require('./routes/authRoutes');
// const cookieParser = require('cookie-parser');
// const { requireAuth, checkUser } = require('./middleware/authmiddleware'); 
// const { sendWelcomeEmail } = require('./emails/mail')
// const sendMail = require('./mail')

//set up the express function
const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}))
// app.use(cookieParser());

// view engine
// app.set('view engine', 'ejs');

//database connection
// const dbURI = 'mongodb+srv://ExpenseTracker:trackyourexpensenow@cluster0.mofh6.mongodb.net/Tracker?retryWrites=true&w=majority'
// mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
//   .then((result) => console.log('data running'))
//   .catch((err) => console.log(err));

//routes
// app.get('*', checkUser)
app.get('/', (req, res)=>{
  res.sendFile('./public/index.html', {root: __dirname})
})

// app.post('/signup', async(req, res)=>{
//   const { email, password } = req.body;

//   try {
//     const user = await User.create({ email, password });
//     console.log(user)
//     const token = createToken(user._id);
//     res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.render('index')
//   }
//   catch(err) {
//     console.log(err);
//   }
// })
// app.get('/member',requireAuth,  (req, res) =>{
//   res.render('member')
// })
// app.post("/email", (req, res) =>{
//   const {email, subject} = req.body
//   console.log('Data: ', req.body)
  
//   sendMail(email, subject , function(err,data){
//       if(err){
//           res.status(500).json({message: 'Internal Error'});
//       }else{
//           res.json({message: 'Email sent!!!!'})
//       }
//   })
//   res.json({message: 'Message recieved!'})
// })
// app.use(Authrouters);

//Error routes
// app.use((req, res)=>{
//   res.status(404).render('404')
// })

app.listen(port, () => {'Server is running on port 3000'})