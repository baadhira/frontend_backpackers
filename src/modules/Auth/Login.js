import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryBtn } from '../../components/Button/Button'
import { Password, Text } from '../../components/Input/Input'
import { H3, H5 } from '../../components/Text/Text'
import { Flex } from '../../components/UI/Flex/Flex'
import {BASE_URL} from '../../BaseUrl'



import "./Login.scss"

export const Login = () => {



  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${BASE_URL}api/user/login/`,
        { username, password },
        config
      );

      localStorage.setItem("authToken", data.token.access);

      console.log(data.token)

      navigate('/')

      window.location.reload()

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };


  const [hide, setHide] = useState(true)

  return (

    <div className='login'>

      <div className='login_container'>

        <H3 margin="20px">Login</H3>

        <Text placeholder="Enter your Username"
          type="text" onChange={(e) => setUsername(e.target.value)} />
        <Password width="90%" placeholder="Confirm your password"
          type={hide ? "password" : "text"} onChange={(e) => setPassword(e.target.value)}
          onClick={() => setHide(!hide)} icon={hide ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
        />

        {/* <Text placeholder="Enter your password"
          type={hide ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} />


        <i onClick={() => setHide(!hide)} class={hide ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i> */}

        <PrimaryBtn onClick={onSubmit} margin="30px 0" width="90%">Login</PrimaryBtn>

        <Flex>

          <H5 color="black">Create an account?</H5>

          <H5 fontWeight="bold" cursor="pointer" margin="0 7px" color="dodgerblue" onClick={() => navigate('/signup')}> Signup</H5>

        </Flex>


      </div >

    </div >

  )
}
