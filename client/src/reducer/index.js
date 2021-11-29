const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
  };
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
          allPokemons: action.payload,
        };
  
      /* case "GET_POKE_BY_NAME":
        return {
          ...state,
          pokemons: action.payload,
        }; */
  
      case "GET_TYPES":
        return {
          ...state,
          types: action.payload,
        };
  
  
      /* case "ORDER_BY_NAME":
        let sortedArray = action.payload === 'Asc'?
        state.pokemons.sort(function (a, b){
            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
              return -1;
          }
          return 0;
        }) : 
        state.pokemons.sort(function (a, b){
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          })
          return {
              ...state,
              pokemons: sortedArray,
          } */
          
      case "POKE_BY_TYPE":
        const allPokemons = state.allPokemons;
        const typeFiltered =
          action.payload === "All"
            ? allPokemons
            : allPokemons.filter((el) => el.types.includes(action.payload));
        return {
          ...state,
          pokemons: typeFiltered,
        };
  
      /* case "POST_POKEMON":
        return {
          ...state,
        }
  
      case "POKE_CREATED":   
        const createdFilter = action.payload === "Created" ? state.allPokemons.filter (el => el.createdInDb) : state.allPokemons.filter (el => !el.createdInDb)
        return {
            ...state,
            pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
        } */
    
      default:
        return state;
    }
  }
  export default rootReducer;