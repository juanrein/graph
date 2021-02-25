import { View } from "./view";
import { Graph, GraphNode } from "./model";

export class Controller {
    private graph: Graph;
    private view: View;
    private selected?: GraphNode;    

    constructor(graph: Graph, view: View) {
        this.view = view;
        this.graph = graph;
    }

    handleClick(e: MouseEvent) {
        let x = e.clientX;
        let y = e.clientY;
        let clicked = this.graph.find(x,y);
        if (!this.graph.intersectsAny(x,y, 50)) {
            this.graph.addNode(x,y,50, "aa");
            this.view.drawNode(x,y,50, "aa");
        }
        else if (this.selected) {
            if (clicked != null && !clicked.equals(this.selected)) {
                this.graph.connect(this.selected, clicked, false);
                let line = this.graph.getLineBetween(this.selected, clicked);
                let {x1,y1,x2,y2} = line
                this.view.drawConnection(x1,y1,x2,y2);
            }
        }
        this.selected = clicked;
    }

}