import { config } from "../../../../node_modules/dotenv/lib/main.js";
import App from "../../App.js";
import Select from "../../components/select/Select.js";
import { Config } from "../../config/Config.js";
import Utils from "../../core/Utils.js";
import { getLanguageName } from "../../lang/Language.js";
import StringTools from "../../lib/gtd/data/stringtools.js";
import { setClasses, setEvents, setStyles, UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { UserService } from "../../services/UserService.js";
import HomeCore from "./HomeView.core.js";

export default class HomeView extends ViewUI {

    private static ID = "home";
    private static LOGO_ID = "logo";
    private static DESCRIPTION_ID = "description";

    private static LOGIN_ID = "login";
    private static REGISTER_ID = "register";

    private static START_MENU_ID = "start-menu";
    private static INFO_BOX_CLASS = "info-box";

    public constructor(){
        super({
            type: "view",
            id: HomeView.ID,
            classes: ["box-column","box-center"],
        });
    }

    public show(params : string[], container : UIComponent): void {

        
        if(UserService.checkAccessToken()){
            Utils.redirect(Config.VIEWS.MANAGER,[]);
            return;
        }
    
        
        const lang = StringTools.toNormalCase(getLanguageName(Config.getLanguage()));
        const select = new Select(HomeCore.getLanguages(),HomeCore.setLanguage,lang);
        setStyles(select.element,{
            position: "absolute",
            right: "2rem",
            top: "1rem"
        })

        select.appendTo(this);

        const logo = new UIComponent({
            type : "img",
            id: HomeView.LOGO_ID,
            attributes : {
                src: Config.PATHS.ICONS + "logo.svg",
                alt: "CoffeeManager logo"
            },
        })

        const text = new UIComponent({
            type : "p",
            id: HomeView.DESCRIPTION_ID,
            text : `${App.getBundle().home.WELCOME_DESCRIPTION}`,
        })

        const buttonBar = new UIComponent({
            type: "div",
            classes : ["box-row","box-center"]
        })

        const title = new UIComponent({
            type : "h1",
            text : App.getBundle().home.WELCOME_MESSAGE,
        })

        const login = new UIComponent({
            type : "button",
            id: HomeView.LOGIN_ID,
            text : App.getBundle().home.LOGIN ,
        })

        setEvents(login.element,{
            click : (e : Event) => {
                e.preventDefault();
                e.stopPropagation();
                
                Utils.redirect(Config.VIEWS.LOGIN,[]);
            }
        })

        login.appendTo(buttonBar);
       

        const register = new UIComponent({
            type : "button",
            id: HomeView.REGISTER_ID,
            text : App.getBundle().home.REGISTER ,
        })

        setEvents(register.element,{
            click : (e : Event) => {
                e.preventDefault();
                e.stopPropagation();
                
                Utils.redirect(Config.VIEWS.REGISTER,[]);
            }
        })

        register.appendTo(buttonBar);


        const startMenu = this.createStartMenu();

        logo.appendTo(this);
        title.appendTo(this);
        text.appendTo(this);
        buttonBar.appendTo(this);
        startMenu.appendTo(this);

        this.appendTo(container);
    }


    /**
     * Create the start menu component 
     * @returns The menu created.
     */
    private createStartMenu() : UIComponent {

        const menu = new  UIComponent({
            type: "div",
            id: HomeView.START_MENU_ID,
            classes: ["box-row","box-center","box-warp"],
        })

        const contributeBox = this.createInfoBox("github.svg",
            App.getBundle().home.CONTRIBUTE,
            App.getBundle().home.CONTRIBUTE_DECRIPTION,
            HomeCore.CONTRIBUTE_URL,
            true
        );

        contributeBox.appendTo(menu);

        return menu;
    }


    public createInfoBox(image : string, title : string, message : string, url : string  = undefined, newPage : boolean = false) : UIComponent {

        const infoBox = new UIComponent({
            classes: [HomeView.INFO_BOX_CLASS, "box-column", "box-center","text-center"],
        });

        const infoBoxIcon = new UIComponent({
            type : "img",
            attributes : {
                src: Config.PATHS.ICONS + image,
                alt: "Hello world icon"
            },
        }) 

        infoBoxIcon.appendTo(infoBox);

        const infoBoxTitle = new UIComponent({
            type : "h2",
            text : title
        })

        infoBoxTitle.appendTo(infoBox);

        const infoBoxDescription = new UIComponent({
            type : "p",
            text : message,
            classes: ["description"],
        });
        infoBoxDescription.appendTo(infoBox)

        // if url is defined set action listener
        if(url){

            // Set "clickable" style and behaviour
            setClasses(infoBox.element,["clickable"]);

            // Setting event
            setEvents(infoBox.element,{
                click : (e : Event) => {
                    e.preventDefault()
                    e.stopPropagation();

                    window.open(url,newPage? "blank" : "");
                }
            })
        }

        return infoBox;
    }


}