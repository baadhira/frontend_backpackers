import React, { useCallback, useEffect, useState } from "react";
import { getFriendRequests } from "./Method_request";
import jwt_decode from "jwt-decode";
import { H5 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";
import { Icon } from "../../components/Icon/Icon";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";

export const Friend_request = () => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const [frndrequest, SetFrndRequest] = useState();

  const FriendRequest = useCallback(() => {
    getFriendRequests().then(
      (res) => {
        SetFrndRequest(res.data);
        console.log("friend requests...", res.data);
      },);
  });

  useEffect(() => {
    FriendRequest();
  }, [SetFrndRequest]);

  console.log(
    "friend requests for me",
    frndrequest
      ?.map((data) => data.reciever)
      ?.filter((data) => data?.id === decoded.user_id)
      ?.map((data) => data.sender)
  );
  console.log(
    "friend request sender..",
    frndrequest?.filter((data) => data.reciever.id)
  );

  const AcceptFriendRequest = (req_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(
        `${BASE_URL}api/user/friendrequest/${req_id}/`,
        {
          accept: "true",
        },
        config
      )
      .then(() => FriendRequest());
  };

  const DeleteFrndRequest=(req_id)=>{
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.delete(`${BASE_URL}api/user/friendrequest/${req_id}/`,config).then(() => FriendRequest());

  }
  return (
    <>

      {frndrequest?.filter(
        (data) => data.accept === false && data.reciever.id === decoded.user_id
      ).length > 0 ? (
        frndrequest
          ?.filter(
            (data) =>
              data.accept === false && data.reciever.id === decoded.user_id
          )
          ?.map((data) => (

            <Flex justifyContent="center" alignItems="center">
              <H5>{data.sender.username}</H5>
              <Flex margin="0px 30px">
                <Icon margin="0px 30px" onClick={(req_id)=>DeleteFrndRequest(req_id=data.id)}backgroundColor="red" icon="fa-solid fa-trash"></Icon>
                <Icon margin="0px 30px"
                  onClick={(req_id) => AcceptFriendRequest((req_id = data.id))}
                  backgroundColor="green"
                  icon="fa-solid fa-check"
                ></Icon>
              </Flex>
            </Flex>
          ))
      ) : (
        <H5>no requests found!!!!!!</H5>
      )}
    </>
  );
};
{
  /* <i class="fa-solid fa-trash"></i> */
}
{
  /* <i class="fa-solid fa-check"></i> */
}
// {frndrequest?.filter(data=>data.reciever.id==decoded.user_id)?.map(data=>(
//   <h1>{data.sender.username}</h1>
// )):
// <H5>no requests found!!!!!!</H5>
// }
