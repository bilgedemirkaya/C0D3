const lib = require('./lib')

describe('split str into words and return an object', () => {
  it('Each word is a key with value 1.', () => {
    const result = lib.tokenize('hello world')
    expect(result).toEqual({ HELLO: 1, WORLD: 1 })
  })

  it('Key should be capitalized.', () => {
    const result = lib.tokenize('I like (Korean)')
    expect(result).toEqual({ 'LIKE': 1, '(KOREAN)': 1 })
  })

  it('should ignore numbers.', () => {
    const result = lib.tokenize('00012')
    expect(result).toEqual({})
  })

  it('should ignore str.length < 3', () => {
    const result = lib.tokenize('')
    expect(result).toEqual({})
  })
})

  describe('return an array of objects, each object has tokenized key and value', () => {
    it("	'beef boneless 100': 'MEAT' ", () => {
      const result = lib.makeTrainingData({
        'beef boneless 100': 'MEAT'
      })
      expect(result).toEqual([{
        input: {
          BEEF: 1,
          BONELESS: 1
        },
        output: {
          MEAT: 1
        }
    }])
    })
    it("can have two input ojects", () => {
      const result = lib.makeTrainingData({
        'beef boneless 100': 'MEAT',
        'pink apples': 'VEGGIE'
    })
    expect(result).toEqual([{
      input: {
        BEEF: 1,
        BONELESS: 1
      },
      output: {
        MEAT: 1
      }
    }, {
      input: {
        PINK: 1,
        APPLES: 1
      },
      output: {
        VEGGIE: 1
      }
    }])
  })
   
    it("gives empty array when object is empty", () => {
      const result = lib.makeTrainingData({})
      expect(result).toEqual([])
    })
})

describe('pushes an array onto every array in an object.', () => {
  it('if no array returns inside the object return empty', () => {
    let data = {}
    const result = lib.pushAll(data, [9, 8, 7])
    expect(result).toEqual({})
  })

  it('pushes the array into the object at the end', () => {
    data = { blah: [['hello']] }
    const result = lib.pushAll(data, [9, 8, 7])
    expect(result).toEqual({
      blah: [ ['hello'], [9, 8, 7] ]
    })
    
  })

  it('pushes the array into the object', () => {
    data = { blah: [] }
    const result = lib.pushAll(data, [9, 8, 7])
    expect(result).toEqual({
      blah: [ [9, 8, 7] ] })
  })

  it('if two keys, pushes arr into both array in object', () => {
    data = {
      blah: [['hello']],
      key2: []
    }
    const result = lib.pushAll(data, [9, 8, 7])
    expect(result).toEqual({
      blah: [ ['hello'], [9, 8, 7] ],
      key2: [[9, 8, 7]]
    })
  })
})

describe('getMostLikely', () => {
  it('should return null if {}', () => {
    const result = lib.getMostLikely({})
    expect(result).toEqual(null)
  })
  it('should return first key', () => {
    const result = lib.getMostLikely({
      meat: 0.987,
      veggie: 0.187,
      store: 0.287
    })
    expect(result).toEqual('meat')
  })
  it('should return last key', () => {
    const result = lib.getMostLikely({
      meat: 0.287,
      veggie: 0.187,
      store: 0.987
    })
    expect(result).toEqual('store')
  })
})