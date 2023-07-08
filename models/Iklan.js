const mongoose = require ('mongoose');


const iklanSchema = new mongoose.Schema({
    jenis_iklan:  {
        type:String,
        required:[true,"tolong masukkan jenis iklan"],
    },
    
    durasi_iklan:  {
        type:Number,
        required:[true,"tolong masukkan durasi iklan"],
        min: 1,
        max:60,
    },
    harga_iklan:  {
        type:String,
        required:true,
    },
    jam_tayang:  {
        type:Date,
        required:true,
    },
});

module.exports = mongoose.model("Iklan", iklanSchema)