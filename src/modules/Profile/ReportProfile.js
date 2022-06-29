
import React, { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import jwt_decode from "jwt-decode";
import { Edit_profile } from './Edit_profile';

export const ReportProfile = ({setPopprfile,profile}) => {

    const [editpopup,setPopup]=useState(false)

    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);
    console.log("profile in report profile",profile);
  
  return (
    <div >
     <Card style={{ width: "18rem", margin: "auto"}}>
     
     <ListGroup variant="flush">
       {profile?.id===decoded.user_id?
         <>
          <ListGroup.Item onClick={()=>setPopup(true)}><h5 className="text-center" style={{fontSize: "15px"}}>Edit Profile</h5></ListGroup.Item>
         <ListGroup.Item ><h5 className="text-center" style={{fontSize: "15px"}}>Logout</h5></ListGroup.Item>
           
         </>:
         <>
        <ListGroup.Item  > <h5 className="text-center" style={{fontSize: "15px"}}>Friend Request</h5></ListGroup.Item>
           
           <ListGroup.Item  > <h5 className="text-center" style={{fontSize: "15px"}}>Host Request</h5></ListGroup.Item>
           <ListGroup.Item  > <h5 className="text-center" style={{fontSize: "15px"}}>Message</h5></ListGroup.Item>
           <ListGroup.Item  style={{ color: "red" }}> <h5 className="text-center" style={{fontSize: "15px"}}>Report </h5></ListGroup.Item>

           <ListGroup.Item style={{ color: "red" }}> <h5 className="text-center" style={{fontSize: "15px"}}>Block </h5> </ListGroup.Item>
         </>

       }
     
       
     
       <ListGroup.Item onClick={()=>setPopprfile(false)}><h5 className="text-center" style={{fontSize: "15px"}}>Cancel</h5></ListGroup.Item>

     </ListGroup>
 
  {editpopup?
    <div className="album-edit" style={{margin:"auto"}}>
    {/* <i style={{color:"white",margin:"auto"}} onClick={()=>setPopup(false)} className="fa fa-close"></i> */}
    <Edit_profile  setPopup={setPopup} profile={profile}/>
    </div>: null
    }
   </Card>

    </div>
  )
}
