
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { DropDown, Text } from "../../components/Input/Input";
import { getOneProfile, getProfile } from "./Method_profile";
import { Flex } from "../../components/UI/Flex/Flex";
import { DangerBtn, PrimaryBtn } from "../../components/Button/Button";
import axios from "axios";
import { BASE_URL } from "../../BaseUrl";
import "./Edit_profile.css";

export const Edit_profile = ({ setPopup,peopledetail }) => {
  const [hosting_check, setHoststatus] = useState();
  const [born_location, setLocation] = useState();
  const [occupation, setOccupation] = useState();
  const [education, setEducation] = useState();
  const [prefered_language, setLanguage] = useState();
  const [about_me, setAbout] = useState();
  const [motto, setMotto] = useState();
  const [interests, setInterest] = useState();
  const [countries_visited, setVisited] = useState();
  const [countries_lived, setLived] = useState();
  const [edprofile, setEditProfile] = useState();
  var token = localStorage.getItem("authToken");
  var decoded = jwt_decode(token);
  useEffect(() => {
    getOnePeople(peopledetail.id).then((res) => {
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
      .patch(
        `${BASE_URL}api/user/patchprofile/${peopledetail.id}/`,

        {
          hosting_check,
          born_location,
          occupation,
          education,
          prefered_language,
          about_me,
          motto,
          interests,
          countries_lived,
          countries_visited,
        },
        config
      )
      .then(() => {
        setPopup(false);
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
     <Flex alignItems="center" justifyContent="flex-start" width="100%">
     <DropDown onChange={(e) => setHoststatus(e.target.value)} defaultValue={peopledetail?.hosting_check} >
        <option value="Accepting Guests">Accepting Guests</option>
        <option value="Maybe Accepting Guests">Maybe Accepting Guests</option>

        <option value="Not Accepting Guests">Not Accepting Guests</option>
      </DropDown>
      <Text
      margin="0px 0px 0px 20px"
        defaultValue={peopledetail?.born_location}
        onChange={(e) => setLocation(e.target.value)}
        
        placeholder="Enter your current living location"
      />
     </Flex>
     
    
    <Flex alignItems="center" justifyContent="flex-start" width="100%">
    <Text
        defaultValue={peopledetail?.occupation}
        onChange={(e) => setOccupation(e.target.value)}
        
        placeholder="Enter your occupation"
      />
      <Text
       margin="0px 0px 0px 20px"
        defaultValue={peopledetail?.education}
        onChange={(e) => setEducation(e.target.value)}
        
        placeholder="Enter your education qualification"
      />
    </Flex>
    
      <Text
        defaultValue={peopledetail?.prefered_language}
        onChange={(e) => setLanguage(e.target.value)}
        width="100%"
        placeholder="Enter the languages you speak"
      />
      <Text
        defaultValue={peopledetail?.about_me}
        onChange={(e) => setAbout(e.target.value)}
        width="100%"
        placeholder="Describe about you"
      />
      <Text
        defaultValue={peopledetail?.motto}
        onChange={(e) => setMotto(e.target.value)}
        width="100%"
        placeholder=" Your motto"
      />
      <Text
        defaultValue={peopledetail?.interests}
        onChange={(e) => setInterest(e.target.value)}
        width="100%"
        placeholder=" Your interests"
      />
      <Flex  alignItems="center" justifyContent="flex-start" width="100%">
      <Text
        defaultValue={peopledetail?.countries_visited}
        onChange={(e) => setVisited(e.target.value)}
        
        placeholder=" Countries you have visited"
      />
      <Text
       margin="0px 0px 0px 20px"
        defaultValue={peopledetail?.countries_lived}
        onChange={(e) => setLived(e.target.value)}
        
        placeholder=" Countries you have lived"
      />
      </Flex>
    
      <Flex>
        <PrimaryBtn margin="10px" onClick={onSubmit}>
          Update
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setPopup(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};