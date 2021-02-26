import { CanvasController } from "./canvascontroller";
import { Graph } from "./model";
import { ControlValues, ValueController } from "./valueController";
import { View } from "./view";



/**
 * npx webpack
 * npm run build
 */
window.onload = () => {
    let defaultControlValues: ControlValues = {
        radius: 50,
        nodeValue: ""
    }

    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let controls = document.getElementById("controls") as HTMLElement;
    let controlsHeight = controls.offsetHeight;
    canvas.height = Math.floor(window.innerHeight - controlsHeight);
    canvas.width = Math.floor(window.innerWidth);

    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.font = "30px Arial"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    let graph = new Graph(false);
    let view = new View(canvas, ctx, graph);
    let valueController = new ValueController(defaultControlValues);
    let controller = new CanvasController(graph, view, valueController);
    
    canvas.addEventListener("mousedown", e => controller.handleMouseDown(e));
    canvas.addEventListener("mouseup", e => controller.handleMouseUp(e));
}