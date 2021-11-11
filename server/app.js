
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors({
    origin:"*",
}));
app.use(express.urlencoded({extended:false}))
const {connectdb} =require('./Mongo/connection')
const router = require('./Routes/routes')
require('dotenv').config()
app.use(express.json())
app.use('/',router)



const server = async()=>{
    try{
         await connectdb(process.env.URL)
        app.listen(27017,()=> console.log('Server started'))
    }
    catch(err){
        console.log(err)
    }
}
server()

