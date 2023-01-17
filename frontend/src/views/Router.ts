import { Config } from "../config/Config.js";
import Utils from "../core/Utils.js";
import { InitializeError } from "../errors/InitializeError.js";
import { UIComponent } from "../lib/gtd/web/uicomponent.js";
import ErrorView from "./error/ErrorView.ui.js";
import HomeView from "./home/HomeView.ui.js";
import LoginView from "./login/LoginView.ui.js";
import ManagerView from "./manager/ManagerView.ui.js";
import RegisterView from "./register/RegisterView.ui.js";

export default class Router {

    private parent : HTMLElement;
    private container : UIComponent;
    private static RESTRICTED_ROUTES = [
        "manager"
    ]


    constructor(){{

        this.parent = document.getElementById("view-container") as HTMLElement;
        this.parent.style.height = "100%";
        
        //If no parent is present on the HTML file throws an error
        if(!this.parent){
            throw new InitializeError("view-container does not exist");
        }
        
        this.container = new UIComponent({
            type: "div",
            id: "view-container-box",
        });

        this.container.appendTo(this.parent);
    }}

    /**
     * Load the app state with the given params
     * @param params The list of params
     */
    public load (params : string[]) {
        try{
            this.clear();

            if(this.isRestricted(params[0]) && !Config.getAccessToken()) {
               Utils.redirect(Config.VIEWS.HOME, [], true);
            }

            switch (params[0]) {
                case undefined:
                case "":
                case "home":
                    new HomeView().show(params.splice(1), this.container);    
                    break;
                case "register":
                    new RegisterView().show(params.splice(1), this.container);   
                    break;
                case "login":
                    new LoginView().show(params.splice(1), this.container);   
                    break;
                case "manager":
                    new ManagerView().show(params.splice(1), this.container);   
                    break;
                case "lang":
                    Config.setLanguage(params.splice(1)[0]);
                    location.href = Config.VIEWS.HOME;
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

    /**
     * Get if the route is restricted and access token is needed
     * @param route The route to check
     * @returns True if the route is restricted and access token is needed
     */
    private isRestricted(route : string) : boolean {
        return Router.RESTRICTED_ROUTES.indexOf(route) != -1;
    }
}