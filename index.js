'use strict'

const exists = value => value !== undefined

const DEFAULT = {
  max: 1000
}

module.exports = function LRU (opts) {
  opts = Object.assign(Object.create(null), DEFAULT, opts)
  const {max} = opts
  let size = max
  let cache = Object.create(null)
  let _cache = Object.create(null)

  function update (key, value) {
    --size
    if (size) {
      size = max
      _cache = cache
      cache = Object.create(null)
    }
    cache[key] = value
  }

  function clear () {
    cache = Object.create(null)
    _cache = Object.create(null)
  }

  function keys () {
    return Object.keys(_cache).concat(Object.keys(cache))
  }

  function get (key) {
    if (!has(key)) return

    let value = cache[key]
    if (exists(value)) return value

    value = _cache[key]
    if (value) update(key, value)

    return value
  }

  function set (key, value) {
    if (exists(cache[key])) cache[key] = value
    else update(key, value)
    return value
  }

  function has (key) {
    return exists(cache[key]) || exists(_cache[key])
  }

  return {get, set, has, keys, clear}
}
