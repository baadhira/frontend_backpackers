import React from 'react'

import "./Button.scss"



export const PrimaryBtn = (props) => {


    const AllProperties = {
        width: props.width,
        padding: props.padding,
        margin: props.margin,
        position: props.position,
        top: props.top,
        left: props.left,
        bottom: props.bottom,
        backgroundColor: props.backgroundColor
    }



    return (
        <button

            style={AllProperties}

            onClick={props.onClick} className='default_btn primary_btn'>{props.children}</button>
    )
}


export const SecondaryBtn = (props) => {

    const AllProperties = {
        width: props.width,
        padding: props.padding,
        margin: props.margin,
        position: props.position,
        top: props.top,
        left: props.left,
        bottom: props.bottom
    }


    return (
        <button


            style={AllProperties}


            onClick={props.onClick} className='default_btn secondary_btn'>{props.children}</button>
    )
}


export const WhiteBtn = (props) => {



    const AllProperties = {
        width: props.width,
        padding: props.padding,
        margin: props.margin,
        position: props.position,
        top: props.top,
        left: props.left,
        bottom: props.bottom
    }


    return (
        <button

            style={AllProperties}

            onClick={props.onClick} className='default_btn white_btn'>{props.children}</button>
    )
}


export const DarkBtn = (props) => {


    const AllProperties = {
        width: props.width,
        padding: props.padding,
        margin: props.margin,
        position: props.position,
        top: props.top,
        left: props.left,
        bottom: props.bottom,
        backgroundColor: props.backgroundColor,
        color: props.color
    }


    return (
        <button

            style={AllProperties}

            onClick={props.onClick} className={`default_btn dark_btn ${props.stylecolor}`}>{props.children}</button>
    )
}


export const DangerBtn = (props) => {


    const AllProperties = {
        width: props.width,
        padding: props.padding,
        margin: props.margin,
        position: props.position,
        top: props.top,
        left: props.left,
        bottom: props.bottom
    }


    return (
        <button

            style={AllProperties}

            onClick={props.onClick} className='default_btn danger_btn'>{props.children}</button>
    )
}


















export const Baadhira = (props) => {
    return(
        <button style={{color:props.color}} className="default_btn baadhiras_style">{props.children}</button>
    )
}
