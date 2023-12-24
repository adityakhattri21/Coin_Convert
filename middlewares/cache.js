const client = require('../database/redis');
const Coins = require('../database/models/coinModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');


const cacheMiddleware = catchAsyncError(async(req,res,next)=>{
    let fromDataCache , toDataCache
    const {fromCurrency , toCurrency , date} = req.body;
    if(!fromCurrency || !toCurrency || !date)
    throw new ErrorHandler("Incomplete Details are not allowed" , 400);
    const fromIdPromise = Coins.findOne({
       $or:[
           {name:{$regex:new RegExp(`^${fromCurrency}$`),$options:'i'}},
           {id:{$regex:new RegExp(`^${fromCurrency}$`),$options:'i'}},
           {symbol:{$regex:new RegExp(`^${fromCurrency}$`),$options:'i'}}
       ]
    });
    const toIdPromise = Coins.findOne({
       $or:[
           {name:{$regex:new RegExp(`^${toCurrency}$`),$options:'i'}},
           {id:{$regex:new RegExp(`^${toCurrency}$`),$options:'i'}},
           {symbol:{$regex:new RegExp(`^${toCurrency}$`),$options:'i'}}
       ]
    });
    const[fromCurrencyData ,toCurrencyData ] = await Promise.all([fromIdPromise , toIdPromise]);
    if(!fromCurrencyData)
    throw new ErrorHandler("Please input a valid name ,id or symbol for First Currency.",404);
    if(!toCurrencyData)
    throw new ErrorHandler("Please input a valid name ,id or symbol for Second Currency.",404);

   await client.get(`${fromCurrencyData.id}-${date}`,(err,data)=>{
        if(err) throw new ErrorHandler(err,'500');
        else if(data!==null){
            fromDataCache=data;
        }
    });
   await  client.get(`${toCurrencyData.id}-${date}`,(err,data)=>{
        if(err) throw new ErrorHandler(err,'500');
        else if(data!==null){
            toDataCache=data;
        }
    });
    req.state={fromCurrencyData,toCurrencyData , fromDataCache,toDataCache};
   next();
});

module.exports = cacheMiddleware;