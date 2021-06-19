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

export { sendQuery, debounce }