import { Subject, Subscription } from "rxjs";
import { Drawing } from "./Drawing";

export class Container {
    childrens: (Drawing | Container)[] = []

    private addSubj = new Subject<Drawing | Container>()
    private removeSubj = new Subject<Drawing | Container>();
    
    constructor(
        public x: number = 0,
        public y: number = 0
    ){}

    addChild<T extends Drawing | Container>(drawing: T): T {
        this.childrens.push(drawing)
        this.addSubj.next(drawing)
        return drawing
    }

    removeChild<T extends Drawing | Container>(drawing: T): T {
        const index = this.childrens.indexOf(drawing);
        if(index === -1) return drawing
        this.childrens.splice(index, 1)
        this.removeSubj.next(drawing)

        return drawing
    }

    on(
        ...args:
            | ["add", (drawing: Drawing | Container) => void]
            | ["remove", (drawing: Drawing | Container) => void]
    ): Subscription {
        switch(args[0]) {
            case "add": return this.addSubj.subscribe(args[1])
            case "remove": return this.removeSubj.subscribe(args[1])
        }
    }
}