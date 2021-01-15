import { Container } from "./lib/Container";
import { Point } from "./lib/types";
import { Line } from "./Line";
import * as t from "io-ts";
import { isRight } from "fp-ts/lib/These";
import { Circle } from "./Circle";

const pointType = t.type({
    x: t.number,
    y: t.number
})

const propsType = t.type({
    start: pointType,
    end: pointType
})

export class Trend extends Container {

    static isTrend(value: any): value is {
        start: Point,
        end: Point
    }{
        return isRight(propsType.decode(value))
    }

    private flag = false;

    private line: Line;

    constructor(
        props: {
            start: Point,
            end: Point
        }
    ){
        super(
            props.start.x,
            props.start.y
        );

        this.line = new Line({
            start: {
                x: props.end.x,
                y: props.start.y
            },
            end: {
                x: props.start.x,
                y: props.end.y
            }
        })
            
        this.addChild(new Line(props))
        this.addChild(new Circle({
            radius: 10,
            x: 5,
            y: 5
        }))
    }

}