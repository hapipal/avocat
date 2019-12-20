'use strict';

const Code = require('@hapi/code');
const Lab  = require('@hapi/lab');

const lab              = exports.lab = Lab.script();
const { describe, it } = lab;
const { expect }       = Code;

const { ValidationError, NotFoundError, UniqueViolationError, DBError, CheckViolationError, DataError, ForeignKeyViolationError, ConstraintViolationError, NotNullViolationError } = require('objection');

const Avocat = require('../lib');

describe('Avocat', () => {

    describe('rethrow', () => {

        it('should return false if not an error', () => {

            expect(Avocat.rethrow('notanerror', { return : true })).to.equal(false);
            expect(Avocat.rethrow('notanerror')).to.equal(false);
        });

        it('should ignore non objection errors', () => {

            expect(() => {

                Avocat.rethrow(new Error());
            }).to.not.throw();

            expect(Avocat.rethrow(new Error(), { return : true })).to.equal(false);
        });

        it('should throw the error', () => {

            expect(() => {

                Avocat.rethrow(new DBError());
            }).to.throw();
        });

        it('should include error message', () => {

            try {
                Avocat.rethrow(new DBError({
                    nativeError : {
                        message : 'some native error message'
                    }
                }), { includeMessage : true });
            }
            catch (error) {

                expect(error.message).to.equal('some native error message');
            }

        });

        describe('Objection NotFoundError', () => {

            it('should throw notFound', () => {

                try {
                    Avocat.rethrow(new NotFoundError());
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Not Found');
                    expect(error.output.statusCode).to.equal(404);
                }
            });

            it('should return notFound', () => {

                const error = Avocat.rethrow(new NotFoundError(), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Not Found');
                expect(error.output.statusCode).to.equal(404);
            });

            it('should include message', () => {

                expect(Avocat.rethrow(new NotFoundError(), { return : true, includeMessage : true }).message).to.equal('NotFoundError');

                try {
                    Avocat.rethrow(new NotFoundError(), { return : true, includeMessage : true });
                }
                catch (error) {
                    expect(error.message).to.equal('NotFoundError');
                }

            });
        });

        describe('Objection ValidationError', () => {

            it('should throw badRequest', () => {

                try {
                    Avocat.rethrow(new ValidationError({
                        message : 'validation error',
                        type    : 'ModelValidation',
                        data    : 'some random data'
                    }));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Bad Request');
                    expect(error.output.statusCode).to.equal(400);
                }
            });

            it('should return badRequest', () => {

                const error = Avocat.rethrow(new ValidationError({
                    message : 'validation error',
                    type    : 'ModelValidation',
                    data    : 'some random data'
                }), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Bad Request');
                expect(error.output.statusCode).to.equal(400);

            });

            it('should include message', () => {

                expect(Avocat.rethrow(new ValidationError({
                    message : 'validation error',
                    type    : 'ModelValidation',
                    data    : 'some random data'
                }), { return : true, includeMessage : true }).message).to.equal('validation error');

                try {
                    Avocat.rethrow(new ValidationError({
                        message : 'validation error',
                        type    : 'ModelValidation',
                        data    : 'some random data'
                    }), { return : true, includeMessage : true });
                }
                catch (error) {
                    expect(error.message).to.equal('validation error');
                }

            });
        });

        describe('NotNullViolationError', () => {

            it('should throw badRequest', () => {

                try {

                    Avocat.rethrow(new NotNullViolationError(
                        {
                            table       : 'table',
                            constraint  : 'some_constraint',
                            nativeError : 'NATIVE ERROR',
                            client      : 'CLIENT'
                        }
                    ));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Bad Request');
                    expect(error.output.statusCode).to.equal(400);
                }
            });

            it('should return badRequest', () => {

                const error = Avocat.rethrow(new NotNullViolationError(
                    {
                        table       : 'table',
                        constraint  : 'some_constraint',
                        nativeError : 'NATIVE ERROR',
                        client      : 'CLIENT'
                    }
                ), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Bad Request');
                expect(error.output.statusCode).to.equal(400);

            });
        });

        describe('ConstraintViolationError', () => {

            it('should throw badRequest', () => {

                try {

                    Avocat.rethrow(new ConstraintViolationError(
                        {
                            table       : 'table',
                            constraint  : 'some_constraint',
                            nativeError : 'NATIVE ERROR',
                            client      : 'CLIENT'
                        }
                    ));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Bad Request');
                    expect(error.output.statusCode).to.equal(400);
                }
            });

            it('should return badRequest', () => {

                const error = Avocat.rethrow(new ConstraintViolationError(
                    {
                        table       : 'table',
                        constraint  : 'some_constraint',
                        nativeError : 'NATIVE ERROR',
                        client      : 'CLIENT'
                    }
                ), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Bad Request');
                expect(error.output.statusCode).to.equal(400);
            });
        });

        describe('ForeignKeyViolationError', () => {

            it('should throw badRequest', () => {

                try {

                    Avocat.rethrow(new ForeignKeyViolationError(
                        {
                            table       : 'table',
                            constraint  : 'some_constraint',
                            nativeError : 'NATIVE ERROR',
                            client      : 'CLIENT'
                        }
                    ));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Bad Request');
                    expect(error.output.statusCode).to.equal(400);
                }
            });

            it('should return badRequest', () => {

                const error = Avocat.rethrow(new ForeignKeyViolationError(
                    {
                        table       : 'table',
                        constraint  : 'some_constraint',
                        nativeError : 'NATIVE ERROR',
                        client      : 'CLIENT'
                    }
                ), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Bad Request');
                expect(error.output.statusCode).to.equal(400);

            });

        });

        describe('DataError', () => {

            it('should throw badRequest', () => {

                try {

                    Avocat.rethrow(new DataError(
                        {
                            nativeError : 'NATIVE ERROR',
                            client      : 'CLIENT'
                        }
                    ));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Bad Request');
                    expect(error.output.statusCode).to.equal(400);
                }
            });

            it('should return badRequest', () => {

                const error = Avocat.rethrow(new DataError(
                    {
                        nativeError : 'NATIVE ERROR',
                        client      : 'CLIENT'
                    }
                ), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Bad Request');
                expect(error.output.statusCode).to.equal(400);

            });
        });

        describe('CheckViolationError', () => {

            it('should throw badRequest', () => {

                try {
                    Avocat.rethrow(new CheckViolationError(
                        {
                            table       : 'table',
                            constraint  : 'some_constraint',
                            nativeError : 'NATIVE ERROR',
                            client      : 'CLIENT'
                        }
                    ));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Bad Request');
                    expect(error.output.statusCode).to.equal(400);
                }
            });

            it('should return badRequest', () => {

                const error = Avocat.rethrow(new CheckViolationError(
                    {
                        table       : 'table',
                        constraint  : 'some_constraint',
                        nativeError : 'NATIVE ERROR',
                        client      : 'CLIENT'
                    }
                ), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Bad Request');
                expect(error.output.statusCode).to.equal(400);

            });
        });

        describe('UniqueViolationError', () => {

            it('should throw conflict', () => {

                try {
                    Avocat.rethrow(new UniqueViolationError({
                        table       : 'table',
                        columns     : 'test',
                        constraint  : 'some_constraint',
                        nativeError : 'NATIVE ERROR',
                        client      : 'CLIENT'
                    }));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Conflict');
                    expect(error.output.statusCode).to.equal(409);
                }
            });

            it('should return conflict', () => {

                const error = Avocat.rethrow(new UniqueViolationError({
                    table       : 'table',
                    columns     : 'test',
                    constraint  : 'some_constraint',
                    nativeError : 'NATIVE ERROR',
                    client      : 'CLIENT'
                }), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.statusCode).to.equal(409);
            });
        });

        describe('DBError', () => {

            it('should throw internal', () => {

                try {
                    Avocat.rethrow(new DBError(
                        {
                            nativeError : 'NATIVE ERROR',
                            client      : 'CLIENT'
                        }
                    ));
                }
                catch (error) {

                    expect(error.isBoom).to.equal(true);
                    expect(error.output.payload.error).to.equal('Internal Server Error');
                    expect(error.output.statusCode).to.equal(500);
                }

            });

            it('should return internal', () => {

                const error = Avocat.rethrow(new DBError(
                    {
                        nativeError : 'NATIVE ERROR',
                        client      : 'CLIENT'
                    }
                ), { return : true });

                expect(error.isBoom).to.equal(true);
                expect(error.output.payload.error).to.equal('Internal Server Error');
                expect(error.output.statusCode).to.equal(500);
            });
        });

    });
})
;
