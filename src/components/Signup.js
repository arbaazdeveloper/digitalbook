import React,{ useState} from 'react'
//import { useHistory } from 'react-router-dom'

function Signup() {
    const [credential, setcredential] = useState({name:"",email:"", password:""})
  //  let history=useHistory();
    
    const onchangeHandle=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value}) 
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const url=`http://localhost:5000/api/auth/creatuser`
      const response = await fetch(url, {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:credential.name, email:credential.email, password:credential.password}) 
      });
      const json=await response.json()
      console.log(json)

    
      console.log({email:credential.email, password:credential.password})
      setcredential({name:credential.name, email:credential.email, password:credential.password})
      
    }

    return (
        <div className="container my-3 addnote">
           <h1 className="text-center">Sign Up</h1>
         <form  onSubmit={handleSubmit}>  
            <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
    <input type="text" className="form-control" id="inputPassword" name='name' value={credential.name} onChange={onchangeHandle} placeholder="Name" required minLength="5"/>
    </div>

    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
    <input type="email" className="form-control" id="inputPassword" name='email' value={credential.email} onChange={onchangeHandle} placeholder="Email" required/>
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="inputPassword" name='password' className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword" name='password' value={credential.password} placeholder="choose a strong password" onChange={onchangeHandle} minLength="5" />
    </div>
  </div>

  <button type="submit">Sign Up</button>
  </form>  
  </div>)
 
}

export default Signup
