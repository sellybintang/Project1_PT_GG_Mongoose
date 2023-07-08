const mongoose = require ('mongoose');


const iklanSchema = new mongoose.Schema({
    jenis_iklan:  {
        type:String,
        required:[true,"tolong masukkan jenis iklan"]
    },
});

module.exports = mongoose.model("Iklan", iklanSchema);