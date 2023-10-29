import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import MaterialIcons from "../../lib/gtdf/resources/MaterialIcons.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import IncomeCore from "./transaction.core.js";

export enum TransactionType {
    INCOME = "income",
    OUTCOME = "outcome",
}

@Route("transactions")
@Singleton()
export default class TransactionsView extends ViewUI {

    private static ID = "income";

    private transcationType : string;

    public constructor(){
        super({
            type: "view",
            id: TransactionsView.ID,
            classes: ["box-column","box-center"],
            styles:{
                padding:"1rem 2rem",
                paddingBottom: "10rem",
                paddingTop: "7rem",
            }
        });
    }

    public async show(params : string[], container : UIComponent) {

        this.transcationType = params[0];

        this.setStyles({
            opacity: "0",
            transition: "opacity 0.5s ease-in-out",
        });
        
        if(this.transcationType !== TransactionType.INCOME){
            this.transcationType = TransactionType.OUTCOME;
        }

        switch (this.transcationType) {
            case TransactionType.INCOME:
                IncomeCore.getIncomes().then((data) => this.instanceDataCards(this,data))
                break;
            case TransactionType.OUTCOME:
                IncomeCore.getOutcomes().then((data) => this.instanceDataCards(this,data))
                break;
        }
            
  
        
        this.appendTo(container);

        this.setStyles({
            opacity: "1",
        });
    }


    private instanceDataCards(parent, data: any) {       
        
        if(!data  || data.length === 0){
            const div = new UIComponent({
                type: "div",
                classes: ["box-row","box-y-center", "box-x-center"],
                styles: {
                    width: "100%",
                    minHeight: "4rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "0.5rem",
                    marginBottom: "0.75rem",
                },
            });

            const title = new UIComponent({
                type: "p",
                text: "No hay transacciones",
                styles: {
                    fontWeight: "400",
                    color: "#6F6F6F",
                    width: "80%",
                }
            });

            const icon = MaterialIcons.get("info",{
                fill: "#6F6F6F",
                size: "1.5em",
            });



            title.appendTo(div);
            icon.appendTo(div);
            div.appendTo(parent);
            return;
        }


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
                    marginTop: "1rem",
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
            div.appendTo(parent);
        });
        
    }
}