var test = require('tape')
var nanobus = require('nanobus')
var createShortcut = require('.')

test('reducer function required', function (t) {
  t.plan(2)

  t.throws(createShortcut, 'throws without arguments')
  t.throws(createShortcut.bind(undefined, 5), 'throws if not function')
})

test('returns an object with get + set', function (t) {
  t.plan(3)

  var shortcut = createShortcut(reducer)

  t.equal(typeof shortcut, 'object', 'is an object')
  t.equal(typeof shortcut.get, 'function', 'has a get function')
  t.equal(typeof shortcut.set, 'function', 'has a set function')
})

test('set works', function (t) {
  t.plan(2)

  var shortcut = createShortcut(reducer)

  t.equal(shortcut._value, undefined, 'is undefined initially')
  shortcut.set(state, emitter)
  t.equal(shortcut._value, 5, 'has value after call')
})

test('get works', function (t) {
  t.plan(1)

  var shortcut = createShortcut(reducer)
  shortcut._value = state.flowers

  t.equal(shortcut.get(), 5, 'returns _value')
})

test('updates on render', function (t) {
  t.plan(2)

  var shortcut = createShortcut(reducer)
  shortcut.set(state, emitter)

  t.equal(shortcut.get(), 5, 'it is 5 before')

  state.flowers = 10
  emitter.emit(state.events.RENDER)
  t.equal(shortcut.get(), 10, 'it is 6 afeter')

  state.flowers = 5
})

var state = {
  flowers: 5,
  trees: 2,

  events: {
    RENDER: 'render'
  }
}

var emitter = nanobus()

function reducer (state) {
  return state.flowers
}
