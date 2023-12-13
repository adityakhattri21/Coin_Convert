const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log(`Database connected to server`);
})
.catch((err)=>{
    console.log(`Error Connecting to Database : ${err}`);
}
)