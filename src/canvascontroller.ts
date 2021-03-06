import { View } from "./canvasView";
import { Graph } from "./graph";
import { Circle, Point } from "./geometry";
import { Mode, ValueController } from "./valueController";

/**
 * canvas related functionality
 */
export class CanvasController {
    private graph: Graph;
    private view: View;
    private mouseDownPoint?: Point;
    private valueController: ValueController;
    
    constructor(graph: Graph, view: View, valueController: ValueController) {
        this.view = view;
        this.graph = graph;
        this.valueController = valueController;
    }

    handleMouseDown(e: MouseEvent) {
        let x = e.offsetX;
        let y = e.offsetY;
        this.mouseDownPoint = {
            x: x,
            y: y
        };
    }


    handleMouseUp(e: MouseEvent) {
        let x = e.offsetX;
        let y = e.offsetY;
        let radius = this.valueController.values.radius;
        let circle: Circle = {
            point: {
                x: x,
                y: y
            },
            radius: radius
        }

        let startPointNode = this.graph.find(this.mouseDownPoint);
        let endPointNode = this.graph.find(circle.point);
        //create new node when startpoint and endpoint are not nodes
        if (!startPointNode && !endPointNode) {
            if (this.valueController.values.nodeValue === "<autoincrement>") {
                this.graph.addNode(circle, null);
            }
            else {
                this.graph.addNode(circle, this.valueController.values.nodeValue);
            }
        }
        else if (startPointNode && endPointNode) {
            //create connection when startpoint and endpoint are both nodes and are not the same node
            if (!startPointNode.equals(endPointNode)) {
                let edgeValue = this.valueController.values.edgeValue;
                this.graph.connect(startPointNode, endPointNode, edgeValue);
            } else {
                //same node and deletion mode
                if (this.valueController.values.mode === Mode.DELETE) {
                    this.graph.delete(startPointNode);
                }
                else if (this.valueController.values.mode === Mode.ADD) {
                    //connection to self
                    let edgeValue = this.valueController.values.edgeValue;
                    this.graph.connect(startPointNode, endPointNode, edgeValue)
                }
            }
        }
        //move
        else if (startPointNode && !endPointNode) {
            startPointNode.circle.point.x = x;
            startPointNode.circle.point.y = y;
        }
        this.view.update();
    }
}