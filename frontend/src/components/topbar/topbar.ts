import SignalBuffer from "../../core/SignalBuffer.js";
import { UIComponent } from "../../lib/gtdf/components/UIComponent.js";
import { IObserver } from "../../lib/gtdf/core/observable/Observer.js";
import { StaticImplements } from "../../lib/gtdf/core/static/StaticInterface.js";
import { ISingleton, Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import MaterialIcons from "../../lib/gtdf/resources/MaterialIcons.js";

@Singleton()
@StaticImplements<ISingleton<TopBar>>()
export default class TopBar extends UIComponent implements IObserver {
    private static readonly ID = "topbar";
    private static readonly VIEW_CHANGED_SIGNAL = "viewChanged";
    static _instance: TopBar;
    static instance;

    private view = "";

    constructor() {
        super({
            type: "div",
            id: TopBar.ID,
            classes: ["box-row", "box-x-between", "box-y-center"],
            styles: {
                position: "fixed",
                top: "1rem",
                left: "5%",
                width: "90%",
                height: "4rem",
                backgroundColor: "var(--background)",
                padding: "0 2rem",
                borderBottom: ".2rem solid #F5F5F5",
                boxShadow: "0 .1rem .5rem rgba(0, 0, 0, .1)",
                borderRadius: "1rem",
            },
        });

        //SignalBuffer.search(TopBar.VIEW_CHANGED_SIGNAL).subscribe(this);
    }

    async update(data?: any): Promise<void> {
        if (data.includes("transactions")) {
            this.view = data.split("/")[1];
        } else {
            this.view = data;
        }

        this.show();
    }

    show() {
        this.clean();
        const title = this.instanceTitle();
        this.appendChild(title);

        const backButton = this.instanceBackButton();
        this.appendChild(backButton);
    }

    public instanceTitle(): UIComponent {
        const title = new UIComponent({
            type: "h1",
            classes: ["title"],
            text: this.view,
            styles: {
                color: "#6F6F6F",
            },
        });

        return title;
    }

    public instanceBackButton(): UIComponent {
        const backButton = new UIComponent({
            type: "button",
            classes: ["box-column", "box-x-center", "box-y-center"],
            styles: {
                boxShadow: "none",
                minHeight: "none",
                minWidth: "none",
                backgroundColor: "transparent",
                border: "none",
            },
        });

        const buttonIcon = MaterialIcons.get("apps", {
            size: "2em",
            fill: "#6E6E6E",
        });

        backButton.setEvents({
            click: () => {
                window.history.back();
            },
        });

        buttonIcon.appendTo(backButton);
        return backButton;
    }
}
