import React, { useEffect, useState } from "react";

import { Card } from "../../components/Card/Card";
import { H3, H4, H5, H6, H7 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";
import { Icon } from "../../components/Icon/Icon";
import jwt_decode from "jwt-decode";
import "./AllEvent.css";
import { BASE_URL } from "../../BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useQueryFetch } from "../../Hooks/useQueryFetch";
import { useJwtDecode } from "../../Hooks/useJwtDecode";
import { Loader } from "../../components/Loader";
export const AllEvent = (props) => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const user_id=useJwtDecode()

  const { fetchData: allevent } = useQueryFetch("eventapi/events");
  const { fetchData: joiner } = useQueryFetch("eventapi/getjoinedusers/");

  console.log("joined events",joiner?.data.filter(fil=>fil.user.id===decoded.user_id));
  
  const joinedEvents=joiner?.data.filter(fil=>fil.user.id===decoded.user_id)
  console.log("joned events----------------",joinedEvents);
  const totallist = 5;
  const [range, setRange] = useState({
    from: 0 * totallist,
    to: 0 * totallist + totallist,
  });
  const [page, setPage] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < allevent?.data.length / totallist) {
      setPage([...page, { id: count }]);
      setCount(count + 1);
    }
  });

  const JoinEvent = (event_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post(
      `${BASE_URL}eventapi/joinedusers/`,
      {
        event: event_id,
        user: user_id,
      },
      config
    );
    // http://127.0.0.1:8000/eventapi/events/13/
    axios
      .patch(
        `${BASE_URL}eventapi/events/${event_id}/`,
        {
          limit_attendees:
            allevent?.data
              .filter((fil) => fil.id === event_id)
              .map((data) => data.limit_attendees) - 1,
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
        {allevent?
        allevent?.data.slice(range.from, range.to).map((data, index) => (
          
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
              <Flex marginLeft="10px">
                <Icon margin="10px" text="16" backgroundColor="dodgerblue"fontColor="red" />
                <Icon
                  margin="10px"
                  icon="fa-solid fa-comments"
                  backgroundColor="dodgerblue"
                />

                {data.author.id === user_id ? null :(joinedEvents?.filter(fil=>fil.event.id===data.id).length!==0?
                    <Icon
                    onClick={(joined_id) =>leaveJoiner(joined_id=data.id)}
                      margin="10px"
                      icon="fa-solid fa-arrow-right-from-bracket"
                      backgroundColor="red"
                    />:
                 
                <Icon
                    onClick={(event_id) => JoinEvent((event_id = data.id))}
                    margin="10px"
                    icon="fa-solid fa-location-arrow"
                    backgroundColor="rgb(0,183,0)"
                  />)
                  }
              </Flex>
            </Card>
          </Col>
        )):<Loader/>
        }
      </Row>
      <Flex>
        {page.map((data, index) => (
          <button
            className={`paginationButton ${
              index * totallist === range.from ? "black" : "white"
            }`}
            onClick={() =>
              setRange({
                from: index * totallist,
                to: index * totallist + totallist,
              })
            }
          >
            {data.id + 1}
          </button>
        ))}
      </Flex>
    </div>
  );
};
