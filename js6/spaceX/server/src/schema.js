const { gql } = require('apollo-server')

const typeDefs = gql`
# The Launch object type has a collection of fields, and each field has a type of its own
type Launch {
   # A field's type can be either an object type or a scalar type
    id: ID! # ! means  "this field's value can never be null."
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
}

type Rocket {
    id: ID!
    name: String
    type: String
}
  
type User {
    id: ID!
    email: String!
    trips: [Launch]! # it's an array of the specified type
    token: String
}
  
type Mission {
    name: String
    missionPatch(size: PatchSize): String
}
  
enum PatchSize {
    SMALL
    LARGE
}

# TO FETCH DATA
type Query {
    launches: [Launch]! # query will return an array of all upcoming Launches.
    launch(id: ID!): Launch # query will return a single Launch that corresponds to the id argument provided to the query.
    me: User # details for the User that's currently logged in.
  }

# TO MODIFY DATA
type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }

type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
}  
  

`

module.exports = typeDefs
