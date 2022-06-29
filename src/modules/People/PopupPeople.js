
import React, { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../BaseUrl';
import axios from 'axios';
import { SendHost } from '../Notifications/SendHost';
import './PopupPeople.css'
import { Edit_profile } from '../Profile/Edit_profile';
// import { Edit_profile } from './Edit_profile';



export const PopupPeople = ({setPopprfile,peopledetail,frndrequest}) => {

    const [editpopup,setPopup]=useState(false)
    const [sendhost,setSendhost] = useState(false);
    
    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);
    const { id } = useParams();

    const onSubmit = () => {
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios.post(
          `${BASE_URL}api/user/friendrequests/`,
          {
            sender: decoded.user_id,
            reciever: id,
            accept: "false",
          },
          config
        )
        .then(() => {
          window.location.reload();
        });
      };

      const deleteRequest = (request_id) => {
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .delete(`${BASE_URL}api/user/friendrequest/${request_id}/`, config)
          .then(() => {
            window.location.reload();
          });
      };

    // onClick={(event_id) => JoinEvent((event_id = data.id))}

    // <a onClick={()=>setSendhost(true)}>Send Host Request</a>

    console.log("popup people frnd requst",frndrequest)
  
  return (
    <div >
     <Card style={{ width: "18rem", margin: "auto"}}>
     
     <ListGroup variant="flush">
       {peopledetail?.id===decoded.user_id?
         <>
          <ListGroup.Item onClick={()=>setPopup(true)}><h5 className="text-center" style={{fontSize: "15px"}}>Edit Profile</h5></ListGroup.Item>
         <ListGroup.Item ><h5 className="text-center" style={{fontSize: "15px"}}>Logout</h5></ListGroup.Item>
           
         </>:
         <>
         
{frndrequest?.filter(
    (fil) =>
      fil.sender.id === decoded.user_id &&
      fil.reciever.id === JSON.parse(id)
  ).length > 0 ? (
    // onClick={(event_id) => JoinEvent((event_id = data.id))}
    <>
    {console.log("request id",frndrequest?.map(data=>data.id))}

   <ListGroup.Item  > <h5 className="text-center" style={{fontSize: "15px"}} onClick={(request_id)=>deleteRequest(request_id=frndrequest?.map(data=>data.id))}>Requested</h5></ListGroup.Item>
   </>
  ) : (
    <ListGroup.Item onClick={onSubmit} > <h5 className="text-center" style={{fontSize: "15px"}}>Friend Request</h5></ListGroup.Item>
  )}



           
           <ListGroup.Item  onClick={()=>setSendhost(true)}> <h5 className="text-center" style={{fontSize: "15px"}}>Host Request</h5></ListGroup.Item>
           <ListGroup.Item  > <h5 className="text-center" style={{fontSize: "15px"}}>Message</h5></ListGroup.Item>
           <ListGroup.Item  style={{ color: "red" }}> <h5 className="text-center" style={{fontSize: "15px"}}>Report </h5></ListGroup.Item>

           <ListGroup.Item style={{ color: "red" }}> <h5 className="text-center" style={{fontSize: "15px"}}>Block </h5> </ListGroup.Item>
         </>

       }
     
       
     
       <ListGroup.Item onClick={()=>setPopprfile(false)}><h5 className="text-center" style={{fontSize: "15px"}}>Cancel</h5></ListGroup.Item>

     </ListGroup>
 

   </Card>
   {sendhost?
    <div className="popupPeople">
    
    {/* <i className="fa fa-close" style={{backgroundColor:"black",color:"red",top:"0"}} onClick={() => setSendhost(false)}></i> */}
    <SendHost setSendhost={setSendhost}/>
    </div>: null
    }
     {editpopup?
    <div className="album-edit" style={{margin:"auto"}}>
    {/* <i style={{color:"white",margin:"auto"}} onClick={()=>setPopup(false)} className="fa fa-close"></i> */}
    <Edit_profile  setPopup={setPopup} peopledetail={peopledetail}/>
    </div>: null
    }
    </div>
  )
}
