// import React from 'react'

// export const CreateQuery = () => {
//   return (
//     <div>CreateQuery</div>
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
import "./CreateQuery.css";
import { BASE_URL } from "../../BaseUrl";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { H3, H4 } from "../../components/Text/Text";

// author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='discussions')
//     location=models.CharField(max_length=100)
//     question=models.TextField()
//     topic=models.CharField(max_length=50)
//     created_date = models.DateTimeField(blank=True, null=True,default=now,editable=True)

export const CreateQuery = ({ setQuery }) => {
 
  const [location, setLocation] = useState();
  const [question, setQuestion] = useState();
  const [topic, setTopic] = useState();
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
        `${BASE_URL}discussionapi/discussion/`,

        {
          location,
          question,
          topic
         
        },
        config
      )
      .then(() => {
        setQuery(false);
        window.location.reload();
      });
  };

  return (
    <div className="createEvent">
      <H4 fontWeight='bold'>Create Query</H4>
      <Text
        onChange={(e) => setLocation(e.target.value)}
        width="100%"
        placeholder="About which location is your query?"
      />
    
      <Text
        onChange={(e) => setQuestion(e.target.value)}
        width="100%"
        placeholder="Enter your query"
      />
       <Text
        onChange={(e) => setTopic(e.target.value)}
        width="100%"
        placeholder="Related topic your query is about?"
      />
     

      <Flex>
        <PrimaryBtn onClick={onSubmit} margin="10px">
          Submit
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setQuery(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};


