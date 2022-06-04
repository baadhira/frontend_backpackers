import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import { Baadhira, DarkBtn, WhiteBtn } from '../../components/Button/Button'
import { SwiperCarousel } from '../../components/Slider/SwiperCarousel/SwiperCarousel'
import { SwiperSlider } from '../../components/Slider/SwiperSlider/SwiperSlider'
import { H2, H3, H4 } from '../../components/Text/Text'
import { Flex } from '../../components/UI/Flex/Flex'
import { popular_destination } from '../../Localdata/Data'
import { getAllPlace } from './Method_place/Method_place'

import './Place.css'
export default function Pop_dest() {
  const navigate=useNavigate()
  const { data: popevent } = useQuery("popevent", getAllPlace);

  return (
    <div className="pop_destination">
    <H3 margin="10px">POPULAR DESTINATION</H3>
    <DarkBtn margin="10px">VIEW MORE DESTINATIONS</DarkBtn>
    <SwiperSlider>
        {popevent?.data.map((data,index)=>(

            <SwiperSlide>
            <img src={data.pop_image} alt="" />
            <Flex position="absolute" flexDirection="column">
            <H4 margin="10px" color="white" fontWeight="bold">{data.location }</H4>
            <WhiteBtn onClick={() =>navigate(`/place/${data.id}`)}>Visit here</WhiteBtn>

            </Flex>
            
            </SwiperSlide>
           
        ))}

   
        
    </SwiperSlider>
    
 </div>
  )
}
