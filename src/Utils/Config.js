import React from 'react'

var token = localStorage.getItem("authToken");

export const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      
}
