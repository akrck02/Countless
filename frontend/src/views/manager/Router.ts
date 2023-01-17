import { Config } from "../../config/Config.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import ManagerConnectView from "./connect/ConnectView.ui.js";

export default class Router {

    private parent: UIComponent;

    public constructor(parent: UIComponent) {
        this.parent = parent;
    }

    /**
    * Load the view state with the given params
    * @param params The list of params
    */
    public load(params: string[]) {

        console.log(params);
        
        try {
            this.clear();

            switch (params[0]) {
                case Config.VIEWS.MANAGER_AUTO:

                    break;
                case Config.VIEWS.MANAGER_MENU:

                    break;
                case Config.VIEWS.MANAGER_LIST:

                    break;
                case Config.VIEWS.MANAGER_ORDER:

                    break;
                default: // By default lead to Connect view 
                    new ManagerConnectView().show(params.splice(1),this.parent)

            }

        } catch (error) {
            console.error(error);
        }
    }


    private clear() {
        this.parent?.clean();
    }


}