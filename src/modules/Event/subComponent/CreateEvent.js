import axios from "axios";
import React, { useState } from "react";
import {
  DangerBtn,
  PrimaryBtn,
  WhiteBtn,
} from "../../../components/Button/Button";
import { Text, TextArea } from "../../../components/Input/Input";
import { Flex } from "../../../components/UI/Flex/Flex";
import "./CreateEvent.css";
import { BASE_URL } from "../../../BaseUrl";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { H3, H4 } from "../../../components/Text/Text";

export const CreateEvent = ({ setCreateEvent }) => {
  const [event_name, setEventName] = useState();
  const [image, setImage] = useState('');
  const [location, setLocation] = useState();
  const [start_date, setStartDate] = useState();
  const [start_time, setStartTime] = useState();
  const [end_date, setEndDate] = useState();
  const [end_time, setEndTime] = useState();
  const [limit_attendees, setAttendees] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [author, setAuthor] = useState();

  console.log(image, " ========================");

  var token = localStorage.getItem("authToken");
  // var decoded = jwt_decode(token);

  // console.log("token", token);

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
console.log(image);
    console.log("-==========================");
    console.log(image[0])

    console.log("-==========================");

  
    const formData = new FormData();


    formData.append("event_name", event_name);
    formData.append("image", image[0], "image.png");
    formData.append("location", location);
    formData.append("start_date", start_date);
    formData.append("start_time", start_time);

    formData.append("end_date", end_date);
    formData.append("end_time", end_time);
    formData.append("limit_attendees", limit_attendees);
    
    formData.append("description", description);


    axios
      .post(
        `${BASE_URL}eventapi/events/`,formData,
        config
      )
      .then(() => {
        setCreateEvent(false);
        window.location.reload();
      });
  };

  return (
    <div className="createEvent">
      <H4 fontWeight='bold'>Create Event</H4>
      <Text
        onChange={(e) => setEventName(e.target.value)}
        width="100%"
        placeholder="Enter event name"
      />
      <Text
        width="100%"
        placeholder="File"
        type="file"
        onChange={(e) => setImage(e.target.files)}
      />

      <Text
        onChange={(e) => setLocation(e.target.value)}
        width="100%"
        placeholder="Enter Location"
      />
      <Flex width="100%">
        <Text
          onChange={(e) => setStartDate(e.target.value)}
          margin="4px"
          placeholder="Start Date"
          type="date"
        />
        <Text
          onChange={(e) => setStartTime(e.target.value)}
          margin="4px"
          placeholder="Start Time"
          type="time"
        />
      </Flex>
      <Flex width="100%">
        <Text
          onChange={(e) => setEndDate(e.target.value)}
          margin="4px"
          placeholder="End Date"
          type="date"
        />
        <Text
          onChange={(e) => setEndTime(e.target.value)}
          margin="4px"
          placeholder="End Time"
          type="time"
        />
      </Flex>

      <Text
        onChange={(e) => setAttendees(e.target.value)}
        margin="4px"
        typewidth="100%"
        placeholder="No. of attendees allowed"
        type="number"
      />
      <TextArea
        onChange={(e) => setDescription(e.target.value)}
        margin="4px"
        width="100%"
        placeholder="Enter Description"
      />

      <Flex>
        <PrimaryBtn onClick={onSubmit} margin="10px">
          Submit
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setCreateEvent(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};
