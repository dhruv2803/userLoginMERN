const mongoose = require('mongoose')

const DB = "mongodb://127.0.0.1:27017/userlogin"

mongoose.connect(DB,{ useUnifiedTopology: true , useNewUrlParser: true }).then(()=>console.log('success')).catch((err)=>console.log(err))