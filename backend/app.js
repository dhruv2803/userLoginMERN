const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const port = process.env.PORT
require('./db/conn')

app.use(express.json())

app.use(require('./router/auth'))


app.listen(port,()=>{
    console.log(`app started on port ${port}`)
})