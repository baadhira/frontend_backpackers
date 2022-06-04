import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../../BaseUrl';
import { DarkBtn } from '../../components/Button/Button'
import { TextArea } from '../../components/Input/Input'
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon/Icon';

export const InputReply = () => {
  const [addComment, setAddcoment] = useState();
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const { id } = useParams();
  

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${BASE_URL}discussionapi/discussioncomments/`,

        {
          text: addComment,
          discussion: id,
        },
        config
      )
      .then(() => {
        window.location.reload();
        setAddcoment("");
      });
  };


  return (
    <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'center',alignItems:"center"}}>
        <TextArea width="500px"
            onChange={(e) => setAddcoment(e.target.value)}
            
            placeholder="write a comment"
          ></TextArea>
          <Icon onClick={onSubmit} margin="0px 0px 0px 10px" backgroundColor="dodgerblue" icon="fa-solid fa-paper-plane"/>
    </div>
  )
}
