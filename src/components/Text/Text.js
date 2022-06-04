import React from 'react'

import "./Text.css"

export const H1 = (props) => {

    return (

        <h1 className='font_size h1' style={{

            color: props.color,
            padding: props.padding,
            margin: props.margin,
            textAlign: props.textAlign,
            maxHeight: props.maxHeight,
            fontWeight: props.fontWeight,

        }}>{props.children}</h1>

    )
}
export const H2 = (props) => {

    return (

        <h1 className='font_size h2' style={{

            color: props.color,
            padding: props.padding,
            margin: props.margin,
            textAlign: props.textAlign,
            maxHeight: props.maxHeight,
            fontWeight: props.fontWeight,

        }}>{props.children}</h1>

    )
}

export const H3 = (props) => {

    return (
        <h1 className='font_size h3' style={{

            color: props.color,
            padding: props.padding,
            margin: props.margin,
            textAlign: props.textAlign,
            maxHeight: props.maxHeight,
            fontWeight: props.fontWeight,

        }}>{props.children}</h1>

    )
}


export const H4 = (props) => {

    return (

        <h1 onClick={props.onClick} className='font_size h4' style={{
            textTransform: props.textTransform,
            color: props.color,
            padding: props.padding,
            margin: props.margin,
            textAlign: props.textAlign,
            maxWidth: props.maxWidth,
            maxHeight: props.maxHeight,
            fontWeight: props.fontWeight,
            position: props.position,
            bottom:props.bottom,
            left:props.left,
            top:props.top,
            transform: props.transform,
            backgroundColor: props.backgroundColor,
            font: props.font,
            



        }}>{props.children}</h1>

    )
}

export const H5 = (props) => {

    return (

        <h1 onClick={props.onClick} className='font_size h5' style={{

            color: props.color,
            padding: props.padding,
            margin: props.margin,
            textAlign: props.textAlign,
            maxHeight: props.maxHeight,
            cursor: props.cursor,
            fontWeight: props.fontWeight,
            backgroundColor: props.backgroundColor,
            padding: props.padding,
            borderRadius: props.borderRadius,
            backgroundImage: props.backgroundImage,
        



        }}>{props.children}</h1>
    )
}

export const H6 = (props) => {

    return (

        <h1 className='font_size h6' style={{

            color: props.color,
            padding: props.padding,
            margin: props.margin,
            textAlign: props.textAlign,
            maxHeight: props.maxHeight,
            fontWeight: props.fontWeight,
            width: props.width,

        }}>{props.children}</h1>

    )
}


export const H7 = (props) => {

    return (

        <h1 className='font_size h7' style={{

            color: props.color,
            padding: props.padding,
            margin: props.margin,
            textAlign: props.textAlign,
            maxHeight: props.maxHeight,
            fontWeight: props.fontWeight,

        }}>{props.children}</h1>
    )
}


