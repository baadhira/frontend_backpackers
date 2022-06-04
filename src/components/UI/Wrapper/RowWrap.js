import React from 'react'

export const RowWrap = (props) => {

    return (

        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {props.children}
        </div>
    )
}
