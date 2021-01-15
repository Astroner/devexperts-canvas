import { Container } from "./Container";
import { Drawing } from "./Drawing";

export class Renderer {
    constructor(
        private canvas: HTMLCanvasElement
    ){
        
    }

    root: Container | null = null;

    render(container: Container): VoidFunction{
        this.root = container;
        const ctx = this.canvas.getContext("2d");

        if(!ctx) return () => {}

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        return this.reqursiveRender(container, ctx, {
            x: 0,
            y: 0
        })
    }

    private reqursiveRender(
        toDraw: Drawing | Container,
        ctx: CanvasRenderingContext2D,
        context: {
            x: number,
            y: number
        }
    ): VoidFunction {
        if(toDraw instanceof Drawing) {
            ctx.save()
            toDraw.render(ctx, context.x, context.y)
            ctx.restore()

            return () => {}
        }else {
            toDraw.childrens.forEach((drawing) => {
                this.reqursiveRender(drawing, ctx, {
                    x: context.x + toDraw.x,
                    y: context.y + toDraw.y
                })
            })
            const s1 = toDraw.on("add", () => {
                this.render(this.root as any)
            })

            const s2 = toDraw.on("remove", () => {
                this.render(this.root as any)
            })

            return () => {
                s1.unsubscribe()
                s2.unsubscribe()
            }
        }
    }
}