import React, { useEffect, useState } from 'react'
import { getFriendRequests } from './Method_request'
import './Notifications.css'
import jwt_decode from "jwt-decode";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Flex } from '../../components/UI/Flex/Flex';
import { Friend_request } from './Friend_request';
import { Host_requests } from './Host_requests';

export const Notifications = () => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const [request,setRequest] =useState()
  useEffect(() => {
    getFriendRequests().then((res) =>{
      setRequest(res.data)
      console.log("freind requests..",res)
    })

  },[setRequest])
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <div className="notification">
    <Flex >
    
<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Friend Requests" {...a11yProps(0)} />
          <Tab label="Host Requests" {...a11yProps(1)} />
          <Tab label="Feedbacks" {...a11yProps(2)} />

          {/* <Tab label="Feedbacks" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} /> */}

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Friend_request/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Host_requests/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Feedbacks
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
  )
}
