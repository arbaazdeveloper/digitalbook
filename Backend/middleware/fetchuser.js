const jwt = require('jsonwebtoken');
const JWT_secret='theuserishere'

const fetchuser=(req,res,next)=>{

    //get user
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"not valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_secret);
        req.user=data.user;
    next() 
    } catch (error) {
        res.status(401).send({error:"not valid token"})
    }

}


module.exports=fetchuser;