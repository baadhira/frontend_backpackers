import React, { useState } from "react";
import { DarkBtn, SecondaryBtn } from "../../components/Button/Button";
import { H3, H4 } from "../../components/Text/Text";
import { AllEvent } from "./AllEvent";
import { CreateEvent } from "./subComponent/CreateEvent";
import "./Event.css";
import { Myevent } from "./Myevent";
import { JoinedEvent } from "./JoinedEvent";
import { Flex } from "../../components/UI/Flex/Flex";
export const Event = () => {
  const [createEvent, setCreateEvent] = useState(false);
  const [tabs,setTabs] =useState(1)
  
  return (
    <div style={{marginTop:"80px"}}>
      <Flex>
      <DarkBtn  stylecolor={tabs===1? "black" : "white"} onClick={() => setTabs(1)} margin="10px">All Events</DarkBtn>
      <DarkBtn stylecolor={tabs===2? "black" : "white"} onClick={() => setTabs(2)} margin="10px">My Events</DarkBtn>
      <DarkBtn stylecolor={tabs===3? "black" : "white"} onClick={() => setTabs(3)} margin="10px">Participating Events</DarkBtn>
      </Flex>
      

      {createEvent ? (
        <div className="bg_black">
          <CreateEvent setCreateEvent={setCreateEvent} />
        </div>
      ) : null}


{tabs===1?
<>

      <H3 fontWeight="bold" margin="20px">
        All Events
      </H3>
      <AllEvent  />
      </>:null
}

{tabs===2?
<>
      <H3 fontWeight="bold" margin="20px">
        Created Events
      </H3>
      <SecondaryBtn margin="20px" onClick={() => setCreateEvent(true)}>
        <i class="fa-solid fa-plus"></i> CREATE EVENT
      </SecondaryBtn>
      <Myevent />
      </>
      :null
      
}

{tabs===3?
<>
      <H3 fontWeight="bold" margin="20px">
        Participating Events
      </H3>
      <JoinedEvent />
      </>:null
}



    </div>
  );
};
