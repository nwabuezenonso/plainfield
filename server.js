const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const bodyParser =  require('body-parser') 
  const {User,Image,Member} =require('./models/user')
const Authrouters = require('./routes/authrotes');

//set up the express function
const app = express()
const port = process.env.PORT

// middleware
app.use(express.static('public'));
app.use(express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.json())
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//database connection

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true , useUnifiedTopology: true})
  .then((result) => app.listen(port, () => {console.log('Connected to port ' + port)}))
  .catch((err) => console.log(err));

  app.use(Authrouters)

// app.get('*', checkUser)
app.get('/', (req, res)=>{
  Image.find().sort({ createdAt: 1})
  .then(function(doc){
    res.render('index', {
      title : 'Home' , item: doc
    })
  })  
})

app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About us'
  })
})

app.get('/event', (req, res)=>{
  Image.find().sort({ createdAt: 1})
  .then(function(doc){
    res.render('event', {
      title : 'Event' , item: doc
    })
  })  
})

app.get('/contact', (req, res)=>{
  res.render('contact', {
    title: 'Contact us'
  })
})

app.get('/baptismForm', (req, res)=>{
  res.render('baptismForm', {
    title: 'BaptiseForm'
  })
})



app.use(Authrouters)
//Error routes
app.use((req, res)=>{
  res.status(400).send("Page not available")
})
