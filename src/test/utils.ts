import { expect } from 'chai';
import { AsyncIntervalJob, AsyncIntervalJobState } from '..';

export const TIME_UNIT = 70;

export const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time * TIME_UNIT));

export interface CheckState {
    startHandleTime: number;
    endHandleTime: number;
    isStopping: boolean;
    state: AsyncIntervalJobState;
}

export class AsyncIntervalJobTest {
    public readonly promise: Promise<void>;

    private readonly _job: AsyncIntervalJob;
    private _startHandleTime: number;
    private _endHandleTime: number;
    private _isStopping: boolean;
    private readonly _timeoutIds: Set<NodeJS.Timeout>;
    private _errorFlag: boolean;

    private _resolve: () => void;
    private _reject: (e: unknown) => void;

    private _isResolved: boolean;
    private _isRejected: boolean;

    constructor(jobTime: number, intervalTime: number) {
        this._isResolved = false;
        this._isRejected = false;
        this._resolve = () => {
            //pass
        };
        this._reject = () => {
            //pass
        };
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this._startHandleTime = 0;
        this._endHandleTime = 0;
        this._isStopping = false;
        this._timeoutIds = new Set();
        this._job = new AsyncIntervalJob(async () => {
            this._startHandleTime += 1;
            await wait(jobTime);
            if (this._errorFlag) {
                this._errorFlag = false;
                throw Error('test error');
            }
            this._endHandleTime += 1;
        }, intervalTime * TIME_UNIT);
        this._errorFlag = false;
    }

    private _at(time: number, event: () => void) {
        const timeoutId = setTimeout(() => {
            this._timeoutIds.delete(timeoutId);
            event();
        }, time * TIME_UNIT);
        this._timeoutIds.add(timeoutId);
    }

    startAt(time: number) {
        this._at(time, () => {
            this._job.start();
        });
    }

    stopAt(time: number) {
        this._at(time, async () => {
            this._isStopping = true;
            await this._job.stop();
            this._isStopping = false;
        });
    }

    checkAt(time: number, checkState: CheckState) {
        this._at(time, () => {
            try {
                expect(this._startHandleTime).to.eq(
                    checkState.startHandleTime,
                    'startHandleTime mismatch' + ` @ ${time}`
                );
                expect(this._endHandleTime).to.eq(
                    checkState.endHandleTime,
                    'endHandleTime mismatch' + ` @ ${time}`
                );
                expect(this._isStopping).to.eq(
                    checkState.isStopping,
                    'isStopping mismatch' + ` @ ${time}`
                );
                expect(this._job.getState()).to.eql(
                    checkState.state,
                    'state mismatch' + ` @ ${time}`
                );
                if (this._timeoutIds.size === 0) this._resolveHandler();
            } catch (error) {
                this._rejectHandler(error);
            }
        });
    }

    setErrorFlagAt(time: number) {
        this._at(time, () => {
            this._errorFlag = true;
        });
    }

    private _onPromiseDone(resolved: boolean) {
        if (resolved) this._job.stop();
    }

    private _resolveHandler() {
        if (this._isResolved || this._isRejected) return;
        this._isResolved = true;
        this._clearAllTimeouts();
        this._resolve();
        this._onPromiseDone(true);
    }

    private _rejectHandler(e: unknown) {
        if (this._isResolved || this._isRejected) return;
        this._isRejected = true;
        this._clearAllTimeouts();
        this._reject(e);
        this._onPromiseDone(false);
    }

    private _clearAllTimeouts() {
        this._timeoutIds.forEach(timeoutId => {
            this._timeoutIds.delete(timeoutId);
            clearTimeout(timeoutId);
        });
    }
}
