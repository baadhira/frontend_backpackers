import React from 'react'
import { BASE_URL } from '../BaseUrl';
import { useQuery } from "react-query";
import axios from 'axios';
import { config } from '../Utils/Config';

export const useQueryFetch = (url) => {

    
const fetchApi = () => {
  
      const response= axios.get(`${BASE_URL+url}`,config)
    return response
  }

  const { data: fetchData,refetch:refetchData } = useQuery(url, fetchApi);

  return  {fetchData,refetchData}
   
}
