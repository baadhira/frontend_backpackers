import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getOneQuery } from './MethodQuery/MethodQueries';
import jwt_decode from "jwt-decode";
import { ReportPost } from './ReportPost';

export const ReportPopup = (props) => {
  const[querydetail,setQuerydetail] =useState()
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const { id } = useParams();
  const [pop,setPop] = useState(false);

 
  useEffect(() => {
    getOneQuery(id).then((response)=>{
      setQuerydetail(response.data)
    })
  },[setQuerydetail])
  console.log("id",id)
  return (
    <>
    <Card style={{ width: '18rem' }}>
  <ListGroup variant="flush">
      {querydetail?.author.id===decoded.user_id?
    <ListGroup.Item style={{color:"red"}}>Delete</ListGroup.Item>:
    <ListGroup.Item style={{color:"red"}} onClick={()=>{setPop(true)}}>Report</ListGroup.Item>
    
      }
    <ListGroup.Item onClick={()=>props.setReport(false)}>Cancel</ListGroup.Item>
  </ListGroup>
</Card>
{pop?
    <div className="popup-album">
    <i className="fa fa-close" onClick={()=>{setPop(false);props.setReport(false)}}></i>

    <ReportPost setPop={setPop} setReport={props.setReport} />
    </div>: null
    }
    </>

  )
}
