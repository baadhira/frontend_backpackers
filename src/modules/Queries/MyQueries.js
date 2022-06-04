import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import {getQueries} from '../Queries/MethodQuery/MethodQueries'
import { Grid } from '../../components/UI/Grid/Grid';
import { Flex } from '../../components/UI/Flex/Flex';
import { H4, H5, H6 } from '../../components/Text/Text';
import { Icon } from '../../components/Icon/Icon';
import axios from 'axios';
import {BASE_URL} from '../../BaseUrl'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';


export const MyQueries = () => {
    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);

    const[query,setQuery]= useState()
    useEffect(() => {
        getQueries().then((response)=>{
            setQuery(response.data)
        });
    },[setQuery])

    const DeleteItem=(discussion_id)=>{
        const config={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        axios.delete(`${BASE_URL}discussionapi/discussion/${discussion_id}`,config).then(() =>{
            window.location.reload();
        })
    }

  return (
    <div>
      <Container>
  <Row>
  {query?.filter((fil)=>(fil.author.id===decoded.user_id)).map((data,index)=>(
   
    <Col md={6}> 
     <Link style={{textDecoration:"none",color:"inherit"}} to={`/querydetail/${data.id}`}>
    
    <Flex>    
      <img  style={{width: "80px",height: "80px",borderRadius: "100%",margin: "50px 0px"}}
                      src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                      alt=""
                    />
  <div className="box arrow-left">
    <Flex flexDirection="column">
      <H5 color="black">{data.author.username}</H5>
      {/* <H6 color="black" fontWeight="normal">Asked On :{data.createddate}</H6> */}
      <h6 style={{fontStyle: "italic",color: "black" ,fontSize: "12px"}}>Asked On :{data.createddate}</h6>
    </Flex> 
  {data.question}
  <Flex><Icon margin="10px" text="12"backgroundColor="dodgerblue" />
  <Icon margin="10px"onClick={(discussion_id)=>DeleteItem(discussion_id=data.id)}  icon="fa-solid fa-trash-can" backgroundColor="red"/>
        <H5 margin="10px" icon="fa-solid fa-comments" color="black">View Answers</H5>
      </Flex>
                    </div> 
                    </Flex>
                    </Link> 
                     </Col>
                     
                     ))}        
  </Row>
 
</Container>






         {/* <Grid>
            {query?.filter((fil)=>(fil.author.id===decoded.user_id)).map((data,index)=>(
                <div className="query">
<Link style={{textDecoration:"none",color:"inherit"}} to={`/querydetail/${data.id}`}>

                <Flex margin="20px">
                <img className="img_pro" src={require('../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg')}/>
                <H4 margin-left="10px">{data.author.username}</H4>
              </Flex>
              <H5 color="black" margin="20px">{data.question}</H5>
              <H6 margin="20px"> Asked on : {data.createddate}</H6>
              <Flex>
                <Icon margin="10px" text="12" />
                <Icon margin="10px" icon="fa-solid fa-comments" backgroundColor="dodgerblue"/>
                <Icon margin="10px"onClick={(discussion_id)=>DeleteItem(discussion_id=data.id)}  icon="fa-solid fa-trash-can" backgroundColor="red"/>


              </Flex>
              </Link>
              </div>
            ))}
           

       

        </Grid> */}
    </div>
  )
}

// <Container>
//   <Row>
//   {query?.map((data,index)=>(
//     <Col lg={6}> 
    
//     <Flex>    
//       <img  style={{width: "80px",height: "80px",borderRadius: "100%",margin: "50px 0px"}}
//                       src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
//                       alt=""
//                     />
//   <div className="box arrow-left">
//     <Flex flexDirection="column">
//       <H5 color="black">{data.author.username}</H5>
     
//       <h6 style={{fontStyle: "italic",color: "black" ,fontSize: "12px"}}>Asked On :{data.createddate}</h6>
//     </Flex> 
//   {data.question}
//   <Flex><Icon margin="10px" text="12"backgroundColor="dodgerblue" />
//         <H5 margin="10px" icon="fa-solid fa-comments" color="black">View Answers</H5>
//       </Flex>
//                     </div> 
//                     </Flex> 
//                      </Col>
//                      ))}        
//   </Row>
 
// </Container>
