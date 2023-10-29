import SignalBuffer from "../../core/SignalBuffer.js";
import DOM, { HTML } from "../../lib/gtdf/components/Dom.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { Signal } from "../../lib/gtdf/core/signals/Signal.js";
import MaterialIcons from "../../lib/gtdf/resources/MaterialIcons.js";

export default class BottomBar extends UIComponent {

    private static readonly ID = "bottombar";
    public static readonly changeView : Signal = new Signal("changeView");
    private static _instance : BottomBar;
    
    
    private constructor(){
        super({
            type: "div",
            id: BottomBar.ID,
            classes: ["box-row","box-x-center","box-y-center"]
        });

        const actionButton = this.instanceActionButton("plus", () => { console.log("click") });
        this.appendChild(actionButton);
            
 
        const incomeButton = this.instanceIncomeButton();
        this.appendChild(incomeButton);

        const outcomeButton = this.instanceOutcomeButton();
        this.appendChild(outcomeButton);
    }

    public instanceActionButton(icon : string, callback : Function) : UIComponent {
        const newButton = new UIComponent({
            type: "button",
            classes: ["box-column","box-x-center","box-y-center", "primary-button"],
        });

        const buttonIcon = MaterialIcons.get("plus", {
            size: "3.25rem",
            fill: "#EAEAEA",
        });

        newButton.setEvents({
            click: callback,
        });
        
        newButton.appendChild(buttonIcon);
        return newButton;
    }

    public instanceIncomeButton() : UIComponent {
        const incomeButton = this.instanceGenericBarButton("savings", "Income", () => { 
           this.setSelected("income-button")
            BottomBar.changeView.content = "income";
            BottomBar.changeView.notify();
        }, true);
        incomeButton.element.id = "income-button";
        return incomeButton;
    }

    public instanceOutcomeButton() : UIComponent {
        const OutcomeButton = this.instanceGenericBarButton("payment", "Outcome", () => { 
            
            this.setSelected("outcome-button")
            BottomBar.changeView.content = "outcome";
            BottomBar.changeView.notify();
        
        });
        OutcomeButton.element.id = "outcome-button";
        return OutcomeButton;
    }

    public instanceGenericBarButton(icon : string, text : string, callback : Function, selected : boolean = false) : UIComponent {
        const incomeButton = new UIComponent({
            type: "button",
            classes: ["box-column","box-x-center","box-y-center", "secondary-button"]
        });

        if(selected) {
            incomeButton.setClasses(["selected"]);
        }

        const incomeIcon = MaterialIcons.get(icon, {
            size: "1.2rem",
            fill: "#767575",
        });

        incomeIcon.setStyles({
            marginTop: ".15rem",
        }); 

        incomeButton.appendChild(incomeIcon);

        const incomeText = new UIComponent({
            type: "span",
            text: text,
            styles: {
                marginTop: ".15rem",
            }
        });


        incomeButton.setEvents({
            click: callback,
        });

        incomeButton.appendChild(incomeText);
        return incomeButton;
    }

    public setSelected(id : string) {
        
        const buttons = DOM.forAll("#bottombar .secondary-button", (element : HTMLButtonElement) => {
            element.classList.remove("selected");
            
            if(element.id == id) {
                element.classList.add("selected");
            }
        });
    }

    public static instance() : BottomBar {
        if(!BottomBar._instance) 
            BottomBar._instance = new BottomBar();
        return BottomBar._instance;
    }
}

SignalBuffer.add(BottomBar.changeView);

