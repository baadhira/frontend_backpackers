import React, { useEffect, useState } from 'react'
import { Icon } from '../../components/Icon/Icon';
import { H4, H5 } from '../../components/Text/Text';
import { getAllProfile, getProfile } from '../Profile/Method_profile';

export const AboutPeople = ({peopledetail}) => {
    const[about,setAbout]=useState()
  const [editpro, setEditpro] = useState();

    useEffect(() => {
      getAllProfile().then((response)=>{
            setAbout(response.data)
    
        });
      },[setAbout])
      console.log("about out",about?.filter(fil=>fil.id===peopledetail.id))


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
     {about?.filter((fil) => fil.id === peopledetail.id)
          ? about
              ?.filter((fil) => fil.id === peopledetail.id)
              ?.map((item) => (
                <>
    <H5 color="black" >Hosting Status : <b>{item?.hosting_check}</b> </H5>
    <H5 color="black" >Occupation :<b> {item?.occupation} </b></H5>
    <H5 color="black" >Education :<b> {item?.education} </b></H5>
    <H5 color="black" >Languages :<b> {item?.prefered_language} </b></H5>
    <H5 color="black" >About me :<b> {item?.about_me} </b></H5>
    <H5 color="black" >Motto :<b> {item?.motto} </b></H5>
    <H5 color="black" >Interests :<b> {item?.interests} </b></H5>
    <H5 color="black" >Favourite Movies :<b> {item?.fav_movies} </b></H5>
    <H5 color="black" >Countries Visited :<b> {item?.countries_visited} </b></H5>
    <H5 color="black" >Countries Lived :<b> {item?.countries_lived} </b></H5>
    </>
              )):null}
    </>
  )
}