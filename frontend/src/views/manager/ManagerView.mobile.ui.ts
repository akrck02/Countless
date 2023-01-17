import Navbar from "../../components/navbar/Navbar.ui.js";
import { Config } from "../../config/Config.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import Router from "./Router.js";

export default class ManagerViewMobile extends ViewUI {

    private static ID = "manager";

    private navbar : Navbar;
    private body : UIComponent;
    private router : Router;
    
    public constructor(){
        super({
            type: "view",
            id: ManagerViewMobile.ID,
            classes: ["box-column","box-x-start"],
            styles: {
                height: "100%", 
                background : "#fff"
            }
        })

        this.body = new UIComponent({
            type: "div",
            id: "body",
            classes: ["mobile","box-column","box-x-start"],
        })

        this.navbar = new Navbar(true);

        // Create buttons for the navbar
        this.navbar.addButton("Connect", "wifi", () => this.show([Config.VIEWS.MANAGER_CONNECT],this.body), false);
        this.navbar.addButton("Menu", "restaurant_menu", () => this.show([Config.VIEWS.MANAGER_MENU],this.body) , false);
        this.navbar.addButton("List", "format_list_bulleted", () => this.show([Config.VIEWS.MANAGER_LIST],this.body) , false);
        this.navbar.addButton("Order", "coffee", () => this.show([Config.VIEWS.MANAGER_ORDER],this.body) , false);
        this.navbar.addButton("Auto", "autorenew", () => this.show([Config.VIEWS.MANAGER_AUTO],this.body) , false);  

        // Append body an navbar to the view
        this.body.appendTo(this);
        this.navbar.appendTo(this);

        // Create a router for this view
        this.router = new Router(this.body);
    }

    public async show(params : string[], container : UIComponent): Promise<void> {
        this.router.load(params);
        this.appendTo(container);
    }    
    
}


// alert({message : "Connect", icon : "wifi"})