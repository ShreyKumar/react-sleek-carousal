import React, { createRef, useEffect, useRef, useState } from 'react'
import { useElementScroll } from 'framer-motion'
import PropTypes from 'prop-types'

import './ReactCarousal.scss'

const ReactCarousal = ({ active: activeInitial, onTransition, height, children, trackerColor, trackerShape, disableTracker, vertical }) => {
    const [animating, setAnimating] = useState(false)
    const [active, setActive] = useState(activeInitial)
    const lastScrollPos = useRef(0)
    const parentScrollRef = useRef(null)
    const { scrollX, scrollY } = useElementScroll(parentScrollRef)
    let childRefs = []

    useEffect(() => {
        console.log(childRefs)
        if (childRefs.length > 0) {
            lastScrollPos.current = childRefs[0].getBoundingClientRect().top
            lastScrollPos.current = scrollY.get()
            childRefs[active].scrollIntoView()
        // childRefs[1].scrollIntoView()
        //     lastScrollPos.current = childRefs[0].current.getBoundingClientRect().top
        //     console.log(lastScrollPos.current)
        }
    }, [childRefs, active])

    scrollY.onChange(() => {
        console.log(childRefs[0].getBoundingClientRect())
        console.log(childRefs[1].getBoundingClientRect())
        const scrollVal = scrollY.get()
        if (scrollVal < lastScrollPos.current) {
            const prevIdx = active-1 < 0 ? childRefs.length-1 : active-1
            const rectInfo = childRefs[prevIdx].getBoundingClientRect()

            if (rectInfo.top !== 50) {

            }
            console.log("scroll up")
        }
        
        if (scrollVal > lastScrollPos.current) {
            const nextIdx = active+1 === childRefs.length ? 0 : active+1
            console.log("scroll down")
        }

        lastScrollPos.current = scrollVal
    })

    useEffect(() => {
        onTransition(active)
    }, [active, onTransition])


    // create dots
    let dots = []
    children.forEach((child, idx) => {
        childRefs = [...childRefs, createRef()]
        if (!disableTracker) {
            dots = [...dots, <div className="dot" onClick={() => setActive(idx)} style={{ backgroundColor: trackerColor, borderRadius: trackerShape === 'circle' ? '50px' : 0 }} />]
        }
    })


    const trackScrolling = (e) => {
        // e.preventDefault()
        // if (childRefs.length > 0) {
        //     const st = childRefs[0].getBoundingClientRect().top
        //     console.log(lastScrollPos.current, st)
    
        //     if (st <= lastScrollPos.current) {
        //         console.log("scroll down")
        //         console.log(st)
        //         childRefs[1].scrollIntoView()
        //         // setActive(active + 1 === childRefs.length ? 0 : active + 1)
        //     } else {
        //         console.log("scroll up")
        //         // setActive(active - 1 < 0 ? 0 : active - 1)
        //     }
        //     lastScrollPos.current = st
        // }
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