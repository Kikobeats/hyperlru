'use strict'

const should = require('should')
const range = n => [...Array(n).keys()]
const hyperlru = require('..')

module.exports = (createStore) => {
  const createLRU = hyperlru(createStore)

  describe('constructor', function () {
    describe('options', function () {
      it('max', function () {
        const cache = createLRU({max: 3})
        range(4).forEach((n) => cache.set(`foo${n}`, `bar${n}`))
        should(cache.keys()).be.eql(['foo1', 'foo2', 'foo3'])
      })
    })
  })

  describe('.get', function () {
    it('not previous set value is undefined', function () {
      const cache = createLRU({max: 3})
      should(cache.get('foo')).be.undefined()
    })
    it('return previous declared value', function () {
      const cache = createLRU({max: 3})
      cache.set('foo', 'bar')
      should(cache.get('foo')).be.equal('bar')
    })
  })

  describe('.set', function () {
    it('set a value and retrieve it', function () {
      const cache = createLRU({max: 3})
      should(cache.set('foo', 'bar')).be.equal('bar')
    })
  })

  describe('.keys', function () {
    it('retrieve all the keys', function () {
      const cache = createLRU({max: 2})
      range(5).forEach((n) => cache.set(`foo${n}`, `bar${n}`))
      should(cache.keys()).be.eql(['foo3', 'foo4'])
    })
  })

  describe('.clear', function () {
    it('remove all the elements', function () {
      const cache = createLRU({max: 2})
      cache.set('foo', 'bar')
      cache.clear()
      should(cache.keys().length).be.equal(0)
    })
  })

  describe('.remove', function () {
    it('remove one time', function () {
      const cache = createLRU({max: 2})
      range(5).forEach((n) => cache.set(`foo${n}`, `bar${n}`))
      cache.remove('foo4')
      should(cache.keys()).be.eql(['foo3'])
    })
  })

  describe('.has', function () {
    it('a key that was added previously', function () {
      const cache = createLRU({max: 2})
      cache.set('foo', 'bar')
      should(cache.has('foo')).be.true()
    })
  })

  describe('.values', function () {
    it('get all values present in the cache', function () {
      const cache = createLRU({max: 2})
      cache.set('foo', 'bar')
      should(cache.values()).be.eql(['bar'])
    })
  })
}
