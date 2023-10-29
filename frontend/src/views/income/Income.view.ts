import BottomBar from "../../components/bottombar/Bottombar.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import IncomeCore from "./income.core.js";

export default class IncomeView extends ViewUI {

    private static ID = "income";

    public constructor(){
        super({
            type: "view",
            id: IncomeView.ID,
            classes: ["box-column","box-center"],
            styles:{
                padding:"1rem 2rem"
            }
        });
    }

    public async show(params : string[], container : UIComponent) {


        const title = new UIComponent({
            type: "h1",
            classes: ["text-center"],
            text: "Income Mobile",
            styles: {
                marginBottom: "2rem",
            }
        })

        IncomeCore.getIncomes().then((data) => {
            
            data.forEach((element) => {
                const div = new UIComponent({
                    type: "div",
                    classes: ["box-column","box-y-start", "box-x-center"],
                    styles: {
                        width: "100%",
                        minHeight: "4rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#F5F5F5",
                        borderRadius: "0.5rem", 
                        marginBottom: "0.75rem",
                    },
                });

                const titleContainer = new UIComponent({
                    type: "div",
                    classes: ["box-row","box-y-center", "box-x-between"],
                    styles: {
                        width: "100%",
                        height: "100%",
                    },
                });

                const title = new UIComponent({
                    type: "p",
                    text: element["description"],
                    styles: {
                        fontWeight: "400",
                        color: "#6F6F6F",
                    }
                });

                const amount = new UIComponent({
                    type: "p",
                    classes: ["text-center"],
                    text: element["amount"] + "€",
                    styles: {
                        color: "#A9A9A9",
                        fontSize: ".9rem",
                    }
                });

                title.appendTo(titleContainer);
                amount.appendTo(titleContainer);

                const date = new UIComponent({
                    type: "p",
                    text: new Date(element["date"]).toLocaleDateString(),
                    classes: ["box-row","box-y-center", "box-x-start"],
                    styles: {
                        color: "#A9A9A9",
                        marginTop: "0.35rem",
                        fontSize: "0.7rem",
                    }
                });

                titleContainer.appendTo(div);
                date.appendTo(div);
                div.appendTo(this);
                      
            });
        })

        const bottombar = BottomBar.instance();
        title.appendTo(this);
        bottombar.appendTo(this);
        this.appendTo(container);
    }

}