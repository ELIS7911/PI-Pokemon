import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    weight: 1,
    height: 1,
    types: [],
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/360.svg",
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
      types: [...input.types, e.target.value],
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
    <div className="createContainer">
      <div className="formContainer">
        <Link to="/home">
          <button type="button">Volver</button>
        </Link>
        <h1>Crea tu pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre </label>
            <input
              type="text"
              name="name"
              value={input.name}
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="createInfo">
            <label>Vida </label>
            <input
              type="number"
              min="1"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
            {errors.hp && <p>{errors.hp}</p>}
          </div>
          <div>
            <label>Ataque </label>
            <input
              type="number"
              min="1"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Defensa </label>
            <input
              type="number"
              min="1"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Velocidad </label>
            <input
              type="number"
              min="1"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Altura </label>
            <input
              type="number"
              min="1"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <label>Tipos </label>
          <select onChange={(e) => handleSelect(e)}>
            {types.map((type) => (
              <option value={type.name}>{type.name}</option>
            ))}
          </select>
          <div>
            <label>Imagen </label>
            <input
              type="text"
              name="image"
              value={input.img}
              onChange={handleChange}
            />
          </div>
          <button className="btnCreate" type="submit">
            Crear Pokemon
          </button>
        </form>
        {input.types.map((el) => (
          <div>
            <p>{el}</p>
            <button onClick={() => handleDelete(el)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
