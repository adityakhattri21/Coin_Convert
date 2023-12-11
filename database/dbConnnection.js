const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/coins')
.then(()=>{
    console.log(`Database connected to server`);
})
.catch((err)=>{
    console.log(`Error Connecting to Database : ${err}`);
}
)