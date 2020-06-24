import React, { createRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import './ReactCarousal.scss'

const ReactCarousal = ({ active: activeInitial, onTransition, height, children, trackerColor, trackerShape, disableTracker, vertical }) => {
    const [active, setActive] = useState(activeInitial)
    const lastScrollPos = useRef(0)

    useEffect(() => {
        onTransition(active)
    }, [active, onTransition])

    let childRefs = []

    useEffect(() => {
        console.log(childRefs)
        if (childRefs.length > 0) {
            lastScrollPos.current = childRefs[0].getBoundingClientRect().top
            // childRefs[active].scrollIntoView()
        // childRefs[1].scrollIntoView()
        //     lastScrollPos.current = childRefs[0].current.getBoundingClientRect().top
        //     console.log(lastScrollPos.current)
        }
    }, [childRefs, active])

    // create dots
    let dots = []
    children.forEach((child) => {
        childRefs = [...childRefs, createRef()]
        if (!disableTracker) {
            dots = [...dots, <div className="dot" style={{ backgroundColor: trackerColor, borderRadius: trackerShape === 'circle' ? '50px' : 0 }} />]
        }
    })

    const parentScrollRef = useRef(null)

    const trackScrolling = (e) => {
        e.preventDefault()
        if (childRefs.length > 0) {
            const st = childRefs[0].getBoundingClientRect().top
            console.log(lastScrollPos.current, st)
    
            if (st <= lastScrollPos.current) {
                console.log("scroll down")
                console.log(st)
                childRefs[1].scrollIntoView()
                // setActive(active + 1 === childRefs.length ? 0 : active + 1)
            } else {
                console.log("scroll up")
                // setActive(active - 1 < 0 ? 0 : active - 1)
            }
            lastScrollPos.current = st
        }
    }

    return (
        <div className="carousal">
            <div className={`carousal-items${vertical ? ' vertical' : ''}`} ref={parentScrollRef} style={{ height }} onScroll={trackScrolling}>
                {
                    children.map((child, idx) => {
                        return (
                            <div className="carousal-item" style={{ height }} ref={(el) => childRefs[idx] = el}>
                                { child }
                            </div>
                        )
                    })
                }
            </div>
            {
                !disableTracker && (
                    <div className="tracker">
                        {dots}
                    </div>
                )
            }
        </div>
    )
}

ReactCarousal.defaultProps = {
    active: 0,
    onTransition: () => {},
    height: "500px",
    vertical: false,
    disableTracker: false,
    trackerAlignment: "bottom",
    trackerShape: "square",
    trackerColor: "grey"
}

ReactCarousal.propTypes = {
    active: PropTypes.bool,
    onTransition: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
    disableTracker: PropTypes.bool,
    trackerAlignment: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    trackerShape: PropTypes.oneOf(["circle", "square"]),
    trackerColor: PropTypes.string,
}

export default ReactCarousal