export const getCanvas: () => HTMLCanvasElement = () => document.querySelector('#game') as HTMLCanvasElement;
export const getWidth = () => getCanvas()?.getBoundingClientRect().width;
export const getHeight = () => getCanvas()?.getBoundingClientRect().height;
export const getGrassHeight = () => 150;
export const get2DContext: () => CanvasRenderingContext2D = () => getCanvas()?.getContext('2d') as CanvasRenderingContext2D;
