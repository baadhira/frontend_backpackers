import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { getAlbum } from './Method_profile';
import jwt_decode from "jwt-decode";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AlbumDetail } from './AlbumDetail';
import { height } from '@mui/system';
import './Album.css';
export const Album = () => {
    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);
    const [album,setAlbum] =useState()
    const[albumdetails,setAlbumDetails] = useState(false)
    useEffect(() => {
        getAlbum().then((response)=>{
            setAlbum(response.data)
            // console.log("album data",response.data)
        })
    },[setAlbum])
    // console.log("filtered data",album?.filter(fil=>fil.user.id===decoded.user_id))
  return (
    <>
        <ImageList sx={{ width: 600, height: 500 }} cols={2} rowHeight={200}>
      {album?.filter(fil=>fil.user.id===decoded.user_id)?
      (album?.filter(fil=>fil.user.id===decoded.user_id))?.map((item) => (
        <ImageListItem key={item.image}>
          {/* <img
          src={item.image}
          /> */}
          <Card style={{height:"400px"}}sx={{ maxWidth: 400 }}  >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={item.image}
          alt="green iguana"
          onClick={()=>setAlbumDetails(true)}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {item.title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
        </ImageListItem>
      )): null}

     
    </ImageList>
    {albumdetails?
    <div className="popup-album">
    <i className="fa fa-close"></i>
    <AlbumDetail />
    </div>: null
    }
    </>
  )
}
