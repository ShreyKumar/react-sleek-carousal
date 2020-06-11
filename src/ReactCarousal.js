import React from 'react'

import './ReactCarousal.scss'

export const ReactCarousal = ({ height, children }) => {
    return (
        <div className="carousal" style={{height: height}}>
            { children }
        </div>
    )
}

export const ReactCarousalItem = ({ children }) => {
    return (
        <div className="item">
            { children }
        </div>
    )
}
