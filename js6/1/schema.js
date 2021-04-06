const { gql } = require('apollo-server');

const typeDefs = gql`
  type Lesson {
    id: ID,
    title: String,
    challenges: [challenges]
  }
  type challenges {
        id: ID!
        title: String
        description: String
    }
    type Pokemon {
        name: String
        image: String
    }
    type BasicPokemon {
        name: String
    }
    
    type Query {
        lessons: [Lesson]
        pokemons: [Pokemon]
        search(str: String!): [BasicPokemon]
        getPokemon(str: String!): Pokemon
    }
`;

module.exports = typeDefs;
