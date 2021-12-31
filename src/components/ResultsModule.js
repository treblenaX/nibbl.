import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar, faStarHalfAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faYelp } from '@fortawesome/free-brands-svg-icons'

export default function ResultsModule(props) {
    const [cards, setCards] = useState([]);
    const googleData = props.payload.googleData;
    // const onePlace = props.payload.test_place.businesses[0];

    useEffect(() => {
        // Map out result data into cards
        setCards(googleData.map((result) => (<ResultCard payload={{ googleData: result , yelpData: null }}/>)));
    }, [googleData])

    // console.log(googleData);

    return (
        <div>
            {/* {googleData 
                ? googleData.map((result) => (<ResultCard payload={{ googleData: result , yelpData: null }}/>)) 
                : <span></span>
            } */}
            { cards }
        </div>
    );
}

function ResultCard(props) {
    const googleData = props.payload.googleData;
    // const yelpData = props.payload.yelpData;

    return (
        <div className="card result-card">
            <div className="card-header media-left">
                {/* <figure className="image-container">
                    <img className="result-image" width="128" height="128" src={yelpData.image_url} />
                </figure> */}
                <div className="result-card-header is-fullwidth media-content">
                    <h1><strong className="result-card-header-name">{googleData.name}</strong></h1>
                    {/* <h2 className="result-card-header-cuisines"><em>{createCuisines(yelpData.categories)}</em></h2> */}
                    <h3 className="result-card-header-address">{googleData.formatted_address}</h3>
                </div>
            </div>
            <div className="card-content">
                <div className="columns is-mobile is-offset-3 result-card-rating">
                    <div className="column is-narrow is-offset-3">
                        <FontAwesomeIcon className="rating-icon" icon={faGoogle} />
                        {createReviewStars(googleData.rating)}
                        <span className="rating-text">{googleData.rating}</span>
                    </div>
                    {/* <div className="column is-narrow">
                        <FontAwesomeIcon className="rating-icon" icon={faYelp} />
                        {createReviewStars(yelpData.rating)}
                        <span className="rating-text">{yelpData.rating}</span>
                    </div> */}
                    <div className="column is-narrow">
                        <p>{createPriceLevel(googleData.price_level)}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer buttons action-buttons">
                <button className="button card-footer-item is-danger is-outlined">WEBSITE</button>
                <button className="button card-footer-item is-info is-outlined">MAP</button>
            </div>
        </div>
    );
}

/* Private function helpers */
function createCuisines(obj) {
    const arr = Object.keys(obj);
    let str = obj[arr[0]].title;
    for (let i = 1; i < arr.length; i++) {
        str += ", " + obj[arr[i]].title;
    }
    return str;
}

function createReviewStars(rawRating) {
    let rating = 0;
    const roundedRating = Math.round(rawRating);
    const diff = roundedRating - rawRating;

    if (Math.abs(diff) >= 0.25) {
        rating = Math.floor(rawRating) + 0.5;
    } else {
        rating = (diff < 0) ? Math.floor(rawRating) : roundedRating;
    }

    let stars = [];
    let index = 0;

    while (rating > 0.5) {
        stars[index++] = <FontAwesomeIcon icon={filledStar} />;
        rating--;
    }

    if (rating === 0.5) {
        stars[index++] = <FontAwesomeIcon icon={faStarHalfAlt} />
        rating -= 0.5;
    };
    
    while (index < 5) {
        stars[index++] = <FontAwesomeIcon icon={emptyStar} />;
    }

    return stars;
}

function createPriceLevel(priceLevel) {
    let signs = [];

    for (let i = 0; i < priceLevel; i++) {
        signs[i] = <FontAwesomeIcon icon={faDollarSign} />;
    }
    
    return signs;
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