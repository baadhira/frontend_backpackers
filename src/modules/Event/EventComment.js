
// import { Col, Container, Row } from "react-bootstrap";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Card } from "../../components/Card/Card";
// import { Icon } from "../../components/Icon/Icon";
// import { TextArea } from "../../components/Input/Input";
// import { H4, H5, H6 } from "../../components/Text/Text";
// import { Flex } from "../../components/UI/Flex/Flex";
// import { getComments, getJoiners, getoneEvents } from "../Event/method/Method";
// import { DarkBtn } from "../../components/Button/Button";
// import jwt_decode from "jwt-decode";

// import "./EventDetail.css";
// import { TabSwitcher } from "./TabSwitcher";
// import axios from "axios";
// import { BASE_URL } from "../../BaseUrl";
// import { Grid } from "../../components/UI/Grid/Grid";


// export const EventComment = ({ setShowComment }) => {
//   const [eventdetails, setEventdetails] = useState();
//   const [comment, setComment] = useState();
//   const [joinedpeople, setJoinedpeople] = useState();
//   const { id } = useParams();

//   useEffect(() => {
//     getoneEvents(id).then((res) => {
//       setEventdetails(res.data);
//     });

//     getComments(id).then((res) => {
//       setComment(res.data);
//       console.log("response comment...............", res);
//     });
//     getJoiners().then((res) => {
//       setJoinedpeople(res.data);
//       console.log("joined people..", res.data);
//     });
//   }, [setEventdetails, setJoinedpeople, setEventdetails]);
//   console.log("event details", eventdetails?.author.username);

//   var token = localStorage.getItem("authToken");
//   var decoded = jwt_decode(token);

//   // console.log("token", token);

//   const [addComment, setAddcoment] = useState();

//   const onSubmit = () => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     axios
//       .post(
//         `${BASE_URL}eventapi/comments/`,

//         {
//           events: id,
//           text: addComment,
//         },
//         config
//       )
//       .then(() => {
//         window.location.reload();
//         setAddcoment("");
//       });
//   };

//   const DeleteComment = (comment_id) => {
//     const config = {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     axios
//       .delete(`${BASE_URL}eventapi/comments/${comment_id}`, config)
//       .then(() => {
//         window.location.reload();
//       });
//   };

//   console.log("comment>>>", comment);
//   return (
//     <div className="all_comments_detail">
//       <div style={{width:"100%", height:"50px",backgroundColor:"#b8c6db"}}><h6 style={{margin:"15px 0px 0px 0px"}} className="text-center">Comments</h6></div>
  
 
//         {comment?.map((data) => (
//           <Flex margin="10px" justifyContent="center" alignItems="flex-start">
//             <img
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 borderRadius: "100%",
//               }}
//               src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
//               alt=""
//             />

//             <Flex flexDirection="column">
//               <H6 margin="0 5px" color="black" fontWeight="bold">
//                 {data.author.username}
//               </H6>
//               <div style={{margin:"0 5px", color:"black",maxWidth:"300px",height:"fit-content"}}>
//               <h6 style={{margin:"0 5px", color:"black"}}>
//                 {data.text}
//               </h6>

//               {/* <i class="fa-solid fa-reply"></i> */}
          
//               </div>
//             </Flex>
//             {data.author.id === decoded.user_id ||
//             eventdetails?.author.id === decoded.user_id ? (
//               <Icon
//                 onClick={(comment_id) => {
//                   DeleteComment((comment_id = data.id));
//                 }}
//                 margin=" 0px 50px"
//                 icon="fa-solid fa-trash-can"
//                 backgroundColor="white"
//                 color="black"
//               />
//             ) : null}
//           </Flex>
//         ))}


//         <Flex margin="10px" justifyContent="center" alignItems="center">
//           <img
//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "100%",
//             }}
//             src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
//             alt=""
//           />

//           <TextArea width="500px" margin="0px 0px 0px 10px"
//             onChange={(e) => setAddcoment(e.target.value)}
//             placeholder="write a comment"
//           ></TextArea>
//           {/* <i class="fa-solid fa-paper-plane"></i> */}
//           <Icon onClick={onSubmit} margin="0px 0px 0px 10px" backgroundColor="dodgerblue" icon="fa-solid fa-paper-plane"/>
//           {/* <DarkBtn  onClick={onSubmit}>
//             Comment
//           </DarkBtn> */}
//         </Flex>
    
//     </div>
//   );
// };


import React, { useState } from 'react'
import { DarkBtn } from '../../components/Button/Button'
import { Flex } from '../../components/UI/Flex/Flex'
import { getEventComments } from "./method/Method";
import { useEffect } from "react";

