import React, { useEffect, useState } from 'react'
import { getHostRequests } from './Method_request'
import jwt_decode from "jwt-decode";
import { Flex } from '../../components/UI/Flex/Flex';
import { H5 } from '../../components/Text/Text';
import { Link } from 'react-router-dom';
import { DarkBtn } from '../../components/Button/Button';
import dateFormat from 'dateformat';

export const HostRequestReplies = () => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);


  const[hostrequest,setHostRequest] =useState()
  useEffect(() => {
    getHostRequests().then((res)=>{
        setHostRequest(res.data)
        console.log("host requests replies..",res.data)
    })
},[setHostRequest])


 console.log("my request details",hostrequest?.filter(fil=>fil.from_user.id===decoded.user_id))

  return (
    <>
    {hostrequest?.filter(fil=>fil.to_user.id=== decoded.user_id)? (
        hostrequest?.filter(fil=>fil.from_user.id=== decoded.user_id)?.map((data)=> 
            <Flex flexDirection="row" justifyContent="center" alignItems="center">
                 <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                }}
                src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                alt=""
              />
            <H5 margin="0px 10px">{data.to_user.username}</H5>
           
            <h6 fontWeight="bold" style={{ margin:"0px 10px"}}>Requested : {data.coming_date} To {data.leaving_date}</h6>

            <Link to={`/host_request_detail_reply/${data.id}`} style={{textDecoration:"none",color:"inherit"}} > 
            <DarkBtn margin="0px 20px">Details</DarkBtn>
            
            {/* <h3>{data.coming_date}</h3> */}
            </Link>            
            {/* <Flex margin="0px 30px">
            <Icon backgroundColor="red" icon="fa-solid fa-trash"></Icon>
            <Icon backgroundColor="green"icon="fa-solid fa-check"></Icon>
            </Flex> */}
          </Flex>
          )   
    ) : (
        <H5>no host requests</H5>
    )}
    </>
  )
}
