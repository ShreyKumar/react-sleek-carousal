import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SleekCarousel from 'sleek-react-carousel'
import 'sleek-react-carousel/dist/index.css'

import './App.scss'

const App = () => {
    const carouselItemStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontSize: "30px"
    }

    return (
        <div className="demo-page">
            <div className="info">
                <h1 className="title">React Sleek Carousel</h1>
                <a href="https://github.com/ShreyKumar/react-sleek-carousal" target="_blank" rel="noopener noreferrer">View on Github</a>
                <h2>Install</h2>
                <SyntaxHighlighter language="bash" style={docco}>
                    npm i sleek-react-carousel
                </SyntaxHighlighter>
                <p style={{textAlign: "center"}}>or</p>
                <SyntaxHighlighter language="bash" style={docco}>
                    yarn add sleek-react-carousel
                </SyntaxHighlighter>
                <h2>Usage</h2>
            </div>
            <SyntaxHighlighter language="jsx" style={docco}>
                {`
import React, { Component } from 'react'
import SleekCarousel from 'sleek-react-carousel'
import 'sleek-react-carousel/dist/index.css'

const App = () => {
    const carouselItemStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontSize: "30px"
    }
    return (
        <SleekCarousel delay={null}>
            <div style={carouselItemStyle}>Item 1</div>
            <div style={carouselItemStyle}>Item 2</div>
            <div style={carouselItemStyle}>Item 3</div>
        </SleekCarousel>
    )
}
                `}
            </SyntaxHighlighter>
            <SleekCarousel delay={null}>
                <div style={carouselItemStyle}>Item 1</div>
                <div style={carouselItemStyle}>Item 2</div>
                <div style={carouselItemStyle}>Item 3</div>
            </SleekCarousel>
            <div className="info" style={{marginTop: 165}}>
                <h2 className="title">Customizability</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Prop name</th>
                            <th>Default Prop</th>
                            <th>Type</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>children</code></td>
                            <td><code>[]</code></td>
                            <td>Array of Elements</td>
                            <td>Array of children elements for the component</td>
                        </tr>
                        <tr>
                            <td><code>active</code></td>
                            <td><code>0</code></td>
                            <td>Number</td>
                            <td>The index of the element in <code>children</code> that will be shown first after the component loads</td>
                        </tr>
                        <tr>
                            <td><code>onTransitionStart</code></td>
                            <td><code>() =&gt; {}</code></td>
                            <td>Function</td>
                            <td>Callback that triggers before a transition between <code>children</code> elements begins, the index is provided as a parameter</td>
                        </tr>
                        <tr>
                            <td><code>onTransitionOver</code></td>
                            <td><code>() =&gt; {}</code></td>
                            <td>Function</td>
                            <td>Callback that triggers while a transition between <code>children</code> elements occurs</td>
                        </tr>
                        <tr>
                            <td><code>onTransitionEnd</code></td>
                            <td><code>() =&gt; {}</code></td>
                            <td>Function</td>
                            <td>Callback that triggers after a transition between <code>children</code> elements happen, the new index is provided as a parameter</td>
                        </tr>
                        <tr>
                            <td><code>vertical</code></td>
                            <td><code>false</code></td>
                            <td>Boolean</td>
                            <td>Enables the vertical transitions</td>
                        </tr>
                        <tr>
                            <td><code>height</code></td>
                            <td><code>500</code></td>
                            <td>String, Number</td>
                            <td>Height of the main Carousel element in <code>px</code>, <code>rem</code>, <code>em</code>, default is <code>px</code></td>
                        </tr>
                        <tr>
                            <td><code>disableTracker</code></td>
                            <td><code>false</code></td>
                            <td>Boolean</td>
                            <td>Disables the tracker</td>
                        </tr>
                        <tr>
                            <td><code>disableScroll</code></td>
                            <td><code>false</code></td>
                            <td>Boolean</td>
                            <td>Disable scrolling</td>
                        </tr>
                        <tr>
                            <td><code>delay</code></td>
                            <td><code>null</code></td>
                            <td>Number</td>
                            <td>The time delay in <code>ms</code> between transitions</td>
                        </tr>
                        <tr>
                            <td><code>speed</code></td>
                            <td><code>1500</code></td>
                            <td>Number</td>
                            <td>The speed in <code>ms</code> of transitions</td>
                        </tr>
                        <tr>
                            <td><code>looping</code></td>
                            <td><code>false</code></td>
                            <td>Boolean</td>
                            <td>Enable carousel of loop back to the start</td>
                        </tr>
                        <tr>
                            <td><code>relay</code></td>
                            <td><code>false</code></td>
                            <td>Boolean</td>
                            <td>Enable &quot;relaying&quot; back to the start instead of looping back. If both <code>relay</code> and <code>looping</code> is enabled, the Carousel ignores <code>looping</code></td>
                        </tr>
                        <tr>
                            <td><code>panning</code></td>
                            <td><code>false</code></td>
                            <td>Boolean</td>
                            <td>Enable <a href="https://www.framer.com/api/motion/gestures/#pan">panning</a> to switch between child elements</td>
                        </tr>
                        <tr>
                            <td><code>containerClassName</code></td>
                            <td><code>&#39;&#39;</code></td>
                            <td>String</td>
                            <td><code>className</code> for the Container of the main element which contains all <code>children</code> elements</td>
                        </tr>
                        <tr>
                            <td><code>containerStyle</code></td>
                            <td><code>{}</code></td>
                            <td>Object</td>
                            <td><code>style</code> for the Container of the main element which contains all <code>children</code> elements</td>
                        </tr>
                        <tr>
                            <td><code>containerClassName</code></td>
                            <td><code>&#39;&#39;</code></td>
                            <td>String</td>
                            <td><code>className</code> for the Container of the main element which contains all <code>children</code> elements</td>
                        </tr>
                        <tr>
                            <td><code>containerStyle</code></td>
                            <td><code>{}</code></td>
                            <td>Object</td>
                            <td><code>style</code> for the Container of the main element which contains all <code>children</code> elements</td>
                        </tr>
                        <tr>
                            <td><code>containerClassName</code></td>
                            <td><code>&#39;&#39;</code></td>
                            <td>String</td>
                            <td><code>className</code> for the main element which contains all <code>children</code> elements</td>
                        </tr>
                        <tr>
                            <td><code>containerStyle</code></td>
                            <td><code>{}</code></td>
                            <td>Object</td>
                            <td><code>style</code> for the main element which contains all <code>children</code> elements</td>
                        </tr>
                        <tr>
                            <td><code>trackerClassName</code></td>
                            <td><code>&#39;&#39;</code></td>
                            <td>String</td>
                            <td><code>className</code> for the tracker element</td>
                        </tr>
                        <tr>
                            <td><code>trackerStyle</code></td>
                            <td><code>{}</code></td>
                            <td>Object</td>
                            <td><code>style</code> for the tracker element</td>
                        </tr>
                        <tr>
                            <td><code>trackerDotClassName</code></td>
                            <td><code>&#39;&#39;</code></td>
                            <td>String</td>
                            <td><code>className</code> for the tracker dot element</td>
                        </tr>
                        <tr>
                            <td><code>trackerDotStyle</code></td>
                            <td><code>{}</code></td>
                            <td>Object</td>
                            <td><code>style</code> for the tracker dot element</td>
                        </tr>
                        <tr>
                            <td><code>trackerDotActiveClassName</code></td>
                            <td><code>&#39;&#39;</code></td>
                            <td>String</td>
                            <td><code>className</code> for the tracker dot element in the active state</td>
                        </tr>
                        <tr>
                            <td><code>trackerDotActiveStyle</code></td>
                            <td><code>{}</code></td>
                            <td>Object</td>
                            <td><code>style</code> for the tracker dot element in the active state</td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="title">Limitations</h2>
                <ul>
                    <li>Mobile responsiveness issues</li>
                    <li>Window scrolling issues</li>
                </ul>
                <p style={{ textAlign: "center", marginTop: 40 }}>Developed by <a href="https://github.com/ShreyKumar" target="_blank" rel="noopener noreferrer">Shrey Kumar</a></p>
            </div>
        </div>
    )
}

export default App
