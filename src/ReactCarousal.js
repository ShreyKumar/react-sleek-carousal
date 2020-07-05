import React, { createRef, useEffect, useRef, useState } from 'react'
import useInterval from '@use-it/interval';
import PropTypes from 'prop-types'
import scrollIntoView from 'scroll-into-view'

import './ReactCarousal.scss'

const ReactCarousal = ({
    active: activeInitial,
    onTransitionStart,
    onTransitionOver,
    onTransitionEnd,
    height,
    children,
    disableTracker,
    containerClassName,
    containerStyle,
    className,
    style,
    itemContainerClassName,
    itemContainerStyle,
    trackerClassName,
    trackerStyle,
    trackerDotClassName,
    trackerDotStyle,
    trackerDotActiveClassName,
    trackerDotActiveStyle,
    vertical,
    delay,
    speed,
    disableScroll,
    looping,
    relay
}) => {
    const TOTAL_ITEMS = children.length

    const [active, setActive] = useState(activeInitial)
    const [animating, setAnimating] = useState(false)
    const [reverseDirection, setReverseDirection] = useState(false)

    const childRefs = useRef([])

    useEffect(() => {
        if (animating) {
            onTransitionOver()
        }
    }, [animating, onTransitionOver])

    useInterval(() => {
        let nextIdx
        if (active + 1 === TOTAL_ITEMS) {
            if (looping) {
                nextIdx = 0
            }
            if (relay) {
                nextIdx = active - 1
                setReverseDirection(true) 
            }
        } else {
            if (reverseDirection) {
                if (active - 1 < 0) {
                    setReverseDirection(false)
                    nextIdx = active + 1
                } else {
                    nextIdx = active - 1
                }
            } else {
                nextIdx = active + 1
            }
        }

        const nextElem = childRefs.current[nextIdx]

        transitionToItem({ idx: nextIdx, elem: nextElem })
    }, delay)

    useEffect(() => {
        childRefs.current[activeInitial].scrollIntoView()
    }, [activeInitial])

    // create dots
    let dots = []
    children.forEach((_, idx) => {
        childRefs.current = [...childRefs.current, createRef()]
        if (!disableTracker) {
            dots = [
                ...dots, 
                (
                    <div
                        className={`${trackerDotClassName} dot${active === idx ? ` ${trackerDotActiveClassName} active` : ''}`}
                        onClick={() => transitionToItem({ idx, elem: childRefs.current[idx] })}
                        style={active === idx ? trackerDotActiveStyle : trackerDotStyle}
                    />
                )
            ]
        }
    })

    const transitionToItem = ({ idx, elem }) => {
        if (!animating && idx !== active) {
            onTransitionStart(active)
            setAnimating(true)
            setActive(idx)
            scrollIntoView(elem, { cancellable: false, time: speed}, (type) => {
                if (type === 'complete') {
                    setAnimating(false)
                    onTransitionEnd(idx)
                }
            })
        }
    }

    const trackScrolling = (e) => {
        if (e.deltaY < 0 || e.deltaX < 0) {
            let prevIdx = active
            if (active - 1 < 0) {
                if (looping) {
                    prevIdx = TOTAL_ITEMS - 1
                }
                if (relay) {
                    prevIdx = active + 1
                    setReverseDirection(true)
                }
            } else {
                if (reverseDirection) {
                    if (active + 1 === TOTAL_ITEMS) {
                        setReverseDirection(false)
                        prevIdx = active - 1
                    } else {
                        prevIdx = active + 1
                    }
                } else {
                    prevIdx = active - 1
                }
            }
            const prevElem = childRefs.current[prevIdx]
            // up
            transitionToItem({ idx: prevIdx, elem: prevElem })
        } else if (e.deltaY > 0 || e.deltaX > 0) {
            let nextIdx = active
            if (active + 1 === TOTAL_ITEMS) {
                if (looping) {
                    nextIdx = 0
                }
                if (relay) {
                    nextIdx = active - 1
                    setReverseDirection(true) 
                }
            } else {
                if (reverseDirection) {
                    if (active - 1 < 0) {
                        setReverseDirection(false)
                        nextIdx = active + 1
                    } else {
                        nextIdx = active - 1
                    }
                } else {
                    nextIdx = active + 1
                }
            }
            const nextElem = childRefs.current[nextIdx]
            // down
            transitionToItem({ idx: nextIdx, elem: nextElem })
        }
    }

    return (
        <div className={`${containerClassName} carousal`} style={containerStyle}>
            <div className={`${className} carousal-items${vertical ? ' vertical' : ''}`} style={{ ...style, height }} onWheel={!disableScroll ? trackScrolling : null}>
                {
                    looping && <div className="dummy" style={{height: "10px", width: "100%", marginBottom: 20}} />
                }
                {
                    children.map((child, idx) => {
                        return (
                            <div key={idx} className={`${itemContainerClassName} carousal-item`} style={{ ...itemContainerStyle, height }} ref={(el) => childRefs.current[idx] = el}>
                                { child }
                            </div>
                        )
                    })
                }
                {
                    looping && <div className="dummy" style={{height: "10px", width: "100%", marginBottom: 20}} />
                }
            </div>
            {
                !disableTracker && (
                    <div className={`${trackerClassName} tracker`} style={trackerStyle}>
                        {dots}
                    </div>
                )
            }
        </div>
    )
}

ReactCarousal.defaultProps = {
    children: [],
    active: 0,
    onTransitionStart: () => {},
    onTransitionOver: () => {},
    onTransitionEnd: () => {},
    vertical: false,
    height: 500,
    disableTracker: false,
    disableScroll: false,
    delay: null,
    speed: 1500,
    looping: false,
    relay: false,
    containerClassName: '',
    containerStyle: {},
    itemContainerClassName: '',
    itemContainerStyle: {},
    className: '',
    style: {},
    trackerClassName: '',
    trackerStyle: {},
    trackerDotClassName: '',
    trackerDotStyle: {},
    trackerDotActiveClassName: '',
    trackerDotActiveStyle: {},
}

ReactCarousal.propTypes = {
    children: PropTypes.elementType,
    active: PropTypes.number,
    onTransitionStart: PropTypes.func,
    onTransitionOver: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
    disableTracker: PropTypes.bool,
    disableScroll: PropTypes.bool,
    delay: PropTypes.number,
    speed: PropTypes.number,
    looping: PropTypes.bool,
    relay: PropTypes.bool,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    itemContainerClassName: PropTypes.string,
    itemContainerStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    trackerClassName: PropTypes.string,
    trackerStyle: PropTypes.object,
    trackerDotClassName: PropTypes.string,
    trackerDotStyle: PropTypes.object,
    trackerDotActiveClassName: PropTypes.string,
    trackerDotActiveStyle: PropTypes.object,
}

export default ReactCarousal