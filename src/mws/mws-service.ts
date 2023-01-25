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
}