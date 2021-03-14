import {Service} from "typedi";
import {RequiredAsset} from "./asset";

declare const require: any;

/**
 * pre-load assets so that they can be cached by the browser & used directly in the game (no load time)
 */
@Service()
export class AssetsPreloaderService {

    private assetsLoadedResolve!: (value?: unknown) => void;
    private readonly assetsLoaded = new Promise((resolve) => this.assetsLoadedResolve = resolve);
    private readonly images: HTMLImageElement[] = []; // keep a reference to avoid garbage collection

    constructor() {
        // recursively find & load image assets
        const imagesWebpackContext = require.context('../../../assets', true, /\.(png|jpg|jpeg)$/);
        const images: RequiredAsset[] = imagesWebpackContext.keys().map(imagesWebpackContext);
        this.loadImages(images).then(() => this.assetsLoadedResolve());
    }

    async preloadAssets(): Promise<void> {
        const start = Date.now();
        await this.assetsLoaded;
        console.log(`[${this.images.length}] assets pre-loaded in ${Date.now() - start} ms`);
    }

    private async loadImages(allImages: RequiredAsset[]) {
        await Promise.all(
            allImages.map(asset => this.loadAsset(asset))
        )
    }

    private loadAsset(asset: RequiredAsset) {
        return new Promise<void>((resolve) => {
            const image = new Image();
            this.images.push(image);
            image.onload = () => resolve();
            image.src = asset.default;
        });
    }

}
