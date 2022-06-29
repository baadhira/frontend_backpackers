import React from 'react'
import './Dropdown.css'
export const DropdownIcon = (props) => {
  return (
  <div className="dropdown">
      <i className="fa-solid fa-ellipsis dropicon">
      <div className="dropdown-content" style={{ margin: props.margin, backgroundColor: props.backgroundColor, border: props.border,padding: props.padding,color: props.color,marginTop:props.marginTop,backgroundImage: props.backgroundImage,marginLeft:props.marginLeft}} onClick={props.onClick}>
          {props.children}
      </div>
      </i>
  </div>
  )
}




export const DropdownBtn = (props) => {
  return (
    <div className="dropdown">
        <button className="dropbtn">{props.text}</button>
            <div className="dropdown-content">
                {props.children}
            </div>
        </div>
  )
}
