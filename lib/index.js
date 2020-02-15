'use strict';

const { ValidationError, NotFoundError, DBError, ConstraintViolationError, UniqueViolationError, NotNullViolationError, ForeignKeyViolationError, CheckViolationError, DataError }    = require('objection');
const Boom = require('@hapi/boom');

const internals = {
    dbErrorMapping: {
        notFound: [
            NotFoundError
        ],
        badRequest: [
            ValidationError,
            NotNullViolationError,
            ConstraintViolationError,
            ForeignKeyViolationError,
            DataError,
            CheckViolationError
        ],
        conflict: [
            UniqueViolationError
        ],
        internal: [
            DBError
        ]
    }
};

exports.rethrow = (error, options = {}) => {

    return internals.catch(error, options);
};

internals.catch = (error, options) => {

    const err = internals.match(error, { includeMessage: options.includeMessage || false });

    if (options.return || !err) {
        return err;
    }

    throw err;
};

internals.match = (error, options) => {

    if (typeof error !== 'object') {
        return false;
    }

    for (const key in internals.dbErrorMapping) {

        for (let i = 0; i < internals.dbErrorMapping[key].length; ++i) {

            if (error instanceof internals.dbErrorMapping[key][i] && error.constructor.name === internals.dbErrorMapping[key][i].name) {

                return Boom[key](options.includeMessage ? error.message : null);
            }
        }
    }

    return false;
};
