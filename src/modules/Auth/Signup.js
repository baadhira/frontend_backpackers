import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryBtn } from '../../components/Button/Button'
import { Text } from '../../components/Input/Input'
import { H3, H5 } from '../../components/Text/Text'
import { Flex } from '../../components/UI/Flex/Flex'
import {BASE_URL} from '../../BaseUrl'

import "./Login.scss"

export const Signup = () => {


  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setloading] = useState(false)

  const [hide, setHide] = useState(true)

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== repassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {

      setloading(true)

      setTimeout(() => {
        setloading(false)
      }, 3000);

      const { data } = await axios.post(
        `${BASE_URL}api/user/register/`,
        {
          username,
          first_name,
          last_name,
          phone_number,
          email,
          password,
          repassword
        },
        config,
      );

      localStorage.setItem("authToken", data.token.access);

      console.log('token data here............................',data.token.access)


      navigate('/')

      window.location.reload()

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  };

  return (

    <div className='login'>

      <div className='login_container'>

        <H3 margin="20px">Create an Account ?</H3>
        <Flex>
        <Text placeholder="Enter your First Name"
          type="text" onChange={(e) => setFirstname(e.target.value)} />
          <Text placeholder="Enter your Last Name"
          type="text" onChange={(e) => setLastname(e.target.value)} />


        </Flex>

        <Text placeholder="Enter your Name"
          type="text" onChange={(e) => setUsername(e.target.value)} />

        <Text placeholder="Enter your Email"
          type="email" onChange={(e) => setEmail(e.target.value)} />
          <Text placeholder="Enter your Phone No."
          type="number" onChange={(e) => setPhone(e.target.value)} />

        <Text placeholder="Enter your password"
          type={hide ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} />

        <Text placeholder="Confirm your password"
          type={hide ? "password" : "text"} onChange={(e) => setConfirmPassword(e.target.value)} />

        <i onClick={() => setHide(!hide)} class={hide ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>


        <PrimaryBtn onClick={onSubmit} margin="30px 0" width="90%">Signup</PrimaryBtn>

        <Flex>

          <H5 color="black">Already have an account?</H5>

          <H5 fontWeight="bold" cursor="pointer" margin="0 7px" color="dodgerblue" onClick={() => navigate('/login')}> Login</H5>

        </Flex>


      </div >

    </div >

  )
}
