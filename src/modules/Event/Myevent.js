import React, { useEffect, useState } from "react";
import { Grid } from "../../components/UI/Grid/Grid";

import { Card } from "../../components/Card/Card";
import { getEvents } from "./method/Method";
import { H3, H4, H5, H6, H7 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";
import { Icon } from "../../components/Icon/Icon";
import "./Myevent.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import { Editevent } from "./subComponent/Editevent";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Col, Row } from "react-bootstrap";

export const Myevent = () => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const [editevent, setEditevent] = useState(false);
  const [eventid, setEventid] = useState();
  

  const { data: myevent } = useQuery("myevent", getEvents);

  const EditItem = (event_id) => {
    setEventid(event_id);
    setEditevent(true);
  };

  

  var token = localStorage.getItem("authToken");

  const DeleteItem = (event_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.delete(`${BASE_URL}eventapi/events/${event_id}`, config).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="event">
      {editevent ? (
        <div className="bg_black">
          <Editevent eventid={eventid} setEditevent={setEditevent} />
        </div>
      ) : null}

      <Row>
        {myevent?.data
          ?.filter((fil) => fil.author.id === decoded.user_id)
          .map((data, index) => (
            <Col lg={4} md={4} sm={6}>
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
                  <Icon
                    onClick={(event_id) => EditItem((event_id = data.id))}
                    margin="10px"
                    icon="fa-solid fa-pen-to-square"
                    backgroundColor="dodgerblue"
                  />
                  <Icon
                    onClick={(event_id) => DeleteItem((event_id = data.id))}
                    margin="10px"
                    icon="fa-solid fa-trash-can"
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
