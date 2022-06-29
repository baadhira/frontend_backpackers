import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DarkBtn } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { H1, H4, H5, H6 } from '../../components/Text/Text';
import { Flex } from '../../components/UI/Flex/Flex';
import { getComments, getCommentsQuery, getOneQuery, getQueries, getReplyComment } from './MethodQuery/MethodQueries'
import jwt_decode from "jwt-decode";
import { TextArea } from '../../components/Input/Input';
import axios from 'axios';
import { BASE_URL } from '../../BaseUrl';
import './Querydetail.css'
import { InputReply } from './InputReply';
import { Card } from 'react-bootstrap';
import { DropdownIcon } from '../../components/Dropdown/Dropdown';
import { ReportPopup } from './ReportPopup';
import { Answer } from './Answer';
import ReactTimeAgo from 'react-time-ago'
import { ReportComment } from './ReportComment';



export const Querydetail = () => {
  const[querydetail,setQuerydetail] =useState()
  const [comment, setComment] = useState();
  const [commentnew, setCommentnew] = useState();
  const [loadmore,setLoadmore]=useState([]);
  const [addComment, setAddcoment] = useState();
  const [replycomment,setReplycomment] = useState();
  const [com,setCom] = useState();
  const [suggested,setSuggested] = useState();
  const [report,setReport] = useState(false);
  const [answer,setAnswer] = useState(false)
  const [parentid,setParentid] = useState()
  const [commentid,setCommentid] = useState()

  const [discId,setDiscid]=useState()
  const [pop,setPop] = useState(false);

  
  const { id } = useParams();
  
  console.log("parentid", parentid);
  // const daysBetween = new Date().getDate() - new Date('2020-07-15T13:29:15.524486Z').getDate()
                                                       
  // console.log("daysBetween",daysBetween)


  useEffect(() => {
    getOneQuery(id).then((response)=>{
      setQuerydetail(response.data)

    });
    getCommentsQuery(id).then((res)=>{
      setComment(res.data);


    });
    getReplyComment().then((res)=>{
      setReplycomment(res.data)
    });
    getComments().then((res)=>{
      setCommentnew(res.data)
      console.log("///////////////////////////////////////////////");
      console.log("comments",res.data);
      console.log("///////////////////////////////////////////////");

    });
    getQueries().then((response)=>{
      setSuggested(response.data)

    })
  },[setQuerydetail,setComment,setSuggested])

  useEffect(() => {


    if (loadmore.length < commentnew?.filter(fil=>fil.from_discussion===querydetail?.id && fil.parent===null).length)

        setLoadmore([...loadmore, true])

})

  const ParentId = (pid) => {
    setParentid(pid)
    setCom(true)
  }
  const CommentId = (cid) => {
    setCommentid(cid)
    setPop(true)
  }

  // const discussionId=(disId)=>{
  //   setLoadmore(!loadmore)
  //   setDiscid(disId)
  // }

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${BASE_URL}discussionapi/discussioncomments/`,

        {
          text: addComment,
          discussion: id,
        },
        config
      )
      .then(() => {
        window.location.reload();
        setAddcoment("");
      });
  };
   const ReportQuery = (query_id) => {
     const config = {
       headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
       },
     };
     axios
       .post(
         `${BASE_URL}discussionapi/reportdiscussionpost/`,
         {
           author: decoded.user_id,
           discussion:query_id ,
         },
         config
       )
       
       
       .then(() => {
         window.location.reload()
       });
   };

 
  const DeletComment = (discussion_id) =>{
    const config = {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
      },
    };
    axios.delete(`${BASE_URL}discussionapi/discussioncomments/${discussion_id}`,config).then(() => {
      window.location.reload();
    })
  }
  console.log("loadmore",loadmore);
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  return (

    // margin: 25px 50px 75px 100px;
    <div className="querydetail" >
    <div >
    <div style={{backgroundColor: "#abe9cd" ,width: "750px",
    maxWidth: "100%", backgroundImage:"linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)",borderRadius:"50px",padding:"20px",marginTop:"80px" }}>
    {/* <div flexDirection="column" > */}
      <div style={{display: "flex",flexDirection: "row"}}>
      <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                      }}
                      src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                      alt=""
                    />
                    <H5 fontWeight="bold" margin="10px" color="dodgerblue">
          {querydetail?.author.username}
        </H5>
      {console.log("querydetail id",querydetail?.id)}
        {/* <i class="fa-solid fa-ellipsis"></i> */}
        <div className="querydate" > <h5>Asked on : {querydetail?.createddate}</h5>
        </div>

        <Icon className="fa-solid fa-ellipsis" onClick={() => setReport(true)}></Icon>
   
{/* <div className="querydrop">
        <Icon className="fa-solid fa-ellipsis"></Icon>
        </div> */}
      </div>
    
  
            <div style={{width:"750px",maxWidth:"100%"}}> 
        
        <H5 fontWeight="lighter" margin="10px" color="black">
          {querydetail?.question}
        </H5>
        {console.log("querydetail id",querydetail?.id)}


 
           {report?
    <div className="popup-album">
    <ReportPopup setReport={setReport} />
    </div>: null
    }
        </div>

    
       
       

    {/* </div> */}
      {/* <H4 fontWeight="bold" margin="10px">
          {querydetail?.author.username}
        </H4>
       
        <H4 fontWeight="bold" margin="10px">
          {querydetail?.question}
        </H4> */}
       
  

    
    </div>
    <div className="comments">
       

<div class="comment-thread">
  <Flex>
  <h3>Answers</h3> <DarkBtn marginLeft="50px" onClick={()=>setAnswer(true)}><i  className="fa-solid fa-plus"></i> Add Answer</DarkBtn>
  </Flex>

<div class="comment" id="comment-1">
  {console.log("comment filter",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id))}
  {/* {console.log("reply set",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id).map(data=>data.reply_set.map(data=>data.comment)))} */}
  {console.log("reply set",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id).map(data=>data.reply_set.map(data=>data.id)))}

{console.log("commentnew length",commentnew?.filter(fil=>fil.from_discussion===querydetail?.id && fil.parent===null).length)}


{commentnew?.filter(fil=>fil.from_discussion===querydetail?.id && fil.parent===null).map((data,index) => (
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
      {console.log("date",new Date().getDate() - new Date(data.date).getDate())}

      <button 
      onClick={(pid)=>ParentId(pid = data.id)}  
      type="button">Reply</button>
      <button type="button"  onClick={(cid)=>CommentId(cid = data.id)} >Flag</button>
  </div>
  {/* <button>Load more...":"Load Less..."</button> */}
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
          <ReactTimeAgo date={data.date} locale="en-US"/>

                  </p>
              </div>
          </div>
         
          <div class="comment-body">
              <p >
                  {data.comment}
              </p>
              <button type="button" onClick={(pid)=>ParentId(pid = data.id)} >Reply</button>
              <button type="button" onClick={(cid)=>CommentId(cid = data.id)}>Flag</button>
          </div>
          
      </div>
    

     
  </div>
  )
  :null
} 
  </>
))}
</div>
{/* <div className="bottomright" style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-around',alignItems:"center",backgroundColor:"white",left: "252px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>


  <textarea placeholder="Enter your answer....." style={{border: 'none',width:"690px",backgroundColor:"white",outline: "none"}} id="w3review" name="w3review" rows="4" cols="50">.</textarea>
  <Icon  backgroundColor="dodgerblue" icon="fa-solid fa-paper-plane"/>
  </div> */}
</div>
      </div>
      {com?
    <div className="popupalbum">
    <i className="fa fa-close"  onClick={() => setCom(false)}></i>
    <InputReply commentnew={commentnew} querydetail={querydetail} parentid={parentid}/>
    </div>: null
    }
         {answer?
    <div className="popcomment">
    <i className="fa fa-close"  onClick={() => setAnswer(false)}></i>
    <Answer querydetail={querydetail}/>
    </div>: null
    }
   </div> 
   <div className="suggested_disc" >
  
   </div>

   {pop?
    <div className="popup-album">
    {/* <i className="fa fa-close" onClick={() => setPop(true)}></i> */}

    <ReportComment setPop={setPop} commentid={commentid} />
    </div>: null
    }
   </div>
  )
}
