import React from 'react'
import { useNavigate } from 'react-router-dom'

// import jwt_decode from "jwt-decode";

import "./Settings.css"
import { H2, H4 } from '../../components/Text/Text';
import { Flex } from '../../components/UI/Flex/Flex';
import { Toggle } from '../../components/Toggle/Toggle';
import { DangerBtn } from '../../components/Button/Button';

export const Settings = () => {


  const navigate = useNavigate()


  const logoutHandler = () => {

    localStorage.removeItem("authToken");

    navigate("/")

    window.location.reload()

  }

  // var token = localStorage.getItem("authToken");
  // var decoded = jwt_decode(token);

  // console.log(decoded.id);


  return (

    <div className='settings'>

      <H2 margin="15px">Settings</H2>

      <Flex width="100%" height="fit-content" alignItems="center">

        <H4 fontWeight="bold" margin="0 15px">Turn on Dark Mode</H4>

        <Toggle id="darkmode" />

      </Flex>


      <Flex width="100%" alignItems="center">

        <H4 fontWeight="bold" margin="0 15px">Private Account On</H4>

        <Toggle id="ligqht" />

      </Flex>


      <Flex width="100%" alignItems="center">

        <H4 fontWeight="bold" margin="0 15px">Turn on Dark Mode</H4>

        <Toggle id="light" />

      </Flex>


      <DangerBtn onClick={logoutHandler} margin="15px">Log out</DangerBtn>




    </div>
  )
}
