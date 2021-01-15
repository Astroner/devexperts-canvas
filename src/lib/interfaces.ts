export interface Interactive {
    interactive: true
    boxGeometry: (
        ctx: CanvasRenderingContext2D, 
        startX: number,
        startY: number
    ) => void
    onMouseOver?: (e: MouseEvent) => void
}