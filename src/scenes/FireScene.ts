import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';

import { BaseScene } from './BaseScene';
import { SceneManager } from './SceneManager';
import { TextureUtil } from '../utils/TextureUtil';

export class FireScene extends BaseScene {
    public constructor(sceneManager : SceneManager) {
        super(sceneManager);
        this.particleContainer.x = window.innerWidth * 0.5;
        this.particleContainer.y = window.innerHeight * 0.5;
    }

    private particleContainer: PIXI.Container = new PIXI.Container();
    private emitter: particles.Emitter = new particles.Emitter(this.particleContainer, TextureUtil.createTexture('#f58d42'), {
        "alpha": {
            "start": 0.62,
            "end": 0
        },
        "scale": {
            "start": 0.25,
            "end": 0.75
        },
        "color": {
            "start": "fff191",
            "end": "ff622c"
        },
        "speed": {
            "start": 200,
            "end": 100
        },
        "startRotation": {
            "min": 265,
            "max": 275
        },
        "rotationSpeed": {
            "min": 50,
            "max": 50
        },
        "lifetime": {
            "min": 0.1,
            "max": 0.75
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": 0,
        "maxParticles": 10,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 10
        }
    });

    private update() {
        this.emitter.update(PIXI.Ticker.shared.elapsedMS * 0.001);
    }

    protected onEnter(): void {
        this.createBackButton();

        let label = new PIXI.Text('ಠoಠ');
        label.x = (window.innerWidth * 0.5) - (label.width * 0.5);
        label.y = (window.innerHeight * 0.5) - (label.height * 0.5);
        this.addChild(label);

        this.addChild(this.particleContainer);
        this.particleContainer.pivot.set(0.5);

        this.emitter.emit = true;
        PIXI.Ticker.shared.add(this.update, this);
    }

    protected onExit(): void {
        PIXI.Ticker.shared.remove(this.update, this);
        this.removeChildren();
    }
}
