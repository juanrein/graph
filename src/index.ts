import { CanvasController } from "./canvascontroller";
import { ExportController } from "./exportController";
import { Graph } from "./graph";
import { ControlValues, Mode, ValueController } from "./valueController";
import { View } from "./canvasView";


/**
 * npm install
 * npx webpack
 * npm run build
 */
window.onload = () => {
    let defaultControlValues: ControlValues = {
        radius: 50,
        nodeValue: "<autoincrement>",
        mode: Mode.ADD
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
    
    let exportButton = document.getElementById("exportButton") as HTMLElement;

    let graph = new Graph(false);
    let view = new View(canvas, ctx, graph);
    let valueController = new ValueController(defaultControlValues);
    let exportController = new ExportController(graph);
    let canvasController = new CanvasController(graph, view, valueController);
    
    exportButton.addEventListener("click", e => exportController.handleExport(e));
    canvas.addEventListener("mousedown", e => canvasController.handleMouseDown(e));
    canvas.addEventListener("mouseup", e => canvasController.handleMouseUp(e));
    document.querySelectorAll("input").forEach((input, key, parent) => {
        input.addEventListener("change", e => {
            valueController.handleInputValueChange(input)
        })
    }) 
}