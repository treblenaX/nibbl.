import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar, faStarHalfAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faYelp } from '@fortawesome/free-brands-svg-icons'

const googleURI = 'https://www.google.com/search?';

export default function ResultsModule(props) {
    const [cards, setCards] = useState([]);
    const googleData = props.payload.googleData;
    // const onePlace = props.payload.test_place.businesses[0];

    useEffect(() => {
        // Map out result data into cards
        setCards(googleData.map((result) => (<ResultCard payload={{ googleData: result }}/>)));
    }, [googleData])

    return (
        <div className="result-module">
            { cards }
        </div>
    );
}

function ResultCard(props) {
    const [isFlipped, setFlip] = useState(false);
    const googleData = props.payload.googleData;

    const handleClick = () => {
        // Flip the card to its front
        setFlip(true);
    }

    return (
        <div className="columns is-mobile is-centered">
            { isFlipped ? <ResultCardDetails googleData={googleData} /> : <a className="column is-centered" onClick={handleClick} ><ResultCardBack /></a> }
        </div>
    );
}

function ResultCardBack() {
    return (
        <div className="card result-card result-card-back">
            <p>n.</p>
        </div>
    )
}

function ResultCardDetails(props) {
    const googleData = props.googleData;

    const handleGoogle = () => {
        // Direct to google
        window.open(googleURI + 'q=' + encodeURIComponent(googleData.name + ' at ' + googleData.formatted_address), '_blank');
    }

    return (
        <div className="card result-card is-mobile">
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
                <div className="columns is-mobile result-card-rating">
                    <div className="column is-narrow is-mobile is-centered">
                        <FontAwesomeIcon className="rating-icon" icon={faGoogle} />
                        {createReviewStars(googleData.rating)}
                        <span className="rating-text">{googleData.rating}</span>
                    </div>
                    {/* <div className="column is-narrow">
                        <FontAwesomeIcon className="rating-icon" icon={faYelp} />
                        {createReviewStars(yelpData.rating)}
                        <span className="rating-text">{yelpData.rating}</span>
                    </div> */}
                    <div className="column is-narrow is-mobile is-centered">
                        <p>{createPriceLevel(googleData.price_level)}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer buttons action-buttons">
                <button className="button card-footer-item is-danger is-outlined" onClick={handleGoogle}>GOOGLE</button>
                {/* <button className="button card-footer-item is-info is-outlined">MAP</button> */}
            </div>
        </div>
    )
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