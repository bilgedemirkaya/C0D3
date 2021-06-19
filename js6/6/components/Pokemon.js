import React from 'react'
import Search from './Search'
import User from './User'
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
    query user {
        user {
        name
        image
        lessons {
            title
            rating
        }
        } 
    }
`;
const Pokemon = () => {
    const { loading, data } = useQuery(GET_USER);

    if (loading) return 'Loading...';
    return data && data.user ? <User user={data.user} /> : <Search /> 
}

export default Pokemon