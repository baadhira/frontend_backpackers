import React, { useEffect, useState } from 'react'

import { H4, H5, H6 } from '../../components/Text/Text'
import { Flex } from '../../components/UI/Flex/Flex'
import { Grid } from '../../components/UI/Grid/Grid'
import { getQueries } from './MethodQuery/MethodQueries'
import './AllQueries.css'
import { Icon } from '../../components/Icon/Icon'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tooltip } from '../Tooltip/Tooltip'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export const AllQueries = () => {
    const[query,setAllQueries]=useState()
    useEffect(() => {
        getQueries().then((response)=>{
            setAllQueries(response.data)
            console.log("response query....", response);
        });
    },[setAllQueries])
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  return (
    <Grid>
      
            {query?.map((data,index)=>(
<Link style={{textDecoration:"none",color:"inherit"}} to={`/querydetail/${data.id}`}>


      <Card style={{margin:"10px",borderRadius:"20px",backgroundColor:"#ADD8E6"}} sx={{ Width: 300,height: 300}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
    
        title={data.author.username}
        subheader={data.createddate}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {data.question}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Icon margin="10px" text="12" />
                <Icon margin="10px" icon="fa-solid fa-comments" backgroundColor="dodgerblue"/>
       
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
     
      </Collapse>
    </Card>
    </Link>
    

            ))}

        {/* <Grid>
            {query?.map((data,index)=>(
<Link style={{textDecoration:"none",color:"inherit"}} to={`/querydetail/${data.id}`}>

                <div className="query">
                <Flex margin="20px">
                <img className="img_pro" src={require('../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg')}/>
                <H4 margin-left="10px">{data.author.username}</H4>
              </Flex>
              <H5 color="black" margin="20px">{data.question}</H5>
              <H6 margin="20px"> Asked on : {data.createddate}</H6>
              <Flex>
                <Icon margin="10px" text="12" />
                <Icon margin="10px" icon="fa-solid fa-comments" backgroundColor="dodgerblue"/>
              </Flex>
              </div>
            </Link>

            ))}
           

       

        </Grid> */}
        
        </Grid>
  )
}
