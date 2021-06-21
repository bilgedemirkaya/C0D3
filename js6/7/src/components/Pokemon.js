import React from 'react'
import Search from './Search'
import User from './User'
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils'

const Pokemon = () => {
    const { loading, data } = useQuery(GET_USER);

    if (loading) return 'Loading...';
    return data && data.user ? <User user={data.user} /> : <Search /> 
}

export default Pokemon