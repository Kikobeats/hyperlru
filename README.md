# hyperlru

[![Greenkeeper badge](https://badges.greenkeeper.io/Kikobeats/hyperlru.svg)](https://greenkeeper.io/)

![Last version](https://img.shields.io/github/tag/Kikobeats/hyperlru.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/hyperlru/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/hyperlru)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/hyperlru.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/hyperlru)
[![Dependency status](https://img.shields.io/david/Kikobeats/hyperlru.svg?style=flat-square)](https://david-dm.org/Kikobeats/hyperlru)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/hyperlru.svg?style=flat-square)](https://david-dm.org/Kikobeats/hyperlru#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/hyperlru.svg?style=flat-square)](https://www.npmjs.org/package/hyperlru)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Faster and simple LRU implementation.

## Introduction

The main goal of this project is provide a good implementation of LRU algorithm as simple as possible, but also fast.

The idea of this project was born from [bench-lru](https://github.com/dominictarr/bench-lru) and [dominictarr](https://github.com/dominictarr)'s implementation avoiding linked list (see [hashlru](https://github.com/dominictarr/hashlru)).

Meanwhile hashlru is faster in `get`/`set`, it fails providing a consistent `.keys` because avoid linked list implementation has limitations.

The main goal of this project is be consistent, simple and faster as possible.

Also it's inspired in [lru](https://github.com/chriso/lru), one of my favorite.

## Install

```bash
$ npm install hyperlru --save
```

## Usage

```js
const hyperlru = require('hyperlru')
const cache = hyperlru({max: 1000})
```

## Benchmark

| name      |  set  |  get1  |  update |  get2  |  evict | 
|-----------|-------|--------|---------|--------|--------| 
| hyperlru  |  2041 |  25000 |  2326   |  16667 |  2326  | 
| hashlru   |  7692 |  10000 |  6250   |  5556  |  4348  | 
| lru-cache |  405  |  1351  |  769    |  2439  |  385   | 
| lru       |  2273 |  4000  |  3704   |  4545  |  13    |

## API

### hyperlru([options])

#### options

##### max

Type: `number`<br>
Default: `1000`

Max of element to keep into the cache.

### .set
### .get
### .keys
### .clear

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
