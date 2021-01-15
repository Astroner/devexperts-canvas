import { useEffect, useState } from "react"
import { Line } from "./Line"
import { Trend } from "./Trend"

const getData = () => new Promise<{ type: string, data: any }[]>(resolve => {
    setTimeout(() => {
        resolve([
            {
                type: "X",
                data: {
                    start: { x: 40, y: 20 },
                    end: { x: 100, y: 50 }
                }
            },
            {
                type: "LINE",
                data: {
                    start: { x: 40, y: 20 },
                    end: { x: 100, y: 50 }
                }
            },
            {
                type: "LINE",
                data: 2
            }
        ])
    }, 1000)
})

export const useGraphics = () => {
    const [state, setState] = useState<Array<Trend | Line> | null>(null)

    useEffect(() => {
        getData().then(value => {
            const result: Array<Trend | Line> = [];

            for(const drawing of value) {
                const res = convertToDrawing(drawing.type, drawing.data);
                res && result.push(res)
            }
            setState(result)
        })
    }, [])
    
    return {
        drawings: state
    }
}

function convertToDrawing(key: string, data: any): Trend | Line | null{
    if(key === "X" && Trend.isTrend(data)) return new Trend(data)

    if(key === "LINE" && Line.isLine(data)) return new Line(data)

    return null
}

