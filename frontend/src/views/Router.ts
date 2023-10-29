import { Config } from "../config/Config.js";
import SignalBuffer from "../core/SignalBuffer.js";
import { InitializeError } from "../errors/InitializeError.js";
import { UIComponent } from "../lib/gtdf/components/UIComponent.js";
import { IObserver } from "../lib/gtdf/core/observable/Observer.js";
import ErrorView from "./error/ErrorView.js";
import LoginView from "./login/LoginView.js";
import IncomeView from "./income/Income.view.js";
import OutcomeView from "./outcome/outcome.view.js";
export default class Router implements IObserver{

    private parent : HTMLElement;
    private container : UIComponent;

    constructor(){{

        this.parent = document.getElementById("view-container") as HTMLElement;
        
        //If no parent is present on the HTML file throws an error
        if(!this.parent){
            throw new InitializeError("view-container does not exist");
        }
        
        this.container = new UIComponent({
            type: "div",
            id: "view-container-box",
            styles: {
                width: "100%",
                height: "100%",
            },
        });

        this.container.appendTo(this.parent);

        const signal = SignalBuffer.search("changeView")        
        signal.subscribe(this);
    }}

    async update(data?: any): Promise<void> {
        console.log("Router update to: ", data);
        
        await this.load([data]);
    }

    /**
     * Load the app state with the given params
     * @param params The list of params
     */
    public load (params : string[]) {
        try{
            this.clear();
            this.container.clean();

            switch (params[0]) {
                case undefined:
                case "":
                case "login":
                    new LoginView().show(params.splice(1), this.container);    
                    break;
                case "income":
                    new IncomeView().show(params.splice(1), this.container);
                    break;
                case "outcome":
                    new OutcomeView().show(params.splice(1), this.container);
                    break;
                case "lang":
                    Config.setLanguage(params.splice(1)[0]);
                    location.href = Config.Views["Login"];
                    break;
                case "blank":
                    break;
                case "error":
                    new ErrorView().show(params.slice(1), this.container);
                    break;
                default:
                    new ErrorView().show(["404"], this.container);
            }

        } catch (error){
            console.error(error);
        }
    }

    /**
     * Clear the container
     */
    public clear() {
        this.container.element.innerHTML = "";
    }
}