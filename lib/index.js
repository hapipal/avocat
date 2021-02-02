'use strict';

const {
    NotFoundError,
    ValidationError,
    NotNullViolationError,
    ConstraintViolationError,
    ForeignKeyViolationError,
    DataError,
    CheckViolationError,
    UniqueViolationError,
    DBError
} = require('objection');
const Boom = require('@hapi/boom');

const internals = {
    dbErrorMapping: new Map([
        [NotFoundError, 'notFound'],
        [ValidationError, 'badRequest'],
        [NotNullViolationError, 'badRequest'],
        [ConstraintViolationError, 'badRequest'],
        [ForeignKeyViolationError, 'badRequest'],
        [DataError, 'badRequest'],
        [CheckViolationError, 'badRequest'],
        [UniqueViolationError, 'conflict'],
        [DBError, 'internal']
    ])
};

exports.rethrow = (error, options = {}) => {

    const err = internals.match(error, { includeMessage: options.includeMessage || false });

    if (options.return || !err) {
        return err;
    }

    throw err;
};

internals.match = (error, options) => {

    if (!error || typeof error !== 'object') {
        return false;
    }

    const type = internals.dbErrorMapping.get(error.constructor);

    if (!type) {
        return false;
    }

    return Boom[type](options.includeMessage ? error.message : null);
};
