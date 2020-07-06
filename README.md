# React Sleek Carousal
**(This project is complete but is yet to be published to the NPM registry)** PRs are welcome
### About
A lightweight, easy to use and highly customizable React component that achieves a "Carousal" or "Slideshow" effect. 
### Quick Start for development purposes
`git clone git@github.com:ShreyKumar/react-sleek-carousal.git && cd react-sleek-carousal && yarn start`
### Simple example
```
    <SleekCarousal>
        // More items here
        <h1>A</h1>
        <h1>B</h1>
        <h1>C</h1>
        <h1>D</h1>
    </SleekCarousal>
```
### Customizability
This component has no required props
| Prop name | Default Prop | Type | Info |
| --- | ----------- | ------ | ---------- |
| `children` | `[]` | Array of Elements | Array of children elements for the component |
| `active` | `0` | Boolean | The index of the element in `children` that will be shown first after the component loads |
| `onTransitionStart` | `() => {}` | Function | Callback that triggers before a transition between `children` elements begins, the index is provided as a parameter |
| `onTransitionOver` | `() => {}` | Function | Callback that triggers while a transition between `children` elements occurs |
| `onTransitionEnd` | `() => {}` | Function | Callback that triggers after a transition between `children` elements happen, the new index is provided as a parameter |
| `vertical` | `false` | Boolean | Enables the vertical transitions |
| `height` | `500` | String, Number | Height of the main Carousal element in `px`, `rem`, `em`, default is `px` |
| `disableTracker` | `false` | Boolean | Disables the tracker |
| `disableScroll` | `false` | Boolean | Disable scrolling |
| `delay` | `null` | Number | The time delay in `ms` between transitions |
| `speed` | `1500` | Number | The speed in `ms` of transitions |
| `looping` | `false` | Boolean | Enable carousal of loop back to the start |
| `relay` | `false` | Boolean | Enable "relaying" back to the start instead of looping back. If both `relay` and `looping` is enabled, the Carousal ignores `looping` |
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

