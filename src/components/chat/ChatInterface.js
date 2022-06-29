import React, { useEffect, useState } from "react";
import "./chatui.css";
import { DarkBtn } from "../Button/Button";
import jwt_decode from "jwt-decode";
import { axiosHandler, BASE_URL, MESSAGE_URL } from "../../BaseUrl";
import axios from "axios";
import { getMessages } from "./Method/Method";
import { config } from "../../Utils/Config";

function ChatInterface({ activeUser, people,messages,refetchData }) {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);

  const loggedUser = people
    ?.filter((data) => data.id === decoded.user_id)
    ?.map((data) => data?.username);

  const [message, setMessage] = useState("");

 

 

  const submitMessage = (e) => {
    e.preventDefault();

  
    axios.post(
      `${BASE_URL}message/message`,
      {
        sender_id: decoded.user_id,
        receiver_id: activeUser?.id,
        message,
      },

      config
    ).then(()=>{
      setMessage("")
      refetchData()
    })
  };

  return (
    <>
      {activeUser?.username ? (
        <div className="border" >
          <div className="header-chat">
            <p className="name" style={{fontWeight:"bold",marginLeft:"10px"}}> {activeUser?.username}</p>
          </div>
<div style={{overflowY:"scroll",height:"30rem"}}>
          <div className="messages-chat d-flex" style={{flexDirection:"column",marginTop:"30px"}} >
            {messages?.length < 1 ? (
              <h1>No Messages Yet</h1>
            ) : (
              messages?.slice(0).reverse().map((item, key) => (
                <div className="message text-only px-2">
                  <div
                    className={
                      item.receiver.id === decoded.user_id ? "reply" : "response"
                    }
                  >
                    <p className="text px-2 py-2 rounded border bg-info" > {item.message}</p>
                  </div>
                </div>
              ))
            )}

            {/* <p className="time"> 14h58</p>
     <div className="message text-only">
       <div className="response">
         <p className="text"> Hey Megan ! It's been a while 😃</p>
       </div>
     </div>
     <div className="message text-only">
       <div className="response">
         <p className="text"> When can we meet ?</p>
       </div>
     </div>
     <p className="response-time time"> 15h04</p>
     <div className="message">
       <div className="photo" >
         <div className="online"></div>
       </div>
       <p className="text"> 9 pm at the bar if possible 😳</p>
     </div>
     <p className="time"> 15h09</p> */}
          </div>
          </div>
          
          <form onSubmit={submitMessage} className=" d-flex border">
            <input
              type="text"
              className="write-message w-100 m-0"
              placeholder="Type your message here"
              value={message}
              style={{border:"None"}}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button>send</button>
          </form>
         
        </div>
      ) : (
        <h1>Click a user to start chatting</h1>
      )}
    </>
  );
}

export default ChatInterface;
