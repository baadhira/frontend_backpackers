import React,{useCallback, useEffect, useState} from 'react'

import { Card, ListGroup } from 'react-bootstrap'
import { DropDown, Text } from '../../components/Input/Input'
import axios from "axios";
import { BASE_URL } from '../../BaseUrl';
import { Flex } from '../../components/UI/Flex/Flex';
import { DangerBtn, PrimaryBtn } from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { getoneEvents } from './method/Method';

export const SetPopEvent = ({setPopEvent}) => {
    const [eventdetails, setEventdetails] = useState();

  const[event,setEvent] = useState();
  const [reason,setReason]=useState();
  const [text,setText]=useState();
  const [author, setAuthor] = useState();
  const { id } = useParams();
  var token = localStorage.getItem("authToken");
  
  var decoded = jwt_decode(token);

  const OneEvent = useCallback(() => {
    getoneEvents(id).then((res) => {
      setEventdetails(res.data);
      
    });
  });

  useEffect(() => {
    OneEvent();
  }, [setEventdetails,]);
  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    axios
      .post(
        `${BASE_URL}eventapi/reporteventpost/`,
        {
          author:decoded.user_id,
          event:id,
          reason,
          text


        },
        config
      )
      .then(() => {
        setPopEvent(false);
        window.location.reload();
      });
  };
  
//   REPORTING_REASON=(
//     ("It's spam","It's spam"),
//     ("Hate speech or symbols","Hate speech or symbols"),
//     ("Bullying or harassement","Bullying or harassement"),
//     ("Nudity or sexual activity","Nudity or sexual activity"),

// ) 
  return (
    <div className="createEvent">

      <DropDown onChange={(e) => setReason(e.target.value)} width="100%">
        <option value="It's spam">It's spam</option>
        <option value="Hate speech or symbols">Hate speech or symbols</option>

        <option value="Bullying or harassement">Bullying or harassement</option>
        <option value="Nudity or sexual activity">Nudity or sexual activity</option>

        
        
      </DropDown>
      <Text
        onChange={(e) => setText(e.target.value)}
        width="100%"
        placeholder="Write in detail"
      />
          <Flex>
        <PrimaryBtn onClick={onSubmit} margin="10px">
          Submit
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setPopEvent(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  )
}
