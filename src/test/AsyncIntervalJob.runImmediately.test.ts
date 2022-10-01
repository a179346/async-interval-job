import { AsyncIntervalJobTest } from './utils';

describe('[AsyncIntervalJob - runImmediately]', () => {
    it('runImmediately test', () => {
        const test = new AsyncIntervalJobTest(10, 5, {
            runImmediately: true,
        });

        test.checkAt(10, {
            startHandleTime: 0,
            endHandleTime: 0,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        test.startAt(15);

        // should start handling @ 15

        test.checkAt(18, {
            startHandleTime: 1,
            endHandleTime: 0,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        // should end handling @ 25

        test.checkAt(28, {
            startHandleTime: 1,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 30

        test.checkAt(33, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        test.setErrorFlagAt(35);

        // should end handling @ 40

        test.checkAt(43, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 45

        test.checkAt(48, {
            startHandleTime: 3,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        // should end handling @ 55

        test.checkAt(57, {
            startHandleTime: 3,
            endHandleTime: 2,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        test.stopAt(58);

        test.checkAt(60, {
            startHandleTime: 3,
            endHandleTime: 2,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        return test.promise;
    });
});
