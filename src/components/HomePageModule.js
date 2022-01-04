import React, { useState } from 'react';
import TEST_DATA from '../json/test-data.json';
import TEST_PLACE from '../json/test-place.json';
import ResultsModule from './ResultsModule.js';
import CONFIG from '../config.json';
import { Loader } from '@googlemaps/js-api-loader';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel, faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';


const GOOGLE_URI = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const YELP_URI = 'https://api.yelp.com/v3/businesses/search?';

export default function HomePageModule() {
    // DEBUG
    const TD = {
        test_data: TEST_DATA,
        test_place: TEST_PLACE
    };
    const [isLoaded, setLoaded] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [googleData, setGoogleData] = useState([]);
    const [yelpData, setYelpData] = useState([]);

    // Handlers 
    const handleClick = () => {
        setLoaded(false);
        // Send GET request to Google
        const loader = new Loader({
            apiKey: CONFIG.GOOGLE_API_KEY,
            version: 'weekly',
            libraries: ['places']
        });

        const request = {
            query: 'restaurants in ' + inputValue.trim(),
            type: ['restaurants']
        }

        let googleData = [];

        loader
            .load()
            .then((google) => {
                const g = new google.maps.places.PlacesService(document.createElement('div'));
                g.textSearch(request, (results, status, pagination) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // Add all of the results into the array
                        for (let place in results) googleData.push(results[place]);

                        if (pagination && pagination.hasNextPage) { // Get more results
                            pagination.nextPage();
                        } else {    // If there are no more results
                            console.log(googleData);
                            setGoogleData(pickFiveIndices(googleData));
                            setLoaded(true);
                        }

                        // @TODO: get yelp data when i have a server side
                        // getYelpData(googleData, setYelpData);

                    } else {
                        // @TODO: handle error case
                    }
                });
            })
            .catch((err) => console.log(err));
    }      

    const handleChange = (event) => {
        let val = event.target.value;

        setInputValue(val);
    }

    return (
        <div>
            <div className="columns is-mobile is-centered">
                <div className="column is-4-desktop is-8-mobile">
                    <input className="input is-rounded" onChange={handleChange} placeholder="ex: Seattle, WA"></input>
                </div>
                <div className="column is-1-desktop is-2-mobile">
                    <button className="button is-black is-rounded" type="input" onClick={handleClick}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
            <div className="columns is-centered">
            { isLoaded ?  <div> { googleData ? <ResultsModule payload={{ googleData: googleData }} /> : <span></span> } </div> :  <FontAwesomeIcon className="spinner fa-spin" icon={faSpinner} /> }
            </div>
        </div>
    );
}

function pickFiveIndices(results) {
    let freqMap = [];

    for (let i = 0; i < results.length; i++) freqMap[i] = 0;

    let arr = [];

    while (arr.length < 5) {
        const index = Math.floor(Math.random() * results.length);

        if (freqMap[index] === 0) {
            freqMap[index]++;
            arr.push(results[index]);
        }
    }

    return arr;
}

function encodeQueryParams(obj) {
    let str = "";
    let start = true;

    for (const [key, value] of Object.entries(obj)) {
        if (start) {
            str += key + '=' + value;
            start = false;
        }
        else {
            str += '&' + key + '=' + value;
        }
    }

    return str;
}