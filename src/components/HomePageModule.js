import React, { useState } from 'react';
import TEST_DATA from '../json/test-data.json';
import TEST_PLACE from '../json/test-place.json';
import ResultsModule from './ResultsModule.js';
import CONFIG from '../config.json';
import $ from 'jquery';

const GOOGLE_URI = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const YELP_URI = 'https://api.yelp.com/v3/businesses/search?';

export default function HomePageModule() {
    // DEBUG
    const TD = {
        test_data: TEST_DATA,
        test_place: TEST_PLACE
    };
    const [isSearching, setSearching] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [googleData, setGoogleData] = useState(undefined);

    // Handlers 
    const handleClick = () => {
        // Send GET request to Google
        $.ajax({
            url: GOOGLE_URI,
            data: {
                key: CONFIG.GOOGLE_API_KEY,
                type: 'restaurant',
                query: encodeURIComponent(inputValue.trim())
            },
            type: 'GET',
            dataType: 'jsonp',
            jsonp: '$callback',
            contentType: 'application/json',
            success: (res) => {
            }
        })
    }      

    const handleChange = (event) => {
        let val = event.target.value;

        setInputValue(val);
    }

    return (
        <div>
            {/* {isSearching  
                ? <span></span> */}
                : <div className="columns is-mobile is-centered">
                    <div className="column is-3">
                        <input className="input is-rounded" onChange={handleChange} placeholder="ex: Seattle, WA"></input>
                    </div>
                    <div className="column is-2">
                        <button className="button is-black is-rounded" type="input" onClick={handleClick}>Grab Results</button>
                    </div>
                </div>

            <div className="columns is-centered">
                <ResultsModule payload={TD} />
            </div>
        </div>
    );
}