
import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { Icon } from "../../components/Icon/Icon";
import { TextArea } from "../../components/Input/Input";
import { H4, H5, H6 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";
import { getComments, getJoiners, getoneEvents } from "../Event/method/Method";
import { DarkBtn } from "../../components/Button/Button";
import jwt_decode from "jwt-decode";

import "./EventDetail.css";
import { TabSwitcher } from "./TabSwitcher";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import { Grid } from "../../components/UI/Grid/Grid";

import "./EventComment.css";

export const EventComment = ({ setShowComment }) => {
  const [eventdetails, setEventdetails] = useState();
  const [comment, setComment] = useState();
  const [joinedpeople, setJoinedpeople] = useState();
  const { id } = useParams();

  useEffect(() => {
    getoneEvents(id).then((res) => {
      setEventdetails(res.data);
    });

    getComments(id).then((res) => {
      setComment(res.data);
      console.log("response comment...............", res);
    });
    getJoiners().then((res) => {
      setJoinedpeople(res.data);
      console.log("joined people..", res.data);
    });
  }, [setEventdetails, setJoinedpeople, setEventdetails]);
  console.log("event details", eventdetails?.author.username);

  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  // console.log("token", token);

  const [addComment, setAddcoment] = useState();

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${BASE_URL}eventapi/comments/`,

        {
          events: id,
          text: addComment,
        },
        config
      )
      .then(() => {
        window.location.reload();
        setAddcoment("");
      });
  };

  const DeleteComment = (comment_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${BASE_URL}eventapi/comments/${comment_id}`, config)
      .then(() => {
        window.location.reload();
      });
  };

  console.log("comment>>>", comment);
  return (
    <div className="all_comments_detail">
      <div style={{width:"100%", height:"50px",backgroundColor:"#b8c6db"}}><h6 style={{margin:"15px 0px 0px 0px"}} className="text-center">Comments</h6></div>
  
 
        {comment?.map((data) => (
          <Flex margin="10px" justifyContent="center" alignItems="flex-start">
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
              }}
              src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
              alt=""
            />

            <Flex flexDirection="column">
              <H6 margin="0 5px" color="black" fontWeight="bold">
                {data.author.username}
              </H6>
              <div style={{margin:"0 5px", color:"black",maxWidth:"300px",height:"fit-content"}}>
              <h6 style={{margin:"0 5px", color:"black"}}>
                {data.text}
              </h6>

              {/* <i class="fa-solid fa-reply"></i> */}
          
              </div>
            </Flex>
            {data.author.id === decoded.user_id ||
            eventdetails?.author.id === decoded.user_id ? (
              <Icon
                onClick={(comment_id) => {
                  DeleteComment((comment_id = data.id));
                }}
                margin=" 0px 50px"
                icon="fa-solid fa-trash-can"
                backgroundColor="white"
                color="black"
              />
            ) : null}
          </Flex>
        ))}


        <Flex margin="10px" justifyContent="center" alignItems="center">
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
            }}
            src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
            alt=""
          />

          <TextArea width="500px" margin="0px 0px 0px 10px"
            onChange={(e) => setAddcoment(e.target.value)}
            placeholder="write a comment"
          ></TextArea>
          {/* <i class="fa-solid fa-paper-plane"></i> */}
          <Icon onClick={onSubmit} margin="0px 0px 0px 10px" backgroundColor="dodgerblue" icon="fa-solid fa-paper-plane"/>
          {/* <DarkBtn  onClick={onSubmit}>
            Comment
          </DarkBtn> */}
        </Flex>
    
    </div>
  );
};
