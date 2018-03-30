'use strict';

const DbErrors  = require('db-errors');
const Objection = require('objection');
const Boom      = require('boom');

const internals = {
    dbErrorMapping : {
        badRequest : [
            'NotNullViolationError',
            'ConstraintViolationError',
            'ForeignKeyViolationError',
            'DataError',
            'CheckViolationError'
        ],
        conflict   : [
            'UniqueViolationError'
        ],
        internal   : [
            'DBError'
        ]
    }
};

exports.rethrow = (error, options = {}) => {

    return internals.catch(error, options);
};

internals.catch = (error, options) => {

    const err = internals.match(error);

    if (options.return || !err) {
        return err;
    }

    throw err;
};

internals.match = (error) => {

    if (typeof error !== 'object') {
        return false;
    }

    if (error instanceof Objection.ValidationError) {

        return Boom.badRequest(error.message);
    }

    if (error instanceof Objection.NotFoundError) {

        return Boom.notFound(error.message);
    }

    error = DbErrors.wrapError(error);

    for (const key in internals.dbErrorMapping) {

        for (let i = 0 ; i < internals.dbErrorMapping[key].length ; ++i) {
            if (error instanceof DbErrors[internals.dbErrorMapping[key][i]]) {

                return Boom[key]();
            }
        }
    }

    return false;
};
