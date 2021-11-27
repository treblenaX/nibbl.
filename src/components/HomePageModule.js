import React from 'react';
import TEST_DATA from '../json/test-data.json';
import ResultsModule from './ResultsModule.js';

export default function HomePageModule() {

    // Handlers 
    const handleClick = () => {
        
    }

    return (
        <div className="home-page">
            <div className="white-space">

            </div>
            <div className="title-container">
                <h1 className="title-text">Restaurant Picker</h1>
            </div>
            <div className="white-space">

            </div>
            <div className="input-group mb-3 text-center">
                <input className="distance-input" placeholder="ex: Seattle, WA"></input>
                {/* <span className="input-group-append input-group-text distance-input-append" id="basic-addon2">miles</span> */}
            </div>
            <button className="btn btn-light grab-button" type="input" onClick={handleClick}>Grab Results</button>
            <div className="white-space">
                <ResultsModule payload={TEST_DATA} />
            </div>
        </div>
    );
}