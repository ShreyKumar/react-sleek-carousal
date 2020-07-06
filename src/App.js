import React from 'react';
import './App.scss';
import ReactSleekCarousal from './ReactSleekCarousal'

function App() {
    return (
        <div className="App">
            <ReactSleekCarousal height={500} active={3} delay={1000} looping relay>
                <h1>A</h1>
                <h1>B</h1>
                <h1>C</h1>
                <h1>D</h1>
            </ReactSleekCarousal>
        </div>
    );
}

export default App;
