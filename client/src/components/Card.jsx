import React from 'react';
import styles from './Card.module.css'

export default function Card ({ name, img, types }) {
    
    return (
        <div className={styles.contextCard}>          
        <div>
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