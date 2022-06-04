import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { H5 } from '../../components/Text/Text'
import { Flex } from '../../components/UI/Flex/Flex'
import { getAllPeople } from './Method_people'

export const People = () => {
    const [allpeople,setAllPeople] =useState()
    useEffect(() => {
        getAllPeople().then((res) =>{
            setAllPeople(res.data)
            console.log("all people",res.data)
        })

    },[setAllPeople])
  return (
    <>
        <Flex flexDirection="column">
            {allpeople?.map((data)=>(

          
            
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
                <Link to={`/peopledetail/${data.id}`}style={{textDecoration:"none",color:"inherit"}} > 

                  <Flex flexDirection="column">
                    <H5 margin="0 5px" color="black" fontWeight="bold">
                     {data?.username}
                     
                    </H5>
                  
                  </Flex>
                  </Link>
                </Flex>
                  ))}
                </Flex>
    </>
  )
}
