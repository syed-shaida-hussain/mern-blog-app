import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { logoutUser, storeUserInfo } from "../../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"


export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {username} = useSelector((store) => store.user);

  useEffect( () => {
    fetch("http://localhost:4000/profile" , {
      credentials : "include"
    }).then((res) => res.json().then(userInfo => {
      const {username} = userInfo;
      dispatch(storeUserInfo(username))
    }))
  },[])

  const logout = () => {
     fetch("http://localhost:4000/logout" , {
      method : "POST",
      credentials : "include"
    })
    dispatch(logoutUser());
    navigate("/login")
  }
    return (
        <header className='header'>
        <Link to= "/" className='logo'>MyBlogs</Link>
        <nav className='header-nav' >
          {
            username && <>
              <Link to = "/create">create new post</Link>
              <button onClick = {logout}>Logout</button>
            </>
          }
          {
            !username && <>
              <Link to = "/login">Login</Link>
              <Link to = "/register">Register</Link>
            </>
          }
        </nav>
      </header>
    )
}