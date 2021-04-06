module.exports = {
    Query: {
        lessons: (_, __, { dataSources }) =>
        dataSources.LessonAPI.getAllLessons(),
        search: (_, {str}, { dataSources }) =>
        dataSources.PokemonAPI.searchPokemonsByName({str}),
        getPokemon: (_, {str}, { dataSources }) => 
        dataSources.PokemonAPI.getPokemonByName({str}),
        pokemons:(_, __, {dataSources}) => 
        dataSources.PokemonAPI.getAllPokemons()
    },
};
