export abstract class Drawing {
    abstract render(
        ctx: CanvasRenderingContext2D, 
        startX: number,
        startY: number
    ): void
}