import { Circle, intersects, contains, Point, Line, getLineBetween } from "./geometry"

export class GraphNode {
    static identifier: number = 0;
    public circle: Circle
    private id: number;
    public value: string;
    constructor(circle: Circle, value: string | null) {
        this.circle = circle;

        this.id = GraphNode.identifier;
        GraphNode.identifier++;
        
        if (value == null) {
            this.value = this.id.toString();
        }
        else {
            this.value = value;
        }
    }

    equals(other: GraphNode) {
        return this.id == other.id;
    }
}

export class Graph {
    public nodes: GraphNode[]
    public connections: number[][];
    private directed: boolean;
    constructor(directed: boolean) {
        this.nodes = [];
        this.connections = [];
        this.directed = directed;
    }

    addNode(circle: Circle, value: string | null) {
        let node = new GraphNode(circle, value);
        this.nodes.push(node);
        this.connections.push([]);
        return node;
    }

    find(point: Point | undefined) {
        if (!point) {
            return undefined;
        }
        for (let node of this.nodes) {
            if (contains(node.circle, point)) {
                return node;
            }
        }
    }
    intersectsAny(circle: Circle) {
        for (let node of this.nodes) {
            if (intersects(node.circle, circle)) {
                return true;
            }
        }
        return false;
    }

    connect(a: GraphNode, b: GraphNode) {
        console.log(a,b);
        
        let ai = this.nodes.findIndex(v => a.equals(v));
        let bi = this.nodes.findIndex(v => b.equals(v));
        if (ai == -1 || bi == -1) {
            throw new Error(`Both nodes don't exist ${a} ${b}`);
        }
        if (!this.connections[ai].includes(bi)) {
            this.connections[ai].push(bi);
            if (!this.directed && !this.connections[bi].includes(ai)) {
                this.connections[bi].push(ai);
            }
        }

    }

    getConnectionsAsLines() {
        let lines = [];
        for (let i=0; i<this.connections.length; i++) {
            let circle = this.nodes[i].circle;
            for (let j=0; j<this.connections[i].length; j++) {
                let neighbor = this.nodes[this.connections[i][j]];
                let line = getLineBetween(circle, neighbor.circle);
                lines.push(line);
            }
        }
        return lines;
    }
}
