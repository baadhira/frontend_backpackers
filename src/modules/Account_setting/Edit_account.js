import React, { useEffect, useState } from 'react'
import { DangerBtn, PrimaryBtn } from '../../components/Button/Button'
import { Icon } from '../../components/Icon/Icon'
import { DropDown, Text } from '../../components/Input/Input'
import { Flex } from '../../components/UI/Flex/Flex'
import { getOneAccount } from './Method_account'
import './Edit_account.css'
import axios from 'axios'
import jwt_decode from "jwt-decode";

import { BASE_URL } from '../../BaseUrl'
export const Edit_account = ({ setEditacc }) => {
  const [username,setUsername]=useState()
  const [email,setEmail]=useState()

  const [phone_number,setPhoneNumber]=useState()

  const [first_name,setFirstName]=useState()

  const [last_name,setLastName]=useState()

  const [dob,setDob]=useState()

  const [age,setAge]=useState()
  const [gender,setGender]=useState()
  
  const [prefered_language,setPreferedLanguage]=useState()
  const [address,setAddress]=useState()
  const [edaccount,setEditAccount]=useState()
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  useEffect(() => {
    getOneAccount(decoded.user_id).then((res) =>{
      setEditAccount(res.data)
    })
  },[setEditAccount])
  console.log("ed acc email........",edaccount?.email)
  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${BASE_URL}api/user/account/${decoded.user_id}/`,
        

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
          address
        },
        config
      )
      .then(() => {
        setEditacc(false);
        window.location.reload();
      });
  };
  return (
    <div className="editAcc">
      
       
      <Text
      defaultValue={edaccount?.username}
        onChange={(e) => setUsername(e.target.value)}
        width="100%"
        placeholder="Enter User Name"
      />
   

      <Text
      defaultValue={edaccount?.email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}

        width="100%"
        placeholder="Enter Email"
      />
         <Text
         type="number"
      defaultValue={edaccount?.phone_number}

        onChange={(e) => setPhoneNumber(e.target.value)}

        width="100%"
        placeholder="Enter Phone Number"
      />
         <Text
      defaultValue={edaccount?.first_name}

        onChange={(e) => setFirstName(e.target.value)}

        width="100%"
        placeholder="Enter First name"
      />
         <Text
      defaultValue={edaccount?.last_name}

        onChange={(e) => setLastName(e.target.value)}

        width="100%"
        placeholder="Enter Last Name"
      />
         <Text
      defaultValue={edaccount?.dob}

        onChange={(e) => setDob(e.target.value)}
        type="date"
        width="100%"
        placeholder="Enter Date Of Birth"
      />
         <Text
      defaultValue={edaccount?.age}

        onChange={(e) => setAge(e.target.value)}
        type="number"
        width="100%"
        placeholder="Enter Age"
      />

      <DropDown onChange={(e) => setGender(e.target.value)}>
        <option  value="Male">Male</option>
        <option value="Female">Female</option>

        <option value="Other">Other</option>


      </DropDown>
         {/* <Text
      defaultValue={edaccount?.gender}

        onChange={(e) => setGender(e.target.value)}
        
        width="100%"
        placeholder="Enter Gender"
      />
         */}
      
      <Text
      defaultValue={edaccount?.prefered_language}

        onChange={(e) => setPreferedLanguage(e.target.value)}

        width="100%"
        placeholder="Enter Prefered Languages"
      />
             <Text
      defaultValue={edaccount?.address}

        onChange={(e) => setAddress(e.target.value)}

        width="100%"
        placeholder="Enter Address"
      />
    <Flex>
        <PrimaryBtn margin="10px"
        onClick={onSubmit}>
          Update
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setEditacc(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>

    </div>
  )
}
