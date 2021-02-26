export interface ControlValues {
    radius: number;
    nodeValue: string;
    [key: string]: string|number;
}

export class ValueController {
    private defaults: ControlValues;
    public values: ControlValues;
   
    constructor(root: HTMLElement, defaults: ControlValues) {
        this.defaults = defaults;
        this.values = Object.assign({}, defaults);

        for (let k in this.defaults) {
            let div = document.createElement("div");
            
            let label = document.createElement("label");
            label.setAttribute("for", k);
            label.textContent = k;

            let input = document.createElement("input");
            if (k in this.defaults) {
                input.value = this.defaults[k]?.toString() || "";
            }
            input.setAttribute("id", k);

            input.addEventListener("change", e => {
                this.handleInputValueChange(input);
            })

            div.appendChild(label);
            div.appendChild(input);

            root.appendChild(div);
        }
    }

    handleInputValueChange(input: HTMLInputElement) {
        let id = input.id;
        let value = input.value;
        if (typeof this.values[id] === "number") {
            let asInteger = parseInt(value);
            if (!isNaN(asInteger)) {
                this.values[id] = asInteger;
            }
        }
        else {
            this.values[id] = value;
        }
    }
}