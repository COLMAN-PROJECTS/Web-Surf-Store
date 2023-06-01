const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const {mongoose} = require('mongoose');
const newLocal = require('custom-env');
newLocal.env('process.env.NODE_ENV', './config');
//connect to mongodb
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log(err))

//Routes
import notFoundRoutes from "./routes/notFound.routes.js";


const app = express()
app.use("*", notFoundRoutes);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.listen(process.env.Port)