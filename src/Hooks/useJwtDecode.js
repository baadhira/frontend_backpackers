import React from 'react'
import jwt_decode from 'jwt-decode'
export const useJwtDecode = () => {

    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);
  return  decoded.user_id
  
}
