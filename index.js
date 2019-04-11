var assert = require('assert')

module.exports = function (reducer) {
  assert(typeof reducer === 'function', 'choo-shortcut: first parameter must be a function')

  var context = {}

  context.get = function () {
    return context._value
  }

  context.set = function (state, emitter) {
    context._value = reducer(state, emitter)

    emitter.on(state.events.RENDER, function () {
      context._value = reducer(state, emitter)
    })
  }

  return context
}
