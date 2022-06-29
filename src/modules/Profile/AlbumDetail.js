import React, { useState } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { ReportAlbum } from './ReportAlbum';
import './ReportAlbum.css'
export const AlbumDetail = ({itemdata,setAlbumDetails}) => {
  const [album,setAlbum] = useState(false);

  console.log("itemid",itemdata);
  return (
    <div style={{marginTop:"70px"}}>
      <i style={{color:"white",marginLeft:"500px"}} onClick={()=>setAlbumDetails(false)} className="fa fa-close"></i>
      
      <Card style={{ width: '25rem',margin:"auto auto auto auto"}}>
  <Card.Img height="300" width="600px"  src={itemdata.image} />
  <Card.Body>
    <Card.Title>
    {/* <i class="fa-solid fa-ellipsis"></i> */}
      {itemdata.title}
       <i style={{color:"black",marginLeft:"250px"}} onClick={()=>setAlbum(true)} className="fa-solid fa-ellipsis"></i>
      </Card.Title>
    <Card.Text style={{ overflow: "scroll",height:"100px"}}>
    {itemdata.description}
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
{album?
    <div className="report-album">
      
    <ReportAlbum setAlbum={setAlbum} itemdata={itemdata} />
    </div>: null
    }
    </div>
  )
}
