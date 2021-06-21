import { gql } from '@apollo/client';

const sendQuery = async (query) => {
  
    return fetch("/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        operationName: null,
        variables: {},
        query
      }),
    }).then(r => r.json()).then(r => r.data)
}

const debounce = (fn, time) => {
    let timeout;
    return () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn()
      }, time)
    }
}

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

const GET_POKEMON = gql`
    query getPokemon ($str: String!) {
        getPokemon(str: $str) {
            name
            image
        }
    }
`;

const SEARCH = gql `
query search($str: String!) {
    search(str:$str) {
      name
    } 
  }
`;

const LOGIN = gql `
query login($pokemon: String!) {
    login(pokemon: $pokemon) {
      name
      image
      lessons {
        title
      }
    }
  }
`

const GET_LESSONS = gql `
query lessons {
  lessons {
    title,
    rating
  } 
}`

const ENROLL = gql `
mutation enroll($title: String!) {
  enroll(title: $title) {
    name 
    image 
    lessons {
      title
      rating
    }
  }
}`

const UNENROLL = gql `
mutation unenroll($title: String!) {
  unenroll(title: $title) {
    name 
    image 
    lessons {
      title
      rating
    }
  }
}
`
const RATE = gql `mutation rate($title: String!, $rating: String!) {
  rate(title: $title, rating: $rating) {
    name 
    lessons {
      title
      rating
    }
  }
}
`

export { 
  sendQuery, 
  debounce,
  GET_USER,
  GET_POKEMON,
  LOGIN,
  SEARCH,
  GET_LESSONS,
  ENROLL,
  UNENROLL,
  RATE
}