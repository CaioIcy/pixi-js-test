import * as PIXI from 'pixi.js';

export interface AnimationOptions {
    property: string,
    start: number,
    end: number,
    duration: number,
    // onBegin?: () => void
    onFinish?: () => void
}

export class Animation {
    private object: PIXI.Container;
    private options: AnimationOptions;
    private running: boolean = false;
    private elapsedMS: number = 0;

    constructor(object: PIXI.Container, options: AnimationOptions) {
        this.object = object;
        this.options = options;
    }

    public start() {
        PIXI.Ticker.shared.add(this.update, this);
        this.running = true;
    }

    public stop() {
        this.running = false;
        PIXI.Ticker.shared.remove(this.update, this);
    }

    private update() {
        if(!this.running) {
            return;
        }
        this.elapsedMS += PIXI.Ticker.shared.elapsedMS;

        const weight = this.elapsedMS / this.options.duration;

        // @ts-ignore
        this.object[this.options.property] =  (weight * this.options.end) + ((1 - weight) * this.options.start);

        if(this.elapsedMS >= this.options.duration) {
            this.stop();

            // @ts-ignore
            this.object[this.options.property] = this.options.end;

            if(this.options.onFinish) {
                this.options.onFinish();
            }
        }
    }
}
