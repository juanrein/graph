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
    mode: Mode,
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
        let type = input.type;
        
        if (type === "number") {
            let asInteger = parseInt(value);
            if (!isNaN(asInteger)) {
                this.values[id] = asInteger;
            }
        }
        else if (type === "radio") {
            if (value === "add") {
                this.values.mode = Mode.ADD;
            }
            else {
                this.values.mode = Mode.DELETE;
            }
        }
        else {
            this.values[id] = value;
        }
    }
}