import React, { useState, useEffect, useContext } from "react";
import { sendTestSocket } from "../socketService";
import { activeChatAction, userDetailAction } from "../stateManagement/actions";
import { store } from "../stateManagement/store";
const SimpleMessage = (props) => {
    const [name,setName]=useState()
    const [showMessage,setShowMessage]=useState(false)

    const {dispatch}=useContext(store)

    const onSubmit=(e) => {
        e.preventDefault();
        dispatch({type:userDetailAction,payload:name})
        setShowMessage(true)
    }
  return (
    <>

    {!showMessage?
 (   <div style={{ marginTop: "100px" }}>
      <h1>Hello there, Please enter Your name</h1>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={e=>setName(e.target.value)}/>
        <button type="submit">submit</button>
      </form>
    </div>):
      <MessageInterface />
    }
      </>

  );
};

export default SimpleMessage;

const MessageInterface = (props) => {
  const [name,setName]=useState("")
  const [messages,setMessages] =useState([]);
  const [message,setMessage] =useState("");
  const [receiver,setReceiver] =useState("");



  const {
    state:{userDetail,activeChat},
    dispatch,
  } =useContext(store)

  useEffect(() => {
    if(name!=userDetail){
      setName(userDetail)
    }
    if(activeChat){
      setMessages([...messages,activeChat]);
      dispatch({type:activeChatAction,payload:null});

    }
  },[userDetail,activeChat])

  const submit=e=>{
    e.preventDefault();
    let data={
      sender:name,
      receiver,
      message,
    }
    setMessages([...messages,data])
    sendTestSocket(data);
    // console.log(data);
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Hello {name}</h2>
      <form onSubmit={submit}>
        <input value={receiver} placeholder="enter receiver name" onChange={(e)=>setReceiver(e.target.value)}/>
        <textarea placeholder="start typing message" value={message} onChange={e=>setMessage(e.target.value)}></textarea>
        <br/>
        <button type="submit">send</button>
      </form>
      <br/>
      {messages.length<1? <div>No messages yet</div>:messages.map((item,index)=>{
        return(
          <div key={index}>
          <b>{item.message}</b><br/>
          <small>{item.sender}</small>
          <hr/>
        </div>
        )
      })}
     
    </div>
  );
};
