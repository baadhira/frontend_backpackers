import React, { useEffect, useState } from 'react'
import { Icon } from '../../components/Icon/Icon';
import { H4, H5 } from '../../components/Text/Text';
import { getProfile } from './Method_profile';

export const About = () => {
    const[about,setAbout]=useState()
  const [editpro, setEditpro] = useState();

    useEffect(() => {
        getProfile().then((response)=>{
            setAbout(response.data)
          console.log("response in about  profile page getprofile",response)
    
        });
      },[setAbout])

      const EditPro = () => {
        setEditpro(true);
      };
  return (
    <>
     {/* <Icon
            // onClick={() => setEditpro()}     
            margin="20px 700px"
            className="fa-solid fa-pen-to-square"
            backgroundColor="dodgerblue"
          /> */}
    <H5 color="black" >Hosting Status : <b>{about?.hosting_check}</b> </H5>
    <H5 color="black" >Occupation :<b> {about?.occupation} </b></H5>
    <H5 color="black" >Education :<b> {about?.education} </b></H5>
    <H5 color="black" >Languages :<b> {about?.prefered_language} </b></H5>
    <H5 color="black" >About me :<b> {about?.about_me} </b></H5>
    <H5 color="black" >Motto :<b> {about?.motto} </b></H5>
    <H5 color="black" >Interests :<b> {about?.interests} </b></H5>
    <H5 color="black" >Favourite Movies :<b> {about?.fav_movies} </b></H5>
    <H5 color="black" >Countries Visited :<b> {about?.countries_visited} </b></H5>
    <H5 color="black" >Countries Lived :<b> {about?.countries_lived} </b></H5>
    </>
  )
}
