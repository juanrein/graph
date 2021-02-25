import { Circle, Line } from "./geometry";
import { Graph, GraphNode } from "./model";
export class View {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private graph: Graph;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, graph: Graph) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.graph = graph;
    }

    update() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.graph.nodes.forEach(n => this.drawNode(n))
        this.graph.getConnectionsAsLines().forEach(line => this.drawLine(line));
    }

    drawNode({circle, value}: GraphNode) {
        let {point:{x,y},radius} = circle;
        this.ctx.beginPath()
        this.ctx.arc(x,y,radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fillText(value, x, y);
    }   

    drawLine(line: Line) {
        let {x1,y1,x2,y2} = line
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
    }
}