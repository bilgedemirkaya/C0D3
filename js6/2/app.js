const express = require('express')

const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const LessonAPI = require('./datasource/lessons')
const PokemonAPI = require('./datasource/pokemons')
const resolvers = require('./resolvers')
const session = require('express-session')
var path = require('path')
const views = path.join(__dirname, 'views')

async function startApolloServer() {
  const app = express()

  const server = new ApolloServer({ 
      typeDefs,
      resolvers,
      dataSources: () => ({
        LessonAPI: new LessonAPI(),
        PokemonAPI: new PokemonAPI(),
      }),
      context: (({ req }) => {
        if (!req.session.user) {
          req.session.user = {}
        }
        return { req } 
      }),
  });
  await server.start();

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(views, 'addLessons.html'))
  })

  app.use(express.static('public'))
  server.applyMiddleware({ app })


  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer() 