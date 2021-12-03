import React from 'react';

export default function Card ({ name, img, types }) {
    
    return (
        <div className="contextCard">
        <div className="card">
            <img src={img} alt="Oops! Not found"/>
            <h3>{name}</h3>
            <h5>{types}</h5>
            
        </div>
        </div>
    );
}