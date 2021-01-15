import { isRight } from "fp-ts/lib/These";
import { Drawing } from "./lib/Drawing";
import { Point } from "./lib/types";
import * as t from "io-ts";

const pointType = t.type({
    x: t.number,
    y: t.number
})

const propsType = t.type({
    start: pointType,
    end: pointType
})

export class Line extends Drawing {

    
    static isLine(value: any): value is {
        start: Point,
        end: Point
    }{
        return isRight(propsType.decode(value))
    }
    constructor(
        private props: {
            start: Point,
            end: Point
        }
    ){
        super()
    }

    render(
        ctx: CanvasRenderingContext2D, 
        startX: number, 
        startY: number
    ): void {
        ctx.beginPath()

        ctx.moveTo(startX + this.props.start.x, startY + this.props.start.y);
        ctx.lineTo(startX + this.props.end.x, startY + this.props.end.y);

        ctx.stroke()
    }
}