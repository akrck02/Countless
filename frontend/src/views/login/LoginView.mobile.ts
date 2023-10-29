
import { IconInput, IconInputType } from "../../components/iconinput/iconinput.js";
import SignalBuffer from "../../core/SignalBuffer.js";
import { Text } from "../../lang/Text.js";
import { HTML } from "../../lib/gtdf/components/Dom.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Gtdf } from "../../lib/others/Gtdf.js";
import LoginCore from "./LoginView.core.js";

export default class LoginViewMobile extends ViewUI {

    private static readonly ID = "login-mobile";
    private static readonly PANEL_ID = "login-form";
    private static readonly BUTTON_ID = "login-button";
    private static readonly FORGOT_PASSWORD_LINK_ID = "forgot-password-link";
    private static readonly NEW_USER_LINK_ID = "new-user-link";

    private static readonly MAIL_ICON = "mail";
    private static readonly LOCK_ICON = "lock";


    public constructor(){
        super({
            type: HTML.VIEW,
            id: LoginViewMobile.ID,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER], 
        });
    }

    public show(params : string[], container : UIComponent) {

        const panel = new UIComponent({
            type: HTML.DIV,
            id : LoginViewMobile.PANEL_ID,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER],
        });

        const title = new UIComponent({
            type: HTML.H1,
            classes: [Gtdf.TEXT_CENTER],
            text: Text.login.appName,
        })

        title.appendTo(panel); 

        const emailInput = new IconInput({
            name: Text.login.email,
            icon: LoginViewMobile.MAIL_ICON,
            type: IconInputType.EMAIL,
        });

        emailInput.appendTo(panel);

        const passwordInput = new IconInput({
            name: Text.login.password,
            icon: LoginViewMobile.LOCK_ICON,
            type: IconInputType.PASSWORD,
        });

        passwordInput.appendTo(panel);

        const loginButton = new UIComponent({
            type: HTML.BUTTON,
            id: LoginViewMobile.BUTTON_ID,
            classes: [Gtdf.BOX_CENTER],
            text: Text.login.login,
        });

        loginButton.appendTo(panel);
        loginButton.setEvents({
            click: async () => {
                if(await LoginCore.login(emailInput.getValue(), passwordInput.getValue())){
                    
                    const signal = SignalBuffer.search("changeView");
                    signal.content = "income";
                    signal.notify();
                    return;
                }
            }
        });

        const forgotPassword = new UIComponent({
            type: HTML.A,
            id: LoginViewMobile.FORGOT_PASSWORD_LINK_ID,
            classes: [Gtdf.TEXT_CENTER],
            text: Text.login.forgotPassword,
            attributes: {
                href: "#",
            }
        });

        forgotPassword.appendTo(panel);


        const register = new UIComponent({
            type: HTML.A,
            id: LoginViewMobile.NEW_USER_LINK_ID,
            classes: [Gtdf.TEXT_CENTER],
            text: Text.login.newUser,
            attributes: {
                href: "#",
            }
        });

        register.appendTo(this);
        panel.appendTo(this);
        this.appendTo(container);
    }

}