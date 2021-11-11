const express = require('express')
const path = require('path')
const app = express()
//app.use(express.static('../public'))
var nodemailer =require('nodemailer')
const SendmailTransport = require('nodemailer/lib/sendmail-transport')
const {model} =require('../Mongo/mongo')
const Razorpay = require('razorpay')
const shortid = require('shortid')



const create = async (req,res) =>{

  const {firstname,lastname,gender,email,phoneno,alternatephoneno,college,program,department,
    year,address,state,pincode} =req.body.data;
  let data = req.body.data
 

try{
    const EmailExists = await model.find({email:data.email})
    if(EmailExists.length>=1){
        res.status(201).send('Email already exists')
    }
    else{
        if(data.email.trim().endsWith('@smail.iitm.ac.in')){
            data.IsIITM = true;
        }
    const OTP = 100000 +Math.floor(Math.random()*899999)
    const Verified = false;
    data.Verified =Verified; data.OTP =OTP;
    data.ChES_ID = ''
    const task = await model.create(data)
    res.status(201).send(task)
    var sender = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'ch20b033@smail.iitm.ac.in',
            pass: process.env.Password
        } 
    });
    
    var receiver1 = {
        from:'ch20b033@smail.iitm.ac.in'
        , to: `${email}`
        , subject: 'ChES Registration OTP',
        html :  `<h4>Hii ${firstname} ${lastname}</h4> 
        <p>Your Credentials are :</p> 
        <p>Email: ${email}</p> 
        <p>Phone-No: ${phoneno} , Alternate-No: ${alternatephoneno}</p>
        <p>College: ${college}</p> 
        <p>Program: ${program} , Department: ${department} , Year: ${year}</p> 
        <p>Address: ${address}</p>  
        <p>State: ${state} , PIN: ${pincode}</p> 
        <h2>OTP: ${OTP}</h2>`
    }
    
    sender.sendMail(receiver1,(err,info)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('Email sent'+ info.response)
        }
    })
  }
}
 catch(err){
    res.status(500).send(err)
    console.log(err)
 }
}

const resendchemid = async (req,res) =>{
   
  
  try{
     const resendmail = req.params.resendmail
      const items = await model.findOne({email:resendmail})
      const {firstname,lastname,ChES_ID} = items;
     
      res.status(201).send('ChemPlus Id sent')
      var sender = nodemailer.createTransport({
          service:'gmail',
          auth: {
              user: 'ch20b033@smail.iitm.ac.in',
              pass: process.env.Password
          } 
      });
      
      var receiver1 = {
          from:'ch20b033@smail.iitm.ac.in'
          , to: `${resendmail}`
          , subject: 'ChES Registration ID',
          html :  `<h3>Hii ${firstname} ${lastname}</h3> 
          <h2>Your ChES_ID is : ${ChES_ID}</h2>  `
      }
      
      sender.sendMail(receiver1,(err,info)=>{
          if(err){
              console.log(err)
          }
          else{
              console.log('Email sent'+ info.response)
          }
      })
   }
   catch(err){
      res.status(500).send(err)
   }
  }

    const verificationsucessfull = async(req,res)=>{
    const Year = new Date().getFullYear()
    const mail = req.params.email;
    try{
        const TotalItems = await model.find()
        const chesnumber = TotalItems.length +1
        const ChES_ID = 'CHES'+Year+chesnumber;
        const items = await model.findOneAndUpdate({email:mail},{Verified:true,ChES_ID:ChES_ID},
            {new:true, runValidators:true }
            )
            const {firstname,lastname} = items
            res.status(200).json('Verification and ChESID Updated Sucessfully In Database')

            var sender = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: 'ch20b033@smail.iitm.ac.in',
                    pass:  process.env.Password
                } 
            });
            
            var receiver1 = {
                from:'ch20b033@smail.iitm.ac.in'
                , to: `${mail}`
                , subject: 'ChES Registration ID',
                html :  `<h4>Hii ${firstname} ${lastname}</h4>
                <p>You have sucessfully registered in ChemPlus</p>
                <h2>Your ChesID is : ${ChES_ID}</h2>`
                
            }
            
            sender.sendMail(receiver1,(err,info)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log('Email sent'+ info.response)
                }
            })
          }

      catch(err){
      res.status(500).send(err)
     }
}

    const resendotp = async(req,res)=>{
        const mail = req.params.email;
        const OTP = 100000 +Math.floor(Math.random()*899999)
        try{

            const items = await model.findOneAndUpdate({email:mail},{OTP:OTP},
                {new:true, runValidators:true }
                )
                res.status(200).json('OTP updated sucessfully in database')

                const item = await model.findOne({email:mail})
                const {firstname,lastname} = item;
               

                var sender = nodemailer.createTransport({
                    service:'gmail',
                    auth: {
                        user: 'ch20b033@smail.iitm.ac.in',
                        pass:  process.env.Password
                    } 
                });
                
                var receiver1 = {
                    from:'ch20b033@smail.iitm.ac.in'
                    , to: `${mail}`
                    , subject: 'ChES Registration OTP',
                    html :  `<h4>Hii ${firstname} ${lastname}</h4> 
                    <h3>Your OTP for ChES Registration is : ${OTP}</h3>`
                }
                
                sender.sendMail(receiver1,(err,info)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log('Email sent'+ info.response)
                    }
                })
           
      }
       catch(err){
        res.status(500).json(err)
      }
        }
        const razorpayid = new Razorpay({
            key_id : 'rzp_test_H30iWQ76GpjAti',
            key_secret :'OXASxIF8VR1MezDdnMmkWrHA'
        })

        const razorpayement = async(req,res)=>{
            const amount = 50000
            const currency = 'INR'
            try{
              
             const options = {
                 amount:amount,
                 currency,
                 receipt:shortid.generate() }
                 const response = await razorpayid.orders.create(options)
                res.json({
                    id:response.id, currency:'INR', amount:response.amount
                })   
               
          }
           catch(err){
            res.status(500).send(err)
            console.log(err)
          }
            }
    

module.exports = {create,resendchemid,verificationsucessfull,resendotp,razorpayement}
