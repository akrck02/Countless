import { Config } from "../../config/Config.js";
import Utils from "../../core/Utils.js";
import { UserService } from "../../services/UserService.js";

export default class RegisterCore {


    public static async register(username : string, password : string ) {
        const res = UserService.register(username, password);

        res.success((data) => {
            Config.setAccessToken(data.token);
        });

        await res.jsonPromise();
        Utils.redirect(Config.VIEWS.HOME, []);

    } 

}