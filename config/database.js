const mongoose = require ('mongoose')
const dotenv = require ('dotenv');
dotenv.config();
const{DB_MONGODB,}=process.env;

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

module.exports = database