import React from 'react'

function Pagination(props) {
  console.log("events in pagination",props?.allevent)
  let numberOfPages=[]
 
  return (
    <ul className="pagination">
        <li>Pagination will show here</li>
    </ul>
  )
}

export default Pagination

