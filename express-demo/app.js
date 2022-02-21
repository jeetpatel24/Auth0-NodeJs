var express = require('express')
var app = express()
var indexRouter = require('./routes/index')
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true})) //to handle any url encoded query strings.     extended:true  means we are going to be able to handle nested data coming through in the url encoded query string
app.use(express.static('public'))    // to serve static content

// auth
app.use(auth(config));

app.use('/', indexRouter);

app.listen(3000, ()=> {
    console.log('Express is running on port 3000');
})