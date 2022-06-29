import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../../BaseUrl';
import { Icon } from '../../components/Icon/Icon'
import { TextArea } from '../../components/Input/Input'
import jwt_decode from "jwt-decode";

export const AnswerEvent = ({eventdetails}) => {
    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);

    const [comment,setComment]=useState()
  const [from_event,setFromEvent]=useState()
  const [user,setUser] =useState()

  console.log("answer event");

    const onSubmit = () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
        axios
          .post(
            `${BASE_URL}eventapi/eventcommentpost/`,
    
            {
              from_event: eventdetails.id,
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
