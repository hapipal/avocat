# API

#### `rethrow(error, [options])`

Throws a `Boom` error according to the `Objection` error received.

 - `error` - the `Objection` error (any other types of errors are just ignored).
 - `options` - optional object where:
     - `return` - if `true` will return the error instead of throwing it.
     - `includeMessage` - if `true` the Boom error created will have its message set to the message of the error thrown.
