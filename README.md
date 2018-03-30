# Avocat

A library to convert Objection errors to Boom errors

***THIS IS A WORK IN PROGRESSS***


## Usage

### `rethrow(error, [options])`

 Throws a `Boom` error according to the `Objection` error received

 - `error`: - the `Objection` error (any other types of errors are just ignored)
 - `options`: - optional object where:
     - `return`: - if `true` will return the error instead of throwing it


Heavily inspired by [Bounce](https://github.com/hapijs/bounce)