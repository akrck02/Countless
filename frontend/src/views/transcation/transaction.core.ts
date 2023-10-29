import { Configuration } from "../../config/Config.js";
import { EasyFetch } from "../../lib/gtdf/connection/EasyFetch.js";
import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";

export default class IncomeCore extends ViewCore {


    public static async getIncomes() : Promise<string[]>{

        const token = Configuration.instance.getConfigVariable("auth-token");
        const data = {
            url: Configuration.instance.Api.transactionsListIncome,
            parameters: {
                "user": Configuration.instance.getConfigVariable("user"),
            },
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }

        let list = [];
        await EasyFetch.post(data).status([200,201,204], (data) => {
            list = data;
        }).status([400,401,404,500], (data) => {
            console.log(data);
        }).json();

        return list;
    }


    public static async getOutcomes() : Promise<string[]>{

        const token = Configuration.instance.getConfigVariable("auth-token");
        const data = {
            url: Configuration.instance.Api.transactionsListOutcome,
            parameters: {
                "user": Configuration.instance.getConfigVariable("user"),
            },
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }

        let list = [];
        await EasyFetch.post(data).status([200,201,204], (data) => {
            list = data;
        }).status([400,401,404,500], (data) => {
            console.log(data);
        }).json();

        return list;
    }


}