import axios from 'axios';
import React from 'react'
import {BASE_URL} from '../../../BaseUrl'
export const getQueries = () => {
  var token = localStorage.getItem("authToken");


    const config={
        headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
        },
    };
    const response=axios.get(`${BASE_URL}discussionapi/discussion/`,config);
  return response
}


export const getOneQuery = (id) => {
  var token = localStorage.getItem("authToken");
    const config={
        headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
        },
    };
    const response=axios.get(`${BASE_URL}discussionapi/discussion/${id}`,config);
  return response
}


export const getCommentsQuery = (id) => {
  var token = localStorage.getItem("authToken");
  const config = {
      
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  // discussion/<int:discussion_id>/discussioncomments/
  const response=axios.get(`${BASE_URL}discussionapi/discussion/${id}/discussioncomments/`,config);

  return response
}



export const getReplyComment = (id) => {
  var token = localStorage.getItem("authToken");
  const config = {
      
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  // discussion/<int:discussion_id>/discussioncomments/
  const response=axios.get(`${BASE_URL}discussionapi/replydiscussion/`,config);

  return response
}

