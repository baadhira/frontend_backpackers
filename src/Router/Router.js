import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../modules/Auth/Login'
import jwt_decode from "jwt-decode";


export const Router = (props) => {
  const [token,setToken] =useState(localStorage.getItem("authToken"))
  var decoded = token?jwt_decode(token):"null";
  useEffect(() => {
      if (decoded.exp*1000<new Date().getTime()){
          localStorage.removeItem("authToken")
          window.location.reload()
      }
  },[])
  return (
    <Routes>
      <Route path={props.path} element={props.isAuth ? localStorage.getItem("authToken") ? props.element : <Login/> : props.element} />

    </Routes>
  )
}
