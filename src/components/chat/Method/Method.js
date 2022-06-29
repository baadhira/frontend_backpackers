import axios from "axios";
import { MESSAGE_URL } from "../../../BaseUrl";
import { config } from "../../../Utils/Config";


 export  const getMessages = (id) => {
    
  
    const response = axios.get(MESSAGE_URL+`?user_id=${id}`,config)
    return response

  }