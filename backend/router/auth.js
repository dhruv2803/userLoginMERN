const express = require('express')
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fast2sms = require('fast-two-sms');


const router = express.Router()
require('../db/conn')

function generateOTP() {
          
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

router.post('/register',async(req,res)=>{
    const {name,email,mobileno,password,cpassword,dob,education,address,pincode,city,state,country,photo} = req.body

    if(!name || !email || !mobileno || !password || !cpassword || !dob || !education || !address || !pincode || !city || !state || !country){
        console.log("require all field")
        return res.status(422).json({error: "plz fill all field"})
    }
    try{
        const userExist = await User.findOne({email:email})
        if(userExist){
            console.log("Email already exist")
            return res.status(422).json({error:"Email already exist"})
        }else if(password !== cpassword){
            console.log("password are not same")
            return res.status(422).json({error:"password are not same"})
        }
        
        const user = new User({name,email,mobileno,password,cpassword,dob,education,address,pincode,city,state,country,photo})
        await user.save()
        console.log("registered")
        res.status(200).json({message:'user register'})
    }catch(err){
        console.log(err)
    }
    
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error: "plz fill all field"})
    }
    try{
        const userLogin = await User.findOne({email:email})
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password)
            token = await userLogin.generateAuthToken()
            res.cookie('jwtoken',token,{
                expires: new Date(Date.now()+2592000000),
                httpOnly:true
            })
        
            if (!isMatch) {
                return res.status(422).json({error: 'user error'})
            } else{
                res.json({message:'user login'})
            }
        }
        else{
            return res.status(422).json({error: 'user error'})
        }
        
    }catch(err){
        console.log(err)
    }
})


router.post('/getotp', async(req,res)=>{
    const {mobileno} = req.body
    console.log('this is getotp')
    const otp = generateOTP()
    var options = {authorization : process.env.API_KEY , message : `your otp is ${otp}` ,  numbers : [mobileno]} 
    const response =  fast2sms.sendMessage(options) 
    console.log(response)
    return res.status(200).json({otp:otp})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'})
    console.log("cookie cleared")
    res.status(200).send('User logout')
})
module.exports = router