const { RESTDataSource } = require('apollo-datasource-rest');

class PokemonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2';
  }

  pokemonReducer(pokemon) {
   return {
    name: pokemon.name,
    image: pokemon.sprites.front_default
   }
  }

  basicPokemonReducer (pokemon) {
      return {
          name: pokemon.name
      }
  }
    async searchPokemonsByName({str}) {
      const response = await this.get(`pokemon`);
      return Array.isArray(response.results)
      ? response.results.filter((pokemon) => pokemon.name.includes(str)).map(pokemon => this.basicPokemonReducer(pokemon))
      : [] 
    }
  
    async getPokemonByName({ str }) {
      const response = await this.get(`/pokemon/${str}/`);
      return this.pokemonReducer(response);
    }
    
    async getAllPokemons() {
    const response = await this.get('pokemon?limit=100&offset=200');
    return Array.isArray(response.results)
          ? response.results.map(pokemon => this.basicPokemonReducer(pokemon))
          : [];
  }}

module.exports = PokemonAPI;
