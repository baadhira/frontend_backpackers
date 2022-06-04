import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { DropDown, Text } from "../../components/Input/Input";
import { getOneProfile, getProfile } from "./Method_profile";
import { Flex } from "../../components/UI/Flex/Flex";
import { DangerBtn, PrimaryBtn } from "../../components/Button/Button";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import "./Edit_profile.css";

export const Edit_profile = ({ setEditpro }) => {
  const [hoststatus, setHoststatus] = useState();
  const [location, setLocation] = useState();
  const [occupation, setOccupation] = useState();
  const [education, setEducation] = useState();
  const [language, setLanguage] = useState();
  const [about, setAbout] = useState();
  const [motto, setMotto] = useState();
  const [interest, setInterest] = useState();
  const [con_visited, setVisited] = useState();
  const [con_lived, setLived] = useState();
  const [edprofile, setEditProfile] = useState();
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  useEffect(() => {
    getOneProfile(decoded.user_id).then((res) => {
      setEditProfile(res.data);
    });
  }, [setEditProfile]);

  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${BASE_URL}api/user/userprofile/${12}/`,

        {
          hoststatus,
          location,
          occupation,
          education,
          language,
          about,
          motto,
          interest,
          con_visited,
          con_lived,
        },
        config
      )
      .then(() => {
        setEditpro(false);
        window.location.reload();
      });
  };

  return (
    <div className="editAcc">
      {/* <Text
      defaultValue={edprofile?.hoststatus}

        onChange={(e) => setHoststatus(e.target.value)}
        width="100%"
        placeholder="Enter Your Hosting Status"
      /> */}

      <DropDown onChange={(e) => setHoststatus(e.target.value)}>
        <option value="Accepting Guests">Accepting Guests</option>
        <option value="Maybe Accepting Guests">Maybe Accepting Guests</option>

        <option value="Not Accepting Guests">Not Accepting Guests</option>
      </DropDown>
    
      <Text
        defaultValue={edprofile?.location}
        onChange={(e) => setLocation(e.target.value)}
        width="100%"
        placeholder="Enter your current living location"
      />
      <Text
        defaultValue={edprofile?.occupation}
        onChange={(e) => setOccupation(e.target.value)}
        width="100%"
        placeholder="Enter you occupation"
      />
      <Text
        defaultValue={edprofile?.education}
        onChange={(e) => setEducation(e.target.value)}
        width="100%"
        placeholder="Enter your education qualification"
      />
      <Text
        defaultValue={edprofile?.language}
        onChange={(e) => setLanguage(e.target.value)}
        width="100%"
        placeholder="Enter the languages you speak"
      />
      <Text
        defaultValue={edprofile?.about}
        onChange={(e) => setAbout(e.target.value)}
        width="100%"
        placeholder="Describe about you"
      />
      <Text
        defaultValue={edprofile?.motto}
        onChange={(e) => setMotto(e.target.value)}
        width="100%"
        placeholder="Enter your motto"
      />
      <Text
        defaultValue={edprofile?.interest}
        onChange={(e) => setInterest(e.target.value)}
        width="100%"
        placeholder="Enter your interests"
      />
      <Text
        defaultValue={edprofile?.con_visited}
        onChange={(e) => setVisited(e.target.value)}
        width="100%"
        placeholder="Enter the countried you have visited"
      />
      <Text
        defaultValue={edprofile?.con_lived}
        onChange={(e) => setLived(e.target.value)}
        width="100%"
        placeholder="Enter the countried you have lived"
      />
      <Flex>
        <PrimaryBtn margin="10px" onClick={onSubmit}>
          Update
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setEditpro(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};
