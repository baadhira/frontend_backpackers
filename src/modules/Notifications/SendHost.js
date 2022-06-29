// import React from 'react'

// export const SendHost = () => {
//   return (
//     <div>

//     </div>
//   )
// }



import axios from "axios";
import React, { useState } from "react";
import {
  DangerBtn,
  PrimaryBtn,
  WhiteBtn,
} from "../../components/Button/Button";
import { Text, TextArea } from "../../components/Input/Input";
import { Flex } from "../../components/UI/Flex/Flex";
import "../Event/subComponent/CreateEvent.css";
import { BASE_URL } from "../../BaseUrl";

import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { H3, H4 } from "../../components/Text/Text";

export const SendHost = ({setSendhost}) => {
  const [coming_date, setComingdate] = useState();
  const [coming_time, setComingtime] = useState();
  const [leaving_date, setLeavingdate] = useState();
  const [leaving_time, setLeavingtime] = useState();
  const [no_travellers, setNotravellers] = useState();
  const [hostMessage, setHostmsg] = useState();
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const { id } = useParams();

//   const [end_time, setEndTime] = useState();
//   const [limit_attendees, setAttendees] = useState();
//   const [description, setDescription] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [author, setAuthor] = useState();

  var token = localStorage.getItem("authToken");
  // var decoded = jwt_decode(token);

  // console.log("token", token);

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${BASE_URL}api/user/hostrequests/`,                 

        {   
          from_user:decoded.user_id,
            to_user:id,
            coming_date,
            coming_time,
            leaving_date,
            leaving_time,
            no_travellers,
            hostMessage,
        },
        config
      )
      .then(() => {
        setSendhost(false);
        window.location.reload();
      });
  };

  return (
    <div className="createEvent">
      <H4 fontWeight='bold'>Send Host Request</H4>
      <Text
        onChange={(e) => setComingdate(e.target.value)}
        width="100%"
        type="date"
        placeholder="Coming Date"
      />
      <Text
        width="100%"
        placeholder="Coming Time"
        type="time"
        onChange={(e) => setComingtime(e.target.value)}
      />

      <Text
        onChange={(e) => setLeavingdate(e.target.value)}
        width="100%"
        type="date"
        placeholder="Leaving Date"
      />
    
        <Text
          onChange={(e) => setLeavingtime(e.target.value)}
          width="100%"
          margin="4px"
          placeholder="Leaving Time"
           type="time"
          
        />
    
        <Text
          onChange={(e) => setHostmsg(e.target.value)}
          width="100%"
          margin="4px"
          placeholder="Enter Message(min 100 words)"
       
        />
        
        <Text
          onChange={(e) => setNotravellers(e.target.value)}
          width="100%"
          margin="4px"
          placeholder="Enter no of hosts"
       
        />
        {/* <Text
          onChange={(e) => setEndTime(e.target.value)}
          margin="4px"
          placeholder="End Time"
          type="time"
        />
      </Flex>

      <Text
        onChange={(e) => setAttendees(e.target.value)}
        margin="4px"
        typewidth="100%"
        placeholder="No. of attendees allowed"
        type="number"
      />
      <TextArea
        onChange={(e) => setDescription(e.target.value)}
        margin="4px"
        width="100%"
        placeholder="Enter Description"
      /> */}

      <Flex>
        <PrimaryBtn onClick={onSubmit} margin="10px">
          Submit
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setSendhost(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};