import "./EventComment.css";
import ReactTimeAgo from 'react-time-ago'
import { AnswerEvent } from './AnswerEvent';
export const EventComment = ({eventdetails}) => {
  const [comment, setComment]=useState();
  const [loadmore,setLoadmore]=useState([]);
  const [answer,setAnswer] = useState(false)


  {console.log("event id",eventdetails.id)}
  useEffect(() => {
    getEventComments().then((response) =>{
      setComment(response.data)
      console.log("......................................");
      console.log("event comment",response.data);
      console.log("......................................");

    })
  },[setComment])

  useEffect(() => {


    if (loadmore.length < comment?.filter(fil=>fil.from_event===eventdetails?.id && fil.parent===null).length)

        setLoadmore([...loadmore, true])

})
  return (
    <div>
         <div className="comments-event" style={{marginLeft:"30px",marginTop:"30px"}}>
       <div class="comment-thread-event">
         <Flex>
         <h3>Answers</h3> 
         <DarkBtn marginLeft="50px" onClick={()=>setAnswer(true)}> Add Answer</DarkBtn>
         </Flex>
       
       <div class="comment" id="comment-1">
         {/* {console.log("comment filter",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id))} */}
         {/* {console.log("reply set",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id).map(data=>data.reply_set.map(data=>data.comment)))} */}
         {/* {console.log("reply set",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id).map(data=>data.reply_set.map(data=>data.id)))} */}
       
       {/* {console.log("commentnew length",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id && fil.parent===null).length)} */}
       
       
        {comment?.filter(fil=>fil.from_event===eventdetails?.id && fil.parent===null).map((data,index) => ( 
         <>
         <div class="comment-heading">
           
             <div class="comment-info">
                 <a href="#" class="comment-author">{data.user.username}</a>
                 <p class="m-0">
                 {/* {new Date().getDate() - new Date(data.date).getDate()} days ago */}
                 <ReactTimeAgo date={data.date} locale="en-US"/>
                 </p>
             </div>
         </div>
       
         <div class="comment-body">
             <p style={{width:"50% !important" }}>
            {data.comment}
             </p>
         {/* // const daysBetween = new Date().getDate() - new Date('2020-07-15T13:29:15.524486Z').getDate() */}
             {/* {console.log("date",new Date().getDate() - new Date(data.date).getDate())} */}
       
             <button 
            //  onClick={(pid)=>ParentId(pid = data.id)}  
             type="button" >Reply</button>
             <button type="button">Flag</button>
         </div>
         {/* <button>Load more...":"Load Less..."</button> */}
         {/* <a style={{color:"dodgerblue",cursor: "pointer"}} */}
          {/* // onClick={()=>setLoadmore(prevState => */}
          {/* //  prevState.map((item, idx) => idx === index ? !item : item))}> */}
           {/* {loadmore[index]===false?"Load Less...":"Load more..."} */}
          {/* //  </a> */}
         {/* {loadmore[index]===false?
         data.reply_set.map(data=> */}
         <a style={{color:"dodgerblue",cursor: "pointer"}}
   onClick={()=>setLoadmore(prevState =>
    prevState.map((item, idx) => idx === index ? !item : item))}>
    {loadmore[index]===false?"Load Less...":"Load more..."}
    </a>
    {loadmore[index]===false?
       
        data.reply_set.map(data=>
         <div class="replies">
           
             <div class="comment" id="comment-2">
                 <div class="comment-heading">
                     <div class="comment-voting">
                         <button type="button">
                             <span aria-hidden="true">&#9650;</span>
                             <span class="sr-only">Vote up</span>
                         </button>
                         <button type="button">
                             <span aria-hidden="true">&#9660;</span>
                             <span class="sr-only">Vote down</span>
                         </button>
                     </div>
                     <div class="comment-info">
                         <a href="#" class="comment-author">{data.user.username}</a>
                         <p class="m-0">
                        {/* { new Date().getDate() - new Date(data.date).getDate()} days ago */}
                 {/* <ReactTimeAgo date={data.date} locale="en-US"/> */}
       
                         </p>
                     </div>
                 </div>
                
                 <div class="comment-body">
                     <p >
                         {data.comment}
                     </p>
                     <button type="button">Reply</button>
                     <button type="button">Flag</button>
                 </div>
                 
             </div>
           
           

            
         </div>
  )
  :null
} 
      
         </>
         ))
        }
                     {answer?
    <div className="popevent">
    <i className="fa fa-close"  onClick={() => setAnswer(false)}></i>
    <AnswerEvent eventdetails={eventdetails}/>
    </div>: null
    }
    
    
       </div>
       {/* <div className="bottomright" style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-around',alignItems:"center",backgroundColor:"white",left: "252px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
       
       
         <textarea placeholder="Enter your answer....." style={{border: 'none',width:"690px",backgroundColor:"white",outline: "none"}} id="w3review" name="w3review" rows="4" cols="50">.</textarea>
         <Icon  backgroundColor="dodgerblue" icon="fa-solid fa-paper-plane"/>
         </div> */}
       </div>
             </div>
    </div>
  )
}
