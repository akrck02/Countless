import { Config } from "../../config/Config.js";
import { EasyFetch } from "../../lib/gtdf/connection/EasyFetch.js";
import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";

export default class LoginCore extends ViewCore {


    public static async login(user : string, password : string) : Promise<boolean> {

        let token;
        let userId;

        await EasyFetch.post({
            url: Config.Api.login,
            parameters: {
                email: user,
                password: password,
            }
        }).status([200,201,204], (data) => {
            token = data?.token;
            userId = data?.user;
        }).status([400,401,404,500], (data) => {
            alert({
                title: "Login error",
                message: data?.message   
            });
            
            token = null;
            userId = null;
        }).json();

        if(!token) {
            return false;
        }
    
        Config.setConfigVariable("user", userId);
        Config.setConfigVariable("auth-token", token);
        return true;
        
    }

}