import { Timer } from 'nodejs-timer';

/*!
 * async-interval-job
 * Home page: https://github.com/a179346/async-interval-job
 * npm: https://www.npmjs.com/package/async-interval-job
 */

/**  =================== USAGE ==================

    import { AsyncIntervalJob } from 'async-interval-job';

    const job = new AsyncIntervalJob(async () => {
        // Execute for each interval.
    }, 60 * 1000);

    job.start();

    async function gracefulShutdown() {
        await job.stop();
        // Can close the db connections here ...
    }

 =============================================== */

export interface AsyncIntervalJobOptions {
    /**
     * If true, Auto start interval job after constructor. Otherwise, `job.start()` should be called to start the job.
     * default: false
     */
    autoStart?: boolean;
    /**
     * If true, Start first handling when job start. Otherwise, Start first handling at `intervalMs` after job start.
     * default: false
     */
    runImmediately?: boolean;
    /**
     * If true, Job will be stopped when error occurred during handling, and won't exexcute next handling.
     * default: false
     */
    stopOnError?: boolean;
}

export type AsyncIntervalJobHandler = () => void | Promise<void>;

export interface AsyncIntervalJobState {
    /**
     * True if the input handler is executing.
     */
    isHandling: boolean;
    /**
     * True if the job is at the interval between handler execution.
     */
    isWaitForNextHandle: boolean;
    /**
     * job.stop was called, and is now waiting for the handler execution finish.
     */
    isBeforeStop: boolean;
}

export class AsyncIntervalJob {
    /**
     * Construtor of AsyncIntervalJob
     * @param handler `MUST` Function to execute for each interval.
     * @param intervalMs `MUST` Millisecond to wait between each function execution.
     * @param options {AsyncIntervalJobOptions} `OPTIONAL`
     */
    constructor(
        handler: AsyncIntervalJobHandler,
        intervalMs: number,
        options?: AsyncIntervalJobOptions
    ) {
        validateHandler(handler);
        validateIntervalMs(intervalMs);
        validateOptions(options);

        const defaultOptions: Required<AsyncIntervalJobOptions> = {
            autoStart: false,
            stopOnError: false,
            runImmediately: false,
        };
        this._handler = handler;
        this._intervalMs = intervalMs;
        this._options = Object.assign(defaultOptions, options);
        this._timer = new Timer(() => {
            this._loop();
        });

        this._isHandling = false;
        this._isBeforeStop = false;
        this._stopCallbacks = [];

        if (this._options.autoStart) this.start();
    }

    /**
     * Start the Job
     */
    public start(): void {
        if (this._isLooping) return;
        if (this._options.runImmediately) this._loop();
        else this._timer.start(this._intervalMs);
    }
    /**
     * Stop the job.
     * @returns Promise -
     *  If job isn't handling, will clear the interval and resolve the returned promise.
     *  Otherwise, will wait until the handling finish and resolve the returned promise.
     */
    public stop(): Promise<void> {
        return new Promise(resolve => {
            if (!this._isLooping) return resolve();
            if (this._isWaitForNextHandle) {
                this._timer.clear();
                return resolve();
            }
            this._isBeforeStop = true;
            this._stopCallbacks.push(resolve);
        });
    }

    /**
     * Get current state of the interval job
     * @returns {AsyncIntervalJobState}
     */
    public getState(): AsyncIntervalJobState {
        return {
            isHandling: this._isHandling,
            isWaitForNextHandle: this._isWaitForNextHandle,
            isBeforeStop: this._isBeforeStop,
        };
    }

    protected readonly _timer: Timer<[]>;
    protected readonly _handler: AsyncIntervalJobHandler;
    protected readonly _intervalMs: number;
    protected readonly _options: Required<AsyncIntervalJobOptions>;

    protected _isHandling: boolean;
    protected get _isWaitForNextHandle(): boolean {
        return this._timer.isRunning();
    }
    protected get _isLooping(): boolean {
        return this._isWaitForNextHandle || this._isHandling;
    }
    protected _isBeforeStop: boolean;

    protected readonly _stopCallbacks: (() => void)[];

    protected async _loop(): Promise<void> {
        try {
            await this._run();
            if (!this._isBeforeStop) this._timer.start(this._intervalMs);
        } catch (error) {
            if (!this._isBeforeStop && !this._options.stopOnError)
                this._timer.start(this._intervalMs);
        } finally {
            this._isBeforeStop = false;
            while (this._stopCallbacks.length) {
                const callback = this._stopCallbacks.pop();
                if (callback) callback();
            }
        }
    }

    protected _run(): Promise<void> {
        this._isHandling = true;
        return Promise.resolve(this._handler()).finally(() => {
            this._isHandling = false;
        });
    }
}

// @internal
export function validateHandler(val: unknown): asserts val is AsyncIntervalJobHandler {
    if (typeof val !== 'function') throw new TypeError('Invalid "handler". must be a function');
}

// @internal
export function validateIntervalMs(val: unknown): asserts val is number {
    if (typeof val !== 'number' || !Number.isInteger(val) || val <= 0)
        throw new TypeError('Invalid "intervalMs". must be a positive integer');
}

// @internal
export function validateOptions(val: unknown): asserts val is AsyncIntervalJobOptions | undefined {
    if (typeof val === 'undefined') return;
    if (typeof val !== 'object' || val === null)
        throw new TypeError('Invalid "options". must be an object');
    if ('runImmediately' in val) {
        const runImmediately = (val as { runImmediately: unknown }).runImmediately;
        if (typeof runImmediately !== 'boolean' && typeof runImmediately !== 'undefined')
            throw new TypeError('Invalid "options.runImmediately". must be a boolean');
    }
    if ('stopOnError' in val) {
        const stopOnError = (val as { stopOnError: unknown }).stopOnError;
        if (typeof stopOnError !== 'boolean' && typeof stopOnError !== 'undefined')
            throw new TypeError('Invalid "options.stopOnError". must be a boolean');
    }
}
