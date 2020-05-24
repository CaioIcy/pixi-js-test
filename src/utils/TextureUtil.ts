import * as PIXI from 'pixi.js';
import { MathUtil } from './MathUtil';
import { StringUtil } from './StringUtil';

export class TextureUtil {
    public static createRandomTexture() : PIXI.Texture {
        const color = (Math.random()*0xFFFFFF<<0);
        let style = '#' + color.toString(16);
        style = StringUtil.replaceAt(style, 1 + (MathUtil.getRandomInt(0, 2) * 2), 'F');
        return TextureUtil.createTexture(style);
    }

    public static createTexture(fillStyle: string) : PIXI.Texture {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const context = canvas.getContext('2d');
        context.fillStyle = fillStyle;
        context.fillRect(0, 0, 16, 16);
        return new PIXI.Texture(new PIXI.BaseTexture(new PIXI.resources.CanvasResource(canvas)));
    }
}
