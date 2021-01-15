import { Drawing } from "./lib/Drawing";

export class Circle extends Drawing {

    constructor(
        private props: {
            x: number,
            y: number,
            radius: number
        }
    ){
        super();
    }

    render(ctx: CanvasRenderingContext2D, startX: number, startY: number): void {
        ctx.beginPath()
        ctx.arc(startX + this.props.x, startY + this.props.y, this.props.radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
    }
}