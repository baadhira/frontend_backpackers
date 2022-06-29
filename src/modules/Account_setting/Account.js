// import React, { useEffect, useState } from 'react'
// import { Icon } from '../../components/Icon/Icon'
// import { H4, H5, H6 } from '../../components/Text/Text'
// import { Flex } from '../../components/UI/Flex/Flex'
// import { Edit_account } from './Edit_account'
// import { getAccount } from './Method_account'

// export const Account = () => {
//   const[account,setAccount] =useState()
//   const [discussionid,setDiscussionid] = useState()
//   const[editacc,setEditacc] = useState()
//   const[disid,setDisid] = useState()

//   useEffect(() =>{
//     getAccount().then((response)=>{
//       setAccount(response.data)
//       console.log("response in get account",response)
//     });
//   },[setAccount])

//   const EditAccount =()=>{
//     setEditacc(true)

//   }
 
//   return (
//     <>
//     <Flex>
//     <Flex  margin="50px 10px" backgroundColor="dodgerblue" flexDirection="column" justifyContent="center" alignItems="center">
//     <H5 color="white">Blocked Users</H5>
//     <H5 color="white">Edit Account</H5>
//     <H5 color="white">Change Password</H5>
    
//     <H5 color="white">Logout</H5>

    

      
//     </Flex>
//     <Flex>
//     <div>

// {editacc ? (
//   <div className="bg_black">
//     <Edit_account setEditacc={setEditacc} />
//   </div>
// ) : null}
  
  
  
//    <Icon
//             onClick={() => EditAccount()}
//             margin="20px 700px"
//             icon="fa-solid fa-pen-to-square"
//             backgroundColor="dodgerblue"
//           />
//         <H4 margin="5px 570px">Username : {account?.username} </H4>
//         <H4 margin="5px 570px">Email : {account?.email}</H4>
//         <H4 margin="5px 570px">Phone Number : {account?.phone_number}</H4>
//         <H4 margin="5px 570px">First Name : {account?.first_name}</H4>
//         <H4 margin="5px 570px">Last Name : {account?.last_name}</H4>

//         <H4 margin="5px 570px">Date of birth : {account?.dob}</H4>

//         <H4 margin="5px 570px">Age : {account?.age}</H4>
//         <H4 margin="5px 570px">Gender : {account?.gender}</H4>
//         <H4 margin="5px 570px">Prefered Languages : {account?.prefered_language}</H4>
//         <H4 margin="5px 570px">Countries Lived : {account?.countries_lived}</H4>
      
//         </div>
//     </Flex>
//     </Flex>
    
      
           
//     </>
//   )
// }

import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { EditAccount } from './EditAccount';
// import "react-tabs/style/react-tabs.css";

import './styles.css';

export const Account=()=> {
  return (
    <div className="App">
      
      <Tabs>
        <TabList style={{ width:"200px"}}>
          <Tab style={{ width:"200px"}}>
            <p>Edit Account</p>
          </Tab>
          <Tab style={{ width:"200px"}}>
            <p>Blocked Users</p>
          </Tab>
          <Tab style={{ width:"200px"}}>
            <p>Change Password</p>
          </Tab>
          <Tab style={{ width:"200px"}}>
            <p>Logout</p>
          </Tab>
         
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <EditAccount/>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 3</h2>
          </div>
        </TabPanel>
      
       
      </Tabs>
    </div>
  );
}


// import React from 'react'
// import { DarkBtn } from '../../components/Button/Button'
// import { Flex } from '../../components/UI/Flex/Flex'

// export const Account = () => {
//   return (
//     <div style={{width:"600px",height:"600px",backgroundColor:"red",margin:"100px auto auto auto",border:"1px solid"}}>
//       <Flex flexDirection="column" >
//         <DarkBtn margin="10px">new btn</DarkBtn>
//         <DarkBtn margin="10px">new btn</DarkBtn>
//         <DarkBtn margin="10px">new btn</DarkBtn>
//         <DarkBtn margin="10px">new btn</DarkBtn>

//       </Flex>
//       Account
//     </div>
//   )
// }

