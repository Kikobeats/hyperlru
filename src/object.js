'use strict'

const exists = value => value !== undefined

module.exports = () => {
  let store = Object.create(null)

  return {
    clear: () => {
      store = Object.create(null)
    },
    get: key => store[key],
    delete: key => {
      store[key] = undefined
    },
    set: (key, value) => {
      store[key] = value
    },
    hash: key => exists(store[key]),
    keys: () => Object.keys(store).reduce((acc, key) => {
      if (exists(store[key])) acc.push(key)
      return acc
    }, []),
    values: () => Object.keys(store).reduce((acc, key) => {
      const entry = store[key]
      if (exists(entry)) acc.push(entry.value)
      return acc
    }, [])
  }
}
