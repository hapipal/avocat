'use strict';

const DbErrors  = require('db-errors');
const Objection = require('objection');
const Boom      = require('@hapi/boom');

const internals = {
    dbErrorMapping : {
        badRequest : [
            DbErrors.NotNullViolationError,
            DbErrors.ConstraintViolationError,
            DbErrors.ForeignKeyViolationError,
            DbErrors.DataError,
            DbErrors.CheckViolationError
        ],
        conflict   : [
            DbErrors.UniqueViolationError
        ],
        internal   : [
            DbErrors.DBError
        ]
    }
};

exports.rethrow = (error, options = {}) => {

    return internals.catch(error, options);
};

internals.catch = (error, options) => {

    const err = internals.match(error, { includeMessage : options.includeMessage || false });

    if (options.return || !err) {
        return err;
    }

    throw err;
};

internals.match = (error, options) => {

    if (typeof error !== 'object') {
        return false;
    }

    if (error instanceof Objection.ValidationError) {

        return Boom.badRequest(options.includeMessage ? error.message : null);
    }

    if (error instanceof Objection.NotFoundError) {

        return Boom.notFound(options.includeMessage ? error.message : null);
    }

    error = DbErrors.wrapError(error);

    for (const key in internals.dbErrorMapping) {

        for (let i = 0; i < internals.dbErrorMapping[key].length; ++i) {
            if (error.constructor.name === internals.dbErrorMapping[key][i].name) {

                return Boom[key](options.includeMessage ? error.message : null);
            }
        }
    }

    return false;
};
