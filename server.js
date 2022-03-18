const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const bodyParser =  require('body-parser') 
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
  .then((result) => app.listen(port, () => {console.log('Connected to ' + port)}))
  .catch((err) => console.log(err));

  app.use(Authrouters)

// app.get('*', checkUser)
app.get('/', (req, res)=>{
    res.render('index', {title: 'Home'})
})

app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About us'
  })
})

app.get('/event', (req, res)=>{
  res.render('event', {
    title: 'Event'
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


app.get('/form', (req, res) => {
  res.render('form', {
    title: 'form'
  })
})

app.use(Authrouters)
//Error routes
app.use((req, res)=>{
  res.send('<h1>ERROR HAS OCCURED, contact the development team quick</h1>')
})
