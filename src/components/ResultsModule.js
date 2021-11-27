import React from 'react';

export default function ResultsModule(props) {
    const results = props.payload.results;

    // Map out result data into cards
    const cards = results.map((result) => (<ResultCard payload={result} />));

    return (
        <div>
            {cards}
        </div>
    );
}

function ResultCard(props) {
    const data = props.payload;

    return (
        <div className="result-card-container">
            <div className="result-card-text">
                <h1>{data.name}</h1>
            </div>
            <div>
                <div className="result-card-rating">
                    <p>{data.rating}</p>
                </div>
                <div className="result-card-price-level">
                    <p>{data.price_level}</p>
                </div>
            </div>
        </div>
    );
}

/* Private function helpers */

