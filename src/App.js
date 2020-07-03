import React, { useState } from 'react';
import './App.scss';
import ReactCarousal from './ReactCarousal'

function App() {
    const [active, setActive] = useState(1)

    return (
        <div className="App">
            <ReactCarousal height={500} vertical active={active} setActive={setActive}>
                <h1>A</h1>
                <h1>B</h1>
                <h1>C</h1>
            </ReactCarousal>
        </div>
    );
}

export default App;
