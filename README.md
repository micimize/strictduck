# StrictDuck

StrictDuck is a retroactive inheritance system for javascript. It aims to solve the problem of runtime object opacity and identity to allow for higher level abstractions, such as the "self aware" component [composition](strictduck/control-inverted/blob/master/src/composit.js) in [strictduck-control-inverted](https://github.com/strictduck/control-inverted).

## Overview
### StrictDuck
The `default` export is the [`StrictDuck`](strictduck/strictduck/blob/master/src/strictduck.js#L15-L30) class, which all StrictDucks inherit from.
`StrictDuck` does the following:   
  \* assigns the first argument to the new instance   
  \* levearges [duckface](openraffler/duckface.js) to ensure the new instance [implements](strictduck/strictduck/blob/master/src/strictduck.js#L4-L9) the interfaces specified in the rest of the arguments  
  \* assigns the object the key `{ [Symbol('strictduck.id')] : Symbol(strictDuckClassName) }`, giving us a more dependable way to identify object inheritance  

Another key export is [`extend`](strictduck/strictduck/blob/master/src/strictduck.js#L34-L48), which is used for tersly specifying StrictDucks, such as the [`Main`](strictduck/strictduck/blob/master/src/strictduck.js#L50) export:
```javascript
export const Main = extend({ name: 'Main', methods: ['main'] })
```

#### identity and equality helpers
exports  [`id`, `equals`, and, `is`](strictduck/strictduck/blob/master/src/utils.js#L4-L14) are used for identifying strictducks (every StrictDuck class has `id` as a key) and comparing them.
```javascript
import {Main, equals, is}
let instance = new Main(mainObj)
equals(instance.prototype, Main) == true
is({instance, Class: Main}) == true
```

#### implement and implementable

The [`implement`](strictduck/strictduck/blob/master/src/implement.js) export is used for specifying the implementation of a strictduck class, such as [strictduck-domain-driven-fullstack/Domain#implementation](strictduck/domain-driven-fullstack/blob/master/src/Domain.js#L46).

The [`implementable`](strictduck/strictduck/blob/master/src/implementable.js) export is a small function for creating overridable default options. An example usage looks like [strictduck-domain-driven-fullstack/client](strictduck/domain-driven-fullstack/blob/master/src/client.js#L15-L32).

I consider both `implement` and `implementable` clunky and possibly unnecessary, and hope to remove them eventually.


