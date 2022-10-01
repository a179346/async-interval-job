import { expect } from 'chai';
import { validateIntervalMs } from '..';

function checkShouldSuccess(val: unknown) {
    expect(validateIntervalMs(val)).to.eq(undefined);
}

function checkShouldFail(val: unknown) {
    expect(() => validateIntervalMs(val)).to.throw(
        TypeError,
        'Invalid "intervalMs". must be a positive integer'
    );
}

describe('[validateIntervalMs]', () => {
    describe('Should success cases:', () => {
        it('Input value is a positive integer (1)', () => {
            checkShouldSuccess(1);
        });
        it('Input value is a positive integer (10)', () => {
            checkShouldSuccess(10);
        });
        it('Input value is a positive integer (241295)', () => {
            checkShouldSuccess(241295);
        });
    });

    describe('Should fail cases:', () => {
        /**
         * Number
         */
        it('Input value is zero', () => {
            checkShouldFail(0);
        });
        it('Input value is NaN', () => {
            checkShouldFail(NaN);
        });
        it('Input value is Infinity', () => {
            checkShouldFail(Infinity);
        });
        it('Input value is negative integer (-1)', () => {
            checkShouldFail(-1);
        });
        it('Input value is negative integer (-10)', () => {
            checkShouldFail(-10);
        });
        it('Input value is negative integer (-235913)', () => {
            checkShouldFail(-235913);
        });
        it('Input value is decimal (0.1)', () => {
            checkShouldFail(0.1);
        });
        it('Input value is decimal (1.1)', () => {
            checkShouldFail(1.1);
        });
        it('Input value is decimal (10.1)', () => {
            checkShouldFail(10.1);
        });
        it('Input value is decimal (-0.1)', () => {
            checkShouldFail(-0.1);
        });
        it('Input value is decimal (-10.1)', () => {
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
});
