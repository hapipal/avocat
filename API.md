# API

A utility to convert [Objection](https://vincit.github.io/objection.js/) database errors into [Boom](https://hapi.dev/module/boom/) HTTP errors

> **Note**
>
> Avocat is intended for use with hapi v19+, nodejs v12+, and Objection v2 (_see v1 for lower support_).

## `Avocat`
### `Avocat.rethrow(error, [options])`
Throws a Boom error according to the Objection error received.

 - `error` - the Objection error (any other types of errors are just ignored).
 - `options` - optional object where:
     - `return` - if `true` will return the error instead of throwing it.
     - `includeMessage` - if `true` the Boom error created will preserve the Objection error message.

#### Error mappings

These are the error mappings maintained by Avocat:

 - `NotFoundError` → 404 Not Found
 - `ValidationError` → 400 Bad Request
 - `NotNullViolationError` → 400 Bad Request
 - `ConstraintViolationError` → 400 Bad Request
 - `ForeignKeyViolationError` → 400 Bad Request
 - `DataError` → 400 Bad Request
 - `CheckViolationError` → 400 Bad Request
 - `UniqueViolationError` → 409 Conflict
 - `DBError` → 500 Internal Server Error

### Example

```js
'use strict';

const Hapi = require('@hapi/hapi');
const Avocat = require('@hapipal/avocat');
const User = require('./user-model'); // An Objection model bound to a knex instance

const server = Hapi.server();

server.route({
    method: 'get',
    path: '/users/{id}',
    handler(request) {

        try {
            return await User.query()
                .findById(request.params.id)
                .throwIfNotFound();
        }
        catch (err) {
            Avocat.rethrow(err); // Throws a 404 Not Found if user does not exist
            throw err;
        }
    }
});
```
