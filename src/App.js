import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import ReactCarousal from './ReactCarousal'

function App() {
    return (
        <div className="App">
            <ReactCarousal height={500} vertical>
                {/* <ReactCarousalItem height="450px"> */}
                    <h1>A</h1>
                {/* </ReactCarousalItem> */}
                {/* <ReactCarousalItem height="200px"> */}
                    <h1>B</h1>
                {/* </ReactCarousalItem> */}
            </ReactCarousal>
        </div>
    );
}

export default App;
