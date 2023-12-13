const express = require('express');
const coinRoute = require("./routes/coinsRoute")

const app = express();

app.use(express.json());

app.use("/api/v1/coin",coinRoute)

app.get("/",(req,res)=>{
    res.status(200).json({message:"Working"});
});

module.exports ={
    app
}