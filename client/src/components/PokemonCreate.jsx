import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from './PokemonCreate.module.css'

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector ((state)=> state.allPokemons);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    weight: 0,
    height: 0,
    types: [],
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/240.svg",
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, parseInt(e.target.value)],
    });
    console.log(input);
  }

  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    alert("Pokemon creado con exito");
    setInput({
      name: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      weight: 0,
      height: 0,
      types: [],
      img: "",
    });
    history.push("/home");
  }

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Se requiere un nombre";
    } else if (input.hp > 100) {
      errors.hp = "hp debe ser menor a 100";
    }
    return errors;
  }
  //dispatch de getTypes
  useEffect(() => {
    dispatch(getTypes());
  }, []);
  return (
    <div className={styles.createContainer}>
      
      <div className={styles.formContainer}>
        <Link to="/home">
          <button type="button">Volver</button>
        </Link>
        
        <h1>Crea tu pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.campos}>

          <div className={styles.create1}>

          <div>
            <label>Nombre </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className={styles.createInfo}>

            <label>Vida </label>
            <input
              type="number"
              name="hp"
              value={input.hp}
              onChange={(e) => handleChange(e)}
            />
            {errors.hp && <p>{errors.hp}</p>}
          </div>
          <div>
            <label>Ataque </label>
            <input
              type="number"
              name="attack"
              value={input.attack}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Defensa </label>
            <input
              type="number"
              name="defense"
              value={input.defense}
              onChange={(e) => handleChange(e)}
            />
          </div>
          </div>
          <div className={styles.create2}>
          <div>
            <label>Velocidad </label>
            <input
              type="number"
              name="speed"
              value={input.speed}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Altura </label>
            <input
              type="number"
              name="height"
              value={input.height}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Imagen </label>
            <input
              type="text"
              name="img"
              value={input.img}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <label>Tipos </label>
          <select onChange={(e) => handleSelect(e)}>
            {types.map((type) => (
              <option value={type.id}>{type.name}</option>
            ))}
          </select>
          </div >
          </div>
          <button className={styles.btnCreate} type="submit">
            Crear Pokemon
          </button>
        </form>
        {types.map((type) => {
          if (input.types.includes(type.id)){
            return (
              
          <div className={styles.tipos}>
            <p>{type.name}</p>
            <button onClick={() => handleDelete(type.id)}>X</button>
          
          </div>)
          }
          
        })}
        
      </div>
    </div>
  );
}
