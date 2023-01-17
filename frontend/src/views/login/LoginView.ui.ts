import App from "../../App.js";
import { Config } from "../../config/Config.js";
import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { setEvents, UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { UserService } from "../../services/UserService.js";
import LoginCore from "./LoginView.core.js";
import Utils from "../../core/Utils.js";
import { config } from "../../../../node_modules/dotenv/lib/main.js";


export default class LoginView extends ViewUI {

    private static ID = "login";
    private static TITLE_ID = "title";
    private static USERNAME_ID = "username";
    private static PASSWORD_ID = "password";
    private static GO_BUTTON_ID = "go-button";
    private static GO_LINK_ID = "go-link";
    
    public constructor(){
        super({
            type: "view",
            id: LoginView.ID,
            classes: ["box-column","box-center"],
        })
    }

    public async show(params : string[], container : UIComponent): Promise<void> {

        const title = new UIComponent({
            type: "h1",
            id: LoginView.TITLE_ID,
            text: App.getBundle().login.LOGIN
        })

        title.appendTo(this);

        const username = new UIComponent({
            type: "input",
            id: LoginView.USERNAME_ID,
            attributes : {
                type: "text",
                placeholder : App.getBundle().login.USERNAME
            },
        })

        username.appendTo(this)

        const password = new UIComponent({
            type: "input",
            id: LoginView.PASSWORD_ID,
            attributes : {
                type: "password",
                placeholder : App.getBundle().login.PASSWORD
            },
        })

        password.appendTo(this);

        const button = new UIComponent({
            type: "button",
            id: LoginView.GO_BUTTON_ID,
            text: App.getBundle().login.GO + "&nbsp;",
        })
        button.appendTo(this);

        setEvents(button.element, {
            click : () => {

                const usr = (username.element as HTMLInputElement).value
                const psw = (password.element as HTMLInputElement).value

                const response = UserService.login(usr,psw);

                response.success((json) => {

                    const auth = json.auth;
                    const username = json.username;

                    Config.setUsername(username);
                    Config.setAccessToken(auth);
                    
                    Utils.redirect(Config.VIEWS.HOME,[],true);                    
                })

                response.json();
            }
        })


        const coffeeIcon = getMaterialIcon("expand",{
            size: "1.5rem",
            fill: "#444"
        });

        coffeeIcon.element.style.transform = "rotate(-90deg)";
        coffeeIcon.appendTo(button);


        const registerLink = new UIComponent({
            type : "a",
            id: LoginView.GO_LINK_ID,
            text : App.getBundle().home.REGISTER,
            attributes : {
                href : Config.VIEWS.REGISTER
            }
        })

        registerLink.appendTo(this);
        this.appendTo(container);
    }

}