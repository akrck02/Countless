import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";

export default class Navbar extends UIComponent {

    private buttons : UIComponent[];

    constructor(mobile : boolean = false) {

        const classes = mobile ? ["mobile"] : [];

        super({
            type: "nav",
            id : "navbar",
            classes : classes            
        });

        this.buttons = [];
    }


    /**
     * Add a button to the navbar
     * @param name The name of the button
     * @param icon The icon of the button
     * @param onClick The onClick event of the button
     */
    public addButton( name : string, icon : string, onClick : () => void , selected : boolean) : void {
        
        const button = new UIComponent({
            type: "button",
            classes : ["nav-button"],
            events: {
                click: () => {
                    onClick();
                    const index = this.buttons.indexOf(button);
                    this.selectButton(index);
                }
            },
            attributes: {
                title: name
            },
        }) 

        if (selected) {
            button.element.classList.add("selected");
        }

        const iconComp = getMaterialIcon(icon,{
            size: "1.75rem",
            fill: "#404040",
        });

        iconComp.appendTo(button);

        button.appendTo(this);
        this.buttons.push(button);
    }

    /**
     * Select a button in the navbar
     * @param index The index of the button to select
     */
    public selectButton(index : number) : void {

        this.element.dataset.selected = index + "";

        this.buttons.forEach((button, i) => {
            if (i === index) {
                button.element.classList.add("selected");
            } else {
                button.element.classList.remove("selected");
            }
        } );
    }

}