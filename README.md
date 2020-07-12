# sleek-react-carousel
A [lightweight](https://bundlephobia.com/result?p=sleek-react-carousel@1.1.4), easy to use and highly customizable React component that achieves a &#x27;Carousel&#x27; or &#x27;Slideshow&#x27; effect. Allows for relay, panning and scrolling effects.

[![NPM](https://img.shields.io/npm/v/sleek-react-carousel.svg)](https://www.npmjs.com/package/sleek-react-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Install
```bash
npm install --save sleek-react-carousel
```
or
```bash
yarn add sleek-react-carousel
```

## Simple Usage
```jsx
import React, { Component } from 'react'

import SleekCarousel from 'sleek-react-carousel'
import 'sleek-react-carousel/dist/index.css'

const App = () => {
    return (
        <SleekCarousel delay={null}>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
        </SleekCarousel>
    )
}

```
[Live Demo](https://shreykumar.github.io/react-sleek-carousal/)

## Customizability
This component has no required props
| Prop name | Default Prop | Type | Info |
| --- | ----------- | ------ | ---------- |
| `children` | `[]` | Array of Elements | Array of children elements for the component |
| `active` | `0` | Number | The index of the element in `children` that will be shown first after the component loads |
| `onTransitionStart` | `() => {}` | Function | Callback that triggers before a transition between `children` elements begins, the index is provided as a parameter |
| `onTransitionOver` | `() => {}` | Function | Callback that triggers while a transition between `children` elements occurs |
| `onTransitionEnd` | `() => {}` | Function | Callback that triggers after a transition between `children` elements happen, the new index is provided as a parameter |
| `vertical` | `false` | Boolean | Enables the vertical transitions |
| `height` | `500` | String, Number | Height of the main Carousel element in `px`, `rem`, `em`, default is `px` |
| `disableTracker` | `false` | Boolean | Disables the tracker |
| `disableScroll` | `false` | Boolean | Disable scrolling |
| `delay` | `3000` | Number | The time delay in `ms` between transitions |
| `speed` | `1500` | Number | The speed in `ms` of transitions |
| `looping` | `false` | Boolean | Enable carousel of loop back to the start |
| `relay` | `false` | Boolean | Enable "relaying" back to the start instead of looping back. If both `relay` and `looping` is enabled, the Carousel ignores `looping` |
| `panning` | `false` | Boolean | Enable [panning](https://www.framer.com/api/motion/gestures/#pan) to switch between child elements |
| `containerClassName` | `''` | String | `className` for the Container of the main element which contains all `children` elements |
| `containerStyle` | `{}` | Object | `style` for the Container of the main element which contains all `children` elements |
| `containerClassName` | `''` | String | `className` for the Container of the main element which contains all `children` elements |
| `containerStyle` | `{}` | Object | `style` for the Container of the main element which contains all `children` elements |
| `containerClassName` | `''` | String | `className` for the main element which contains all `children` elements |
| `containerStyle` | `{}` | Object | `style` for the main element which contains all `children` elements |
| `trackerClassName` | `''` | String | `className` for the tracker element |
| `trackerStyle` | `{}` | Object | `style` for the tracker element |
| `trackerDotClassName` | `''` | String | `className` for the tracker dot element |
| `trackerDotStyle` | `{}` | Object | `style` for the tracker dot element |
| `trackerDotActiveClassName` | `''` | String | `className` for the tracker dot element in the active state |
| `trackerDotActiveStyle` | `{}` | Object | `style` for the tracker dot element in the active state |

## Limitations
This package has some mobile responsiveness issues that is yet to be fixed
Has some wierd window scroll into view issues if used with longer pages with more content

## Quick Start for development purposes
```bash
git clone git@github.com:ShreyKumar/react-sleek-carousel.git && cd react-sleek-carousel && yarn start
```
or
```bash
git clone git@github.com:ShreyKumar/react-sleek-carousel.git && cd react-sleek-carousel && npm start
```

## Contributors
[Shreyansh "Shrey" Kumar](https://github.com/ShreyKumar)

## License
MIT © [ShreyKumar](https://github.com/ShreyKumar)
