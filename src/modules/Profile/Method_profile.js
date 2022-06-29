import axios from 'axios';
import jwt_decode from "jwt-decode";

import React from 'react'
import {BASE_URL} from '../../BaseUrl'
export const getProfile = () => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const config = {     
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = axios.get(`${BASE_URL}api/user/userprofile/${decoded.user_id}/`,config)


  return response
}

export const getOneProfile = (id) => {
  var token = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Accept":"application/json",
    Authorization: `Bearer ${token}`
    }

  }
  const response = axios.get(`${BASE_URL}api/user/userprofile/${id}`,config)
  return response
}

export const getAllProfile = () => {
  var token = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Accept":"application/json",
    Authorization: `Bearer ${token}`
    }

  }
  const response = axios.get(`${BASE_URL}api/user/patchprofile/`,config)
  return response
}


export const getOnePeople = (id) => {
  var token = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Accept":"application/json",
    Authorization: `Bearer ${token}`
    }

  }
  const response = axios.get(`${BASE_URL}api/user/patchprofile/${id}`,config)
  return response
}
export const getAlbum = (id) => {
  var token = localStorage.getItem("authToken");
  const config = {
    headers: {
      "Accept":"application/json",
    Authorization: `Bearer ${token}`
    }

  }
  const response = axios.get(`${BASE_URL}api/user/album`,config)
  return response
}


export const getFriendRequests = () => {
  var token = localStorage.getItem("authToken");
  const config ={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
     
  };
  const response = axios.get(`${BASE_URL}api/user/friendrequests`,config)
  return response
}
