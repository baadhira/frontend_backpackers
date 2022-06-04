import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../../BaseUrl'
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
export const getHostRequests = () => {
  var token = localStorage.getItem("authToken");
  const config ={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
     
  };
  const response = axios.get(`${BASE_URL}api/user/hostrequestsget`,config)
  return response
}
export const getHostRequestsDetail = (id) => {
  var token = localStorage.getItem("authToken");
  const config ={
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
     
  };
  const response = axios.get(`${BASE_URL}api/user/hostrequestsget/${id}`,config)
  return response
}