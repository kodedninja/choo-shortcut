# choo-shortcut
Shortcut access to parts of the `state` anywhere in your app.

Useful to simulate "contexts", avoid passing down the `state` to hell. It's again a ridiculous little function.

## Installation
```
npm i choo-shortcut
```

## Example
```javascript
// flowers-context.js
var createShortcut = require('choo-shortcut')

var shortcut = createShortcut(function (state, emitter) {
  return state.flowers
})

module.exports = shortcut.set
module.exports.getFlowers = shortcut.get
```

In your main file:

```javascript
app.use(require('./flowers-context'))
```

Then anywhere in your app

```javascript
var { getFlowers } = require('../flowers-context')

getFlowers()
// state.flowers that has been set somewhere
```

## API
### `shortcut = createShortcut(reducer(state, emitter))`
Creates a new shortcut (context store). `reducer` is a function which "reduces" the state to the part that should be stored. It gets the typical `state` and `emitter` of a Choo store.

### `shortcut.set(state, emitter)`
The store that should be passed to `app.use`.

### `shortcut.get()`
Returns the current value that's stored.
