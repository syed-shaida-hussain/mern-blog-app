import React, { useState } from "react"

export const RegisterPage = () => {
    const [userData , setUserData] = useState({username : "" , password : ""})
    const registerUser = async (ev) => {
        ev.preventDefault();
  
          const response = await fetch("http://localhost:4000/api/user/register" , {
                method: "POST",
                body : JSON.stringify({username : userData.username , password : userData.password}),
                headers : {"Content-Type" : "application/json"}
            })
            if(response.status === 200) {
                alert("Registration successfull");
            }else{
                alert("Registration failed");
            }
    }
    return <form onSubmit={registerUser} className="register-page">
    <h1>Register</h1>
    <input type="text" placeholder="username" value={userData.username} onChange={ev => setUserData({...userData , username : ev.target.value})} />
    <input type="text" placeholder="password" value={userData.password} onChange={ev => setUserData({...userData , password : ev.target.value})} />
    <button type="submit">Register</button>
</form>
}