
// Install packages
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const {mongoose} = require('mongoose');
const newLocal = require('custom-env');
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require('dotenv');
dotenv.config();
const methodOverride = require("method-override");
const MongoDBStore = require("connect-mongodb-session")(session);
newLocal.env(process.env.NODE_ENV, './backend/config');
const fs = require('fs');
const app = express()


//connect to mongodb
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log(err))

const store = new MongoDBStore({
    uri: process.env.CONNECTION_STRING,
    collection: 'sessions',
    mongooseConnection: mongoose.connection
});


app.use(cors());

app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
const ProductRoute = require('./routes/ProductRoute.js')
const OrderRoute = require('./routes/OrderRoute.js')
const UserRoute = require('./routes/UserRoute.js')
const BeachInfoRoute = require('./routes/BeachInfoRoute.js')
const chat = require('./controllers/chatController')


let server = require('http').createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
chat.handleChat(io);


app.use(express.static('./frontend'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride("_method"));
app.use(express.json())

app.use("/auth", require("./routes/AuthRoute"));
app.use('/products', ProductRoute);
app.use('/orders', OrderRoute);
app.use('/profile', UserRoute);
app.use('/beachInfo', BeachInfoRoute);

app.get('/fb', (req, res) => {
    res.send(process.env.FB_APP_ID)
});
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/notFound.html')
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

server.listen(process.env.PORT, () => {
    console.log('server is running')
})
