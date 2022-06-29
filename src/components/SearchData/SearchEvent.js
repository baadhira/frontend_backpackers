import { Icon } from "@mui/material";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getEvents } from "../../modules/Event/method/Method";
import { H4, H5, H6 } from "../Text/Text";
import { Flex } from "../UI/Flex/Flex";

export const SearchEvent = ({ searchTerm, searchResult,clearSearch }) => {
  const { data: event } = useQuery("event", getEvents);

  console.log("event", event);

  return (
    <div>
      <Row>
        <div style={searchResult} className="searchResult"  onClick={() => clearSearch(false)}>
          {event?.data
            ?.filter((ev) => {
              if (searchTerm === "") {
                return <h2>val</h2>;
              } else if (
                ev.event_name
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                ev.location
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return <h2>val</h2>;
              }
            })
            .map((data, key) => (
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
                      // onClick={(event_id) => EditItem((event_id = data.id))}
                      margin="10px"
                      icon="fa-solid fa-pen-to-square"
                      backgroundColor="dodgerblue"
                    />
                    <Icon
                      // onClick={(event_id) => DeleteItem((event_id = data.id))}
                      margin="10px"
                      icon="fa-solid fa-trash-can"
                      backgroundColor="red"
                    />
                  </Flex>
                </Card>
              </Col>
            ))}
        </div>
      </Row>
    </div>
  );
};
