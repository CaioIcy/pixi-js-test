import * as PIXI from 'pixi.js';
import { SceneManager } from './scenes/SceneManager';
import { MenuScene } from './scenes/MenuScene';


export class App {
    private app : PIXI.Application;
    private sceneManager : SceneManager;

    public constructor() {
        this.app = new PIXI.Application({
            backgroundColor: 0xe3fff7,
            resolution: 1, // window.devicePixelRatio || 
        });
        this.sceneManager = new SceneManager(this.app.stage);
    }

    public start() {
        document.body.appendChild(this.app.view);
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.sceneManager.push(new MenuScene(this.sceneManager));
    }
}

const app = new App();
app.start();
