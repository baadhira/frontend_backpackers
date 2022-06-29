import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../../BaseUrl';
import { DarkBtn } from '../../components/Button/Button'
import { TextArea } from '../../components/Input/Input'
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon/Icon';

export const InputReply = ({commentnew,querydetail,parentid}) => {
  const [comment, setComment] = useState();
  const [from_discussion,setFromdiscussion]=useState()
  const [user,setUser] =useState()
  const [parent,setParent] = useState()
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const { id } = useParams();
  console.log("ccccccccccccccccccccccccccccccccccccccc");
  console.log("parentid inputreply", parentid);
  console.log("ccccccccccccccccccccccccccccccccccccccc");

  

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
          user:decoded.user_id,
          parent:parentid
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
          <Icon onClick={onSubmit} margin="0px 0px 0px 10px" backgroundColor="dodgerblue" icon="fa-solid fa-paper-plane"/>
    </div>
  )
}
