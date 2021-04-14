const express = require('express')
const app = express()

const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const LessonAPI = require('./datasource/lessons')
const PokemonAPI = require('./datasource/pokemons')
const resolvers = require('./resolvers')

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
      LessonAPI: new LessonAPI(),
      PokemonAPI: new PokemonAPI()
    })
});
app.use(express.static('public'))

//app.listen(process.env.PORT || 8123)
server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
  