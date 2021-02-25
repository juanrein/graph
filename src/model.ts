export class GraphNode {
    static identifier: number;
    public x: number;
    public y: number;
    public value: string;
    public radius: number;
    private id: number;
    constructor(x: number,y:number,radius:number, value: string) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.id = GraphNode.identifier;
        GraphNode.identifier++;
    }

    equals(other: GraphNode) {
        return this.id == other.id;
    }

    contains(x: number,y: number): boolean {
        return ((x - this.x)*(x - this.x) + (y - this.y)*(y - this.y) <= this.radius * this.radius)
    }

    /**
     * check if circles touch
     */
    intersects(x: number,y: number, radius:number) {
        let distance = Math.sqrt((x-this.x)*(x-this.x) + (y-this.y)*(y-this.y));
        return distance <= this.radius + radius
    }
}

export class Graph {
    private nodes: GraphNode[]
    private connections: number[][];
    constructor() {
        this.nodes = [];
        this.connections = [];
    }

    addNode(x: number,y: number,radius: number, value: string) {
        this.nodes.push(new GraphNode(x,y,radius, value));
    }

    find(x: number,y: number) {
        for (let node of this.nodes) {
            if (node.contains(x,y)) {
                return node;
            }
        }
    }
    intersectsAny(x: number,y: number,radius: number) {
        for (let node of this.nodes) {
            if (node.intersects(x,y,radius)) {
                return true;
            }
        }
        return false;
    }
    connect(a: GraphNode, b: GraphNode, directed: boolean) {
        let ai = this.nodes.findIndex((v,i,o) => a.equals(v));        
        let bi = this.nodes.findIndex((v,i,o) => b.equals(v));       
        if (ai == -1 || bi == -1) {
            return
        } 
        this.connections[ai].push(bi);
        if (!directed) {
            this.connections[bi].push(ai);
        }
    }

    getLineBetween(a: GraphNode,b: GraphNode) {
        return {
            x1: a.x,
            y1: a.y,
            x2: b.x,
            y2: b.y
        }
    }
}
