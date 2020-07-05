import React, { createRef, useEffect, useRef, useState } from 'react'
import { useElementScroll } from 'framer-motion'
import useInterval from '@use-it/interval';
import PropTypes from 'prop-types'
import scrollIntoView from 'scroll-into-view'

import './ReactCarousal.scss'

const ReactCarousal = ({ active: activeInitial, onTransition, height, children, trackerColor, trackerShape, disableTracker, vertical, delay, speed, disableScroll, loop }) => {
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
            if (vertical) {
                lastScrollPos.current = parentScrollRef.current.getBoundingClientRect().top
            } else {
                lastScrollPos.current = parentScrollRef.current.getBoundingClientRect().left
            }
        }
    }, [childRefs, active, TOTAL_ITEMS, delay, initializing])

    useInterval(() => {
        const nextIdx = active + 1 < TOTAL_ITEMS ? (active + 1) : (loop ? 0 : active)
        const nextElem = childRefs.current[nextIdx]
        console.log("interval")

        transitionToItem({ idx: nextIdx, elem: nextElem })
    }, delay)

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
    children.forEach((_, idx) => {
        childRefs.current = [...childRefs.current, createRef()]
        if (!disableTracker) {
            dots = [
                ...dots, 
                (
                    <div
                        className="dot"
                        onClick={() => transitionToItem({ idx, elem: childRefs.current[idx]})}
                        style={{ backgroundColor: trackerColor, borderRadius: trackerShape === 'circle' ? '50px' : 0 }}
                    />
                )
            ]
        }
    })

    const transitionToItem = ({ idx, elem }) => {
        if (!animating) {
            console.log("transitioning")
            setAnimating(true)
            scrollIntoView(elem, {cancellable: false, time: speed}, (type) => {
                if (type === 'complete') {
                    setActive(idx)
                }
            })
        }
    }

    const trackScrolling = (e) => {
        e.preventDefault()
        const initialRect = childRefs.current[activeInitial].getBoundingClientRect()
        
        let parentOffset
        if (vertical) {
            parentOffset = parentScrollRef.current.getBoundingClientRect().top
            st.current = childRefs.current[activeInitial].getBoundingClientRect().top
        } else {
            parentOffset = parentScrollRef.current.getBoundingClientRect().left
            st.current = childRefs.current[activeInitial].getBoundingClientRect().left
        }
        
        if ((vertical && initialRect.top === parentOffset) || (!vertical && initialRect.left === parentOffset)) {
            setInitializing(false)
        } else {
            const currInfoRect = childRefs.current[active].getBoundingClientRect()

            // next vars
            const nextIdx = active + 1 < TOTAL_ITEMS ? (active + 1) : (loop ? 0 : active)
            const nextElem = childRefs.current[nextIdx]
            const nextInfoRect = nextElem.getBoundingClientRect()

            // prev vars
            const prevIdx = active - 1 < 0 ? (loop ? TOTAL_ITEMS - 1 : 0) : active - 1
            const prevElem = childRefs.current[prevIdx]
            const prevInfoRect = prevElem.getBoundingClientRect()

            if (vertical) {
                if (st.current < lastScrollPos.current && currInfoRect.top !== parentOffset && nextInfoRect.top !== parentOffset) {
                    // down
                    transitionToItem({ idx: nextIdx, elem: nextElem })
                } else if (st.current > lastScrollPos.current && currInfoRect.top !== parentOffset && prevInfoRect.top !== parentOffset) {
                    // up
                    transitionToItem({ idx: prevIdx, elem: prevElem })
                }
            } else {
                if (st.current < lastScrollPos.current && currInfoRect.left !== parentOffset && nextInfoRect.left !== parentOffset) {
                    // right
                    transitionToItem({ idx: nextIdx, elem: nextElem })
                } else if (st.current > lastScrollPos.current && currInfoRect.left !== parentOffset && nextInfoRect.left !== parentOffset) {
                    // left
                    transitionToItem({ idx: prevIdx, elem: prevElem })
                }
            }

            lastScrollPos.current = st.current
        }
    }

    const trackWheelScrolling = (e) => {
        // next vars
        const nextIdx = active + 1 < TOTAL_ITEMS ? (active + 1) : (loop ? 0 : active)
        const nextElem = childRefs.current[nextIdx]

        // prev vars
        const prevIdx = active - 1 < 0 ? (loop ? TOTAL_ITEMS - 1 : 0) : active - 1
        const prevElem = childRefs.current[prevIdx]

        if (e.deltaY < 0) {
            // up
            transitionToItem({ idx: prevIdx, elem: prevElem })
        } else if (e.deltaY > 0) {
            // down
            transitionToItem({ idx: nextIdx, elem: nextElem })
        }
    }

    return (
        <div className="carousal">
            <div className={`carousal-items${vertical ? ' vertical' : ''}`} ref={parentScrollRef} style={{ height }} onScroll={!disableScroll ? trackScrolling : null} onWheel={!disableScroll ? trackWheelScrolling : null}>
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
    disableScroll: false,
    trackerAlignment: "bottom",
    trackerShape: "square",
    trackerColor: "grey",
    delay: null,
    speed: 1000,
    loop: true,
}

ReactCarousal.propTypes = {
    active: PropTypes.number,
    onTransition: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
    disableTracker: PropTypes.bool,
    disableScroll: PropTypes.bool,
    trackerAlignment: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    trackerShape: PropTypes.oneOf(["circle", "square"]),
    trackerColor: PropTypes.string,
    delay: PropTypes.number,
    speed: PropTypes.number,
    loop: PropTypes.bool,
}

export default ReactCarousal