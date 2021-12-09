import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';
import styled from 'styled-components';
import styles from './Detail.module.css'
import bg from '../img/pokemini.jpg';


/* const Detail = () => {
	const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getPokemonsById(id));
	}, [dispatch]);

	const {
		id: idPoke,
		name,
		img,
		attack,
		defense,
		speed,
		types,
		hp,
		weight,
		height,
	} = useSelector((state) => state.detail); */

 export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

	const DetailContainer = styled.div`
	background: url(${bg});
	background-position: bottom;
	background-repeat: no-repeat;
	background-size: cover;
	width: 100vw;
	height: 100vh;
	display: flex;
	font-family: 'Bahnschrift';
	justify-content: center;
	align-items: center;
	`;


const myPokemon = useSelector ((state) => state.detail) 

return (

<DetailContainer>
    <div className = {styles.pokeContainer}>
	<span># {`${myPokemon.id?.length}`> 1 ? 'CREATED' :`${myPokemon.id}`  } </span>
				
           <h1>Soy {myPokemon.name}</h1>
           <img src={myPokemon.img} alt="imagen no encontrada" width='300px' height='400px'/>

		   <div className={styles.pokeInfo}>

		   <h2>Vida: {myPokemon.hp}</h2>
           <h2>Ataque: {myPokemon.attack}</h2>
           <h2>Defensa: {myPokemon.defense}</h2>
           <h2>Velocidad: {myPokemon.speed}</h2>
           <h2>Tipos: {myPokemon.types + " "}</h2>
           <h2>Peso: {myPokemon.weight}</h2>   
           <h2>Altura: {myPokemon.height}</h2>

		   <div className={styles.btn}>

	   <Link to='/home'>
		   <button>Volver</button>
	   </Link>
	   </div>
       </div>
       </div> 
	   
    </DetailContainer>
	
)
    } 
