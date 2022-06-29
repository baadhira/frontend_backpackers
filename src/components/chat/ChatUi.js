import React, { useEffect, useState,useContext } from 'react'
import { useQueryFetch } from '../../Hooks/useQueryFetch'
import { getAllPeople } from '../../modules/People/Method_people'
import { store } from '../../stateManagement/store'
import { ALL_USERS } from '../../Utils/Endpoints'
import ChatInterface from './ChatInterface'
import {useQuery} from 'react-query'
import './chatui.css'
import { getMessages } from './Method/Method'
function ChatUi() {
  // const [people,setPeople]= useState()
  const [activeUser,setActiveUser]= useState()
  const [userid,setUserid]= useState()

  const {dispatch}=useContext(store)
  const {fetchData:getPeople}=useQueryFetch(ALL_USERS)
  const people=getPeople?.data
   


  const { data: getMessage,refetch:refetchData } = useQuery(["messages",userid],()=> getMessages(userid));
  const messages=getMessage?.data
  

  const ActiveUser=(idd)=>{
    setUserid(idd.id)
    setActiveUser(idd)
    refetchData()


  }
  
  
  

  return (
    <body className="chat-body">
  <div className="container-fluid chat-container">
    <div className="row border shadow">
<div className="col-lg-3">
        <div className="discussion search">
          <div className="searchbar">
            
            <input className="" type="text" placeholder="Search..."></input>
          </div>
        </div>
        {/* <div className="discussion message-active">
          <div className="photo" >
            <div className="online"></div>
          </div>
          <div className="desc-contact">
            <p className="name">Megan Leib</p>
            <p className="message">9 pm at the bar if possible 😳</p>
          </div>
          <div className="timer">12 sec</div>
        </div> */}
       {people?.map(data=>(
       <div className="discussion message-active" onClick={(idd)=>ActiveUser(idd=data)}>
          <div className="photo" >
            <div className="online"></div>
          </div>
          <div className="desc-contact" >
            <p className="name">{data?.username}</p>
            {/* <button >kkk</button> */}
            {/* <p className="message">Let's meet for a coffee or something today ?</p> */}
          </div>
          {/* <div className="timer">3 min</div> */}
        </div>
        )
)}

</div>
<div className="col-lg-8">
       <ChatInterface activeUser={activeUser} people={people} messages={messages} refetchData={refetchData}/>
     
</div>

     
     
    </div>
  </div>
</body>
  )
}

export default ChatUi