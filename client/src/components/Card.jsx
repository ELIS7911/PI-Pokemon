import React from 'react';

export default function Card ({ name, img, types }) {
    
    return (
        <div className="contextCard">
            
        <div className="card">
            <img src={img} alt="Oops! Not found"/>
            <h3>{name}</h3>
            <h4>
					{types.map((type) => {
						type = type[0].toUpperCase() + type.slice(1);
						return <h5>{type}</h5>;
					})}
				</h4>
            
        </div>
        </div>
    );
}