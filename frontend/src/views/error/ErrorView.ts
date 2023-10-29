import { Config } from "../../config/Config.js";
import { getErrorByCode } from "../../config/Errors.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";

export default class ErrorView extends ViewUI {

    private static readonly DEFAULT_ERROR_CODE = 404;
    private static readonly ID = "error";
    private static readonly IMAGE_ID = "error-img";
    private static readonly TITLE_ID = "error-title";

    public constructor(){
        super({
            type: "view",
            id: ErrorView.ID,
            classes: ["box-column","box-center"],
        });
    }

    public show(params: string[], container: UIComponent) {
            
        const code = parseInt(params[0]);
        let error = getErrorByCode(code);
        
        // Default error set if no error parameter was given
        if(!error){
            error = getErrorByCode(ErrorView.DEFAULT_ERROR_CODE);
        }

        // Image
        const image = new UIComponent({
            type: "img",
            id: ErrorView.IMAGE_ID,
            attributes: {
                src: Config.Path.icons + "error.svg",
            },
        });
        this.appendChild(image);

        // Error title
        const title = new UIComponent({
            type: "h1",
            id: ErrorView.TITLE_ID,
            text: error.friendly,
        });
        
        this.appendChild(title);

        // Error description
        const description = new UIComponent({
            type : "p",
            text : error.description
        })

        this.appendChild(description);
        this.appendTo(container);
    }
    
}