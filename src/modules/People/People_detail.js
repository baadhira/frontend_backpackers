
import React, { useEffect, useState } from "react";
import { Icon } from "../../components/Icon/Icon";
import { H4, H5, H6 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";
import { Edit_profile } from "../Profile/Edit_profile";
import { getProfile } from "../Profile/Method_profile";
import "../Profile/Profile.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";
import { getFriendRequests, getHostRequests } from "../Notifications/Method_request";

import { About } from "../Profile/About";
import { Album } from "../Profile/Album";
import { Friends } from "../Profile/Friends";
import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import { getAllPeople, getOnePeople } from "./Method_people";
import { DropdownIcon } from "../../components/Dropdown/Dropdown";
import { SendHost } from "../Notifications/SendHost";

export const People_detail = () => {
  const [profile, setProfile] = useState();
  const [editpro, setEditpro] = useState();
  const [frndrequest, SetFrndRequest] = useState();
  const [sendhost,setSendhost] = useState(false);
  const [hostrequest, setHostRequest] = useState();

  const { id } = useParams();
  const [peopledetail, setPeopleDetail] = useState();
  const [allpeople, setAllPeople] = useState();


  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  

  useEffect(() => {
    getFriendRequests().then((res) => {
      SetFrndRequest(res.data);
      console.log("friend requests details...", res.data);
    });
    getHostRequests().then((res)=>{
      setHostRequest(res.data);
      console.log("host requests details...", res.data);
      
    })
  }, [SetFrndRequest]);
     useEffect(() => {
     getFriendRequests().then((res) => {
       SetFrndRequest(res.data);
       console.log("friend requests details...", res.data);
     });
   }, [SetFrndRequest]);
   

   useEffect(() => {
     getAllPeople().then((res) => {
       setAllPeople(res.data);
      //  console.log("all people", res.data);
     });

     getOnePeople(id).then((res) => {
       setPeopleDetail(res.data);
      //  console.log("one people", res.data);
     });
   }, [setPeopleDetail]);
   console.log("frnd requests in people detail..",frndrequest?.filter(
                  (fil) =>
                    fil.sender.id === decoded.user_id &&
                    fil.reciever.id === JSON.parse(id)))
    console.log("reciever id",id)

  useEffect(() => {
    getProfile().then((response) => {
      setProfile(response.data);
      
    });
  }, [setProfile]);

  // console.log("all people",allpeople)
  // console.log("one people detail",peopledetail)
  // console.log("id one...........", allpeople
  //   ?.filter((fil) => fil.id === peopledetail?.id).map(data=>data.username))


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
  console.log("id in profile",id)
  const EditPro = () => {
    setEditpro(true);
  };
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
  return (
    <div className="profile">
      <div className="profile_header">
        <img
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "100%",
            margin: "10px 0px",
          }}
          src={require("../../assets/images/destinations_card/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
          alt=""
        />

        {/* <div class="drop_down">
          <i class="fa-solid fa-ellipsis dropbtn">
            <div class="dropdown-content">
            {frndrequest?.filter(
                  (fil) =>
                    fil.sender.id === decoded.user_id &&
                    fil.reciever.id === id
                ).length === 1 ? (
                  <a>Requested</a>
                ) : (
                  <a onClick={onSubmit}>Send Friend Request</a>
                )}
               
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </i>
        </div> */}
        {decoded.user_id===JSON.parse(id)?
                    null:
        <DropdownIcon>

        {frndrequest?.filter(
                  (fil) =>
                    fil.sender.id === decoded.user_id &&
                    fil.reciever.id === JSON.parse(id)
                ).length > 0 ? (
                  <a>Requested</a>
                ) : (
                  <a onClick={onSubmit}>Send Friend Request</a>
                )}
        <a onClick={()=>setSendhost(true)}>Send Host Request</a>
              <a >Block</a>
              <a >Report</a>

        </DropdownIcon>
}
        <H4 font="italic small-caps bold 16px/2 cursive">
          Hii! I'm {allpeople
    ?.filter((fil) => fil.id === peopledetail?.id).map(data=>data.username)}
        </H4>

        <Flex flexDirection="column">
          <H6 fontWeight="bold">20 friends </H6>
        </Flex>
      </div>

      <Flex width="100%" borderRadius="20px" margin="0">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Album" {...a11yProps(0)} />
              <Tab label="About" {...a11yProps(1)} />
              <Tab label="Feedbacks" {...a11yProps(2)} />
              <Tab label="Friends" {...a11yProps(3)} />

              {/* <Tab label="Feedbacks" {...a11yProps(2)} />
                     <Tab label="Item Four" {...a11yProps(3)} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Album />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <About />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Feedbacks
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Friends />
          </TabPanel>
        </Box>
      </Flex>
      {sendhost?
    <div className="popup-album">
    
    <i className="fa fa-close" style={{backgroundColor:"black",color:"red",top:"0"}} onClick={() => setSendhost(false)}></i>
    <SendHost/>
    </div>: null
    }
    </div>
  );
};
