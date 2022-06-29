import React, { useState } from 'react'
import { BASE_URL } from '../../BaseUrl';
import { DangerBtn, PrimaryBtn } from '../../components/Button/Button';
import { DropDown } from '../../components/Input/Input';
import { Flex } from '../../components/UI/Flex/Flex';
import jwt_decode from "jwt-decode";
import axios from 'axios';

export const ReportComment = ({setPop,commentid}) => {

    
    var token = localStorage.getItem("authToken");
  
    var decoded = jwt_decode(token);
    const[reporter,setReporter] =useState()

    const [comment,setComment] =useState();
    const [reason,setReason] =useState();

    const onSubmit = () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
    
        axios
          .post(
            `${BASE_URL}discussionapi/reportcommentpost/`,
            {
             reporter:decoded.user_id,
            comment:commentid,
              reason,
            },
            config
          )
          .then(() => {
            setPop(false);
            window.location.reload();
          });
      };
  return (
    <div className="createEvent">
    <DropDown onChange={(e) => setReason(e.target.value)} width="100%">
      <option value="It's spam">It's spam</option>
      <option value="Hate speech or symbols">Hate speech or symbols</option>

      <option value="Bullying or harassement">Bullying or harassement</option>
      <option value="Nudity or sexual activity">Nudity or sexual activity</option>

      
      
    </DropDown>
    
        <Flex>
      <PrimaryBtn onClick={onSubmit} margin="10px">
        Submit
      </PrimaryBtn>
      <DangerBtn
        onClick={() => {
          setPop(false);
        }}
        margin="10px"
      >
        Cancel
      </DangerBtn>
    </Flex>
  </div>
  )
}
