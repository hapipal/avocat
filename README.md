# Avocat

A library to convert Objection errors to Boom errors

[![Build Status](https://travis-ci.org/PixulHQ/avocat.svg?branch=master)](https://travis-ci.org/PixulHQ/avocat) [![Coverage Status](https://coveralls.io/repos/github/PixulHQ/avocat/badge.svg?branch=master)](https://coveralls.io/github/PixulHQ/avocat?branch=master) [![NSP Status](https://nodesecurity.io/orgs/pixulhq/projects/ed277a5f-854b-40f1-8935-e87a94d0f87f/badge)](https://nodesecurity.io/orgs/pixulhq/projects/ed277a5f-854b-40f1-8935-e87a94d0f87f)

Lead Maintainer: [Daniel Cole](https://github.com/optii)


## Usage

### `rethrow(error, [options])`

 Throws a `Boom` error according to the `Objection` error received

 - `error`: - the `Objection` error (any other types of errors are just ignored)
 - `options`: - optional object where:
     - `return`: - if `true` will return the error instead of throwing it
     - `includeMessage`: if `true` the Boom error created will have it's message set to the message of the error thrown


Heavily inspired by [Bounce](https://github.com/hapijs/bounce)