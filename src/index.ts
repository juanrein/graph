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
    let graph = new Graph();
    let view = new View(canvas, ctx);
    let controller = new Controller(graph, view);
    canvas.addEventListener("click", e => controller.handleClick(e));
}