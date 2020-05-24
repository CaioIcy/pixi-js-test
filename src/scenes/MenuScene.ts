import { Text } from 'pixi.js';
import { BaseScene } from './BaseScene';
import { SpriteScene } from './SpriteScene';
import { MixedScene } from './MixedScene';
import { FireScene } from './FireScene';
import { SceneManager } from './SceneManager';
import { Button } from '../ui/Button';

export class MenuScene extends BaseScene {
    public constructor(sceneManager : SceneManager) {
        super(sceneManager);
    }

    private createSceneButton(scene: BaseScene, label: string): Button {
        return new Button(label, () => {
            this.sceneManager.push(scene);
        });
    }

    protected onEnter() : void {
        const sceneMap: { [label: string] : ()=>BaseScene; } = {
            '1) Sprites': () => new SpriteScene(this.sceneManager),
            '2) Mixed': () => new MixedScene(this.sceneManager),
            '3) Particles': () => new FireScene(this.sceneManager),
        }

        let i = 0;
        for(const scene in sceneMap) {
            const button = this.createSceneButton(sceneMap[scene](), scene);
            button.x = (window.innerWidth * 0.5) - (button.width * 0.5);
            button.y = (window.innerHeight * 0.5) + ((i-1) * button.height);

            this.addChild(button);
            i++;
        }

        const title = new Text('pixi.js test app');
        title.x = (window.innerWidth * 0.5) - (title.width * 0.5);
        this.addChild(title);
    }

    protected onExit() : void {
        // nothing
    }
}
