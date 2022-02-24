const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_secret='theuserishere'
var fetchuser=require('../middleware/fetchuser')



//Route 1: to register user create a user using :post "api/auth/creatuser" 
router.post('/creatuser',[
    body('email','email not valid').isEmail(),
    body('password','password mustbe more than 5 char ').isLength({ min: 5 }),
    body('name','name must be more than 3 char').isLength({ min: 3 })

],async (req,res)=>{  
    console.log(req.body);
  //  let user=User(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check email exist already
    try{
  let user=await User.findOne({email:req.body.email}) 
    if(user){
        return res.status(400).json({error:'sorry the email is already registered'})
    }
   
  const salt=await bcrypt.genSalt(10);
  secPass= await bcrypt.hash(req.body.password,salt);
    user= await User.create({
      email:req.body.email, 
      name: req.body.name,
      password: secPass,
    })

    //.then(user => res.json(user));
  
  // res.json({"sucessfully":"sucess"})

  const data={
      user:{
          id: user.id
      }
    }

  const authtoken=jwt.sign(data,JWT_secret)
  res.json(authtoken)
}
   catch (error){
       console.log(error)
       res.status(500).send('some error ocoured')
   }
})



//Route 2: the login system login module api/auth/login

router.post('/login',[
    body('email','email not valid').isEmail(),
    body('password','password is blank ').exists()
    

],async (req,res)=>{  
  let sucsess=false;
    console.log(req.body);
  //  let user=User(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

const{email,password}=req.body;
 try{
     let user= await User.findOne({email});
     if(!user){
         return res.status(400).json({errors:"login with correct credential"})
     }
     const comparepassword= await bcrypt.compare(password,user.password);
     if(!comparepassword){
     
        return res.status(400).json({errors:"login with correct credential"})
     }
     const data={
        user:{
            id: user.id
        }
      }
  
    const authtoken=jwt.sign(data,JWT_secret)
    sucsess=true;
    res.json({authtoken:authtoken,sucsess})
 }
 catch(error){
    console.log(error)
    res.status(500).send('Server did not response')
 }
}
    )
 
// Rout 3: get user details

router.post('/getuser',fetchuser,async (req,res)=>{  
    try {
     userId=req.user.id;
    const user=await User.findById(userId).select("-password")

        res.send(user)
    
    } catch (error) {
        res.status(504).send('Server did not response')
        
    }

})



module.exports=router
