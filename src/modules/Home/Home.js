import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import { Baadhira, DarkBtn } from '../../components/Button/Button'
import { SwiperCarousel } from '../../components/Slider/SwiperCarousel/SwiperCarousel'
import { SwiperSlider } from '../../components/Slider/SwiperSlider/SwiperSlider'
import { H2, H3, H4 } from '../../components/Text/Text'
import { Flex } from '../../components/UI/Flex/Flex'
import{ AllEvent} from '../Event/AllEvent'
import { getEvents } from '../Event/method/Method'
import { Message } from '../Messages/Message'
import { AllPeople } from '../People/AllPeople'
import Place from '../Place/Place'
import { AllQueries } from '../Queries/AllQueries'
import { Queries } from '../Queries/Queries'
import { QueryToolDetail } from '../Queries/QueryToolDetail'
import { Tooltip } from '../Tooltip/Tooltip'
import './Home.css'
export const Home =() =>{
    
  const [event, setEvent] = useState();
  const [joiners, setJoiners] = useState();
  const { id } = useParams();
 

   useEffect(() => {
     getEvents().then((response) => {
       setEvent(response.data);

     })},[setEvent]);
  return (
      
    <div className="home">
        {/* <Message/> */}
       
        <div className="banner">
            <SwiperCarousel>
                <SwiperSlide>
                    <img src={require('../../assets/images/banner/banner1.jpg')} alt="" />
                    
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require('../../assets/images/banner/banner2.jpg')} alt="" />
                    
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require('../../assets/images/banner/banner3.jpg')} alt="" />
                    
                </SwiperSlide>


            </SwiperCarousel>
        
            {/* let menuSpec=allMenus.map((item,index) =>{
        if(index<9){
            return (
                <CardDish item={item} showPopup={showPopupHandler}/>  
        )
        }
    }) */}
        </div>
       <Place/>
       <div className='allEvents'>
       <H3 margin="10px">POPULAR EVENTS</H3>
    <DarkBtn margin="10px">VIEW MORE EVENTS</DarkBtn>
    <AllEvent/>
  

       </div>
       <div className='allEvents'>
       <H3 style={{position: 'absolute'}}margin="10px">POPULAR QUERIES</H3>
    <DarkBtn margin="10px">VIEW MORE QUERIES</DarkBtn>
    <QueryToolDetail/>
       </div>

       <div className='allEvents'>
       <H3 style={{position: 'absolute'}}margin="10px">POPULAR PEOPLE</H3>
    <DarkBtn margin="10px">VIEW MORE PEOPLE</DarkBtn>
    <AllPeople/>
       </div>
      
    
       
           
    </div>
  )
}
