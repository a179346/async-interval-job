import { Timer } from 'nodejs-timer';

export interface AsyncIntervalJobOptions {
    runImmediately?: boolean;
    stopOnError?: boolean;
}

export type AsyncIntervalJobHandler = () => void | Promise<void>;

export interface AsyncIntervalJobState {
    isHandling: boolean;
    isWaitForNextHandle: boolean;
    isBeforeStop: boolean;
}

export class AsyncIntervalJob {
    constructor(
        handler: AsyncIntervalJobHandler,
        intervalMs: number,
        options?: AsyncIntervalJobOptions
    ) {
        validateHandler(handler);
        validateIntervalMs(intervalMs);
        validateOptions(options);

        const defaultOptions: Required<AsyncIntervalJobOptions> = {
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
    }

    public start(): void {
        if (this._isLooping) return;
        if (this._options.runImmediately) this._loop();
        else this._timer.start(this._intervalMs);
    }

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
export function validateOptions(val: unknown): asserts val is AsyncIntervalJobOptions {
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
