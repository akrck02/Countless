import { ViewCore } from "../../lib/gtdf/views/ViewCore.js"
import { UserService } from "../../services/UserService.js"

export default class LoginCore implements ViewCore {


    public static async login(username : string, password : string ) {
        
        const res = await UserService.login(username, password);
        res.json();
    
    }


    public static async redirectToHome() {
        
    }


}