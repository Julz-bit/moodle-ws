import axios from 'axios';
import * as dotenv from 'dotenv';
import { CreateUser } from './interface/create-user.interface';

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
                baseURL: this.url,
                url: `/login/token.php?username=${this.user}&password=${this.pass}&service=moodle_mobile_app`,
                signal: controller.signal
            }

            const res = await axios(httpConfig);
            return res['data']['token'];
        } catch (err) {
            console.log(err)
            controller.abort()
        }
    }

    async getUser(key: string, value: string) {
        const token = await this.generateToken();
        const criteria = [{
            key: key,
            value: value
        }];

        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_user_get_users',
                    'moodlewsrestformat': 'json',
                    'criteria': criteria
                }
            }
            const res = await axios(httpConfig);
            return res['data']['users'][0];
        } catch (err) {
            console.log(err)
            controller.abort()
        }
    }

    async createUser(payload: CreateUser) {
        const token = await this.generateToken();
        const user = [
            {
                username: payload['username'],
                password: payload['password'],
                firstname: payload['firstname'],
                lastname: payload['lastname'],
                email: payload['email'],
                country: payload['country'],
                lang: payload['lang']
            }
        ];

        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_user_create_users',
                    'moodlewsrestformat': 'json',
                    'users': user
                }
            }
            const res = await axios(httpConfig)
            return res['data'];
        } catch (err) {
            console.log(err)
            controller.abort()
        }
    }
}