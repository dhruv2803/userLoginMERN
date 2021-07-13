const mongoose = require('mongoose')

const DB = process.env.DB
console.log(DB)
mongoose.connect(DB,{ useUnifiedTopology: true , useNewUrlParser: true , useCreateIndex:true , useFindAndModify:false }).then(()=>console.log('success')).catch((err)=>console.log(err))