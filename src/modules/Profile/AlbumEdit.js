import axios from 'axios'
import jwt_decode from "jwt-decode";

import React, { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { BASE_URL } from '../../BaseUrl'
import { Flex } from '../../components/UI/Flex/Flex'
export const AlbumEdit = ({setAlbumedit,itemdata}) => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
    const [title,setTitle] = useState()
    const [description,setDescription] = useState()

    const onSubmit = () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      axios
        .patch(
          `${BASE_URL}api/user/album/${itemdata.id}/`,
          {
            title,
            description,
         
          },
          config
        )
        .then(() => {
     
          window.location.reload();
        });
    };
  return (
    <div>
        {/* <Card style={{ width: "18rem", margin: "auto auto auto auto"}}>
        <i
          className="fa fa-close"
          style={{ color: "white", marginLeft: "350px" }}
          onClick={() => setAlbumedit(false)}
        ></i>
        <ListGroup variant="flush">
          
           
              <ListGroup.Item style={{ color: "red" }}>edit cvbnm,</ListGroup.Item>
            
        </ListGroup>
      </Card> */}

<Card style={{ width: '25rem',margin:"auto auto auto auto"}}>
    <Flex >
    <h5 style={{color: "black",marginLeft:"20px",marginTop:"10px", fontSize:"15px"}} onClick={()=>setAlbumedit(false)}>Cancel</h5>
    <h5 style={{color: "dodgerblue",marginLeft:"250px",marginTop:"10px",fontSize:"15px"}} onClick={onSubmit}>Done</h5>
    </Flex>


  <Card.Img height="300" width="600px"  src={itemdata.image} />
  <Card.Body>
    <Card.Title>
    {/* <i class="fa-solid fa-ellipsis"></i> */}
    <input defaultValue={itemdata.title}
            style={{width:"350px",marginLeft:"10px",borderRadius:"5px",border:"1px solid grey", height:"30px"}} 
            onChange={(e) =>setTitle(e.target.value)}
            type="text"/>
      
       {/* <i style={{color:"black",marginLeft:"280px"}} onClick={()=>setAlbumedit(false)} className="fa-solid fa-ellipsis"></i> */}
      </Card.Title>
    <Card.Text>
        <textarea defaultValue=  {itemdata.description}
            style={{width:"350px", marginLeft:"10px",borderRadius:"5px",border:"1px solid grey", height:"100px",overflow: "scroll"}} 
            onChange={(e) =>setDescription(e.target.value)}
            type="text"/>

  
    </Card.Text>
  </Card.Body>
  {/* <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body> */}
</Card>
    </div>
  )
}
