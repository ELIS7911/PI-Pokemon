import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons");
    //console.log(json.data)
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getPokeByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokemons?name=" + name); //agregale a la ruta lo que me llega por payload
      return dispatch({
        type: "GET_POKE_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );
    return response;
  };
}

export function orderBy(payload) {
  return {
    type: "ORDER_BY",
    payload,
  };
}

export function filterPokeType(payload) {
  return {
    type: "POKE_BY_TYPE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "POKE_CREATED",
    payload,
  };
}

export function getDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get(
				'http://localhost:3001/pokemons/' + id
			);
			return dispatch({
				type: 'GET_DETAILS',
				payload: json.data
			});
		} catch (err) {
			console.log(err);
		}
	};
}

