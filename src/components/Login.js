import React,{ useState} from 'react'
import { useHistory,Link } from 'react-router-dom'

function Login() {
    const [validator, setvalidator] = useState('')

    const [credential, setcredential] = useState({email:"", password:""})
    let history=useHistory();
    
    const onchangeHandle=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value}) 
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const url=`http://localhost:5000/api/auth/login`
      const response = await fetch(url, {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:credential.email, password:credential.password}) 
      });
      const json=await response.json()
      console.log(json)

     
      if(json.sucsess){
    localStorage.setItem('token',json.authtoken);
    history.push('/')
    setvalidator('')
    
    } else{alert('Invalid Credentails ')  }
      console.log({email:credential.email, password:credential.password})
      setvalidator('validator')
      
    }
    return (
        <div className="container my-3 addnote">
          <h1 className="text-center">Log In</h1>
         <form  onSubmit={handleSubmit}>  
            <div className="mb-3 row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
    <input type="email" className={`form-control ${validator}`} id="inputPassword" name='email' value={credential.email} onChange={onchangeHandle} />
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="inputPassword" name='password' className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password"className={`form-control ${validator}`} id="inputPassword" name='password' value={credential.password} onChange={onchangeHandle} />
    </div>
  </div>

  <button type="submit">Login</button>
  </form>

     <p className="my-3">Dont Have acount? Sign Up now</p>
       <Link  to="/signup">Click here</Link>   
        </div>
    )
}

export default Login
