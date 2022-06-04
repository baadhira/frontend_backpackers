import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { BASE_URL } from '../../BaseUrl'
import { PrimaryBtn, SecondaryBtn } from '../../components/Button/Button'
import { Flex } from '../../components/UI/Flex/Flex'
import { getFriendRequests } from './Method_profile'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export const Friends = () => {
  var token = localStorage.getItem("authToken");

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
  return (
    <>
        <table>
        {friends?.filter(
        (fil)=>fil.accept===true)?
    (friends?.filter((fil)=>fil.accept===true)
    ?.map(data=>(
            <tr>
                <td>{data.sender.username}</td>
                <td onClick={(req_id)=>DeleteFriend(req_id=data.id)}><SecondaryBtn padding="5px 10px">Unfriend</SecondaryBtn></td>
            </tr>
            ))):null}
        </table>
    {/* // <Flex>
    //     <Flex width="50%" margin="5px">{data.sender.username}</Flex>
    //     <Flex width="50%" margin="5px">{data.sender.username}</Flex>

    // </Flex> */}
   
  
    </>
  )
}
{/* <table>
  <tr>
    <td>10</td>
    <td>200</td>
    <td>300</td>
  </tr>
  <tr>
    <td>400</td>
    <td>500</td>
    <td>600</td>
  </tr>
</table> */}

