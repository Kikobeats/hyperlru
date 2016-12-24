'use strict'

const should = require('should')
const createLRU = require('..')
const range = (n) => [...Array(n).keys()]

describe('hyperlru', function () {
  describe('constructor', function () {
    describe('options', function () {
      it('max', function () {
        const cache = createLRU({max: 2})
        range(3).forEach((n) => cache.set(`foo${n}`, `bar${n}`))
        should(cache.get('foo0')).be.undefined()
        should(cache.get('foo1')).be.equal('bar1')
        should(cache.get('foo2')).be.equal('bar2')
      })
    })
  })

  describe('.get', function () {
    it('not set value is undefined', function () {
      const cache = createLRU()
      should(cache.get('foo')).be.undefined()
    })
  })

  describe('.set', function () {
    it('set a value and retrieve it', function () {
      const cache = createLRU()
      cache.set('foo', 'bar')
      cache.get('foo').should.be.equal('bar')
    })
  })

  describe('.keys', function () {
    it('retrieve all the keys', function () {
      const cache = createLRU({max: 2})
      range(5).forEach((n) => cache.set(`foo${n}`, `bar${n}`))
      const keys = cache.keys()
      keys.length.should.be.eql(2)
      keys.should.be.eql(['foo3', 'foo4'])
    })
  })

  describe('.clear', function () {
    it('remove all the elements', function () {
      const cache = createLRU()
      cache.set('foo', 'bar')
      cache.clear()
      const keys = cache.keys()
      keys.should.be.eql([])
      keys.length.should.be.equal(0)
    })
  })
})
