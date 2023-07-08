const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require ('morgan');
const router = require ('./routes/index');
const{DB_MONGODB,}=process.env;

// Connection MongoDB
const database = module.exports = () => {
    const connectionParams = {
        useNewParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(DB_MONGODB);
        console.log("Connected to mongodb");
    } catch (error){
        console.log(error);
        console.log("failed");
    }
};

database();

app.listen(2023,()=>{
    console.log("Server started on port 2023")
});


app.use(cors());

app.use(morgan('dev'));

// Routes

app.use(express.json())

app.use(router);

