const mongoose =require('mongoose')
const Profile = new mongoose.Schema({
    firstname :{type:String,required:[true,'Please provide first name'],trim:true},
    email:{type:String,required:[true,'Please provide email'],trim:true},
    lastname :{type:String ,required:[true,'Please provide last name'],trim:true},
    college :{type:String ,required:[true,'Please provide college name'],trim:true},
    phoneno :{type:Number ,required:[true,'Please provide your phoneno'],trim:true},
    alternatephoneno :{type:Number,trim:true},
    year :{type:String ,required:[true,'Please provide your passoutyear'],trim:true},
    address :{type:String ,required:[true,'Please provide address'],trim:true},
    pincode :{type:Number ,required:[true,'Please provide pincode'],trim:true},
    ChES_ID :{type:String ,trim:true},
    Verified :{type:Boolean ,default:false},
    IsIITM :{type:Boolean ,default:false},
    OTP :{type:String},
    state :{type:String ,required:[true,'Please provide your state'],trim:true},
    program :{type:String ,required:[true,'Please provide program'],trim:true},
    department :{type:String ,required:[true,'Please provide department'],trim:true},
    gender :{type:String ,required:[true,'Please provide gender'],trim:true},
    
})


const model =mongoose.model('Profile',Profile)
module.exports={model}