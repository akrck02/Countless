import { Config } from "../../config/Config.js";
import { Text } from "../../lang/Text.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import LoginViewMobile from "./LoginView.mobile.js";
import { Browser } from "../../lib/gtdf/components/Browser.js";
import Utils from "../../core/Utils.js";

export default class LoginView extends ViewUI {

    private static readonly ID = "home";

    public constructor(){
        super({
            type: "view",
            id: LoginView.ID,
            classes: ["box-column","box-center"],
        });
    }

    public show(params : string[], container : UIComponent) {

        Config.setTitle(`${Config.Base.app_name} - ${Text.login.title}`);

        if(Config.isLogged()) {
            Utils.redirect(Config.Views.income,[])
            return;
        }

        if(Browser.isSmallDevice() || Browser.isMobile()){
            new LoginViewMobile().show(params,container);
            return;
        }
        

        this.appendTo(container);

    }


}