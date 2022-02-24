import React,{useState,useEffect}from 'react'

function User() {
    const [User, setuser] = useState({name:"the",email:""})
    const getUser= async ()=>{
        const url=`http://localhost:5000/api/auth/getuser`
      const response = await fetch(url, {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify() 
      });
      const json=await response.json()
      console.log(json)
      setuser({name:json.name, email:json.email})

    }
    useEffect(() => {
        getUser();
    }, [])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <div className="container mt-4">
           <h3>Welcome {capitalizeFirstLetter(`${User.name}`)}</h3>
           <h4>Username {User.email}</h4>
        </div>
    )
}

export default User
