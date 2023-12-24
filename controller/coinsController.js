const axios = require('axios');
const Coins = require("../database/models/coinModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require('../utils/errorHandler');
const client = require('../database/redis');


const updateData =catchAsyncError( async(req,res)=>{
    const response = await axios.get(process.env.UPDATE_API);
    await Coins.deleteMany({});
    await Coins.insertMany(response.data);
    res.status(200).json({success:true,message:"Database Updated"});
    
});

const compareCoins = catchAsyncError(async(req,res)=>{
//  const {fromCurrency , toCurrency , date} = req.body;
//  if(!fromCurrency || !toCurrency || !date)
//  throw new ErrorHandler("Incomplete Details are not allowed" , 400);
//  const fromIdPromise = Coins.findOne({
//     $or:[
//         {name:{$regex:new RegExp(`^${fromCurrency}$`),$options:'i'}},
//         {id:{$regex:new RegExp(`^${fromCurrency}$`),$options:'i'}},
//         {symbol:{$regex:new RegExp(`^${fromCurrency}$`),$options:'i'}}
//     ]
//  });
//  const toIdPromise = Coins.findOne({
//     $or:[
//         {name:{$regex:new RegExp(`^${toCurrency}$`),$options:'i'}},
//         {id:{$regex:new RegExp(`^${toCurrency}$`),$options:'i'}},
//         {symbol:{$regex:new RegExp(`^${toCurrency}$`),$options:'i'}}
//     ]
//  });
//  const [fromCurrencyData , toCurrencyData ] = await Promise.all([fromIdPromise , toIdPromise]);
//  if(!fromCurrencyData)
//  throw new ErrorHandler("Please input a valid name ,id or symbol for First Currency.",404);
//  if(!toCurrencyData)
//  throw new ErrorHandler("Please input a valid name ,id or symbol for Second Currency.",404);

//newer implementation. Can be improved in logic.

const {fromDataCache , toDataCache , fromCurrencyData , toCurrencyData}= req.state;
const {date} = req.body;
let fromCurrencyValue = fromDataCache,toCurrencyValue=toDataCache;
if(!fromDataCache){
    const apiData = await axios.get(`${process.env.COIN_RATE_API}/${fromCurrencyData.id}/history?date=${date}&localization=false`);
    fromCurrencyValue = apiData.data.market_data.current_price.inr;
    client.set(`${fromCurrencyData.id}-${date}`,fromCurrencyValue);
}
if(!toDataCache){
    const apiData= await axios.get(`${process.env.COIN_RATE_API}/${toCurrencyData.id}/history?date=${date}&localization=false`);
    console.log(apiData);
    toCurrencyValue = apiData.data.market_data.current_price.inr;
    client.set(`${toCurrencyData.id}-${date}`,toCurrencyValue);
}

 const conversionValue = parseFloat(fromCurrencyValue)/ parseFloat(toCurrencyValue);
 
 res.status(200).json({success:true,data:`1 ${fromCurrencyData.name} = ${conversionValue} ${toCurrencyData.name}`});

});

module.exports = {
    updateData,
    compareCoins
}