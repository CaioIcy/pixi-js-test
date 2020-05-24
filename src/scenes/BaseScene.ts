import { Container } from 'pixi.js';
import { SceneManager } from './SceneManager';
import { Button } from '../ui/Button';

export abstract class BaseScene extends Container {
    protected sceneManager : SceneManager;

    public constructor(sceneManager : SceneManager) {
        super();
        this.sceneManager = sceneManager;
    }

    protected abstract onEnter() : void;
    protected abstract onExit() : void;

    public enter() {
        this.visible = true;
        this.onEnter();
    }

    public exit() {
        this.onExit();
        this.visible = false;
        this.destroy();
    }

    protected createBackButton() : void {
        const backButton = new Button('BACK', () => {
            this.sceneManager.pop();
        });
        backButton.x = window.innerWidth - backButton.width;
        this.addChild(backButton);
    }
}
