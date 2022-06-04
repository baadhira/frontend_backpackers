import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../url'
import { SecondaryBtn } from '../Button/Button'
import { Icon } from '../Icon/Icon'

import { Text, TextArea } from "../Input/Input"
import { H3, H4, H6 } from '../Text/Text'
import { Flex } from '../UI/Flex/Flex'

import "./Commants.css"


import jwt_decode from "jwt-decode";
import { fetchComment } from '../../Modules/Event/Method'
import { fetchAllProfile } from '../../Modules/Profile/Method'



export const Commants = ({ event, setShowCommand }) => {




    const [comment, setComment] = useState()




    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);


    console.log("eventId", event)

    const [comments, setComments] = useState()

    const [profile, setProfile] = useState()


    useEffect(() => {


        fetchComment().then(res => setComment(res.comment))

        fetchAllProfile().then(res => setProfile(res.data.profile))


    }, [setComment, setProfile])



    const AddComment = () => {


        axios.post(`${BASE_URL}comment`, {

            user_id: decoded.id,
            event_id: event,
            comment: comments


        }).then(() => fetchComment())




    }

    console.log("profile", profile)


    return (

        <div className='commants'>


            <Icon className="close_icon"
                onClick={() => setShowCommand(false)}
                backgroundColor="red" color="white"
                margin="10px 20px"
                icon="fa-solid fa-xmark" />



            <H3 margin="10px">Comments</H3>

            <Flex className="scrollBar" overflowY="scroll" height="70vh" width="80%" flexDirection="column" >

                <div style={{ width: "100%" }}>

                    {comment?.filter(fil => fil.event_id === event).map(da => (

                        <Flex width="100%" borderBottom="1px solid lightgrey" justifyContent="flex-start" alignItems="center">

                            <Flex justifyContent="center" alignItems="center">

                                < img style={{ margin: "10px", width: "40px", height: "40px", borderRadius: "50%" }} src={require("../../Assets/Images/profile/profile.jpg")} alt="" />

                                {profile?.filter(fil => fil._id === da.user_id).map(pro =>

                                    <H6 fontWeight="bold" color="black" margin="10px 0">{pro.username}</H6>

                                )}

                            </Flex>


                            <H6 color="black" margin="10px">{da.comment}</H6>


                        </Flex>

                    ))}


                </div>






            </Flex >



            <Flex width="80%" justifyContent="center" alignItems="center" >

                <Text onChange={(e) => setComments(e.target.value)} placeholder="Write a comment" />

                <Icon
                    onClick={AddComment}
                    backgroundColor="dodgerblue" color="white"
                    margin="0 10px"
                    icon="fa-solid fa-arrow-up-right-from-square" />

            </Flex>

        </div >
    )
}
