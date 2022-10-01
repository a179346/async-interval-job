import { AsyncIntervalJobTest } from './utils';

describe('[AsyncIntervalJob - stopOnError]', () => {
    it('stopOnError test', () => {
        const test = new AsyncIntervalJobTest(10, 5, {
            stopOnError: true,
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

        test.checkAt(18, {
            startHandleTime: 0,
            endHandleTime: 0,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 20

        test.checkAt(23, {
            startHandleTime: 1,
            endHandleTime: 0,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        // should end handling @ 30

        test.checkAt(33, {
            startHandleTime: 1,
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
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        test.setErrorFlagAt(40);

        test.checkAt(43, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        // should end handling @ 45

        test.checkAt(48, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        test.checkAt(53, {
            startHandleTime: 2,
            endHandleTime: 1,
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
