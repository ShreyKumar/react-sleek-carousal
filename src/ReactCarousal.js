import React from 'react'
import PropTypes from 'prop-types'

import './ReactCarousal.scss'

export const ReactCarousal = ({ height, children }) => {
    // create dots
    let dots = []
    children.forEach((child) => {
        dots = [...dots, <div className="dot" />]
    })

    return (
        <div className="carousal">
            <div className="carousal-items" style={{ height }}>
                { children }
            </div>
            <div className="tracker">
                {dots}
            </div>
        </div>
    )
}

ReactCarousal.defaultProps = {
    height: "500px",
    disableTracker: false,
    trackerAlignment: "bottom",
    trackerShape: "square",
    trackerColor: "grey"
}

ReactCarousal.propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disableTracker: PropTypes.bool,
    trackerAlignment: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    trackerShape: PropTypes.oneOf(["circle", "square"]),
    trackerColor: PropTypes.string,
}



export const ReactCarousalItem = ({ height, children }) => {
    return (
        <div className="carousal-item" style={{height}}>
            { children }
        </div>
    )
}
