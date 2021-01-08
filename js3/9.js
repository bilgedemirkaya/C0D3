const fs = require('fs')
const axios = require('axios')

axios('https://pokeapi.co/api/v2/pokemon/')
    .then((res) => {
        const result = res.data.results
        return Promise.all(result.map((pokemon) => axios(pokemon.url)))
    })
    .then((pokemons) => {
        return pokemons.reduce((acc, pokemon) => {
          return `${acc}<div><img src="${pokemon.data.sprites.front_default}"><h1>${pokemon.data.name}</h1></div>`
        }, "")
    })
    .then((pokeHtml) => {
        fs.writeFile("./9.html", pokeHtml, () => {})
    })
    
