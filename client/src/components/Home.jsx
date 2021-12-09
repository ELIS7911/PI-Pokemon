import React from "react";
import { Link } from "react-router-dom";
//importo los hooks que voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks de react-redux
import { useDispatch, useSelector } from "react-redux";
//importo las actions que voy a usar en este componente
import { getPokemons, filterPokeType, filterCreated, orderBy, getTypes } from "../actions";
//importo los componentes que voy a usar
import Card from "./Card";
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import logo from '../img/logo.png';
import styled from 'styled-components';
import bg from '../img/elementospoke.jpg';



//componente
export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, []);
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
        dispatch (orderBy(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    const Home = styled.div`
	  background: url("${bg}");
	  background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Bahnschrift';   
	`;

  return (
    <Home>
      <div className="navbar">

      <div><img src={logo}/></div>
      <SearchBar/>
      <Link to="/pokemon"><button>Crear</button></Link>
      </div>
      <div>
        <div className="selection">

        <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar Pokemons
      </button>
        <select onChange={(e) => handleFilterType(e)}>
        <option disabled selected>
						Tipos
					</option>
          {types.map((type) => (
              <option value={type.name}>{type.name}</option>
            ))}
        </select>
        <select onChange={e => handleFilterCreated(e)}>
        <option disabled selected>
						Creado/Existente
					</option>
					<option value='all'>Todos</option>
					<option value='number'>Existentes</option>
					<option value='string'>Creados</option>
        </select>
        <select onChange={e => handleSort(e)}>
        <option disabled selected>
						Orden
					</option>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
          <option value='Att-Asc'>Ataque +</option>
					<option value='Att-Des'>Ataque -</option>
        </select>
        </div>
        <Paginate
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginate={paginate}
                />
                
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
    </Home>
  );
}
