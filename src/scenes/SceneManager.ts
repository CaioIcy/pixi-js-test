import { Container } from "pixi.js";
import { BaseScene } from './BaseScene';

export class SceneManager {
    private appStage : Container;
    private stack : Array<BaseScene>;

    public constructor(stage : Container) {
        this.appStage = stage;
        this.stack = [];
    }

    public push(scene: BaseScene) {
        if(!this.stackIsEmpty()) {
            this.stack[this.stack.length - 1].visible = false;
        }

        this.stack.push(scene);
        this.appStage.addChild(scene);
        scene.enter();
    }

    public pop() {
        if(this.stackIsEmpty()) {
            console.error('empty stack in pop');
            return;
        }

        const current = this.stack.pop();
        this.appStage.removeChild(current);
        if(!this.stackIsEmpty()) {
            this.stack[this.stack.length - 1].visible = true;
        }
        current.exit();
    }

    private stackIsEmpty() : boolean {
        return this.stack.length <= 0;
    }
}
