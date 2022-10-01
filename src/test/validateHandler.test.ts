import { expect } from 'chai';
import { validateHandler } from '..';

function checkShouldSuccess(val: unknown) {
    expect(validateHandler(val)).to.eq(undefined);
}

function checkShouldFail(val: unknown) {
    expect(() => validateHandler(val)).to.throw(TypeError, 'Invalid "handler". must be a function');
}

describe('[validateHandler]', () => {
    describe('Should success cases:', () => {
        it('Input value is function', () => {
            checkShouldSuccess(function () {
                // pass
            });
        });
        it('Input value is arrow function', () => {
            checkShouldSuccess(() => {
                // pass
            });
        });
        it('Input value is async function', () => {
            checkShouldSuccess(async function () {
                // pass
            });
        });
        it('Input value is async arrow function', () => {
            checkShouldSuccess(async () => {
                // pass
            });
        });
    });

    describe('Should fail cases:', () => {
        /**
         * Number
         */
        it('Input value is Number (0)', () => {
            checkShouldFail(0);
        });
        it('Input value is Number (NaN)', () => {
            checkShouldFail(NaN);
        });
        it('Input value is Number (Infinity)', () => {
            checkShouldFail(Infinity);
        });
        it('Input value is Number (-1)', () => {
            checkShouldFail(-1);
        });
        it('Input value is Number (1)', () => {
            checkShouldFail(1);
        });
        it('Input value is Number (0.1)', () => {
            checkShouldFail(0.1);
        });
        it('Input value is Number (-0.1)', () => {
            checkShouldFail(-0.1);
        });

        /**
         * null
         */
        it('Input value is null', () => {
            checkShouldFail(null);
        });

        /**
         * undefined
         */
        it('Input value is undefined', () => {
            checkShouldFail(undefined);
        });

        /**
         * object
         */
        it('Input value is object', () => {
            checkShouldFail({});
        });

        /**
         * boolean
         */
        it('Input value is true', () => {
            checkShouldFail(true);
        });
        it('Input value is false', () => {
            checkShouldFail(false);
        });

        /**
         * string
         */
        it('Input value is string ("")', () => {
            checkShouldFail('');
        });
        it('Input value is string ("1")', () => {
            checkShouldFail('1');
        });
        it('Input value is string ("10")', () => {
            checkShouldFail('10');
        });
        it('Input value is string ("a")', () => {
            checkShouldFail('a');
        });
    });
});
