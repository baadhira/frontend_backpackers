import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { BASE_URL } from '../../BaseUrl'
import { PrimaryBtn, SecondaryBtn } from '../../components/Button/Button'
import { Flex } from '../../components/UI/Flex/Flex'
import Popup from 'reactjs-popup';
import jwt_decode from "jwt-decode";

import 'reactjs-popup/dist/index.css';
import { getFriendRequests } from '../Notifications/Method_request'
export const FriendsPeople = ({peopledetail}) => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const [friends,setFriends] =useState()
  const FriendRequest = useCallback(() => {
    getFriendRequests().then((res) =>{
        setFriends(res.data)
         console.log("freinds are..",res)
       })
  });
  useEffect(() => {
    FriendRequest()

  },[setFriends])
  const DeleteFriend=(req_id)=>{
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.delete(`${BASE_URL}api/user/friendrequest/${req_id}/`,config).then(() => FriendRequest());

  }
  // console.log("friends driend state",friends?.filter(fil=>fil.accept===true));
  console.log("accepted frnds",friends?.filter(fil=>fil.accept===true)?(friends?.filter(fil=>fil.sender.id===decoded.user_id)||friends?.filter(fil=>fil.reciever.id===decoded.user_id)):null)
  return (
    <>
        <table>
        {friends?.filter(
        (fil)=>fil.accept===true && fil.reciever.id===peopledetail.id)
    // (friends?.filter((fil)=>fil.accept===true)
    ?.map(data=>(
            <tr>
                <td>{data.sender.username}</td>
                {peopledetail.id===decoded.user_id?
                <td onClick={(req_id)=>DeleteFriend(req_id=data.id)}><SecondaryBtn padding="5px 10px">Unfriend</SecondaryBtn></td>
              :null}
            </tr>
            ))}
        </table>
    {/* // <Flex>
    //     <Flex width="50%" margin="5px">{data.sender.username}</Flex>
    //     <Flex width="50%" margin="5px">{data.sender.username}</Flex>

    // </Flex> */}
   
  
    </>
  )
}