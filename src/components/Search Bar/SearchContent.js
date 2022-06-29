import React from 'react'
import { DarkBtn } from '../Button/Button'
import { SearchEvent } from '../SearchData/SearchEvent'
import { SearchHost } from '../SearchData/SearchHost'
import { SearchQuery } from '../SearchData/SearchQuery'
import { SearchUser } from '../SearchData/SearchUser'
import { Flex } from '../UI/Flex/Flex'
import './SearchContent.css'
export const SearchContent = (props) => {
    const searchNav=[
        { 
            id:1,
            explore:"User",
            
        },
        { 
            id:2,
            explore:"Host"
        },
        { 
            id:3,
            explore:"Query"
        },
        { 
            id:4,
            explore:"Event"
        }
    ]
  return (
    <div className="searchContent">
        <Flex>
            {searchNav.map(data=>
      <DarkBtn stylecolor={props.explore===data.explore? "black" : "white"} onClick={() => props.setExplore(data.explore)} margin="10px">{data.explore}</DarkBtn>

      )}

      

      </Flex>
        {props.explore == "Host" ? (
        <SearchHost searchTerm={props.searchTerm} searchResult={props.searchResult} clearSearch={props.clearSearch} />
      ) : props.explore == "Query" ? (
        <SearchQuery searchTerm={props.searchTerm} searchResult={props.searchResult} clearSearch={props.clearSearch} />
      ) : props.explore == "Event" ? (
        <SearchEvent searchTerm={props.searchTerm} searchResult={props.searchResult} clearSearch={props.clearSearch}/>
      ) : props.explore == "User" ? (
        <SearchUser hide={props.hide} setHide={props.setHide} searchTerm={props.searchTerm} searchResult={props.searchResult} clearSearch={props.clearSearch}/>
      ) : null}
    </div>
  )
}
