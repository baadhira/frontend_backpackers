import { Col, Container, Row } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { Icon } from "../../components/Icon/Icon";
import { TextArea } from "../../components/Input/Input";
import { H3, H4, H5, H6 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";
import dateFormat from 'dateformat';
import {
  getComments,
  getEventComments,
  getEvents,
  getJoiners,
  getoneEvents,
} from "../Event/method/Method";
import {
  DarkBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "../../components/Button/Button";
import jwt_decode from "jwt-decode";

import "./EventDetail.css";
import { TabSwitcher } from "./TabSwitcher";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import { Grid } from "../../components/UI/Grid/Grid";
import { EventComment } from "./EventComment";
import { JoinedPeople } from "./JoinedPeople";
import { useQuery } from "react-query";
import { ReportEvent } from "./ReportEvent";

function EventDetail() {
  const [eventdetails, setEventdetails] = useState();
  const [comment, setComment] = useState(false);
  const [joinedpeople, setJoinedpeople] = useState();
  const { id } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [showJoiners, setShowJoiners] = useState(false);
  const [report,setReport] = useState(false);
  const [comments, setComments]=useState();



  const [event, setEvent] = useState();
  useEffect(() => {
    getEventComments().then((response) =>{
      setComments(response.data)
      

    })
  },[setComments])

  const OneEvent = useCallback(() => {
    getoneEvents(id).then((res) => {
      setEventdetails(res.data);
      
    });
  });

  useEffect(() => {
    OneEvent();

    getEvents().then((response) => {
      setEvent(response.data);
      
    });

    getComments(id).then((res) => {
      setComment(res.data);
      
    });
    getJoiners().then((res) => {
      setJoinedpeople(res.data);
      
    });
  }, [setEventdetails, setJoinedpeople, setEventdetails]);


  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  // console.log("token", token);

  const [addComment, setAddcoment] = useState();
  const { data: allevent } = useQuery("allevent", getEvents);
  
  const navigate = useNavigate();

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
      // http://127.0.0.1:8000/eventapi/events/13/
      axios
      .patch(
        `${BASE_URL}eventapi/events/${event_id}/`,
        {
          limit_attendees:allevent?.data.filter(fil=>fil.id===event_id).map(data=>data.limit_attendees)-1
        },
        config
      )
      .then(() => {
        window.location.reload()
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
  return (
    <div className="event_details">
      <Container>
        <Row>
          <Col
            lg={2}
            style={{ height: "auto" }}
            className="eventright row "
          >
            <div className="event-top-col col-md-5 col-lg-12">
              <h4 className="organizer">Organizer</h4>
              <img
                className="organizer-img"
                src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                alt=""
              />
              <h6 className="organizer-name">
                {eventdetails?.author.username}
              </h6>
              <h6 style={{color: "dodgerblue"}} className="organizer-name">
                {eventdetails?.author.born_location}
              </h6>
              {/* <Flex margin="0px 20%"
              display="flex"
              flex-grow="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Icon
                icon="fa-solid fa-location-dot"
                margin="0"
                color="red"
              />
              <H4 color="dodgerblue">{eventdetails?.location}</H4>
            </Flex>

            <Flex margin="0px 2%" >
            
            <Icon
                icon="fa-solid fa-hourglass-start"
                margin="0"
                color="black"
              />
              <h6 style={{padding: "5px",fontSize: "14px"}}>
                Start At: {eventdetails?.start_date} || {eventdetails?.start_time}
               
              </h6>
              
            </Flex>
            <Flex margin="0 2%">
            <Icon
            
                icon="fa-solid fa-hourglass-end"
                margin="0"
                color="black"
              />
              <h6 style={{padding: "5px",fontSize: "14px"}}>
                End At: : {eventdetails?.end_date}, || 
                {eventdetails?.end_time}
              </h6>
              
            </Flex> */}
            </div>

        
            
         

            {/* <div className="sticky-outer col-md-5 col-lg-12">
              <div className="sticky">
                <svg width="0" height="0">
                  <defs>
                    <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                      <path
                        d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                        stroke-linejoin="round"
                        stroke-linecap="square"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="sticky-content">
                  <H4 color="dodgerblue">
                    <i className="fa-solid fa-location-dot"></i>{" "}
                    {eventdetails?.location}
                  </H4>

                  <H5 color="black"> {eventdetails?.start_date}</H5>
                  <H6 color="black">- {eventdetails?.start_time} -</H6>
                  <H5 color="black">to</H5>
                  <H5 color="black"> {eventdetails?.end_date}</H5>
                  <H6 color="black">- {eventdetails?.end_time} -</H6>
                </div>
              </div>
            </div> */}
          </Col>

          <Col lg={7}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <div style={{ position: "relative" }}>
                <img
                  className="eventdetail-img"
                  style={{ borderRadius: "20px" }}
                  src={eventdetails?.image}
                  alt=""
                />

                <H4
                  margin="10px"
                  position="absolute"
                  bottom="30px"
                  left="50%"
                  transform="translate(-50%)"
                  color="white"
                  fontWeight="bold"
                >
                  {eventdetails?.event_name}
                </H4>
                {/* <div style={{display: 'flex', flexDirection: 'row'}}>
                <i class="fa-solid fa-clock"></i>
                <H6
                  margin="-20px"
                  position="absolute"
                  bottom="30px"
                  left="22%"
                  transform="translate(-50%)"
                  color="white"
                  fontWeight="bold"
                >
                  {eventdetails?.start_date}
                </H6>
                <H6
                  margin="-20px"
                  position="absolute"
                  bottom="30px"
                  left="46%"
                  transform="translate(-50%)"
                  color="white"
                  fontWeight="bold"
                >
                  ||{eventdetails?.start_time}
                </H6>
                <H6
                  margin="-20px"
                  position="absolute"
                  bottom="30px"
                  left="50%"
                  transform="translate(-50%)"
                  color="white"
                  fontWeight="bold"
                >
                  {eventdetails?.end_date}
                </H6>
                <H6
                  margin="-20px"
                  position="absolute"
                  bottom="30px"
                  left="73%"
                  transform="translate(-50%)"
                  color="white"
                  fontWeight="bold"
                >
                  ||{eventdetails?.end_time}
                </H6>
                </div> */}
              </div>
              {/* <div
              className="eventDescription"
                color="black"
                borderRadius="20px"
                backgroundImage="linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
                padding="10px"
                backgroundColor="#b8c6db"
                margin="10px"
              > 
              <div style={{display: "flex", flexDirection: "row",alignItems:"flex-end"}}>
                  <Icon margin="auto" className="fa-solid fa-ellipsis" onClick={() => setReport(true)} ></Icon>  
                  </div>            
              </div> */}

              <div
              className="eventDetails"
                color="black"
                // borderRadius="20px"
                // backgroundImage="linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
                padding="10px"
                backgroundColor="black"
                margin="10px"
              >
                <h6 style={{marginLeft:"20px"}}>
              <b>Starts On:</b>&nbsp;&nbsp;&nbsp;
              {eventdetails?.start_time}&nbsp;&nbsp;&nbsp;
              {dateFormat(eventdetails?.start_date, "dddd, mmmm dS, yyyy")}
                
                </h6>
                <h6 style={{marginLeft:"20px"}}>
                <b>Ends on:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{eventdetails?.end_time}&nbsp;&nbsp;&nbsp;{dateFormat(eventdetails?.end_date, "dddd, mmmm dS, yyyy")}

         
              </h6>



                
              </div>
              <div
              className="eventDescription"
                color="black"
                borderRadius="20px"
                backgroundImage="linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
                padding="10px"
                backgroundColor="#b8c6db"
                margin="10px"
              >
                <p style={{marginLeft:"20px"}}>
                {eventdetails?.description}
                </p>
                
              </div>
              <H6 fontWeight="bold" color="red" margin="10px">
                {eventdetails?.limit_attendees} slots left!!
              </H6>

              
            </Flex>
            <Flex margin="0 20%">
              <div style={{ position: "relative" }}>
                <PrimaryBtn onClick={() => setShowJoiners(true)} margin="10px">
                  People
                </PrimaryBtn>
              </div>
              <div style={{ position: "relative" }}>
                <SecondaryBtn
                  onClick={() => setShowComment(true)}
                  margin="10px"
                >
                  Comment
                </SecondaryBtn>
                <div
                  style={{
                    backgroundColor: "red",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100%",
                  }}
                >
                  {console.log("comment number",comments?.filter(fil=>fil.from_event===eventdetails?.id).length)}
                   
                  <H5 color="white">{comments?.filter(fil=>fil.from_event===eventdetails?.id).length}</H5>
                
                </div>
              </div>
              {eventdetails?.author.id ===
                decoded.user_id ? null :
               
              <DarkBtn onClick={(event_id) => JoinEvent((event_id = eventdetails?.id))} margin="12px">Join</DarkBtn>

    
                }

              {showComment ? (
                <div className="popup_comment_bg">
                  <div className="popup-comment-event">
                    <i
                      className="fa fa-close"
                      onClick={() => setShowComment(false)}
                    ></i>
                    <EventComment eventdetails={eventdetails} setShowComment={setShowComment} />
                  </div>
                </div>
              ) : null}
              {showJoiners ? (
                <div className="popup_comment_bg">
                  <div className="popup-comment-event">
                    <i
                      className="fa fa-close"
                      onClick={() => setShowJoiners(false)}
                    ></i>
                    <JoinedPeople setShowJoiners={setShowJoiners} />
                  </div>
                </div>
              ) : null}
            </Flex>
          </Col>

       

          {report?
    <div className="popup-album">
    <ReportEvent setReport={setReport} />
    </div>: null
    }


          <Col>
            <H5 lg={2}>Suggested Events</H5>
            {/* <div class="card w-40 ">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Button</a>
  </div>
</div> */}
           
            {event?.slice(0, 3).map((data) => (
              <div
                class="card"
                onClick={() => {
                  navigate(`/eventdetail/${data.id}`);
                  // OneEvent();
                }}
              >
                <img
                  class="card-img-top"
                  alt="Card image cap"
                  src={data.image}
                />
                <div class="card-body">
                  <h5 class="card-title">{data.event_name}</h5>
                </div>
              </div>
            ))}

            {/* <img
                  className="eventdetail-img"
                  style={{ borderRadius: "20px", height: "60vh" }}
                  src={eventdetails?.image}
                  alt=""
                /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EventDetail;
