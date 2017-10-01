'use strict'

const exists = (value) => value != null

const DEFAULT = {
  max: 1000
}

module.exports = function LRU (opts) {
  if (!(this instanceof LRU)) return new LRU(opts)
  opts = Object.assign({}, DEFAULT, opts)

  let cache = {}
  let _cache = {}

  const max = opts.max
  let size = max

  const keys = () => Object.keys(_cache).concat(Object.keys(cache))

  const clear = () => {
    cache = {}
    _cache = {}
  }

  const get = key => {
    if (!hasKey(key)) return

    let value = cache[key]
    if (exists(value)) return value

    value = _cache[key]
    if (value) update(key, value)

    return value
  }

  const set = (key, value) => {
    if (cache[key]) cache[key] = value
    else update(key, value)
  }

  const hasKey = key => (
    cache.hasOwnProperty(key) || _cache.hasOwnProperty(key)
  )

  const update = (key, value) => {
    --size

    if (size) {
      size = max
      _cache = cache
      cache = {}
    }

    cache[key] = value
  }

  return { clear, get, set, keys }
}
