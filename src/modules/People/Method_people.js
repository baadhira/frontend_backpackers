import axios from 'axios';
import React from 'react'
import {BASE_URL} from '../../BaseUrl'


export const getAllPeople = () => {
  var token = localStorage.getItem("authToken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };
    const response= axios.get(`${BASE_URL}api/user/allusers/`,config)
  return response
}

export const getOnePeople = (id) => {
  var token = localStorage.getItem("authToken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };
    const response= axios.get(`${BASE_URL}api/user/allusers/${id}`,config)
  return response
}


export const sendHostRequest = (id) => {
  var token = localStorage.getItem("authToken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };
    const response= axios.get(`${BASE_URL}api/user/friendrequests/${id}`,config)
  return response
}