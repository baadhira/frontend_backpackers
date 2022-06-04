import React, { useEffect, useState } from "react";
import { Grid } from "../../../components/UI/Grid/Grid";

import { Card } from "../../../components/Card/Card";
import { getEvents } from "../../Event/method/Method";
import { H3, H4, H5, H6, H7 } from "../../../components/Text/Text";
import { Flex } from "../../../components/UI/Flex/Flex";
import { Icon } from "../../../components/Icon/Icon";
import jwt_decode from "jwt-decode";
import { getJoiners } from "../../Event/method/Method";

import "./PlaceMatchEvent.css";
import { BASE_URL } from "../../../BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
export const PlaceMatchEvent = ({place}) => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const [event, setEvent] = useState();
  const [joiners, setJoiners] = useState();
  const { id } = useParams();
  let [currentpage, setCurrentPage] = useState(1);
  let [itemsperpage, setItemsperpage] = useState(4);

  // useEffect(() => {
  //   getEvents().then((response) => {
  //     setEvent(response.data);

  //     console.log("response", response);
  //   });
  //   getJoiners().then((response) => {
  //     setJoiners(response.data);
  //     console.log("response joiners all", response.data);
  //   });
  // }, [setEvent,setJoiners]);

  const { data: allevent } = useQuery("allevent", getEvents);
  const { data: joiner } = useQuery("joiner", getJoiners);

  const JoinEvent = (event_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${BASE_URL}eventapi/joinedusers/`,
        {
          event: event_id,
          user: decoded.user_id,
        },
        config
      )
      .then(() => {
        window.location.reload();
      });
  };
  const leaveJoiner = (event_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${BASE_URL}eventapi/joinedusers/${event_id}`, config)
      .then(() => {
        window.location.reload();
      });
  };

  

  return (
    <div className="event">
      {/* {event?.map((data,index) => {
               if(index<5){
                   return(
                    <AllEvent/>
                   )
               }
           })} */}
      <Row>
        {allevent?.data.filter(fil=> fil.location===place).map((data, index) => (
         
          <Col lg={4}>
            <Card>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/eventdetail/${data.id}`}
              >
                <img
                  style={{ borderRadius: "20px", width: "100%" }}
                  src={data.image}
                  alt=""
                />

                <H4 fontWeight="bolder" margin="5px">
                  {data.event_name}
                </H4>
                <H5 fontWeight="bolder" color="green" margin="5px">
                  {data.location}
                </H5>
              </Link>

              <H6 fontWeight="bold" color="red" margin="5px">
                {data.limit_attendees} slots left!!
              </H6>
              <Flex>
                <Icon margin="10px" text="16" backgroundColor="black" />
                <Icon
                  margin="10px"
                  icon="fa-solid fa-comments"
                  backgroundColor="dodgerblue"
                />

                {data.author.id ===
                decoded.user_id ? null : joiner?.data?.filter(
                    (fil) => fil.user.id
                  ) === decoded.user_id ? (
                  joiner?.data?.filter((fil) => fil.event.id) === data.id ? (
                    <Icon
                      margin="10px"
                      icon="fa-solid fa-arrow-right-from-bracket"
                      backgroundColor="red"
                    />
                  ) : (
                    <Icon
                      onClick={(event_id) => JoinEvent((event_id = data.id))}
                      margin="10px"
                      icon="fa-solid fa-location-arrow"
                      backgroundColor="rgb(0,183,0)"
                    />
                  )
                ) : (
                  <Icon
                    onClick={(event_id) => JoinEvent((event_id = data.id))}
                    margin="10px"
                    icon="fa-solid fa-location-arrow"
                    backgroundColor="rgb(0,183,0)"
                  />
                )}
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <Pagination allevent={allevent}></Pagination> */}
    </div>
  );
};
