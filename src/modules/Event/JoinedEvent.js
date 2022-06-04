import React, { useEffect, useState } from "react";
import { Grid } from "../../components/UI/Grid/Grid";

import { Card } from "../../components/Card/Card";
import { getEvents, getJoiners } from "./method/Method";
import { H3, H4, H5, H6, H7 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";
import { Icon } from "../../components/Icon/Icon";
import jwt_decode from "jwt-decode";
import {BASE_URL} from '../../BaseUrl'
import "./AllEvent.css";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
export const JoinedEvent = () => {
  var token=localStorage.getItem("authToken");

  const { data: joiners,refetch } = useQuery("joiners", getJoiners);
  const { data: allevent } = useQuery("allevent", getEvents);
  
  console.log("joiners in joined events",joiners?.data);
  console.log("allevent ",allevent?.data)
  // console.log("joiner id",joined_id)
  


  
  const leaveJoiner=(joined_id)=>{
    const config = {
      headers: {
        "Accept": "application/json",
        Authorization:`Bearer ${token}`
      },
    };
    axios.delete(`${BASE_URL}eventapi/joinedusers/${joined_id}`,config).then(()=> {
      // window.location.reload();
      refetch()
    })
    axios
      .patch(
        `${BASE_URL}eventapi/events/${joined_id}/`,
        {
          limit_attendees:allevent?.data.filter(fil=>fil.id===joined_id).map(data=>data.limit_attendees)+1
          
        },
        config
      )

  }


  
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  return (
    <div className="event">
      <Row>
        {joiners
          ?.data.filter((fil) => fil.user.id === decoded.user_id)
          .map((data, index) => (
            <Col lg={4}>
            <Card>
              <img
                style={{ borderRadius: "20px", width: "100%" }}
                src={data.event.image}
                alt=""
              />
              <H4 fontWeight="bolder" margin="5px">
                {data.event.event_name}
              </H4>
              

              <H4 margin="5px">{data.event.location}</H4>
              <Flex>
                <H6 margin="5px">Start Date : {data.event.start_date}</H6>
                <H6 margin="5px">Start Time : {data.event.start_time}</H6>
              </Flex>
              <Flex>
                <H6 margin="5px">End Date : {data.event.end_date}</H6>
                <H6 margin="5px">End Time : {data.event.end_time}</H6>
              </Flex>

              {/* <H5 margin='5px'>{data.event.description}</H5> */}
              <H6 fontWeight="bold" color="red" margin="5px">
                {data.event.limit_attendees} slots left!!
              </H6>
              <Flex>
                <Icon margin="10px" text="12" />
                <Icon
                  margin="10px"
                  icon="fa-solid fa-comments"
                  backgroundColor="dodgerblue"
                />
                {/* {console.log("data id",joinid)}
                {joinid=data.event.id} */}
                <Icon
                onClick={(joined_id) =>leaveJoiner(joined_id=data.id)}
                  margin="10px"
                  icon="fa-solid fa-arrow-right-from-bracket"
                  backgroundColor="red"
                />
              </Flex>
            </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};
