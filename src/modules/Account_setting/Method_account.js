import axios from 'axios';
import jwt_decode from "jwt-decode";

import React from 'react'
import {BASE_URL} from '../../BaseUrl'
export const getAccount = () => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const config = {     
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = axios.get(`${BASE_URL}api/user/account/${decoded.user_id}/`,config)


  return response
}


export const getOneAccount = (id) => {
  var token = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Accept":"application/json",
    Authorization: `Bearer ${token}`
    }

  }
  const response = axios.get(`${BASE_URL}api/user/account/${id}`,config)
  return response
}
