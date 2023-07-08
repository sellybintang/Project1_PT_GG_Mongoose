const express = require('express');
const app = express();
const database = require('./config/database')
const cors = require('cors');
const morgan = require ('morgan');
const router = require ('./app/routes/index');


// Connection MongoDB


database();

app.listen(2023,()=>{

    console.log("Server started on port 2023")
});


app.use(cors());

app.use(morgan('dev'));

// Routes

app.use(express.json())

app.use(router);

