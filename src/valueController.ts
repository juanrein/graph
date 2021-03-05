/**
 * Settings for drawing on canvas
 */

export enum Mode {
    DELETE = "delete", 
    ADD = "add"
}

export interface ControlValues {
    radius: number;
    nodeValue: string;
    edgeValue: string;
    mode: Mode;
    [key: string]: string|number;
}

export class ValueController {
    private defaults: ControlValues;
    public values: ControlValues;
   
    constructor(defaults: ControlValues) {
        this.defaults = defaults;
        this.values = Object.assign({}, defaults);
    }

    handleInputValueChange(input: HTMLInputElement) {
        let id = input.id;
        let value = input.value;
        
        switch (id) {
            case "edgeValue":
                this.values.edgeValue = value;
                break;
            case "nodeValue":
                this.values.nodeValue = value;
                break;
            case "radius":
                let asNumber = parseFloat(value);
                if (!isNaN(asNumber) && asNumber > 0) {
                    this.values.radius = asNumber;
                }
                break;
            case "delete":
                this.values.mode = Mode.DELETE;
                break;
            case "add":
                this.values.mode = Mode.ADD;
                break; 
            default:
                console.error(id, value);
                break;
        }
    }
}