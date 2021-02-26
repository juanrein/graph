import { Controller } from "./controller";
import { Graph } from "./model";
import { View } from "./view";

/**
 * npx webpack
 * npm run build
 */
window.onload = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.font = "30px Arial"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let graph = new Graph(false);
    let view = new View(canvas, ctx, graph);
    let controller = new Controller(graph, view);
    canvas.addEventListener("mousedown", e => controller.handleMouseDown(e));
    canvas.addEventListener("mouseup", e => controller.handleMouseUp(e));
}