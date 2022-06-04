import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { H5 } from '../../components/Text/Text';
import { Flex } from '../../components/UI/Flex/Flex';
import { getJoiners, getoneEvents } from './method/Method';

export const JoinedPeople = ({setShowJoiners}) => {
  const [joinedpeople, setJoinedpeople] = useState();
  const [eventdetails, setEventdetails] = useState();
  const { id } = useParams();


  useEffect(() => {
        getoneEvents(id).then((res) => {
          setEventdetails(res.data);
        });
    
    getJoiners().then((res) => {
      setJoinedpeople(res.data)
     

    });
  }, [setJoinedpeople,setEventdetails]);

  return (
    <div className="all_joiners_detail">
         {joinedpeople?.filter((da)=> da?.event.id===eventdetails?.id)?
                   joinedpeople?.filter((da)=> da?.event.id===eventdetails?.id).map((data)=>
              <Flex margin="10px" justifyContent="center" alignItems="center">
           
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                    }}
                    src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                    alt=""
                  />
                  <Flex flexDirection="column">
                    <H5 margin="0 5px" color="black" fontWeight="bold">
                      {data.user.username}
                     
                    </H5>
                  
                  </Flex>
                </Flex>):
                <H5>No people joined</H5>
            }
    </div>
  )
}
