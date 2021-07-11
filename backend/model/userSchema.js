const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    photo:{
        type:String
        
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})



userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.cpassword = await bcrypt.hash(this.cpassword,12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER',userSchema)
module.exports = User