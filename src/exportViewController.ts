import { Graph } from "./model";

export class ExportViewController {
    private graph: Graph;
    private link: HTMLLinkElement;

    constructor(graph: Graph, link: HTMLLinkElement) {
        this.graph = graph;
        this.link = link;
    }

    handleExport(e: Event) {
        let content = JSON.stringify(this.graph, null, 4);
        const blob = new Blob([content], {type:"application/json"})
        let url = URL.createObjectURL(blob);
        this.link.href = url;
    }
}