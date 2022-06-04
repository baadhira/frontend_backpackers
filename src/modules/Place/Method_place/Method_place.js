import axios from 'axios';
import React from 'react'
import {BASE_URL} from '../../../BaseUrl'
export const getAllPlace = () => {
  var token = localStorage.getItem("authToken");


    const config={
        headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
        },
    };
    const response=axios.get(`${BASE_URL}api/user/popdest`,config);
  return response
}


export const getOnePlace = (id) => {
    var token = localStorage.getItem("authToken");
  
  
      const config={
          headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}`,
          },
      };
      const response=axios.get(`${BASE_URL}api/user/popdest/${id}`,config);
    return response
  }