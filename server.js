const {app} = require('./app');
const port = process.env.PORT || 8000;
const cron = require('node-cron');
const axios = require('axios');
require('./database/dbConnnection');

let task = cron.schedule('*/2 * * * *',async ()=>{
    // const data = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    console.log("data");
})
app.listen(port,()=>{
    console.log(`Server is Up at port : ${port}`);
})