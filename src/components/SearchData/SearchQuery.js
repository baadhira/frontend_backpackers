// import { Icon } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Card, Col, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { getQueries } from "../../modules/Queries/MethodQuery/MethodQueries";
// import { H4, H5, H6 } from "../Text/Text";
// import { Flex } from "../UI/Flex/Flex";

// export const SearchQuery = ({ searchTerm, searchResult }) => {
//   const [query, setAllQueries] = useState();
//   useEffect(() => {
//     getQueries().then((response) => {
//       setAllQueries(response.data);
//       console.log("response query....", response);
//     });
//   }, [setAllQueries]);

import { Icon } from "@mui/material";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getEvents } from "../../modules/Event/method/Method";
import { H4, H5, H6 } from "../Text/Text";
import { Flex } from "../UI/Flex/Flex";
import { getQueries } from "../../modules/Queries/MethodQuery/MethodQueries";

export const SearchQuery = ({ searchTerm, searchResult }) => {
  const { data: query } = useQuery("query", getQueries);

  console.log("query", query);

  return (
    <div>
      <Row>
        <div style={searchResult} className="searchResult">
          {query?.data
            ?.filter((ev) => {
              if (searchTerm === "") {
                return <h2>val</h2>;
              } else if (
                ev.location
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
              <Col md={6}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/querydetail/${data.id}`}
                >
                  <Flex>
                    <img
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "100%",
                        margin: "50px 0px",
                      }}
                      src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                      alt=""
                    />
                    <div className="box arrow-left">
                      <Flex flexDirection="column">
                        <H5 color="black">{data.author.username}</H5>
                        {/* <H6 color="black" fontWeight="normal">Asked On :{data.createddate}</H6> */}
                        <h6
                          style={{
                            fontStyle: "italic",
                            color: "black",
                            fontSize: "12px",
                          }}
                        >
                          Asked On :{data.createddate}
                        </h6>
                      </Flex>
                      {data.question}
                      <Flex>
                        <Icon
                          margin="10px"
                          text="12"
                          backgroundColor="dodgerblue"
                        />
                        <H5
                          margin="10px"
                          icon="fa-solid fa-comments"
                          color="black"
                        >
                          View Answers
                        </H5>
                      </Flex>
                    </div>
                  </Flex>
                </Link>
              </Col>
            ))}
        </div>
      </Row>
    </div>
  );
};
