import React from 'react';

export default function Paginate({pokemonsPerPage, allPokemons, paginate}){
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1);
    }
    return(
        <nav  className="paginate">
            <ul>
                { pageNumbers &&
                pageNumbers.map(number => (
                    <li key={number}>
                    <a onClick={() => paginate(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )

}