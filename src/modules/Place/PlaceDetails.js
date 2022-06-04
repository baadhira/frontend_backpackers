import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { AllEvent } from '../Event/AllEvent';
import { getEvents } from '../Event/method/Method';
import { PlaceMatchEvent } from './subcomponent/PlaceMatchEvent';
import { popular_destination } from '../../Localdata/Data'
import { useParams } from 'react-router-dom';
import { getOnePlace } from './Method_place/Method_place';
import { DiscussionMatch } from './subcomponent/DiscussionMatch';


export const PlaceDetails = () => {
  const {id}=useParams()
  const [placedetail,setPlacedetail] =useState()
  useEffect(() => {
    getOnePlace(id).then((response) =>{
      setPlacedetail(response.data)

    })
  },[setPlacedetail])
  console.log("place detail",placedetail?.location)
  // const place=placedetail?.filter(fil=>fil.id===1).map(data=>data.location)

  return (
    <div>
        <PlaceMatchEvent place={placedetail?.location}/>
        <DiscussionMatch place={placedetail?.location}/>
    </div>
  )
}
