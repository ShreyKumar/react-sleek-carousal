import React, { createRef, useEffect, useRef, useState } from 'react'
import { useElementScroll } from 'framer-motion'
import PropTypes from 'prop-types'

import './ReactCarousal.scss'

const ReactCarousal = ({ active: activeInitial, onTransition, height, children, trackerColor, trackerShape, disableTracker, vertical, loop, delay }) => {
    const TOTAL_ITEMS = children.length

    const [active, setActive] = useState(activeInitial)

    const initializing = useRef(false)
    const animating = useRef(false)
    const looping = useRef(false)
    const lastScrollPos = useRef(0)
    const parentScrollRef = useRef(null)
    const { scrollX, scrollY } = useElementScroll(parentScrollRef)
    const childRefs = useRef([])

    useEffect(() => {
        if (childRefs.current.length > 0) {
            lastScrollPos.current = childRefs.current[0].getBoundingClientRect().top
        }

        let interval
        if (delay) {
            interval = setInterval(() => {
                const topOffset = parentScrollRef.current.getBoundingClientRect().top
                setActive((prevActive) => {
                    const nextIdx = prevActive + 1 < TOTAL_ITEMS ? prevActive + 1 : 0
                    const infoRect = childRefs.current[nextIdx].getBoundingClientRect()
                    const currInfoRect = childRefs.current[prevActive].getBoundingClientRect()

                    if (infoRect.top !== topOffset && !animating.current) {
                        animating.current = true
                        return nextIdx
                    }

                    if (currInfoRect.top === topOffset) {
                        animating.current = false
                    }

                    return prevActive
                })
            }, delay)
        }

        return () => clearInterval(interval)

    }, [childRefs, active, scrollY, TOTAL_ITEMS, delay])

    useEffect(() => {
        childRefs.current[activeInitial].scrollIntoView()
        initializing.current = true
    }, [activeInitial])

    useEffect(() => {
        onTransition(active)
        const scrollPos = childRefs.current[active].getBoundingClientRect().top
        // childRefs.current[active].scrollIntoView()

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

        const initialRect = childRefs.current[activeInitial].getBoundingClientRect()
        const topOffset = parentScrollRef.current.getBoundingClientRect().top
        const st = childRefs.current[activeInitial].getBoundingClientRect().top
        
        if (initialRect.top === topOffset) {
            initializing.current = false
        } else if (st <= lastScrollPos.current) {
            console.log("scroll down")
            setActive((prevActive) => {
                const nextIdx = prevActive + 1 < TOTAL_ITEMS ? prevActive + 1 : 0
                const infoRect = childRefs.current[nextIdx].getBoundingClientRect()
                const currInfoRect = childRefs.current[prevActive].getBoundingClientRect()

                if (infoRect.top !== topOffset && !animating.current) {
                    console.log("START")
                    childRefs.current[nextIdx].scrollIntoView({ behavior: "smooth" })
                    animating.current = true
                    return nextIdx
                }

                console.log(currInfoRect.top)

                if (currInfoRect.top === topOffset) {
                    console.log("STOP")
                    animating.current = false
                }

                if (nextIdx === 0) {
                    looping.current = true
                }

                return prevActive
            })
        } else {
            console.log("scroll up")
            setActive((prevActive) => {
                const prevIdx = prevActive - 1 < 0 ? TOTAL_ITEMS-1 : prevActive - 1

                const infoRect = childRefs.current[prevIdx].getBoundingClientRect()
                const currInfoRect = childRefs.current[prevActive].getBoundingClientRect()

                if (infoRect.top !== topOffset && !animating.current) {
                    console.log("START")
                    childRefs.current[prevIdx].scrollIntoView({ behavior: "smooth" })
                    animating.current = true
                    return prevIdx
                }

                if (currInfoRect.top === topOffset) {
                    console.log("STOP")
                    animating.current = false
                }

                return prevActive

            })
        }

        lastScrollPos.current = st
    }

    return (
        <div className="carousal">
            <div className={`carousal-items${vertical ? ' vertical' : ''}`} ref={parentScrollRef} style={{ height }} onScroll={trackScrolling}>
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