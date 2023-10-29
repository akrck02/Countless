import { UIComponent } from "../components/UIComponent.js";
import { StaticImplements } from "../core/static/StaticInterface.js";
import { ISingleton } from "../decorators/Singleton.js";

@StaticImplements<ISingleton<any>>()
export abstract class ViewUI extends UIComponent {
    public static _instance: any;
    public static instance(): any {
        return this._instance;
    }

    public abstract show(params: string[], container: UIComponent);
    public routes: string[] = [];

    protected constructor(details: any) {
        super(details);
    }

    public isPointing(name: string) {
        return this.routes.includes(name);
    }
}
