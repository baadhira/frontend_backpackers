import React, { useState } from 'react'
import jwt_decode from "jwt-decode";
import { Text, TextArea } from '../../components/Input/Input';
import { Flex } from '../../components/UI/Flex/Flex';
import { H4 } from '../../components/Text/Text';
import { DangerBtn, PrimaryBtn } from '../../components/Button/Button';
import { BASE_URL } from '../../BaseUrl';
import axios from 'axios';

export const AddAlbum = ({setAlbum}) => {
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  const [image,setImage] =useState('')
  const [title,setTitle] =useState()
  const [description,setDescription] =useState()
  const [user,setUser] =useState()

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("-==========================");
    console.log(image[0])

    console.log("-==========================");

    const user=decoded.user_id
    const formData = new FormData();

    formData.append("image", image[0], "image.png");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("user", user);



    axios
      .post(
        `${BASE_URL}api/user/albumpost/`,formData,
        config
      )
      .then(() => {
        setAlbum(false);
        window.location.reload();
      });
  };



  

  return (
    <div className="createEvent">
    <H4 fontWeight='bold'>Add Album</H4>

    <Text
      width="100%"
      placeholder="File"
      type="file"
      onChange={(e) => setImage(e.target.files)}
    />

    <Text
      onChange={(e) => setTitle(e.target.value)}
      width="100%"
      placeholder="Enter Title"
    />

    <TextArea
      onChange={(e) => setDescription(e.target.value)}
      margin="4px"
      width="100%"
      placeholder="Enter Description"
      type="text"
    />


    <Flex>
      <PrimaryBtn onClick={onSubmit} margin="10px">
        Submit
      </PrimaryBtn>
      <DangerBtn
        onClick={() => {
          setAlbum(false);
        }}
        margin="10px"
      >
        Cancel
      </DangerBtn>
    </Flex>
  </div>
  )
}
