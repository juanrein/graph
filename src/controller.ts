import { View } from "./view";
import { Graph, GraphNode } from "./model";
import { Circle, getLineBetween, Point } from "./geometry";

export class Controller {
    private graph: Graph;
    private view: View;
    private mouseDownPoint?: Point;

    constructor(graph: Graph, view: View) {
        this.view = view;
        this.graph = graph;
    }

    handleMouseDown(e: MouseEvent) {
        console.log("mouse down event");
        let x = e.offsetX;
        let y = e.offsetY;
        this.mouseDownPoint = {
            x: x,
            y: y
        };
    }

    handleMouseUp(e: MouseEvent) {
        console.log("mouse up event");
        let x = e.offsetX;
        let y = e.offsetY;

        let circle: Circle = {
            point: {
                x: x,
                y: y
            },
            radius: 50
        }

        let startPointNode = this.graph.find(this.mouseDownPoint);
        let endPointNode = this.graph.find(circle.point);
        //create new node when startpoint and endpoint are not nodes
        if (!startPointNode && !endPointNode) {
            this.graph.addNode(circle, null);
        }
        else if (startPointNode && endPointNode) {
            //create connection when startpoint and endpoint are both nodes and are not the same node
            if (!startPointNode.equals(endPointNode)) {
                this.graph.connect(startPointNode, endPointNode);
            }
        }
        this.view.update();
    }
}