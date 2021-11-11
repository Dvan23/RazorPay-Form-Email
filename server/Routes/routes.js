const express = require('express')
const router = express.Router()

const {create,resendchemid,resendotp,verificationsucessfull,razorpayement} =require('./create')
const {findall,delet,findone,update,findbyquery,verify,findbymail} =require('./mail2')

router.post('/api/tasks/create',create)
router.get('/api/tasks/findall',findall)
router.delete('/api/tasks/delet/:id',delet)
router.get('/api/tasks/findone/:id',findone)
router.patch('/api/tasks/update/:id',update)
router.get('/api/tasks/findbyquery',findbyquery)
router.get('/api/tasks/create/verification/:ChES_ID/:OTP',verify)
//router.post('/api/tasks/create/verifyotp',verifyotp)
router.get('/api/tasks/resendchemid/:resendmail',resendchemid)
router.get('/api/tasks/findbymail/:email',findbymail)
router.get('/api/tasks/verificationsucessfull/:email',verificationsucessfull)
router.get('/api/tasks/resendotp/:email',resendotp)
router.get('/api/tasks/razorpayement',razorpayement)

module.exports = router
