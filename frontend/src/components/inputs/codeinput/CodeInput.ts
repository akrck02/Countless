import { getMaterialIcon } from "../../../lib/gtd/material/materialicons.js";
import { UIComponent } from "../../../lib/gtd/web/uicomponent.js";

export default class CodeInput extends UIComponent {

    private input : UIComponent;


    public constructor(){
        super({
            type : "codeinput",
            classes : ["box-row"],
            styles : {
                background : "#EEE",
                borderRadius : "10rem",
                padding : ".25rem .35rem"
            }
        })


        this.input = new UIComponent({
            type: "input",
            attributes : {
                type : "text"
            },
            styles : {
                borderRadius : "10rem",
            }
        })

        const checkButton = new UIComponent({
            type : "button",
            styles: {
                background : "var(--accent-color)",
                borderRadius : "10rem"
            }
        })

        const checkIcon = getMaterialIcon("check",{
            size : "1.35rem",
            fill : "#fff"
        })

        checkIcon.appendTo(checkButton);

        this.input.appendTo(this);
        checkButton.appendTo(this);
    }


    /**
     * Get the code value inside the input
     * @returns 
     */
    public getCode() : number {
        try{
            return parseInt((this.input.element as HTMLInputElement).value);
        } catch(error){
            return undefined;
        }
    }



}