import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';

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


const myPokemon = useSelector ((state) => state.detail) 

return (
/*     <div>
			<Link to='/home'>
				
			</Link>
			<div>
				<div>{typeof idPoke === 'number' ? `# ${id}` : 'CREATED'}</div>
				<h1>{name}</h1>
				<div>
					{types?.map((t) => (
						<h2>{t}</h2>
					))}
				</div>
				<div>
					<img src={img} alt={`Imagen de ${name}`} />
					<div>
						<div>
							<h2>HP:</h2>
							<h3>{hp}</h3>
						</div>
						<div>
							<h2>Attack:</h2>
							<h3>{attack}</h3>
						</div>
						<div>
							<h2>Defense:</h2>
							<h3>{defense}</h3>
						</div>
						<div>
							<h2>Speed:</h2>
							<h3>{speed}</h3>
						</div>
						<div>
							<h2>Weight:</h2>
							<h3>{weight}</h3>
						</div>
						<div>
							<h2>Height:</h2>
							<h3>{height}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 

export default Detail; */

<div className="detailContainer">
    <div className = "pokeContainer">
           <h1>Soy {myPokemon.name}</h1>
           <img src={myPokemon.img} alt="imagen no encontrada" width='300px' height='400px'/>
		   <div className="pokeInfo">
		   <h2>Vida: {myPokemon.hp}</h2>
           <h2>Ataque: {myPokemon.attack}</h2>
           <h2>Defensa: {myPokemon.defense}</h2>
           <h2>Velocidad: {myPokemon.speed}</h2>
           <h2>Tipos: {myPokemon.types + " "}</h2>
           <h2>Peso: {myPokemon.weight}</h2>   
           <h2>Altura: {myPokemon.height}</h2>
		   </div> 
       </div> 
	   <Link to='/home'>
		   <button>Volver</button>
	   </Link>
       
       
    </div>
	
)
    } 
