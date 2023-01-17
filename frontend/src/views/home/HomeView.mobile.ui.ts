import App from "../../App.js";
import Select from "../../components/select/Select.js";
import { Config } from "../../config/Config.js";
import { getLanguageName } from "../../lang/Language.js";
import StringTools from "../../lib/gtd/data/stringtools.js";
import { setClasses, setEvents, setStyles, UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import HomeCore from "./HomeView.core.js";

export default class HomeViewMobile extends ViewUI {

    private static ID = "home-mobile";
    private static LOGO_ID = "logo";
    private static DESCRIPTION_ID = "description";
    private static START_MENU_ID = "start-menu";
    private static INFO_BOX_CLASS = "info-box";

    public constructor(){
        super({
            type: "view",
            id: HomeViewMobile.ID,
            classes: ["box-column","box-center"],
        });
    }


    public show(params : string[], container : UIComponent): void {
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
            id: HomeViewMobile.LOGO_ID,
            attributes : {
                src: Config.PATHS.ICONS + "logo.svg",
                alt: "GTD Framework logo"
            },
        })

        const title = new UIComponent({
            type : "h1",
            text :"💭 " + App.getBundle().home.WELCOME_MESSAGE + " 😉",
        })

        const text = new UIComponent({
            type : "p",
            id: HomeViewMobile.DESCRIPTION_ID,
            text : "💻&nbsp; " + App.getBundle().home.WELCOME_DESCRIPTION + " &nbsp;🚀",
        })

        const startMenu = this.createStartMenu();

        logo.appendTo(this);
        title.appendTo(this);
        text.appendTo(this);
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
            id: HomeViewMobile.START_MENU_ID,
            classes: ["box-row","box-center","box-warp"],
        })
        
        const helpBox = this.createInfoBox("hand.svg",
            App.getBundle().home.HELLO_WORLD, 
            App.getBundle().home.HELLO_WORLD_DESCRIPTION
        );

        const configBox = this.createInfoBox("settings.svg",
            App.getBundle().home.CONFIGURATIONS,
            App.getBundle().home.CONFIGURATIONS_DESCRIPTION
        );

        const contributeBox = this.createInfoBox("github.svg",
            App.getBundle().home.CONTRIBUTE,
            App.getBundle().home.CONTRIBUTE_DECRIPTION,
            HomeCore.CONTRIBUTE_URL,
            true
        );

        helpBox.appendTo(menu);
        configBox.appendTo(menu);
        contributeBox.appendTo(menu);

        return menu;
    }


    public createInfoBox(image : string, title : string, message : string, url : string  = undefined, newPage : boolean = false) : UIComponent {

        const infoBox = new UIComponent({
            classes: [HomeViewMobile.INFO_BOX_CLASS, "box-column", "box-center","text-center"],
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