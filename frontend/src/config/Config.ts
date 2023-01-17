import { getLanguage, Language } from "../lang/Language.js";

/**
 * Environment states
 */
export enum ENVIRONMENT {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
}

/**
 * Configuration for the application
 */
export class Config {

    public static VARIABLES = {
        ANIMATIONS : "ANIMATIONS",
        LANGUAGE : "LANG",
        TOKEN : "TOKEN",
        USERNAME : "USERNAME",
    }

    //global runtime configurations
    public static BASE = {
        APP_NAME: "CoffeeManager",
        APP_VERSION: "v.x.x",
        HOST: "192.168.0.28",
        PORT: 8029,
        API_PORT: 8030,
        URL: location.href,
        ENVIRONMENT: ENVIRONMENT.DEVELOPMENT,
        DEBUG: true,
        LOG_LEVEL: "debug",
        LOG_FILE: "app.log",
        WEBSITE : "https://akrck02.github.io/#/software/GTD-Framework"
    };

    public static PATHS = {
        APP : "../app/",
        ROOT : "../frontend/",
        LOGS : "../frontend/logs/",
        RESOURCES : "../resources/",
        IMAGES : "../resources/images/",
        ICONS : "../resources/icons/",
    };

    public static VIEWS = {
        BASE_URL: "../app/#/",
        HOME: "../app/#/home/",
        REGISTER: "../app/#/register/",
        LOGIN: "../app/#/login/",
        MANAGER: "../app/#/manager/",
        MANAGER_CONNECT:"../app/#/manager/connect/",
        MANAGER_MENU:"../app/#/manager/menu/",
        MANAGER_LIST:"../app/#/manager/list/",
        MANAGER_ORDER:"../app/#/manager/order/",
        MANAGER_AUTO:"../app/#/manager/auto/",
        ERROR: "../app/#/error/",
        BLANK: "../app/#/blank/",
    };

    public static API = {
        URL : "http://$1:$2/api/v1/",
        PING : "http://$1:$2/api/v1/ping/",
        LOGIN : "http://$1:$2/api/v1/login/",
        REGISTER : "http://$1:$2/api/v1/register/",
    };


    /**
     * Set default configurations for the application
     */
     public static async setDefaultVariables() {

        if(Config.getConfigVariable(this.VARIABLES.ANIMATIONS) == undefined) {
            this.setAnimations(true);
        }

        if(Config.getConfigVariable(this.VARIABLES.LANGUAGE) == undefined) {
            this.setLanguage(getLanguage(navigator.language));
        }

        for (const key in this.API) {
            this.API[key] = this.API[key].replace("$1",Config.BASE.HOST)
            this.API[key] = this.API[key].replace("$2",Config.BASE.PORT)
        }

    }

    /**
     * Get application configurations
     * @returns the application configurations
     */
     public static getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem(Config.BASE.APP_NAME + "-config"));

        if(!localStorageConfiguration) {
            localStorageConfiguration = {}
        }

        return localStorageConfiguration;
    }

    /**
     * Add a configuration variable
     * @param key the name of the variable
     * @param value the value of the variable
     */
    public static setConfigVariable(key: string, value: any) {
        let localStorageConfiguration = Config.getConfig();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem(Config.BASE.APP_NAME + "-config", JSON.stringify(config));
    }

    /**
     * Get a configuration variable
     * @param key the name of the variable
     * @returns the value of the variable
     */
    public static getConfigVariable(key: string) : string{
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }


    /**
     *  Set the access token for the application
     * @param token The access token
     */
    public static setAccessToken(token : string) {
        this.setConfigVariable(this.VARIABLES.TOKEN, token);
    }

    public static getAccessToken() : string {
        return  this.getConfigVariable(this.VARIABLES.TOKEN);
    }

    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    public static setAnimations(on : boolean){
        this.setConfigVariable(this.VARIABLES.ANIMATIONS,on);
    }

    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    public static areAnimationsEnabled() : boolean{
        return this.getConfigVariable(this.VARIABLES.ANIMATIONS) === "true";
    }

    /**
     * Set the application language
     */
    public static setLanguage(lang : string) {
        this.setConfigVariable(this.VARIABLES.LANGUAGE,lang);
    }

    /**
     * Get the current app language
     * @returns The app language
     */
    public static getLanguage() : string {
        return getLanguage(this.getConfigVariable(this.VARIABLES.LANGUAGE));
    }

    /**
     * Set the username
     */
    public static setUsername(username : string) {
        this.setConfigVariable(this.VARIABLES.USERNAME,username);
    }

    /**
     * Get the current app language
     * @returns The app language
     */
    public static getUsername() : string {
        return getLanguage(this.getConfigVariable(this.VARIABLES.USERNAME));
    }

}