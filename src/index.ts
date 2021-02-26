import { CanvasController } from "./canvascontroller";
import { ExportViewController } from "./exportViewController";
import { Graph } from "./graph";
import { ControlValues, ValueController } from "./valueController";
import { View } from "./view";


/**
 * npx webpack
 * npm run build
 */
window.onload = () => {
    let defaultControlValues: ControlValues = {
        radius: 50,
        nodeValue: "<autoincrement>",
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
    
    let valCtrlDiv = document.getElementById("valueControls") as HTMLElement;
    let exportButton = document.getElementById("exportButton") as HTMLElement;

    let graph = new Graph(false);
    let view = new View(canvas, ctx, graph);
    let valueController = new ValueController(valCtrlDiv, defaultControlValues);
    let exportController = new ExportViewController(graph);
    let canvasController = new CanvasController(graph, view, valueController);
    
    exportButton.addEventListener("click", e => exportController.handleExport(e));
    canvas.addEventListener("mousedown", e => canvasController.handleMouseDown(e));
    canvas.addEventListener("mouseup", e => canvasController.handleMouseUp(e));
}