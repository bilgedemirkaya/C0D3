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
    
    type User {
        name: String
        image: String
        lessons: [Lesson]
    }
    
    type Mutation {
        enroll(title: String!): User
        unenroll(title: String!): User
    }

    type Query {
        lessons: [Lesson]
        search(str: String!): [BasicPokemon]
        getPokemon(str: String!): Pokemon
        user: User
        login(pokemon: String!): User
        pokemons: [Pokemon]
    }
`;

module.exports = typeDefs;
