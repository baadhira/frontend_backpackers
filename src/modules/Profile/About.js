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
    <H5 color="black" ><i>Hosting Status : <b>{about?.hosting_check}</b> </i></H5> <Icon
            // onClick={() => setEditpro()}     
            margin="20px 700px"
            className="fa-solid fa-pen-to-square"
            backgroundColor="dodgerblue"
          />
    <H5 color="black" ><i>Occupation :<b> {about?.occupation} </b></i></H5>
    <H5 color="black" ><i>Education :<b> {about?.education} </b></i></H5>
    <H5 color="black" ><i>Languages :<b> {about?.prefered_language} </b></i></H5>
    <H5 color="black" ><i>About me :<b> {about?.about_me} </b></i></H5>

    <H5 color="black" ><i>Motto :<b> {about?.motto} </b></i></H5>

    <H5 color="black" ><i>Interests :<b> {about?.interests} </b></i></H5>
    <H5 color="black" ><i>Favourite Movies :<b> {about?.fav_movies} </b></i></H5>
    <H5 color="black" ><i>Countries Visited :<b> {about?.countries_visited} </b></i></H5>
    <H5 color="black" ><i>Countries Lived :<b> {about?.countries_lived} </b></i></H5>
    </>
  )
}
