import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ReactCarousal, ReactCarousalItem } from './ReactCarousal'

function App() {
    return (
        <div className="App">
            <ReactCarousal height="500px">
                <ReactCarousalItem>
                    <b>A</b>
                </ReactCarousalItem>
                <ReactCarousalItem>
                    <b>B</b>
                </ReactCarousalItem>
            </ReactCarousal>
        </div>
    );
}

export default App;
