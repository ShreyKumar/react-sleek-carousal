import React, { createRef, useEffect, useRef, useState } from 'react'
import { useElementScroll } from 'framer-motion'
import PropTypes from 'prop-types'
import scrollIntoView from 'scroll-into-view'

import './ReactCarousal.scss'

const ReactCarousal = ({ active: activeInitial, onTransition, height, children, trackerColor, trackerShape, disableTracker, vertical, delay }) => {
    const TOTAL_ITEMS = children.length

    const [active, setActive] = useState(activeInitial)

    const st = useRef(0)
    const [initializing, setInitializing] = useState(true)
    const [animating, setAnimating] = useState(false)

    const lastScrollPos = useRef(0)
    const parentScrollRef = useRef(null)
    const childRefs = useRef([])

    useEffect(() => {
        if (childRefs.current.length > 0 && initializing) {
            lastScrollPos.current = parentScrollRef.current.getBoundingClientRect().top
        }
    }, [childRefs, active, TOTAL_ITEMS, delay, initializing])

    useEffect(() => {
        childRefs.current[activeInitial].scrollIntoView()
        setInitializing(true)
    }, [activeInitial])

    useEffect(() => {
        setAnimating(false)
        onTransition(active)
    }, [active, onTransition])


    // create dots
    let dots = []
    children.forEach((child, idx) => {
        childRefs.current = [...childRefs.current, createRef()]
        if (!disableTracker) {
            dots = [...dots, <div className="dot" onClick={() => setActive(idx)} style={{ backgroundColor: trackerColor, borderRadius: trackerShape === 'circle' ? '50px' : 0 }} />]
        }
    })


    const trackScrolling = (e) => {
        e.preventDefault()
        console.log("scrolling")

        const initialRect = childRefs.current[activeInitial].getBoundingClientRect()
        
        let parentOffset
        if (vertical) {
            parentOffset = parentScrollRef.current.getBoundingClientRect().top
        } else {
            parentOffset = parentScrollRef.current.getBoundingClientRect().left
        }
        st.current = childRefs.current[activeInitial].getBoundingClientRect().top
        
        if (initialRect.top === parentOffset) {
            setInitializing(false)
        } else {
            const currInfoRect = childRefs.current[active].getBoundingClientRect()

            // down vars
            const nextIdx = active + 1 < TOTAL_ITEMS ? active + 1 : 0
            const nextElem = childRefs.current[nextIdx]
            const nextInfoRect = nextElem.getBoundingClientRect()

            // up vars
            const prevIdx = active - 1 < 0 ? TOTAL_ITEMS-1 : active - 1
            const prevElem = childRefs.current[prevIdx]
            const prevInfoRect = prevElem.getBoundingClientRect()

            if (vertical) {
                if (st.current < lastScrollPos.current && currInfoRect.top !== parentOffset && !animating && nextInfoRect.top !== parentOffset) {
                    setAnimating(true)
                    scrollIntoView(nextElem, {cancellable: false, time: 1000}, (type) => {
                        if (type === 'complete') {
                            setActive(nextIdx)
                        }
                    })
                } else if (st.current > lastScrollPos.current && currInfoRect.top !== parentOffset && !animating && prevInfoRect.top !== parentOffset) {
                    setAnimating(true)
                    scrollIntoView(prevElem, {cancellable: false, time: 1000}, (type) => {
                        if (type === 'complete') {
                            setActive(prevIdx)
                        }
                    })
                }
            }

            lastScrollPos.current = st.current
        }
    }

    return (
        <div className="carousal">
            <div className={`carousal-items${vertical ? ' vertical' : ''}`} ref={parentScrollRef} style={{ height }} onScroll={trackScrolling}>
                <div className="dummy" style={{height: "10px", width: "100%", marginBottom: 20}} />
                {
                    children.map((child, idx) => {
                        return (
                            <div className="carousal-item" style={{ height }} ref={(el) => childRefs.current[idx] = el}>
                                { child }
                            </div>
                        )
                    })
                }
                <div className="dummy" style={{height: "10px", width: "100%", marginBottom: 20}} />
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
    trackerColor: "grey",
    delay: null,
}

ReactCarousal.propTypes = {
    active: PropTypes.number,
    onTransition: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
    disableTracker: PropTypes.bool,
    trackerAlignment: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    trackerShape: PropTypes.oneOf(["circle", "square"]),
    trackerColor: PropTypes.string,
    delay: PropTypes.number,
}

export default ReactCarousal