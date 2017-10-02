'use strict'

const LinkedList = require('linked-list')
const exists = value => value !== undefined

const hyperlru = createStore => {
  if (!createStore) {
    return new TypeError('You need to specify an store implementation')
  }

  return ({max}) => {
    let dict = createStore()
    let list = new LinkedList()
    let size = 0

    const _get = ({isPeek}) => key => {
      const entry = dict.get(key)
      if (!exists(entry)) return
      if (isPeek) markEntryAsUsed(entry)
      return entry.value
    }

    function markEntryAsUsed (entry) {
      list.append(entry.detach())
    }

    function set (key, value) {
      const entry = dict.get(key)

      if (exists(entry)) {
        entry.value = value
        markEntryAsUsed(entry)
      } else {
        if (++size > max) dict.delete(list.head.detach().key)
        const item = Object.assign(new LinkedList.Item(), {key, value})
        list.append(item)
        dict.set(key, item)
      }

      return value
    }

    function clear () {
      dict = createStore()
      list = new LinkedList()
      size = 0
    }

    function remove (key) {
      const entry = dict.get(key)
      if (!exists(entry)) return
      dict.delete(entry.detach().key)
      --size
    }

    const keys = () => dict.keys()
    const has = key => dict.has(key)
    const get = _get({isPeek: true})
    const peek = _get({isPeek: false})
    const values = () => dict.values()

    return {set, keys, get, clear, remove, has, peek, size, values}
  }
}

module.exports = hyperlru
