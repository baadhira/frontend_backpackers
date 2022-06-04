 import React, { useEffect, useState } from "react";
 import { H5 } from "../../components/Text/Text";
 import { Flex } from "../../components/UI/Flex/Flex";
 import { getAllPeople, getOnePeople } from "./Method_people";
 import jwt_decode from "jwt-decode";
 import { useParams } from "react-router-dom";
 import "./People_detail.css";
 import { Icon } from "../../components/Icon/Icon";
 import PropTypes from "prop-types";
 import Tabs from "@mui/material/Tabs";
 import Tab from "@mui/material/Tab";
 import Typography from "@mui/material/Typography";
 import Box from "@mui/material/Box";
 import { BASE_URL } from "../../BaseUrl";
 import axios from "axios";
 import { getFriendRequests } from "../Notifications/Method_request";
 export const People_detail = () => {
   var token = localStorage.getItem("authToken");
   var decoded = jwt_decode(token);
   const [peopledetail, setPeopleDetail] = useState();
   const [allpeople, setAllPeople] = useState();
   const { id } = useParams();
   const [frndrequest, SetFrndRequest] = useState();
   useEffect(() => {
     getFriendRequests().then((res) => {
       SetFrndRequest(res.data);
       console.log("friend requests details...", res.data);
     });
   }, [SetFrndRequest]);

   useEffect(() => {
     getAllPeople().then((res) => {
       setAllPeople(res.data);
       console.log("all people", res.data);
     });

     getOnePeople(id).then((res) => {
       setPeopleDetail(res.data);
       console.log("one people", res.data);
     });
   }, [setPeopleDetail]);
   console.log("people detail...", peopledetail);

   function a11yProps(index) {
     return {
       id: `simple-tab-${index}`,
       "aria-controls": `simple-tabpanel-${index}`,
     };
   }

   function TabPanel(props) {
     const { children, value, index, ...other } = props;

     return (
       <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
       >
         {value === index && (
           <Box sx={{ p: 3 }}>
             <Typography>{children}</Typography>
           </Box>
         )}
       </div>
     );
   }

   TabPanel.propTypes = {
     children: PropTypes.node,
     index: PropTypes.number.isRequired,
     value: PropTypes.number.isRequired,
   };

   function a11yProps(index) {
     return {
       id: `simple-tab-${index}`,
       "aria-controls": `simple-tabpanel-${index}`,
     };
   }
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };

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
     );
   };
   return (
     <div className="peopledetail">
       {allpeople
         ?.filter((fil) => fil.id === peopledetail?.id)
         .map((data) => (
           <Flex flexDirection="row">
             <Flex flexDirection="column" margin="0px 200px">
               <img
                 style={{
                   width: "200px",
                   height: "200px",
                   borderRadius: "100%",
                 }}
                 src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                 alt=""
               />
               <H5 margin="0px 20px">{data?.username}</H5>
               <H5 color="dodgerblue" margin="0px 20px">
                 {data?.born_location}
               </H5>
               <H5 margin="0px 20px">{data?.hosting_check}</H5>
             </Flex>

             <Flex flexDirection="column" margin="50px 50px">
               <H5>First Name : {data?.first_name}</H5>
               <H5>Last Name :{data?.about_me}</H5>
               <H5>Motto :{data?.motto}</H5>
               <H5>Interests :{data?.interests}</H5>
               <H5>Occupation : {data?.occupation}</H5>
               <H5>Prefered Language :{data?.prefered_language}</H5>
               <H5>Countries Lived :{data?.countries_lived}</H5>
               <H5>Countries Visited{data?.countries_visited}</H5>
               <H5>Education :{data?.education}</H5>

               <H5>Favourite Movies :{data?.fav_movies}</H5>
             </Flex>

             <div className="dropdown">
               <Icon
                 className="dropbtn"
                 margin="10px"
                 icon="fa-solid fa-ellipsis"
               />
               {/* <i class="fa-solid fa-ellipsis"></i> */}
               {/* <button >Dropdown</button> */}
               <div className="dropdown-content">
                 {frndrequest?.filter(
                   (fil) =>
                     fil.sender.id === decoded.user_id &&
                     fil.reciever.id === JSON.parse(id)
                 ).length === 1 ? (
                   <a>Requested</a>
                 ) : (
                   <a onClick={onSubmit}>Send Friend Request</a>
                 )}
                 <a>Send Host Request</a>
                 <a>Report User</a>
               </div>
             </div>
           </Flex>
         ))}

       <Flex margin="0px 500px" justifyContent="center" alignItems="center">
         <Box sx={{ width: "100%" }}>
           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
             <Tabs
               value={value}
               onChange={handleChange}
               aria-label="basic tabs example"
             >
               <Tab label="Album" {...a11yProps(0)} />
               <Tab label="Feedbacks" {...a11yProps(1)} />
               {/* <Tab label="Feedbacks" {...a11yProps(2)} />
           <Tab label="Item Four" {...a11yProps(3)} /> */}
             </Tabs>
           </Box>
           <TabPanel value={value} index={0}>
             Friend Requests
           </TabPanel>
           <TabPanel value={value} index={1}>
             Item Two
           </TabPanel>
           {/* <TabPanel value={value} index={2}>
         Item Three
       </TabPanel>
       <TabPanel value={value} index={3}>
         Item Four
       </TabPanel> */}
         </Box>
       </Flex>
     </div>
   );
 };
