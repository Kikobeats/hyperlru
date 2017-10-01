'use strict'

const exists = (value) => value != null

const DEFAULT = {
  max: 1000
}

function LRU (opts) {
  if (!(this instanceof LRU)) return new LRU(opts)

  opts = Object.assign({}, DEFAULT, opts)

  this.cache = {}
  this._cache = {}

  this.max = opts.max
  this.size = this.max
}

LRU.prototype.keys = function keys () {
  const cache = Object.keys(this.cache)
  const _cache = Object.keys(this._cache)
  return _cache.concat(cache)
}

LRU.prototype.clear = function clear () {
  this.cache = {}
  this._cache = {}
}

LRU.prototype.get = function get (key) {
  if (!this._hasKey(key)) return

  let value = this.cache[key]
  if (exists(value)) return value

  value = this._cache[key]
  if (value) this._update(key, value)

  return value
}

LRU.prototype.set = function set (key, value) {
  if (this.cache[key]) this.cache[key] = value
  else this._update(key, value)
}

LRU.prototype._hasKey = function _hasKey (key) {
  return this.cache.hasOwnProperty(key) || this._cache.hasOwnProperty(key)
}

LRU.prototype._update = function _update (key, value) {
  --this.size

  if (this.size) {
    this.size = this.max
    this._cache = this.cache
    this.cache = {}
  }

  this.cache[key] = value
}

module.exports = LRU
