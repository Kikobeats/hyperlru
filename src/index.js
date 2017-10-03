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
    let size = max

    const _get = ({isPeek}) => key => {
      const entry = dict.get(key)
      if (!exists(entry)) return
      if (isPeek) list.append(entry)
      return entry.value
    }

    function set (key, value) {
      let entry = dict.get(key)

      if (exists(entry)) {
        entry.value = value
        list.append(entry)
      } else {
        entry = Object.assign(new LinkedList.Item(), {key, value})
        dict.set(key, entry)
        !size ? dict.delete(list.head.detach().key) : --size
        list.append(entry)
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

    return {set, keys, get, clear, remove, has, peek, values}
  }
}

module.exports = hyperlru
