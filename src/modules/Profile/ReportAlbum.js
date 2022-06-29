import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { AlbumEdit } from "./AlbumEdit";
import './AlbumEdit.css'
export const ReportAlbum = ({ itemdata, setAlbum }) => {
  const [albumedit,setAlbumedit] = useState(false)
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  return (
    <>
      <Card style={{ width: "18rem", margin: "auto auto auto auto"}}>
     
        <ListGroup variant="flush">
          {itemdata?.user.id === decoded.user_id ? (
            <>
              <ListGroup.Item style={{ color: "red" }}>Delete</ListGroup.Item>
              <ListGroup.Item onClick={() =>setAlbumedit(true)}>Edit</ListGroup.Item>
            </>
          ) : (
            <ListGroup.Item style={{ color: "red" }}>Report</ListGroup.Item>
          )}
          <ListGroup.Item onClick={() => setAlbum(false)}>Cancel</ListGroup.Item>
        </ListGroup>
        {albumedit?
    <div className="album-edit">
    {/* <i style={{color:"white",margin:"auto"}} onClick={()=>setAlbumDetails(false)} className="fa fa-close"></i> */}
    <AlbumEdit itemdata={itemdata} setAlbumedit={setAlbumedit}  />
    </div>: null
    }
      </Card>
  
    </>
  );
};

