import React, { useState } from "react";
import {
  DarkBtn,
  PrimaryBtn,
  SecondaryBtn,
} from "../../components/Button/Button";
import { H4, H5 } from "../../components/Text/Text";
import { Flex } from "../../components/UI/Flex/Flex";

export const TabSwitcher = (props) => {
  const [tabs, setTabs] = useState("2");

//   if (tabs === "1") {
//     alert("people");
//   } else if (tabs === "2") {
//     alert("Comment");
//   } else if (tabs === "3") {
//     alert("Join");
//   }

  return (
    <div style={{width: '100%'}}>
      <Flex>
        <PrimaryBtn onClick={() => setTabs("1")} margin="10px">
          People
        </PrimaryBtn>
<div style={{position:"relative"}}>
        <SecondaryBtn onClick={() => setTabs("2")} margin="10px">
          Comment
  
        </SecondaryBtn>
        <div style={{backgroundColor:"red",position:"absolute",top:"0" ,right:"0",width:"25px",height:"25px" ,display:"flex",justifyContent:"center" ,alignItems:"center",borderRadius:"100%"}}>
        <H5  color="white" >{props.text}</H5>
        </div>
     
        </div>

        <DarkBtn onClick={() => setTabs("3")} margin="10px">
          Join
        </DarkBtn>
      </Flex>

      {tabs === "1" ? (
        <Flex width="100%">{props.child1}</Flex>
      ) : tabs === "2" ? (
        <Flex width="100%">{props.child2}</Flex>
      ) : tabs === "3" ? (
        <Flex width="100%">{props.child3}</Flex>
      ) : null}
    </div>
  );
};
