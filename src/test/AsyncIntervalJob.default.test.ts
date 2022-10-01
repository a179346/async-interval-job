import { AsyncIntervalJobTest } from './utils';

describe('[AsyncIntervalJob - default]', () => {
    it('Stop while not handling', () => {
        const test = new AsyncIntervalJobTest(10, 5);

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

        // should end handling @ 45

        test.checkAt(48, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 50

        test.checkAt(53, {
            startHandleTime: 3,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        // should end handling @ 60

        test.checkAt(62, {
            startHandleTime: 3,
            endHandleTime: 2,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        test.stopAt(63);

        test.checkAt(65, {
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

    it('Stop while handling (without error)', () => {
        const test = new AsyncIntervalJobTest(10, 5);

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

        // should end handling @ 45

        test.checkAt(48, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 50

        test.checkAt(53, {
            startHandleTime: 3,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        test.stopAt(55);

        test.checkAt(58, {
            startHandleTime: 3,
            endHandleTime: 1,
            isStopping: true,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: true,
            },
        });

        // should end handling @ 60

        test.checkAt(62, {
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

    it('Stop while handling (with error)', () => {
        const test = new AsyncIntervalJobTest(10, 5);

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

        // should end handling @ 45

        test.checkAt(48, {
            startHandleTime: 2,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: false,
                isWaitForNextHandle: true,
                isBeforeStop: false,
            },
        });

        // should start handling @ 50

        test.checkAt(53, {
            startHandleTime: 3,
            endHandleTime: 1,
            isStopping: false,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: false,
            },
        });

        test.setErrorFlagAt(55);
        test.stopAt(55);

        test.checkAt(58, {
            startHandleTime: 3,
            endHandleTime: 1,
            isStopping: true,
            state: {
                isHandling: true,
                isWaitForNextHandle: false,
                isBeforeStop: true,
            },
        });

        // should end handling @ 60

        test.checkAt(62, {
            startHandleTime: 3,
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
