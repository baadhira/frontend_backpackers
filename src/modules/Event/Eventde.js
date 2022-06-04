
import { Col, Container, Row } from 'react-bootstrap'
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

function Eventde() {
    const [eventdetails, setEventdetails] = useState();
  const [comment, setComment] = useState();
  const [joinedpeople, setJoinedpeople] = useState();
  const { id } = useParams();

  useEffect(() => {
    getoneEvents(id).then((res) => {
      setEventdetails(res.data);
      // console.log("response event details", res);
    });
    console.log("response event details", eventdetails);


    getComments(id).then((res) => {
      setComment(res.data);
      console.log("response comment...............", res);
    });
    getJoiners().then((res) => {
      setJoinedpeople(res.data)
      console.log("joined people..",res.data);

    });
  }, [setEventdetails,setJoinedpeople,setEventdetails]);

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
    const config ={
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
      },
    };
    axios.delete(`${BASE_URL}eventapi/comments/${comment_id}`,config).then(() => {
      window.location.reload();
    })
  };
  return (
    <div>





<Container>
  <Row>
    <Col lg={4}>
    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "100%",
                        marginLeft:"20%"
                        
                      }}
                      src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                      alt=""
                    />
                    <h1 style={{marginLeft:"20%"}}>Username</h1>
                    <h1 style={{marginLeft:"20%"}}>Location</h1>
    </Col>
    <Col lg={8}>
    <Flex width="50%" flexDirection="column" justifyContent="center" alignItems="center">
        <div style={{position: "relative"}}>
        <img
          className="eventdetail-img"
          style={{ borderRadius: "20px" }}
          src={eventdetails?.image}
          alt=""
        />

        <H4 fontWeight="bold" margin="10px" position= "absolute" bottom="30px"left= "50%" transform= "translate(-50%)">
          {eventdetails?.event_name}
        </H4>
        </div>
        <Flex display="flex" flex-grow="row" justifyContent="space-between" alignItems="center"><Icon icon="fa-solid fa-location-dot" margin="0"backgroundColor="white" color="red"/><H4 color="dodgerblue">{eventdetails?.location}</H4></Flex>
        
        <Flex>
          <H6 margin="10px">Start Date and Time : {eventdetails?.start_date},{eventdetails?.start_time}</H6>
          {/* <H6 margin="10px">Start Date and Time : {eventdetails?.start_time}</H6> */}
        </Flex>
        <Flex>
          <H6 margin="10px">End Date and Time : {eventdetails?.end_date},{eventdetails?.end_time}</H6>
          {/* <H6 margin="10px">End Time : {eventdetails?.end_time}</H6> */}
        </Flex>

        <H5 margin="10px">{eventdetails?.description}</H5>
        <H6 fontWeight="bold" color="red" margin="10px">
          {eventdetails?.limit_attendees} slots left!!
        </H6>
        
        {console.log("joiner id event detail condition ",joinedpeople?.filter((da)=> da?.event.id===eventdetails.id))}

        <TabSwitcher 
        text={eventdetails?.comments_amount}
          child1={
            <Flex flexDirection="column" width="100%">
              {joinedpeople?.filter((da)=> da?.event.id===eventdetails?.id)?
                   joinedpeople?.filter((da)=> da?.event.id===eventdetails?.id).map((data)=>
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
                  <Flex flexDirection="column">
                    <H5 margin="0 5px" color="black" fontWeight="bold">
                      {data.user.username}
                     
                    </H5>
                  
                  </Flex>
                </Flex>):
                <H5>No people joined</H5>
            }
              
        
            </Flex>
          }
          child2={
            <div className="comments" style={{borderRadius:"20px",width:"50%"}}>
              <Flex borderRadius="500px" flexDirection="column">
                {comment?.map((data) => (
                  <Flex
                    margin="10px"
                    justifyContent="center"
                    alignItems="center"
                  >
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
                      <H5 margin="0 5px" color="black" fontWeight="bold">
                        {data.author.username}
                      </H5>

                      <H6 margin="0 5px" color="black">
                        {data.text}
                      </H6>
                    </Flex>
           { data.author.id === decoded.user_id || eventdetails?.author.id === decoded.user_id ?

                    <Icon onClick={(comment_id)=>{DeleteComment(comment_id=data.id)}}
                      margin-left="50px"
                      icon="fa-solid fa-trash-can"
                      backgroundColor="red"
                    />
                    :null}
                  </Flex>
                ))}
              </Flex>

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
                <Flex margin="5px">
                  <TextArea
                    onChange={(e) => setAddcoment(e.target.value)}
                    placeholder="write a comment"
                  ></TextArea>

                  
                </Flex>
                
              </Flex>
              <DarkBtn margin="0px 100px"onClick={onSubmit}>Comment</DarkBtn>
            </div>
          }
          child3={eventdetails?.author.id === decoded.user_id ?
              <H6>You Are The Organizer</H6>:
              <H5>Join</H5>}
        />
      </Flex>
    </Col>
  </Row>
 
</Container>
    </div>
  )
}

export default Eventde