import React from 'react'

import "./Icon.css"

export const Icon = (props) => {
    return (
        <div className={`icon ${props.className}`} style={{ margin: props.margin, backgroundColor: props.backgroundColor, border: props.border,padding: props.padding,color: props.color,marginTop:props.marginTop}} onClick={props.onClick}>
            <a style={{ color: props.color }} href={props.link} className={props.icon}>{props.text}</a>
        </div>

    )
}



