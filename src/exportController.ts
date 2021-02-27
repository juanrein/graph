import { Graph } from "./graph";

/**
 * Copying to clipboard
 */
export class ExportController {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    handleExport(e: Event) {
        let content = JSON.stringify(this.graph, null, 4);

        navigator.clipboard.writeText(content);
    }
}