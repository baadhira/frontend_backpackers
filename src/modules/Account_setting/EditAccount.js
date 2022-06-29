
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";


import { getAccount } from './Method_account';
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import { Text } from "../../components/Input/Input";
import { Flex } from "../../components/UI/Flex/Flex";
import { DangerBtn, PrimaryBtn } from "../../components/Button/Button";
import './EditAccount.css'
import { H5 } from "../../components/Text/Text";
export const EditAccount = () => {


    
    const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone_number, setPhoneno] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [dob, setDob] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [prefered_language, setPrefered] = useState();
  const [address, setAddress] = useState();
  const [editAccount, setAccount] = useState();
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  useEffect(() => {
    getAccount().then((res) => {
        setAccount(res.data);
    });
  }, [setAccount]);
  console.log("account///////////////",editAccount);

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(
        `${BASE_URL}api/user/patchusers/${decoded.user_id}/`,
        {
            username,
            email,
            phone_number,
            first_name,
            last_name,
            dob,
            age,
            gender,
            prefered_language,
            address,
        },
        config
      )
    //   .then(() => {
   
    //     window.location.reload();
    //   });
  };

  return (
    <div className="editAccount">
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Username</h6>
            <input defaultValue={editAccount?.username} 
            style={{width:"300px",marginLeft:"10px",borderRadius:"5px",border:"1px solid grey", height:"30px"}} 
            onChange={(e) =>setUsername(e.target.value)}
            type="text"/>
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Email</h6>
            <input defaultValue={editAccount?.email} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}} onChange={(e) =>setEmail(e.target.value)} type="text"/>
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Phone Number</h6>
            <input defaultValue={editAccount?.phone_number} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}} onChange={(e) =>setPhoneno(e.target.value)}type="text"/>
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>First Name</h6>
            <input defaultValue={editAccount?.first_name} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}}onChange={(e) =>setFirstName(e.target.value)} type="text"/>
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Last Name</h6>
            <input defaultValue={editAccount?.last_name} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}}onChange={(e) =>setLastName(e.target.value)} type="text"/>
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Date Of Birth</h6>
            <input type="date" defaultValue={editAccount?.dob} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}} onChange={(e) =>setDob(e.target.value)}/>
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Age</h6>
            <input defaultValue={editAccount?.age} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}} onChange={(e) =>setAge(e.target.value)}type="text"/>
        </Flex>
        {/* <input list="hosting-plan" type="text">
 
<datalist id="hosting-plan">
    <option value="small"/>
    <option value="medium"/>
    <option value="large"/>
</datalist> */}
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Gender</h6>
            <input list="hosting-plan" defaultValue={editAccount?.gender} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}} onChange={(e) =>setGender(e.target.value)} type="text"/>
            <datalist id="hosting-plan">
    <option value="Female"/>
    <option value="Male"/>
    <option value="Other"/>
</datalist> 
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Prefered Language</h6>
            <input defaultValue={editAccount?.prefered_language} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}} onChange={(e) =>setPrefered(e.target.value)}type="text"/>
        </Flex>
        <Flex margin="20px 0px 0px 0px">
            <h6  style={{width:"200px",fontWeight:"bold",fontSize:"13px"}}>Address</h6>
            <input defaultValue={editAccount?.address} style={{width:"300px",borderRadius:"5px",marginLeft:"10px",border:"1px solid grey", height:"30px"}} onChange={(e) =>setAddress(e.target.value)}type="text"/>
        </Flex>
     
        
      
      
      <Flex>
        <PrimaryBtn disabled={!editAccount}  onClick={onSubmit} margin="10px" >
          Update
        </PrimaryBtn>
    
        </Flex>
    </div>
  )
}
