import React from "react";
import { Link } from "react-router-dom";
//importo los hooks que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux
import { useDispatch, useSelector } from "react-redux";
//importo las actions que voy a usar en este componente
import { getPokemons, filterPokeType, filterCreated, orderByName } from "../actions";
//importo los componentes que voy a usar
import Card from "./Card";
import Paginate from './Paginate';
import SearchBar from './SearchBar';

//componente
export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);
  console.log(allPokemons);

  //Paginado
  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState (1)//guardame en un estado local la pagina actual y una const que me setee la pag actual (arranca en pag 1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState (12)//guardame otro estado local cuantos pokemones quiero por pagina
  const indexOfLastPokemon = currentPage * pokemonsPerPage//en un principio va a ser 12 (1*12) (2*12=24) (3*12=36) (4*12=48)
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage//12-12=0 24-12=12 36-12=24 48-12=36 
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
  //                                          (0-12) (12-24) (24-36) (36-48) 

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
  }


  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

   function handleFilterType(e){
        dispatch (filterPokeType(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterCreated(e){
        dispatch (filterCreated(e.target.value))
        setCurrentPage(1);
    } 

  function handleSort(e){
        e.preventDefault();
        dispatch (orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

  return (
    <div className= "home">
      <div className= "nav">
      <Link to="/pokemon">Crear Pokemon</Link>
      <h1>POKEPAGE</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los pokemons
      </button>
      <div>
        <select onChange={(e) => handleFilterType(e)}>
        <option value="All">Todos</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="flying">Flying</option>
                    <option value="ground">Ground</option>
                    <option value="poison">Poison</option>
                    <option value="rock">Rock</option>
                    <option value="steel">Steel</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                    <option value="shadow">Shadow</option>
                    <option value="unknown">Unknown</option>
        </select>
        <select onChange={e => handleFilterCreated(e)}>
        <option disabled selected>
						Creado/Existente
					</option>
					<option value='all'>All</option>
					<option value='number'>Exist</option>
					<option value='string'>Created</option>
        </select>
        <select onChange={e => handleSort(e)}>
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descendente</option>
        </select>
        <Paginate
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginate={paginate}
                />
                <SearchBar/>
      </div>
                <div className="cardsContainer">
        {currentPokemons?.map((el) => {
          return (
            <fragment>
              <Link className="link" to={"/pokemons/" + el.id}>
                
                <Card
                  name={el.name}
                  types={el.types}
                  img={el.img}
                  key={el.id}
                />
                
              </Link>
            </fragment>
          );
        })}
        </div>
      </div>
    </div>
  );
}
