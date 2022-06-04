import React, { useCallback, useEffect, useState } from 'react'

import "./Input.css"

export const Text = (props) => {
    return (
        <input style={{ width: props.width, margin: props.margin }}
            defaultValue={props.defaultValue}
            innerRef={props.innerRef} invalid={props.invalid} id={props.id} name={props.name}
            onChange={props.onChange} className='input text' type={props.type} placeholder={props.placeholder} />
    )
}


export const Password = (props) => {
    return (

        <div style={{ width: props.width,}} className='password'>
            <input style={{ margin: props.margin }}
                defaultValue={props.defaultValue}
                innerRef={props.innerRef} invalid={props.invalid} id={props.id} name={props.name}
                onChange={props.onChange} type={props.type} placeholder={props.placeholder} />

            <i onClick={props.onClick} class={props.icon}></i>


        </div>
    )
}



export const TextArea = (props) => {
    return (
        <textarea style={{ width: props.width,margin: props.margin}} onChange={props.onChange} className='input textarea' placeholder={props.placeholder}></textarea>
    )
}



export const DropDown = (props) => {


    return (

        <select style={{ border:props.border, flex: props.flex, width: props.width, margin: props.margin }} onChange={props.onChange} className='input dropdown' name="" id="">

            {props.children}

        </select>


    )
}



export const DropDown2 = (props) => {


    return (

        <select style={{ border:props.border, flex: props.flex, width: props.width, margin: props.margin }} onChange={props.onChange} className='input dropdown' name="" id="">

            {props.children}

        </select>


    )
}

