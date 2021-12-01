const initialState = {
    pokemons: [],
    allPokemons: [],
    detail: [],
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
  
      case "GET_POKE_BY_NAME":
        return {
          ...state,
          pokemons: action.payload,
        };
  
      case "GET_TYPES":
        return {
          ...state,
          types: action.payload,
        };
  
      case "ORDER_BY_NAME":
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
          }
          
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
  
      case "POST_POKEMON":
        return {
          ...state,
        } 

        case 'POKE_CREATED': {
        const allPokemons = state.allPokemons;
          const createdFilter = action.payload === 'all' ? allPokemons : allPokemons.filter((poke) => typeof poke.id === action.payload);
          return { 
            ...state, 
            pokemons: createdFilter 
          };
        }
        case 'GET_DETAILS':
			return {
				...state,
				detail: action.payload,
			};
    
      default:
        return state;
    }
  }
  export default rootReducer;