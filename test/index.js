'use strict';

const Code = require('code');
const Lab  = require('lab');

const lab = exports.lab = Lab.script();
const { describe, it } = lab;
const { expect }                      = Code;

const Avocat = require('../lib');

describe('Avocat', () => {

    describe('rethrow', () => {

        it('should return the error', () => {});
        it('should throw the error', () => {});

        it('should ignore non objection errors', () => {

            expect(() => {

                Avocat.rethrow(new Error());
            }).to.not.throw();

            expect(Avocat.rethrow(new Error(), { return: true })).to.equal(false);
        });

        it('should throw notFound', () => {});
        it('should throw badRequest', () => {});
        it('should throw conflict', () => {});
        it('should throw internal', () => {});
    });
});
