const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    symbol:{
        type:String,
    },
    id:{
        type:String,
    }
});

module.exports = mongoose.model('Coins',coinSchema);