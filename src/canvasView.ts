/**
 * Canvas drawing
 */

import { EdgeText, Line } from "./geometry";
import { Graph, GraphNode } from "./graph";

const viewSettings = {
    backgroundFillStyle: "rgb(33, 32, 36)",
    nodeTextFillStyle:   "rgb(239, 237, 245)",
    nodeStrokeFillStyle: "rgb(239, 237, 247)",
    edgeFillStyle:       "rgb(239, 237, 247)",
    nodeFont: "30px Arial",
    edgeFont: "20px Arial",
    textAlign: "center",
    textBaseline: "middle",
    lineWidth: 2
}

export class View {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private graph: Graph;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, graph: Graph) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctx.lineWidth = viewSettings.lineWidth;
        this.ctx.textAlign = viewSettings.textAlign as CanvasTextAlign;
        this.ctx.textBaseline = viewSettings.textBaseline as CanvasTextBaseline;
        
        this.graph = graph;

        this.update()
    }

    update() {
        //this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = viewSettings.backgroundFillStyle;

        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.graph.nodes.forEach(n => this.drawNode(n))
        this.graph.getConnectionsAsLines().forEach(line => {
            this.drawLine(line.line);
            this.drawText(line.text);
        });
    }

    drawText({text, point: {x,y}}: EdgeText) {
        this.ctx.font = viewSettings.edgeFont;
        this.ctx.fillStyle = viewSettings.edgeFillStyle;
        
        this.ctx.fillText(text, x + 10, y + 10);
    }

    drawNode({circle, value}: GraphNode) {
        this.ctx.font = viewSettings.nodeFont;
        this.ctx.fillStyle = viewSettings.nodeTextFillStyle;
        this.ctx.strokeStyle = viewSettings.nodeStrokeFillStyle;

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