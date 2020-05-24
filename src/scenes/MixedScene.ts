import { Sprite, Container, Text, Point, Ticker } from 'pixi.js';
import { MathUtil } from '../utils/MathUtil';
import { SceneManager } from './SceneManager';
import { BaseScene } from './BaseScene';
import { TextureUtil } from '../utils/TextureUtil';

export class MixedScene extends BaseScene {
    private mixedContainer: Container = new Container();
    private elapsedMS: number = 0;

    private emoticonPool: Array<Sprite> = [];
    private emoticonIndex: number = 0;

    private messages: Array<string> = [
        'Lorem ipsum dolor sit amet, adipiscing elit.',
        'Mauris vehicula tellus at aliquam.',
        'Vestibulum nec leo tristique sit amet id dui.',
        'Praesent lobortis lectus id nisl dignissim.',
        'Donec aliquet elit nec enim imperdiet tempus.',
    ];

    public constructor(sceneManager : SceneManager) {
        super(sceneManager);
        this.mixedContainer.x = window.innerWidth * 0.5;
        this.mixedContainer.y = window.innerHeight * 0.5;
    }

    protected onEnter() : void {
        this.createBackButton();

        for(let i = 0; i < 8; i++) {
            this.emoticonPool.push(new Sprite(TextureUtil.createRandomTexture()));
        }

        this.addChild(this.mixedContainer);
        Ticker.shared.add(this.update, this);
        this.mixedContainer.addChild(this.createMixedText());
    }

    protected onExit() : void {
        Ticker.shared.remove(this.update, this);
        this.mixedContainer.removeChildren();
        this.removeChildren();
        this.elapsedMS = 0;
    }

    private update() {
        this.elapsedMS += Ticker.shared.elapsedMS;
        if(this.elapsedMS >= 2000) {
            const newText = this.createMixedText();
            this.mixedContainer.removeChildren();
            this.mixedContainer.addChild(newText);
            this.elapsedMS = 0;
        }
    }

    private getRandomEmoticon(): Sprite {
        const idx = this.emoticonIndex;
        this.emoticonIndex = (this.emoticonIndex + 1) % this.emoticonPool.length;
        return this.emoticonPool[idx];
    }

    private getRandomMessage(): string {
        return this.messages[MathUtil.getRandomInt(0, this.messages.length - 1)];
    }

    private createMixedText(): Container {
        const textStyle: any = {
            fontSize: MathUtil.getRandomInt(8, 24),
        };
        const spaceText = new Text(' ', textStyle);
        const emoticonText = new Text('OO',textStyle);
        const text: string = this.getRandomMessage();
        const words: Array<string> = text.split(' ');
        let mixedCurrentX: number = 0;
        const ctn: Container = new Container();
        let addedImages = 0;
        for(const word of words) {
            const wordText: Text = new Text(word, textStyle);
            wordText.x = mixedCurrentX;
            ctn.addChild(wordText);

            mixedCurrentX += wordText.width + spaceText.width;
            while (Math.random() < 0.3 && addedImages < this.emoticonPool.length) {
                const image = this.getRandomEmoticon();
                image.x = mixedCurrentX;
                image.width = image.height = emoticonText.height;
                ctn.addChild(image);

                addedImages++;
                mixedCurrentX += image.width + spaceText.width;
            }
        }
        ctn.pivot = new Point(ctn.width * 0.5, ctn.height * 0.5);
        return ctn;
    }
}
