import React from 'react';
import './App.scss';
import SleekCarousel from './SleekCarousel'

function App() {
    return (
        <div className="App">
            <SleekCarousel>
                <h1>A</h1>
                <h1>B</h1>
                <h1>C</h1>
                <h1>D</h1>
            </SleekCarousel>
        </div>
    );
}

export default App;
