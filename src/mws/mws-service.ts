import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const controller: AbortController = new AbortController();

export class MwsService {

    protected url: string;
    protected user: string;
    protected pass: string;

    constructor() {
        this.url = process.env.MWS_URL,
            this.user = process.env.MWS_USER,
            this.pass = process.env.MWS_PASS
    }

    async generateToken(): Promise<any> {
        try {

            const httpConfig = {
                method: 'get',
                url: `/login/token.php?username=${this.user}&password=${this.pass}&service=moodle_mobile_app`,
                baseURL: this.url,
                signal: controller.signal
            }

            const res = await axios(httpConfig);

            return res['data']['token'];

        } catch (err) {

            console.log(err)
            controller.abort()

        }
    }

    async getUser(key: string, value: []) {
        const token = await this.generateToken();
        const user = [{
            key: key,
            value: value
        }];

        try {
            const httpConfig = {
                method: 'get',
                url: '/webservice/rest/server.php?',
                baseURL: this.url,
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_user_get_users',
                    'moodlewsrestformat': 'json',
                    'criteria': user
                }
            }

            const res = await axios(httpConfig);

            console.log(res['data'])
            return res['data']['users'];

        } catch (err) {

            console.log(err)
            controller.abort()

        }
    }
}