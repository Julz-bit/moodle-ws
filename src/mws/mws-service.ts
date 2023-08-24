import axios from 'axios';
import * as dotenv from 'dotenv';
import { Payload } from './interface/payload.interface';

dotenv.config();
const controller: AbortController = new AbortController();

export class MwsService {

    protected url: string;
    protected user: string;
    protected pass: string;
    protected service: string;

    constructor() {
        this.url = process.env.MWS_URL,
            this.user = process.env.MWS_USER,
            this.pass = process.env.MWS_PASS,
            this.service = process.env.MWS_SERVICE
    }

    async generateToken(): Promise<any> {
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: `/login/token.php?username=${this.user}&password=${this.pass}&service=${this.service}`,
                signal: controller.signal
            }
            const res = await axios(httpConfig);
            return res['data']['token'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
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
            return err;
        }
    }

    async createUser(payload: Payload) {
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
            return res['data'][0];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }

    async updateUser(payload: Payload) {
        const token = await this.generateToken();
        const user = [
            {
                id: payload['id'],
                username: payload['username'],
                password: payload['password'],
                firstname: payload['firstname'],
                lastname: payload['lastname'],
                email: payload['email']
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_user_update_users',
                    'moodlewsrestformat': 'json',
                    'users': user
                }
            }
            const res = await axios(httpConfig)
            return res['data'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }

    async enrollUser(payload: Payload) {
        const token = await this.generateToken();
        const enrollment = [
            {
                roleid: payload['roleId'],
                userid: payload['moodleId'],
                courseid: payload['courseId'],
                suspend: 0
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'enrol_manual_enrol_users',
                    'moodlewsrestformat': 'json',
                    'enrolments': enrollment
                }
            }
            const res = await axios(httpConfig)
            return res['status'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }

    async unEnrollUser(payload: Payload) {
        const token = await this.generateToken();
        const enrollment = [
            {
                roleid: payload['roleId'],
                userid: payload['moodleId'],
                courseid: payload['courseId'],
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'enrol_manual_unenrol_users',
                    'moodlewsrestformat': 'json',
                    'enrolments': enrollment
                }
            }
            const res = await axios(httpConfig)
            return res['status'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }

    async createCategory(payload: Payload) {
        const token = await this.generateToken();
        const category = [
            {
                name: payload['name'],
                parent: payload['parent'],
                description: payload['description']
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_course_create_categories',
                    'moodlewsrestformat': 'json',
                    'categories': category
                }
            }
            const res = await axios(httpConfig)
            return res['data'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }

    async updateCategory(payload: Payload) {
        const token = await this.generateToken();
        const category = [
            {
                id: payload['id'],
                name: payload['name'],
                description: payload['description']
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_course_update_categories',
                    'moodlewsrestformat': 'json',
                    'categories': category
                }
            }
            const res = await axios(httpConfig)
            return res['status'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }

    async deleteCategory(payload: Payload) {
        const token = await this.generateToken();
        const category = [
            {
                id: payload['id'],
                newparent: payload['newparent']
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_course_delete_categories',
                    'moodlewsrestformat': 'json',
                    'categories': category
                }
            }
            const res = await axios(httpConfig)
            console.log(res)
            return res;
        } catch (err) {
            console.log(err)
            controller.abort()
        }
    }

    async createCourse(payload: Payload) {
        const token = await this.generateToken();
        const course = [
            {
                fullname: payload['fullname'],
                categoryid: payload['categoryid'],
                shortname: payload['shortname'],
                summary: payload['summary']
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_course_create_courses',
                    'moodlewsrestformat': 'json',
                    'courses': course
                }
            }
            const res = await axios(httpConfig)
            return res['data'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }

    async updateCourse(payload: Payload) {
        const token = await this.generateToken();
        const course = [
            {
                id: payload['id'],
                fullname: payload['fullname']
            }
        ];
        try {
            const httpConfig = {
                method: 'get',
                baseURL: this.url,
                url: '/webservice/rest/server.php?',
                params: {
                    'wstoken': token,
                    'wsfunction': 'core_course_update_courses',
                    'moodlewsrestformat': 'json',
                    'courses': course
                }
            }
            const res = await axios(httpConfig)
            return res['data'];
        } catch (err) {
            console.log(err)
            controller.abort()
            return err;
        }
    }
}