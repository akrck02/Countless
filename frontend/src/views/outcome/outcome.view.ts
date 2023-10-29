import BottomBar from "../../components/bottombar/Bottombar.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";

export default class OutcomeView extends ViewUI {

    private static ID = "outcome";

    public constructor(){
        super({
            type: "view",
            id: OutcomeView.ID,
            classes: ["box-column","box-center"],
            styles:{
                padding:"1rem 2rem"
            }
        });
    }

    public show(params : string[], container : UIComponent) {


        const title = new UIComponent({
            type: "h1",
            classes: ["text-center"],
            text: "Outcome Mobile",
        })

        const bottombar = BottomBar.instance();

        title.appendTo(this);
        bottombar.appendTo(this);
        this.appendTo(container);
    }

}