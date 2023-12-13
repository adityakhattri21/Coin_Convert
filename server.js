const {app} = require('./app');
require('dotenv').config();
const port = process.env.PORT || 3500 ;
const cron = require('node-cron');
const axios = require('axios');
require('./database/dbConnnection');
const Coins = require('./database/models/coinModel');

// let task = cron.schedule('*/2 * * * *',async ()=>{
//     const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr');
//     await Coins.deleteMany({});
//     await Coins.insertMany(data.data);
//     console.log("Data Updated");
    
// })

app.listen(port,()=>{
    console.log(`Server is Up at port : ${port}`);
})