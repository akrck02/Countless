import App from "../../App.js";
import { Config } from "../../config/Config.js";
import { getErrorByCode } from "../../config/Errors.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";

export default class DevelopmentView extends ViewUI {

    private static ID = "development";
    private static IMAGE_ID = "dev-img";
    private static TITLE_ID = "dev-title";

    public constructor(){
        super({
            type: "view",
            id: DevelopmentView.ID,
            classes: ["box-column","box-center"],
        });
    }

    public show(params: string[], container: UIComponent): void {
            
        const code = parseInt(params[0]);
        let error = getErrorByCode(code);
        
        // Image
        const image = new UIComponent({
            type: "img",
            id: DevelopmentView.IMAGE_ID,
            attributes: {
                src: Config.PATHS.ICONS + "development.svg",
            },
        });
        this.appendChild(image);

        // Error title
        const title = new UIComponent({
            type: "h1",
            id: DevelopmentView.TITLE_ID,
            text: App.getBundle().system.VIEW_UNDER_DEVELOPMENT,
        });
        
        this.appendChild(title);
        this.appendTo(container);
    }
    
}