export class MouseOrTouchEvent {
    readonly isTouch: boolean;
    readonly isMove: boolean;
    readonly clientX: number;
    readonly clientY: number;

    constructor(event: TouchEvent | MouseEvent, public readonly released: boolean) {
        this.isTouch = event instanceof TouchEvent;
        const touchOrMouseEvent = event instanceof TouchEvent ? event.changedTouches[0] : event;
        this.clientX = touchOrMouseEvent.clientX;
        this.clientY = touchOrMouseEvent.clientY;
        this.isMove = event.type === 'touchmove' || event.type === 'mousemove';
    }

}
