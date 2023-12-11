const express = require('express');

const app = express();

app.get("/update",(req,res)=>{
    
})

app.get("/",(req,res)=>{
    res.status(200).json({message:"Working"});
});

module.exports ={
    app
}