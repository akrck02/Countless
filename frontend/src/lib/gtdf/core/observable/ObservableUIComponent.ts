
import { IObservable, IObserver } from "./Observer.js";
import { UIComponent, UIProperties } from "../../components/UIComponent.js";

export interface ObserverUIProperties extends UIProperties {
    observable: IObservable;
}

export class ObservableUIComponent extends UIComponent implements IObserver {
    
    protected observable: IObservable;

    public constructor(properties: ObserverUIProperties){
        super(properties);
        this.observable = properties.observable;
        this.observable.subscribe(this);
    }
    
    async update() {
        console.warn("ObservableUIComponent.update() not implemented.");
    }
}