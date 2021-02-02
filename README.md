# avocat

A utility to convert [Objection](https://vincit.github.io/objection.js/) database errors into [Boom](https://hapi.dev/module/boom/) HTTP errors

[![Build Status](https://travis-ci.com/hapipal/avocat.svg?branch=master)](https://travis-ci.com/hapipal/avocat) [![Coverage Status](https://coveralls.io/repos/github/hapipal/avocat/badge.svg?branch=master)](https://coveralls.io/github/hapipal/avocat?branch=master)

Lead Maintainer: [Daniel Cole](https://github.com/optii)

## Installation
```sh
npm install @hapipal/avocat
```

## Usage
> See also the [API Reference](API.md)
>
> Avocat is intended for use with hapi v19+, nodejs v12+, and Objection v2 (_see v1 for lower support_).

Avocat provides a single utility function [`Avocat.rethrow(error, [options])`](API.md#avocatrethrowerror-options) which transforms database errors from Objection into Boom HTTP errors that are compatible with hapi.

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

## Extras
The interface for Avocat is heavily inspired by [Bounce](https://hapi.dev/module/bounce/).
