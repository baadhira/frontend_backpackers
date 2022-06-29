import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  DangerBtn,
  PrimaryBtn,
  WhiteBtn,
} from "../../../components/Button/Button";
import { Text, TextArea } from "../../../components/Input/Input";
import { Flex } from "../../../components/UI/Flex/Flex";
import "./CreateEvent.css";
import { BASE_URL } from "../../../BaseUrl";
import {getoneEvents} from '../method/Method'

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Editevent = ({ setEditevent,eventid }) => {
  
  const [start_date, setStartDate] = useState();
  const [start_time, setStartTime] = useState();
  const [end_date, setEndDate] = useState();
  const [end_time, setEndTime] = useState();
  const [limit_attendees, setAttendees] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [edevent,setEdevent] = useState();
  const [author, setAuthor] = useState();

  var token = localStorage.getItem("authToken");
  // var decoded = jwt_decode(token);

  // console.log("token", token);
  useEffect(() => {
      getoneEvents(eventid).then((response) => {
        setEdevent(response.data);
        
      })
  },[setEdevent])
  const [event_name, setEventName] = useState(edevent?.event_name);
  const [image, setImage] = useState();
  const [location, setLocation] = useState(edevent?.location);
  console.log("data in edit event",edevent)


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
        `${BASE_URL}eventapi/events/${eventid}/`,formData,
        config
      )
      .then(() => {
        setEditevent(false);
        window.location.reload();
      });
  };

  return (
    <div className="createEvent">
      <Text
      defaultValue={edevent?.event_name}
        onChange={(e) => setEventName(e.target.value)}
        width="100%"
        placeholder="Enter event name"
      />
      <Text
        width="100%"
        
        placeholder="File"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <Text
      defaultValue={edevent?.location}

        onChange={(e) => setLocation(e.target.value)}

        width="100%"
        placeholder="Enter Location"
      />
      <Flex width="100%">
        <Text
          onChange={(e) => setStartDate(e.target.value)}
      defaultValue={edevent?.start_date}

          margin="4px"
          placeholder="Start Date"
          type="date"
        />
        <Text
          onChange={(e) => setStartTime(e.target.value)}
      defaultValue={edevent?.start_time}

          margin="4px"
          placeholder="Start Time"
          type="time"
        />
      </Flex>
      <Flex width="100%">
        <Text
      defaultValue={edevent?.end_date}

          onChange={(e) => setEndDate(e.target.value)}
          margin="4px"
          placeholder="End Date"
          type="date"
        />
        <Text
      defaultValue={edevent?.end_time}

          onChange={(e) => setEndTime(e.target.value)}
          margin="4px"
          placeholder="End Time"
          type="time"
        />
      </Flex>

      <Text
      defaultValue={edevent?.limit_attendees}

        onChange={(e) => setAttendees(e.target.value)}
        margin="4px"
        typewidth="100%"
        placeholder="No. of attendees allowed"
        type="number"
      />
      <TextArea
      defaultValue={edevent?.description}

        onChange={(e) => setDescription(e.target.value)}
        margin="4px"
        width="100%"
        placeholder="Enter Description"
      />

      <Flex>
        <PrimaryBtn onClick={onSubmit} margin="10px">
          Update
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setEditevent(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};
