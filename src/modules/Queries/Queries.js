import React, { useState } from 'react'
import { DarkBtn, SecondaryBtn } from '../../components/Button/Button'
import { H3 } from '../../components/Text/Text'
import { Flex } from '../../components/UI/Flex/Flex'
import { AllQueries } from './AllQueries'
import { MyQueries } from './MyQueries'
import {CreateQuery} from './CreateQuery'
import './Queries.css'
import { Tooltip } from '../Tooltip/Tooltip'
import { QueryToolDetail } from './QueryToolDetail'

{/* <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card> */}

export const Queries = () => {

  const[query,setQuery] =useState(false)
  const [tabs,setTabs] =useState(1)

  return (
    <div style={{marginTop:"60px"}}>
      <Flex>
      <DarkBtn  stylecolor={tabs===1? "black" : "white"} onClick={() => setTabs(1)} margin="10px">All Queries</DarkBtn>
      <DarkBtn stylecolor={tabs===2? "black" : "white"} onClick={() => setTabs(2)} margin="10px">My Queries</DarkBtn>
      </Flex>
   
      {query?(
        <div className="bg_black">
          <CreateQuery setQuery={setQuery}/>
        </div>
      ): null }
      <div>

      </div>
      {tabs===2 ?
      <>
      <H3 fontWeight="bold" margin="20px">MY QUERIES</H3>
   
      <DarkBtn onClick={() =>setQuery(true)}margin="20px" ><i class="fa-solid fa-plus"></i> Ask locals a query</DarkBtn >

      <MyQueries/>
      </>:null
      }
      {tabs===1 ?
      <>
    <H3 fontWeight="bold" margin="20px">ALL QUERIES</H3>
      <QueryToolDetail/>
      </>:null
}


     
    </div>
  )
}
