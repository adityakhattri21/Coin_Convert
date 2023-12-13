const {app} = require('./app');
require('dotenv').config();
const port = process.env.PORT || 3500 ;
require('./database/dbConnnection');
require("./utils/cronJob");


app.listen(port,()=>{
    console.log(`Server is Up at port : ${port}`);
})