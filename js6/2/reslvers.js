const users = {}
module.exports = {
    Query: {
        lessons: (_, __, { dataSources }) =>
        dataSources.LessonAPI.getAllLessons(),
        search: (_, {str}, { dataSources }) =>
        dataSources.PokemonAPI.searchPokemonsByName({str}),
        getPokemon: async (_, {str}, { dataSources }) => {
        const result = await dataSources.PokemonAPI.getPokemonByName({str})
        users[result['name']] = {...result, lessons: []}
        return result
        },
        pokemons: (_, __, {dataSources}) => dataSources.PokemonAPI.getAllPokemons(),
        user: (_, __, { req }) => {
        const name = req.session.user.name
        const image = users[name]['image']
        const lessons = users[name]['lessons']
        console.log(users)
        return {name, image, lessons}
        },
        login: (_, { pokemon }, { req }) => { 
            req.session.user.name = pokemon
            const user = users[pokemon] || req.session.user
            return user
        },
    },

    Mutation: {
        enroll: (_, { title }, {req}) => {
            const pokemon = req.session.user.name
            users[pokemon]['lessons'].push({title})
            return {
                name: pokemon,
                image:  users[pokemon]['image'],
                lessons:  users[pokemon]['lessons']
            }
        },
        unenroll:(_, { title }, {req}) => {
            const pokemon = req.session.user.name
            users[pokemon]['lessons'] = users[pokemon]['lessons'].filter(t => t['title'] !== title )
        return {
            name: pokemon,
            image: users[pokemon]['image'],
            lessons: users[pokemon]['lessons']
            }
        }
    }
};
