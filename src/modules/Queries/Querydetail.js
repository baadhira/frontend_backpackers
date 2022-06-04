import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DarkBtn } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { H1, H4, H5, H6 } from '../../components/Text/Text';
import { Flex } from '../../components/UI/Flex/Flex';
import { getCommentsQuery, getOneQuery, getQueries, getReplyComment } from './MethodQuery/MethodQueries'
import jwt_decode from "jwt-decode";
import { TextArea } from '../../components/Input/Input';
import axios from 'axios';
import { BASE_URL } from '../../BaseUrl';
import './Querydetail.css'
import { InputReply } from './InputReply';
import { Card } from 'react-bootstrap';
import { DropdownIcon } from '../../components/Dropdown/Dropdown';
import { ReportPopup } from './ReportPopup';
export const Querydetail = () => {
  const[querydetail,setQuerydetail] =useState()
  const [comment, setComment] = useState();
  const [addComment, setAddcoment] = useState();
  const [replycomment,setReplycomment] = useState();
  const [com,setCom] = useState();
  const [suggested,setSuggested] = useState();
  const [report,setReport] = useState(false);
  
  const { id } = useParams();
  


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
    getQueries().then((response)=>{
      setSuggested(response.data)
      console.log("getqueries",response.data)

    })
  },[setQuerydetail,setComment,setSuggested])

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


        {report?
    <div className="popup-album">
    <i className="fa fa-close" onClick={()=>setReport(false)}></i>
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
        
        {/* <Flex flexDirection="column" margin="0px 0px 0px 40px">
        <H4>Replies</H4>
          {comment?.map((data) => (
            <Flex
              margin="10px"
              justifyContent="center"
              alignItems="center"
            >
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                }}
                src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                alt=""
              />

              <Flex flexDirection="column">
                <H5 margin="0 5px" color="black" fontWeight="bold">
                  {data.author.username}
                </H5>

                <H6 margin="0 5px" color="black">
                  {data.text}
                </H6>
                <Icon
          // onClick={(comment_id) => {
          //   DeleteComment((comment_id = data.id));
          // }}
          margin="40px 180px"
          className="fa-solid fa-reply"
          color="grey"
        />
        

        <div>
                <H5 margin="0 5px" color="black" fontWeight="bold">
                  {data.author.username}
                </H5>
                {replycomment?.filter(fil=>fil.discussion_reply.id===data.id).map(data=>
                <H6 margin="0 5px" color="black">
                 {data.text}
                </H6>
)}
      
       
              </div>
       
              </Flex>
              
     { data.author.id === decoded.user_id || querydetail?.author.id === decoded.user_id?

              <Icon onClick={(discussion_id)=>{DeletComment(discussion_id=data.id)}}
                margin-left="50px"
                icon="fa-solid fa-trash-can"
            
                color="black"
              />
              :null}
            </Flex>
          ))}
        </Flex>

        <Flex margin="0px 0px 0px 40px" justifyContent="center" alignItems="center">
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
            }}
            src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
            alt=""
          />
          <Flex margin="0px 0px 0px 40px" >
            <TextArea width="80vh" 
              onChange={(e) => setAddcoment(e.target.value)}
              placeholder="write a comment"
            ></TextArea>

            <DarkBtn margin="40px 0px 0px 20px"onClick={onSubmit}>Send</DarkBtn>
          </Flex>
        </Flex> */}

<div class="comment-thread">
  <h3>Answers</h3>

<div class="comment" id="comment-1">
{comment?.map((data) => (
  <>
  <div class="comment-heading">
    
      <div class="comment-info">
          <a href="#" class="comment-author">{data.author.username}</a>
          <p class="m-0">
               4 days ago
          </p>
      </div>
  </div>

  <div class="comment-body">
      <p>
      {data.text}
      </p>
      <button onClick={()=>setCom(true)} type="button">Reply</button>
      <button type="button">Flag</button>
  </div>

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
                  <a href="#" class="comment-author">randomperson81</a>
                  <p class="m-0">
                      3 days ago
                  </p>
              </div>
          </div>

          <div class="comment-body">
              <p>
                  Took the words right out of my mouth!
              </p>
              <button type="button">Reply</button>
              <button type="button">Flag</button>
          </div>
      </div>
    

     
  </div>
  </>
))}
</div>

</div>
      </div>
      {com?
    <div className="popupalbum">
    <i className="fa fa-close"  onClick={() => setCom(false)}></i>
    <InputReply/>
    </div>: null
    }
   </div> 
   <div className="suggested_disc" >
   {suggested?.slice(0, 3).map((data) => (
              // <div
              //   class="card"
              //   // onClick={() => {
              //   //   navigate(`/eventdetail/${data.id}`);
              //   //   // OneEvent();
              //   // }}
              // >
              //   <img
              //     class="card-img-top"
              //     alt="Card image cap"
              //     src={data.question}
              //   />
              //   <div class="card-body">
              //     <h5 class="card-title">{data.author.username}</h5>
              //   </div>
              // </div>
              <Card style={{ width: '18rem',marginBottom: '20px'}}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
            ))}
   </div>
   </div>
  )
}
