import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { storeUserInfo } from "../../features/users/userSlice";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData , setUserData] = useState({username : "" , password : ""})
    const login = async (ev) => {
        ev.preventDefault();
        const response =  await fetch("http://localhost:4000/api/user/login" , {
            method : "POST",
            body : JSON.stringify({username : userData.username , password : userData.password}),
            headers :  { "Content-Type" : "application/json"},
            credentials : "include"
        })
        if(response.ok) {
            response.json().then(userInfo => {
                dispatch(storeUserInfo(userInfo.username))
                navigate("/")
            })
        }else{
            alert("wrong username or password")
        }
    }
    return <form className="login-page" onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder="username" value={userData.username} onChange = {ev => setUserData({...userData , username : ev.target.value})} />
        <input type="password" placeholder="password" value={userData.password} onChange = {ev => setUserData({...userData , password : ev.target.value})} />
        <button type="submit">Login</button>
    </form>
}