import { Graph, GraphNode } from "./model";

export class View {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    getMousePos(x: number,y: number) {
        let rect = this.canvas.getBoundingClientRect();
        return {
            "x": x - rect.left,
            "y": y - rect.top
        };
    }
    drawNode(x1: number,y1: number, radius: number, value: string) {
        let pos = this.getMousePos(x1,y1);
        console.log(pos);
        
        this.ctx.beginPath()
        this.ctx.arc(pos.x,pos.y,radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fillText(value, pos.x, pos.y);
    }   

    drawConnection(x1: number,y1: number,x2: number,y2: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y2);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
    }
}