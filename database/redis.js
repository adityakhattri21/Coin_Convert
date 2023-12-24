const {Redis} = require('ioredis');

const client = new Redis();

client.on('connect',()=>{
    console.log('Connected with Redis');
});

client.ping((err,result)=>{
    console.log(result);
});

module.exports = client;