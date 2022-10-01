import { AsyncIntervalJobTest } from './utils';

describe('[AsyncIntervalJob - autoStart]', () => {
    it('autoStart test', () => {
        const test = new AsyncIntervalJobTest(10, 5, {
            autoStart: true,
        });

        test.checkAt(3, {
            startHandleTime: 0,
            endHandleTime: 0,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 5

        test.checkAt(8, {
            startHandleTime: 1,
            endHandleTime: 0,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        // should end handling @ 15

        test.checkAt(18, {
            startHandleTime: 1,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 20

        test.checkAt(23, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        test.setErrorFlagAt(25);

        // should end handling @ 30

        test.checkAt(33, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 35

        test.checkAt(38, {
            startHandleTime: 3,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        // should end handling @ 45

        test.checkAt(47, {
            startHandleTime: 3,
            endHandleTime: 2,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        test.stopAt(48);

        test.checkAt(50, {
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
