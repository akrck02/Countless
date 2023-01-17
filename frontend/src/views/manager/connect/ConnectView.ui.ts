import CodeInput from "../../../components/inputs/codeinput/CodeInput.js";
import { Config } from "../../../config/Config.js";
import { UIComponent } from "../../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../../lib/gtdf/views/ViewUI.js";

export default class ManagerConnectView extends ViewUI{

    public constructor(){
        super({
            styles : {
                width : "100%",
                height: "100%",
                paddingTop: "10%",
                alignItems : "center",
                background : "#ffff"
            },
            classes : ["box-column"]
        });
    }

    public async show(params : string[], container : UIComponent): Promise<void> {
        
        const logo = new UIComponent({
            type : "img",
            styles:{
              height: "10rem",
              marginBottom : "2rem"  
            },
            attributes : {
                src : Config.PATHS.ICONS + "logo.svg",
                alt : "coffemanager logo"
            }
        }) 

        const title = new UIComponent({
            type : "h2",
            text : "Coffee Manager",
            styles : {
                fontSize : "1.75rem",
                marginBottom : "5%"  
            }

        })

        const description = new UIComponent({
            type : "p",
            text : "insert your code",
            styles : {
                marginBottom : "5%"  
            }
        });

        const input = this.createInput();

        const or = new UIComponent({
            type : "p",
            text : "or",
            styles : {
                margin : "5% 0"  
            }
        });

        const createButton = new UIComponent({
            type: "button",
            text : "Create group",
            styles : {
                padding : ".75rem",
                background : "#EEE",
                borderRadius: "10rem",
                color: "#606060"
            }
        })

        logo.appendTo(this);
        title.appendTo(this);
        description.appendTo(this)
        input.appendTo(this);
        or.appendTo(this);
        createButton.appendTo(this);
       
        this.appendTo(container);
    }



    createInput() : UIComponent {
        const input = new CodeInput();
        return input;
    }
}