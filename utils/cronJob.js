const cron = require('node-cron');
const axios = require('axios');
const Coins = require('../database/models/coinModel');

let task = cron.schedule('0 0 * * * *',async ()=>{
    const data = await axios.get(process.env.UPDATE_API);
    await Coins.deleteMany({});
    await Coins.insertMany(data.data);
    console.log("Data Updated");
    
});