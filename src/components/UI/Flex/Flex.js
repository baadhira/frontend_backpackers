import React from 'react'

import "./Flex.css"


export const Flex = (props) => {


    return (

        <div style={{
            borderBottom: props.borderBottom,
            padding: props.padding,
            position: props.position,
            height: props.height,
            width: props.width,
            flex: props.flex,
            flexWrap: props.flexWrap,
            margin: props.margin,
            top: props.top,
            flexDirection: props.flexDirection,
            justifyContent: props.justifyContent,
            backgroundColor: props.backgroundColor,
            justifyContent: props.justifyContent,
            alignItems: props.alignItems,
            overflowY: props.overflowY,
            overflowX: props.overflowX,
            borderRadius: props.borderRadius,
            backgroundImage:props.backgroundImage,
            marginLeft:props.marginLeft
        }} key={props.key} className={`${props.className} flex`}>
            {props.children}
        </div>

    )
}
