/**
 * Graph datastructure
 * with adjacency list of connections
 */

import { Circle, intersects, contains, Point, getLineBetween, middle, EdgeText } from "./geometry"

export interface Edge {
    to: number;
    value: string;
}

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
    public connections: Edge[][];
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

    /**
     * Creates edge between nodes a and b with given value
     */
    connect(a: GraphNode, b: GraphNode, edgeValue: string) {
        let ai = this.nodes.findIndex(v => a.equals(v));
        let bi = this.nodes.findIndex(v => b.equals(v));
        if (ai == -1 || bi == -1) {
            throw new Error(`Both nodes don't exist ${a} ${b}`);
        }
        if (!this.connections[ai].find(edge => edge.to === bi)) {
            this.connections[ai].push({to: bi, value: edgeValue});
            if (!this.directed && !this.connections[bi].find(edge => edge.to === ai)) {
                this.connections[bi].push({to: ai, value: edgeValue});
            }
        }

    }

    /**
     * lines connecting nodes, edge values and their locations
     */
    getConnectionsAsLines() {
        let lines = [];
        for (let i=0; i<this.connections.length; i++) {
            let circle = this.nodes[i].circle;
            for (let j=0; j<this.connections[i].length; j++) {
                let neighbor = this.nodes[this.connections[i][j].to];
                let value = this.connections[i][j].value;
                let line = getLineBetween(circle, neighbor.circle);
                let edgeText: EdgeText = {
                    point: middle(line),
                    text: value
                }
                lines.push({
                    line: line,
                    text: edgeText
                });
            }
        }
        return lines;
    }

    /**
     * removes this node from nodes
     * removes this node's connections
     * removes connections from others to this node
     */
    delete(node: GraphNode) {
        let index = this.nodes.findIndex(n => n.equals(node));
        if (index === -1) {
            throw new Error(`Node doesn't exist ${node}`);
        }
        this.nodes.splice(index, 1);
        this.connections.splice(index, 1);
    
        for (let i=0; i <this.connections.length; i++) {
            //remove connection to deleted node
            let removedI = this.connections[i].findIndex(edge => edge.to === index);
            if (removedI !== -1) {
                this.connections[i].splice(removedI, 1);
            }
            //decrement index of connection indexes that are now offsetted by the deletion
            for (let j = 0; j < this.connections[i].length; j++) {
                if (this.connections[i][j].to > index) {
                    this.connections[i][j].to--;
                }
            }
        }

    }
}
