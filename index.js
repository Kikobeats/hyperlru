'use strict'

const LinkedList = require('linked-list')
const exists = value => value !== undefined

function hyperlru ({max}) {
  let dict = Object.create(null)
  let list = new LinkedList()
  let size = 0

  const _get = ({isPeek}) => (key) => {
    const entry = dict[key]
    if (!exists(entry)) return
    if (isPeek) markEntryAsUsed(entry)
    return entry.value
  }

  function markEntryAsUsed (entry) {
    if (list.tail.key !== entry.key) list.append(entry.detach())
  }

  function set (key, value) {
    const entry = dict[key]

    if (exists(entry)) {
      entry.value = value
      markEntryAsUsed(entry)
      return value
    }

    if (++size > max) {
      const last = list.head.detach().key
      dict[last] = undefined
    }
    const item = Object.assign(new LinkedList.Item(), {key, value})
    list.append(item)
    dict[key] = item
  }

  function clear () {
    dict = Object.create(null)
    list = new LinkedList()
    size = 0
  }

  function remove (key) {
    const entry = dict[key]
    if (!exists(entry)) return
    dict[entry.detach().key] = undefined
    --size
  }

  const keys = () => Object.keys(dict).reduce((acc, key) => {
    if (exists(dict[key])) acc.push(key)
    return acc
  }, [])

  const values = () => Object.keys(dict).reduce((acc, key) => {
    const entry = dict[key]
    if (exists(entry)) acc.push(entry.value)
    return acc
  }, [])

  const has = key => exists(dict[key])
  const get = _get({isPeek: true})
  const peek = _get({isPeek: false})

  return {set, keys, get, clear, remove, has, peek, size, values}
}

module.exports = hyperlru
