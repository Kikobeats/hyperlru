# hyperlru

![Last version](https://img.shields.io/github/tag/Kikobeats/hyperlru.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/hyperlru/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/hyperlru)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/hyperlru.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/hyperlru)
[![Dependency status](https://img.shields.io/david/Kikobeats/hyperlru.svg?style=flat-square)](https://david-dm.org/Kikobeats/hyperlru)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/hyperlru.svg?style=flat-square)](https://david-dm.org/Kikobeats/hyperlru#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/hyperlru.svg?style=flat-square)](https://www.npmjs.org/package/hyperlru)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Tiny & Fast LRU Implementation as possible.

## Features

* **Fast**: High performance (See [benchmark](#benchmark)).
* **Simple**: The whole project is ~60 lines of code.
* **Lightweight**: The package weighs less than a megabyte, with zero dependencies.

There are a lot of LRU implementations, but most of them have a poor perfomance and they are hard to understand.

**hyperlru** is an Abstract LRU implementation using traditional and efficienty data structures:

 - **Double Linked List**: It maintains the least recent list of items.
 - **Hash Table** It keeps the data for easily access to cache content.

For use it, you need to provide one of the created providers:

- [hyperlru-object](https://github.com/Kikobeats/hyperlru-object)
- [hyperlru-map](https://github.com/Kikobeats/hyperlru-map)

## Install

```bash
$ npm install hyperlru --save
```

## Usage

```js
const hyperlru = require('hyperlru')
const myProvider = require('my-hyperlru-provider')

const createLRU = hyperlru(myProvider)
const cache = createLRU({max: 1000})
```

## Benchmark

| name                                                | size    | gzip    | set      | get1      | update    | get2      | evict    |
|-----------------------------------------------------|---------|---------|----------|-----------|-----------|-----------|----------|
| [lru-cache](https://npm.im/lru-cache)               | 19.1 kB | 6.23 kB | 922 ops  | 3030 ops  | 2105 ops  | 4082 ops  | 917 ops  |
| [modern-lru](https://npm.im/modern-lru)             | 2.27 kB | 907 B   | 813 ops  | 1299 ops  | 752 ops   | 1515 ops  | 629 ops  |
| [mkc](https://npm.im/mkc)                           | 10.5 kB | 3.61 kB | 784 ops  | 766 ops   | 810 ops   | 1149 ops  | 697 ops  |
| [lru_cache](https://npm.im/lru_cache)               | 2.19 kB | 756 B   | 6452 ops | 18182 ops | 14286 ops | 9524 ops  | 3509 ops |
| [hashlru](https://npm.im/hashlru)                   | 628 B   | 332 B   | 5263 ops | 6897 ops  | 4545 ops  | 7407 ops  | 3922 ops |
| [tiny-lru](https://npm.im/tiny-lru)                 | 4 kB    | 1.64 kB | 3509 ops | 11765 ops | 15385 ops | 11765 ops | 2222 ops |
| [quick-lru](https://npm.im/quick-lru)               | 1.23 kB | 489 B   | 3279 ops | 2198 ops  | 3226 ops  | 2105 ops  | 2778 ops |
| [lru](https://npm.im/lru)                           | 6.07 kB | 1.86 kB | 2500 ops | 3846 ops  | 3175 ops  | 3226 ops  | 976 ops  |
| [hyperlru](https://npm.im/hyperlru)                 | 889 B   | 395 B   | 2299 ops | 25000 ops | 2410 ops  | 22222 ops | 2439 ops |
| [lru-fast](https://npm.im/lru-fast)                 | 2.34 kB | 793 B   | 1869 ops | 6897 ops  | 4167 ops  | 16667 ops | 3077 ops |
| [simple-lru-cache](https://npm.im/simple-lru-cache) | 1.43 kB | 565 B   | 1709 ops | 13333 ops | 5128 ops  | 22222 ops | 3922 ops |
| [secondary-cache](https://npm.im/secondary-cache)   | 22.6 kB | 6.54 kB | 1695 ops | 2632 ops  | 2667 ops  | 5556 ops  | 1408 ops |

## API

### hyperlru([options])

#### options

##### max

Type: `number`<br>
Default: `1000`

Max of element to keep into the cache.

### .set(key, value)

Set the value of the key and mark the key as most recently used.

It returns the `value`.

### .get(key)

Query the value of the key and mark the key as most recently used.

It returns the value of key if found; `undefined` otherwise.

### .peek(key)

Query the value of the key without marking the key as most recently used.

It returns the value of key if found; `undefined` otherwise.

### .keys()

It retrieves all the keys currently in the cache.

### .values()

It retrieves all the values currently in the cache.

### .clear()

Clear all the elements in the cache.

### .remove(key)

Remove the value from the cache.

Returns: value of key if found; `undefined` otherwise.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
