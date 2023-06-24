// Install packages
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const {mongoose} = require('mongoose');
const newLocal = require('custom-env');
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
newLocal.env(process.env.NODE_ENV, './backend/config');

//connect to mongodb
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log(err))

//Routes
const ProductRoute = require('./routes/ProductRoute.js')
const OrderRoute = require('./routes/OrderRoute.js')
const UserRoute = require('./routes/UserRoute.js')

const app = express()

app.use(express.static('./frontend'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.use('/products', ProductRoute);
app.use('/orders', OrderRoute);
app.use('/profile', UserRoute);
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/notFound.html')
})
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.listen(process.env.PORT)