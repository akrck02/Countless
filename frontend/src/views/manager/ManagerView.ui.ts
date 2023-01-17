import Navbar from "../../components/navbar/Navbar.ui.js";
import { isSmallDevice } from "../../lib/gtd/web/responsivetools.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import DevelopmentView from "../development/Development.ui.js";
import HomeViewMobile from "../home/HomeView.mobile.ui.js";
import ManagerViewMobile from "./ManagerView.mobile.ui.js";

export default class ManagerView extends ViewUI {

    private static ID = "manager";

    private navbar : Navbar;
    private body : UIComponent;
    
    public constructor(){
        super({
            type: "view",
            id: ManagerView.ID,
            classes: ["box-row","box-x-start"],
            styles: {
                height: "100%", 
                background : "#fff"
            }
        })

        this.navbar = new Navbar();

        this.navbar.addButton("List", "format_list_bulleted", () => { alert({message : "List", icon : "format_list_bulleted"})} , true);
        this.navbar.addButton("Coffee", "coffee", () => { alert({message : "Coffee", icon : "coffee"})} , false);
        this.navbar.addButton("Auto", "autorenew", () => { alert({message : "Auto", icon : "autorenew"})} , false);  

        this.body = new UIComponent({
            type: "div",
            id: "body",
            classes: ["box-column","box-x-start"],
        })

        const copyright = new UIComponent({
            type: "div",
            id: "copyright",
            text: "akrck02 - 2022",
            classes: ["box-row","box-x-start"],
            styles: {
                fontSize : "1rem",
                color : "#999",
                padding : "0.25em",
                position: "absolute",
                bottom: "1.5rem",
                right: "1.8rem",
            }
        })

        this.navbar.appendTo(this);
        this.body.appendTo(this);
        copyright.appendTo(this);
    }

    public async show(params : string[], container : UIComponent): Promise<void> {
        
        if(isSmallDevice()){
            new ManagerViewMobile().show(params,container);
            return;
        }
        
        new DevelopmentView().show(params,container);

        //this.appendTo(container);
    }

    
}