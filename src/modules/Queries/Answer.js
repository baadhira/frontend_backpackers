import React, { useState, useTransition } from 'react'
import { Icon } from '../../components/Icon/Icon'
import { TextArea } from '../../components/Input/Input'
import jwt_decode from "jwt-decode";
import { BASE_URL } from '../../BaseUrl';
import axios from 'axios';

export const Answer = ({querydetail}) => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const [comment,setComment]=useState()
  const [from_discussion,setFromdiscussion]=useState()
  const [user,setUser] =useState()

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${BASE_URL}discussionapi/commentpost/`,

        {
          from_discussion: querydetail.id,
          comment: comment,
          user:decoded.user_id
        },
        config
      )
      .then(() => {
        window.location.reload();
      
      });
  };
  return (
    <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'center',alignItems:"center"}}>
    <TextArea width="500px"
        onChange={(e) => setComment(e.target.value)}
        
        placeholder="write a comment"
      ></TextArea>
      <Icon  margin="0px 0px 0px 10px" onClick={onSubmit}  backgroundColor="dodgerblue" icon="fa-solid fa-paper-plane"/>
</div>
  )
}
