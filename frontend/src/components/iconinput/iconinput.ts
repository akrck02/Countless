import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import MaterialIcons from "../../lib/gtdf/resources/MaterialIcons.js";


export enum IconInputType {
    TEXT = "text",
    PASSWORD = "password",
    EMAIL = "email",
    NUMBER = "number",
    DATE = "date",
}

interface IconInputOptions {
    name: string;
    icon: string;
    type: IconInputType;
    placeholder?: string;
    validation?: (value: string) => boolean;
}

export class IconInput extends UIComponent {

    private input : UIComponent;

    constructor(options: IconInputOptions) {
        super({
            type: "div",
            classes: ["icon-input"],
            styles: {
                width: "100%",
                maxWidth: "clamp(15rem, 80%, 25rem)",
            }
        });

        const labelContainer = new UIComponent({
            type: "div",
            classes: ["box-x-between", "box-y-center"],
            styles: {
                height: "2.5rem",
                width: "100%",
            }
        });

        labelContainer.appendTo(this);

        const label = new UIComponent({
            type: "label",
            classes: ["box-x-start", "box-y-center"],
            text: options.name,
            styles: {
                fontSize: ".9rem",
                fontWeight: "400",
                color: "#6F6F6F",
                marginLeft: "0.25rem",
            }
        });

        label.appendTo(labelContainer);

        const icon = MaterialIcons.get(options.icon,{
            fill: "#6F6F6F",
            size: "1.5em",
        });

        icon.setStyles({
            marginRight: "0.25rem",
        });

        icon.appendTo(labelContainer);

        this.input = new UIComponent({
            type: "input",
            classes: [],
            attributes: {
                type: options.type,
                name: options.name,
                placeholder: options.placeholder || "",
            },
            styles: {
                backgroundColor: "#F5F5F5",
                padding: "0.5rem 1rem",
                width: "100%",
                maxWidth: "25rem",
                border: "none",
                height: "2.5rem",
                borderRadius: "0.5rem",
            }
        });
        this.input.appendTo(this);
    }

    public getValue(): string {
        return this.input.getValue();
    }
}
