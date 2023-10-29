import App from "./App.js";
import { Config, Configuration } from "./config/Config.js";


export let app : App; 

/**
 * When the dynamic URL changes loads 
 * the correspoding view from the URL
 */
window.addEventListener('hashchange',async () => {
    await app.load()
});

/**
 * When the window is loaded load 
 * the app state to show
 */
window.onload = async () => {    
   
    if(app === undefined){
        app = new App();   
    }

    await app.load();
}
