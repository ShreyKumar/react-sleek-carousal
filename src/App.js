import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { ReactCarousal, ReactCarousalItem } from './ReactCarousal'

function App() {
    return (
        <div className="App">
            <ReactCarousal height={500}>
                <ReactCarousalItem height="500px">
                    <h1>A</h1>
                </ReactCarousalItem>
                <ReactCarousalItem height="500px">
                    <h1>B</h1>
                </ReactCarousalItem>
            </ReactCarousal>
        </div>
    );
}

export default App;
