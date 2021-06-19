import React from 'react'
import {debounce, sendQuery} from '../utils'
import { gql, useQuery } from '@apollo/client';

const PokemonProfile = ({selected}) => {
    const name = selected.name

    const handleLogin = () => {
        sendQuery(`{login (pokemon:"${name}") {name}}`).then(() => {
            window.location.reload()
        })
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
    

    const handleClick = async () => {
        sendQuery(`{getPokemon(str:"${name}"){name, image}}`).then(({getPokemon}) => {
            setSelected(getPokemon)
        })
    }

    return (
        <div onClick={handleClick}>
           <h4 className='pointer'>
            <span>{firstPart}</span>
            <span style={{backgroundColor: "rgba(0, 255, 0, 0.3)"}}>{searchedText}</span>
            <span>{lastPart}</span>
            </h4>
        </div>
    ) 
}

const Search = () => {
    const [searchedText, setSearchedText] = React.useState('')
    const [suggestions, setSuggestions] = React.useState([])
    const [selected, setSelected] = React.useState(null)

    const debounceHandler = (searchedText) => debounce(() => {
        sendQuery(`{search(str:"${searchedText}") {name}}`).then(({search}) => {
            if (!search) return
            setSuggestions(search)
        })
    }, 500)

    const handleInputChange = async (e) => {
        if(e.key === 'Enter') {
            const name = e.target.value
            sendQuery(`{getPokemon(str:"${name}"){name, image}}`).then(({getPokemon}) => {
                setSelected(getPokemon)
            })
        }
        debounceHandler(searchedText)()
    }

   return (
    <div>
            <h1>Pokemon Search</h1>
            <input type="text" value={searchedText} onChange={(e) => setSearchedText(e.target.value)} onKeyUp={(e) => handleInputChange(e)} style={{width:'100%'}} />
            <hr />
            <div>
                {selected ? <PokemonProfile selected={selected} /> : suggestions.map(({name}) => (
                    <ShowSuggestion name={name} searchedText={searchedText} setSelected={setSelected}/>
                )) }
            </div>
    </div>
    )
}

export default Search