

  const form = document.getElementById('form')
  const form2 = document.getElementById('form2')
  const form3 = document.getElementById('form3')
  const submitbutton = document.getElementById('submitbutton')
  const headform = document.getElementById('headform')

  const firstnameinput =  document.getElementById('firstname')
  const lastnameinput =  document.getElementById('lastname')
  const genderinput =  document.getElementById('gender')
  const emailinput =  document.getElementById('email')
  const phonenoinput =  document.getElementById('phoneno')
  const alternatephonenoinput =  document.getElementById('alternatephoneno')
  const collegeinput =  document.getElementById('college')
  const programinput =  document.getElementById('program')
  const departmentinput =  document.getElementById('department')
  const yearinput =  document.getElementById('year')
  const addressinput =  document.getElementById('address')
  const stateinput =  document.getElementById('state')
  const pincodeinput =  document.getElementById('pincode')
  const registerinform =  document.getElementById('registerinform')

  const submitbuttonotp = document.getElementById('submitbuttonotp')
  const resendbuttonotp = document.getElementById('resendbuttonotp')
  const otpinput =  document.getElementById('otp')
  const otpinform =  document.getElementById('otpinform')
  const razorpaybutton = document.getElementById('paybutton')

  const loadrazorpay =  ()=>{
    return new Promise((resolve)=>{
      const script = document.createElement('script')
       script.src = 'https://checkout.razorpay.com/v1/checkout.js'
       document.body.appendChild(script)
       script.onload =()=>{
         resolve(true)
       }
       script.onerror =()=>{
        resolve(false)
      }
    })

  }
  const displayrazorpay = async ()=>{
    try{
    const res = await loadrazorpay()
    const data = await axios.get('http://localhost:27017/api/tasks/razorpayement')

    if(!res){
      alert('RazorPay SDK failed to load...')
    }
    else{

    var options = {
      "key": "", 
      "currency": data.currency,
      "amount": 50000, 
      "name": "Dvan Website",
      "description": "Test Transaction",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNyBelSg0bTTaQuRC2i8Q2O2MSCDPcUgMMA&usqp=CAU",
      "order_id": data.id, 
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": {
          "name": "Devang Tiwari",
          "email": "tiwaridevang60@gmail.com",
          "contact": "9838172860"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
    };
    var rzp1 = new Razorpay(options);
     rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
    });

      rzp1.open();
    }
  }
  catch(err){
     console.log(err)
  }
}

  razorpaybutton.addEventListener('click',(e)=>{
    e.preventDefault()
    displayrazorpay()
   })



  headform.addEventListener('submit',(e)=>{
    submitform()
    e.preventDefault()
  })

  const verifyotp = async (email)=>{
    
    try{
  
      const ItemOTP = await axios.get(`http://localhost:27017/api/tasks/findbymail/${email}`)
      if(ItemOTP.data==otpinput.value){
        otpinform.style.display ='block'
        otpinform.innerHTML ='Verification sucessfull'
        const verification  =  
        await axios.get(`http://localhost:27017/api/tasks/verificationsucessfull/${email}`)
        setTimeout(function(){
            otpinform.innerHTML = ''
            otpinform.style.display ='none'
        },5000)
      }
      else{
        otpinform.style.display ='block'
        otpinform.innerHTML ='Oops! Try Again'
        setTimeout(function(){
            otpinform.innerHTML = ''
            otpinform.style.display ='none'
        },5000)
      }
     
   }
       catch(err){
       console.log(err)
   }
         otpinput.value ='' 
  }


  const resendotp = async (email)=>{
   try{
    const otp = await axios.get(`http://localhost:27017/api/tasks/resendotp/${email}`)
   }
   catch(err){
     console.log(err)
   }
  }

  const submitform = async ()=>{

    let data ={}
    data.firstname = firstnameinput.value;   data.lastname = lastnameinput.value;
    data.gender = genderinput.value;   data.email = emailinput.value;  data.year = yearinput.value;
    data.phoneno = phonenoinput.value;   data.alternatephoneno = alternatephonenoinput.value;
    data.college = collegeinput.value;   data.program = programinput.value;
    data.department = departmentinput.value;   data.state = stateinput.value;
    data.address = addressinput.value;   data.pincode = pincodeinput.value;   
    let item;
    try{
        item = await axios.post(`http://localhost:27017/api/tasks/create`,{data:data})
    }
    catch(err){
        console.log(err)
    }
    if(item.data==='Email already exists'){
      registerinform.style.display ='block'
      registerinform.innerHTML ='Email already exists'
      setTimeout(function(){
          registerinform.innerHTML = ''
          registerinform.style.display ='none'
      },5000)
       firstnameinput.value ='';    lastnameinput.value ='';
       genderinput.value =''; emailinput.value ='';   yearinput.value ='';
       phonenoinput.value ='';   alternatephonenoinput.value ='';
       collegeinput.value ='';   programinput.value ='';
       departmentinput.value ='';    stateinput.value ='';
       addressinput.value ='';    pincodeinput.value ='';   
    }
     else{
    
      form.style.display = 'none';
      form2.style.display = 'block';
  
       submitbuttonotp.addEventListener('click',(e)=>{
       e.preventDefault()
        verifyotp(data.email)
      })
      resendbuttonotp.addEventListener('click',(e)=>{
        e.preventDefault()
          resendotp(data.email) 
      })
    }
  }

  const chemidbutton = document.getElementById('chemidbutton')
  const chemidinput =  document.getElementById('chemidemail')
  const resendchemidbutton = document.getElementById('resendchemid')
  const chemidinform = document.getElementById('chemidinform')

 chemidbutton.addEventListener('click',(e)=>{
    form.style.display = 'none';
    form3.style.display = 'block';
    e.preventDefault();
  })

  const resendchemid = async (resendemail)=>{
     const resendmail = resendemail
    try{
        const data = await axios.get(`http://localhost:27017/api/tasks/resendchemid/${resendmail}`)
        chemidinform.style.display ='block'
        chemidinform.innerHTML ='ChemPlus Id sent to your email'
        setTimeout(function(){
            chemidinform.innerHTML = ''
            chemidinform.style.display ='none'
        },3000)
    }
    catch(err){
        console.log(err)
    }
    chemidinput.value =''
}

  resendchemidbutton.addEventListener('click',(e)=>{
    e.preventDefault();
    const resendemail = chemidinput.value
    resendchemid(resendemail);
  })
  

 

 

 
  
  
  
