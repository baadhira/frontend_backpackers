import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../BaseUrl';
import { Icon } from '../../components/Icon/Icon';
import { TextArea } from '../../components/Input/Input';
import { H3, H5, H6 } from '../../components/Text/Text';
import { Flex } from '../../components/UI/Flex/Flex';
import { getHostRequestsDetail } from './Method_request'
import jwt_decode from "jwt-decode";
import { PrimaryBtn, SecondaryBtn } from '../../components/Button/Button';
// import { InputReply } from './InputReply';

export const HostRequestDetail = () => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const [requestdetails,setRequestDetails] =useState()
  const [reply,setReply]=useState(false);

  const { id } = useParams();
  const HostRequest=useCallback(()=>{
    getHostRequestsDetail(id).then((res)=>{
      setRequestDetails(res.data)
      console.log("host request details",res.data)
    })

  })

  useEffect(() =>{
    HostRequest();
   
  },[setRequestDetails])

  const AcceptHostRequest = (req_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${BASE_URL}api/user/hostrequests/${req_id}/`,
        {
          accept: "true",
        },
        config
      )
      .then(() => HostRequest());
  };
  const DeclineHostRequest = (req_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${BASE_URL}api/user/hostrequests/${req_id}/`,
        {
          decline: "true",
        },
        config
      )
      .then(() => HostRequest());
  };
  console.log("id",id)
  return (
    <>
    <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start" margin="50px 0px">

    
              <Flex flexDirection="column" backgroundColor = "#b8c6db" padding="30px 0px" borderRadius="20px"
backgroundImage = "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)" width="300px" justifyContent="center" alignItems="center" margin="50px 0px 0px 0px ">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                }}
                src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                alt=""
              />
              <H5 margin="0px 20px">{requestdetails?.from_user.username}</H5>
              <H5 margin="0px 20px" color="dodgerblue">From : {requestdetails?.from_user.born_location}</H5>
              <H5 margin="0px 20px" color="dodgerblue">Languages Speak : {requestdetails?.from_user.prefered_language}</H5>
              <H5 margin="0px 20px" color="dodgerblue">Countries Visited : {requestdetails?.from_user.countries_visited}</H5>
              <H5 margin="0px 20px" color="dodgerblue">Occupation : {requestdetails?.from_user.occupation}</H5>

              
              
              


              </Flex>
              {/* <Flex flexDirection="column" backgroundColor = "#b8c6db" padding="30px 0px" borderRadius="20px"
backgroundImage = "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)" width="300px" justifyContent="center" alignItems="center" margin="50px 0px 0px 0px ">
             

             <Flex width="500px" margin="0px 20px"flexDirection="column" backgroundColor = "#b8c6db" padding="30px 0px" borderRadius="20px"
backgroundImage = "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)">
              <H5>Coming Date :{requestdetails?.coming_date}</H5>
              <H5>Coming Time :{requestdetails?.coming_time}</H5>

              </Flex>
              <Flex margin="0px 20px"flexDirection="column" backgroundColor = "#b8c6db" padding="30px 0px" borderRadius="20px"
backgroundImage = "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)">
              <H5>Leaving Date :{requestdetails?.leaving_date}</H5>
              <H5>Leaving Time :{requestdetails?.leaving_time}</H5>

              </Flex>
              
              


              </Flex>
             
                  <Flex margin="0px 30px">
                    {requestdetails?.accept===true ?<H5 margin="20px"color="green">Accepted</H5>:
                    <>
          {requestdetails?.decline===true?<H5 margin="20px"color="green">Declined</H5>:
          <>
          <Icon onClick={(req_id)=>DeclineHostRequest(req_id=id)} backgroundColor="red" icon="fa-solid fa-trash"></Icon>
          <Icon onClick={(req_id)=>AcceptHostRequest(req_id=id)}backgroundColor="green"icon="fa-solid fa-check"></Icon>
          </>

        }
          </>

<i class="fa-solid fa-calendar"></i>
<i class="fa-solid fa-clock"></i>
<i class="fa-solid fa-arrow-right-long"></i>
                    }
                     backgroundColor = "#b8c6db" padding="30px 0px" borderRadius="20px"
backgroundImage = "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)" 
            </Flex> */}

            <div style={{backgroundColor:"#b8c6db",backgroundImage:"linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)",padding:"30px 30px", width:"800px",minHeight:"300px",maxHeight:"fit-content",marginLeft:"50px",marginTop:"50px",borderRadius:"20px"}}>
              <div style={{display:"flex",flexDirection:"row"}}>
                <Icon  color="black" icon="fa-solid fa-calendar"/>
              <H5>{requestdetails?.coming_date}</H5>
              <Icon color="black"  icon="fa-solid fa-clock"/>
              <H5>{requestdetails?.coming_time}</H5>
              <Icon color="black" margin="0px 0px 0px 50px" icon="fa-solid fa-arrow-right-long"/>
              <Icon margin="0px 0px 0px 50px" color="black" icon="fa-solid fa-calendar"/>
              <H5>{requestdetails?.leaving_date}</H5>
              <Icon color="black"  icon="fa-solid fa-clock"/>
              <H5>{requestdetails?.leaving_time}</H5>

              </div>
              <div style={{display:"flex",flexDirection:"row"}}>
              <H3>Can you host {requestdetails?.from_user.username} ?</H3>
              <div style={{display:"flex",flexDirection:"row",marginLeft:"100px"}}>
                <SecondaryBtn margin="0px 0px 0px 10px" width="80px" onClick={()=>setReply(true)}>Yes</SecondaryBtn>
                <SecondaryBtn  margin="0px 0px 0px 10px" width="80px" onClick={()=>setReply(true)}>Maybe</SecondaryBtn>
                <SecondaryBtn  margin="0px 0px 0px 10px" width="80px" onClick={()=>setReply(true)}>No</SecondaryBtn>
              </div>
              
            </div>
            <div style={{border: "1px solid",borderRadius:"20px",marginTop:"20px",backgroundColor:"white",minHeight:"100px",maxHeight:"fit-content",}}>
              <div style={{display:"flex",flexDirection:"row",margin:"0px 0px 0px 20px"}}>           
                <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                }}
                src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                alt=""
              />
              <H6 margin="0px 10px">{requestdetails?.from_user.username}</H6></div>
 
              <H5 margin="0px 0px 0px 20px">{requestdetails?.hostMessage}</H5>
              </div>
            
            
            </div>
            
            {/* {reply?
    <div className="popupalbum">
    <Icon backgroundColor="white" color="black" className="fa fa-close"  onClick={() => setNotdetails(false)} />
    <i className="fa fa-close"  onClick={() => setReply(false)}></i>
    <InputReply/>
    </div>: null
    } */}
              
    </Flex>
 
   
    
     
    </>
  )
}
