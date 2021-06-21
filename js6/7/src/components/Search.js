import React from 'react';
import { useLazyQuery } from '@apollo/client';
import {LOGIN, GET_POKEMON, SEARCH} from '../utils';

const PokemonProfile = ({selected}) => {
    const name = selected.name
    const [login, { data }] = useLazyQuery(LOGIN)


    const handleLogin = () => {
        login({variables: {"pokemon": name}})
    }

    if (data && data.login) {
        window.location.reload()
    }

    return (
        <div>
            <h3> {selected.name} </h3>
            <img src={selected.image} alt="pp" />
            <button onClick={handleLogin}> Login </button>
        </div>
    )
}

const ShowSuggestion = ({name, searchedText, setSelected}) => {

    const [firstPart, lastPart] = name.split(searchedText); // For highlighting the searched text
    
    const [getPokemon, { data }] = useLazyQuery(GET_POKEMON)


    const handleClick = () => {
        getPokemon({variables: {"str": name}})
    }

    if (data && data.getPokemon) {
        setSelected(data.getPokemon)
    }
    

    return (
        <div onClick={handleClick}>
            {
             lastPart ? 
             <h4 className='pointer'>
             <span>{firstPart}</span>
             <span style={{backgroundColor: "rgba(0, 255, 0, 0.3)"}}>{searchedText}</span>
             <span>{lastPart}</span>
             </h4> : null
            }
        </div>
    ) 
}

const Search = () => {
    const [searchedText, setSearchedText] = React.useState(null)
    const [suggestions, setSuggestions] = React.useState([])
    const [selected, setSelected] = React.useState(null)

    const [searchPokemons, { data }] = useLazyQuery(SEARCH);
    const [getPokemon, { data:pokemon }] = useLazyQuery(GET_POKEMON)

    const handleInputChange = (e) => {
        const name = e.target.value
        if(e.key === 'Enter') {
            setSearchedText(null)
            e.target.value = ''
            getPokemon({variables: {str: name}})

            if (pokemon && pokemon.getPokemon) {
                setSelected(pokemon.getPokemon)
                return
            }
        }
        setSearchedText(name)
        if (searchedText)
            searchPokemons({ variables: { str: searchedText }})
        if (data && data.search)
            setSuggestions(data.search)
    }

   return (
    <div>
        <h1>Pokemon Search</h1>
        <input type="text" onKeyUp={(e) => handleInputChange(e)} style={{width:'100%'}} />
        <hr />
        <div>
            {selected ? <PokemonProfile selected={selected} /> : suggestions.map(({name}) => (
                <ShowSuggestion name={name} searchedText={searchedText} setSelected={setSelected}/>
            ))}
        </div>
    </div>
    )
}

export default Search