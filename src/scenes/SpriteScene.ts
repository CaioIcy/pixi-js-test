import * as PIXI from 'pixi.js';
import { BaseScene } from './BaseScene';
import { SceneManager } from './SceneManager';
import { Animation, AnimationOptions } from '../ui/Animation';
import { TextureUtil } from '../utils/TextureUtil';
import { Dispatcher } from '../utils/Dispatcher';

class Card extends PIXI.Sprite {
    // static n: number = 0;
    public constructor(texture: PIXI.Texture) {
        super(texture);

        this.width = 150;
        this.height = 200;
        this.anchor.set(0.5);
        // this.addChild(new PIXI.Text((Card.n++).toString()));
    }
}

export class SpriteScene extends BaseScene {
    private static kAnimDelay = 1000;
    private static kAnimDuration = 2000;

    private fpsLabel : PIXI.Text;

    private cardsContainer: PIXI.Container = new PIXI.Container();
    private anims: Array<Animation> = [];

    private texturePool: Array<PIXI.Texture> = [];
    private textureIndex: number = 0;

    private cardPool: Array<Card> = [];
    private cardIndex: number = 0;

    public constructor(sceneManager : SceneManager) {
        super(sceneManager);

        this.cardsContainer.x = window.innerWidth / 2;
        this.cardsContainer.y = window.innerHeight / 2;

        this.fpsLabel = new PIXI.Text('FPS ?? ');
        this.addChild(this.fpsLabel);
        PIXI.Ticker.shared.add((_) => {
            this.fpsLabel.text = `FPS ${Math.ceil(PIXI.Ticker.shared.FPS)}`;
        });
    }

    getTextureFromPool() : PIXI.Texture {
        const idx = this.textureIndex;
        this.textureIndex = (this.textureIndex + 1) % this.texturePool.length;
        return this.texturePool[idx];
    }

    getCardFromPool() : Card {
        const idx = this.cardIndex;
        this.cardIndex = (this.cardIndex + 1) % this.cardPool.length;
        return this.cardPool[idx];
    }

    protected onEnter() : void {
        console.log('SpriteScene::onEnter');
        this.createBackButton();
        this.addChild(this.cardsContainer);

        for(let i = 0; i < 7; i++) {
            this.texturePool.push(TextureUtil.createRandomTexture());
        }

        for(let i = 0; i < 8; i++) {
            let card = new Card(this.getTextureFromPool());
            card.x = -card.width;
            card.rotation = (i%2==0 ? 4 : -4) * (Math.PI / 180);
            this.cardPool.push(card);
            this.cardsContainer.addChild(card);
            this.cardsContainer.setChildIndex(card, 0);
        }

        Dispatcher.dispatch(2000, () => {
            this.beginAnimations();
        });
    }

    protected onExit() : void {
        this.cardPool = [];
        this.texturePool = [];
        this.removeChildren();
        this.cardsContainer.removeChildren();
        for(const anim of this.anims) {
            anim.stop();
        }
        this.anims = [];
    }

    private beginAnimations() : void {
        for(let i = 0; i < 144; i++) {
            Dispatcher.dispatch(SpriteScene.kAnimDelay * i, () => {
                const card = this.getCardFromPool();
                if(!card) {
                    return;
                }
                card.x = -card.width;

                this.cardsContainer.setChildIndex(card, this.cardsContainer.children.length - 1);

                const animOptions: AnimationOptions = {
                    property: 'x',
                    duration: SpriteScene.kAnimDuration,
                    start: card.x,
                    end: card.width,
                    onFinish: () => {
                        // reset the card back to the left
                        Dispatcher.dispatch(SpriteScene.kAnimDelay * 2, () => {
                            if(!card){return;}
                            card.x = -card.width;
                            if(!this.cardsContainer || this.cardsContainer.children.length <= 0) {return;}
                            this.cardsContainer.setChildIndex(card, 0);
                        });
                    },
                };
                const xAnim = new Animation(card, animOptions);
                xAnim.start();
                this.anims.push(xAnim);
            });
        }
    }
}
