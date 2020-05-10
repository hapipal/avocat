# avocat

A library to convert Objection errors to Boom errors

[![Build Status](https://travis-ci.org/hapipal/avocat.svg?branch=master)](https://travis-ci.org/hapipal/avocat) [![Coverage Status](https://coveralls.io/repos/github/hapipal/avocat/badge.svg?branch=master)](https://coveralls.io/github/hapipal/avocat?branch=master)

Lead Maintainer: [Daniel Cole](https://github.com/optii)


## Usage

### `rethrow(error, [options])`

 Throws a `Boom` error according to the `Objection` error received

 - `error`: - the `Objection` error (any other types of errors are just ignored)
 - `options`: - optional object where:
     - `return`: - if `true` will return the error instead of throwing it
     - `includeMessage`: if `true` the Boom error created will have it's message set to the message of the error thrown


Heavily inspired by [Bounce](https://github.com/hapijs/bounce)
