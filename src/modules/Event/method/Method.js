// http://127.0.0.1:8000/eventapi/events

import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../../../BaseUrl';

export const getEvents =()=> {

  var token = localStorage.getItem("authToken");

  const config = {
      
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
    
   
    const response = axios.get(`${BASE_URL}eventapi/events`,config)
    
  return response
}

export const getoneEvents =(id)=> {

  var token = localStorage.getItem("authToken");

  const config = {
      
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
    
   
    const response = axios.get(`${BASE_URL}eventapi/events/${id}`,config)
    
  return response
}

export const getComments =(id)=> {

  var token = localStorage.getItem("authToken");

  const config = {
      
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
    
   
    const response = axios.get(`${BASE_URL}eventapi/events/${id}/comments`,config)
    
  return response
}


export const getJoiners =()=> {

  var token = localStorage.getItem("authToken");

  const config = {
      
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  
 
    const response = axios.get(`${BASE_URL}eventapi/getjoinedusers/`,config)
    
  return response
}




