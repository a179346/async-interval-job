import { expect } from 'chai';
import { validateOptions } from '..';

function checkShouldSuccess(val: unknown) {
    expect(validateOptions(val)).to.eq(undefined);
}

describe('[validateOptions]', () => {
    describe('Should success cases:', () => {
        describe('Root:', () => {
            it('Input value is undefined', () => {
                checkShouldSuccess(undefined);
            });
            it('Input value is {}', () => {
                checkShouldSuccess({});
            });
        });

        describe('runImmediately:', () => {
            it('Input value.runImmediately is true', () => {
                checkShouldSuccess({
                    runImmediately: true,
                });
            });
            it('Input value.runImmediately is false', () => {
                checkShouldSuccess({
                    runImmediately: false,
                });
            });
            it('Input value.runImmediately is undefined', () => {
                checkShouldSuccess({
                    runImmediately: undefined,
                });
            });
        });

        describe('runImmediately:', () => {
            it('Input value.stopOnError is true', () => {
                checkShouldSuccess({
                    stopOnError: true,
                });
            });
            it('Input value.stopOnError is false', () => {
                checkShouldSuccess({
                    stopOnError: false,
                });
            });
            it('Input value.stopOnError is undefined', () => {
                checkShouldSuccess({
                    stopOnError: undefined,
                });
            });
        });
    });

    describe('Should fail cases:', () => {
        describe('Root', () => {
            function checkShouldFail(val: unknown) {
                expect(() => validateOptions(val)).to.throw(
                    TypeError,
                    'Invalid "options". must be an object'
                );
            }

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
             * function
             */
            it('Input value is function', () => {
                checkShouldFail(() => {
                    // pass
                });
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

        describe('runImmediately', () => {
            function checkShouldFail(val: unknown) {
                expect(() => validateOptions({ runImmediately: val })).to.throw(
                    TypeError,
                    'Invalid "options.runImmediately". must be a boolean'
                );
            }

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
             * object
             */
            it('Input value is object', () => {
                checkShouldFail({});
            });

            /**
             * function
             */
            it('Input value is function', () => {
                checkShouldFail(() => {
                    // pass
                });
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
            it('Input value is string ("true")', () => {
                checkShouldFail('true');
            });
        });

        describe('stopOnError', () => {
            function checkShouldFail(val: unknown) {
                expect(() => validateOptions({ stopOnError: val })).to.throw(
                    TypeError,
                    'Invalid "options.stopOnError". must be a boolean'
                );
            }

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
             * object
             */
            it('Input value is object', () => {
                checkShouldFail({});
            });

            /**
             * function
             */
            it('Input value is function', () => {
                checkShouldFail(() => {
                    // pass
                });
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
            it('Input value is string ("true")', () => {
                checkShouldFail('true');
            });
        });
    });
});
