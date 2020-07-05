import React, { useState } from 'react';
import './App.scss';
import ReactCarousal from './ReactCarousal'

function App() {
    return (
        <div className="App">
            <ReactCarousal height={500} active={3} delay={1000} looping relay>
                <h1>A</h1>
                <h1>B</h1>
                <h1>C</h1>
                <h1>D</h1>
            </ReactCarousal>
        </div>
    );
}

export default App;
