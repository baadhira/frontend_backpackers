import React, { useCallback, useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getoneEvents } from './method/Method';
import jwt_decode from "jwt-decode";
import { SetPopEvent } from './SetPopEvent';

export const ReportEvent = (props) => {
  const [eventdetails, setEventdetails] = useState();
  const { id } = useParams();
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const [pop,setPopEvent] = useState(false);

  
  const OneEvent = useCallback(() => {
    getoneEvents(id).then((res) => {
      setEventdetails(res.data);
      
    });
  });

  useEffect(() => {
    OneEvent();
  }, [setEventdetails,]);
  console.log("event details",eventdetails)

  return (
    <>
    <Card style={{ width: '18rem' }}>
  <ListGroup variant="flush">
    {eventdetails?.author.id==decoded.user_id?
    <ListGroup.Item style={{color:"red"}}>Delete</ListGroup.Item>:
    <ListGroup.Item style={{color:"red"}} onClick={()=>{setPopEvent(true)}} >Report</ListGroup.Item>
}
    
    
    <ListGroup.Item onClick={()=>props.setReport(false)}>Cancel</ListGroup.Item>
  </ListGroup>

  {pop?
    <div className="popup-album">
    <i className="fa fa-close" onClick={()=>{props.setReport(false)}}></i>

    <SetPopEvent setPopEvent={setPopEvent} />
    </div>: null
    }
</Card>


    </>
  )
}
