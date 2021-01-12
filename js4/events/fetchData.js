const fetch = require('node-fetch')

const fetchData = (url) => {
    /* return new Promise((resolve, reject) => {
        return resolve(fetch(url).then((data) => data.json()))
    }) */
    // because fetch and then already a promise you dont need to create another fetch here
    return fetch(url).then((data) => data.json())
}

fetchData('https://c0d3.com/api/lessons').then( (data) => {
  console.log(data) // data is the lesson array
})