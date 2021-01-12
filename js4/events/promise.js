const delayBy = (time, verb) => {
    return new Promise( (resolve, reject) => {
        if (time < 50) {
            return reject('time too small')
          }
          setTimeout(() => {
            resolve(verb)
          }, time)
    })
  }
  
  delayBy(500, "study").then( (data) => {
    console.log(data) // logs "study" after 500ms
    return delayBy(440, "sleep")
  }).then( (data) => {
    console.log(data)  // logs "sleep" after 440ms
    return delayBy(40, "dance")
  }).then( (data) => {
    console.log(data)  // logs "dance" after 140ms
    return "eat"
  }).then( (data) => {
    console.log(data)  // "eat"
  })
  .catch((error) => {
      console.log(error)
  })
  
  // This whole file will take 1130ms to run
  // 500 + 440 + 140 = 1130