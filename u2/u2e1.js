export class ReqRes {

    static API_URL = 'https://reqres.in/api';

    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';

    session = {
        token: null,
        email: null,
        userId: null
    };

    register(email, pwd) {

        if (!email) {
            return Promise.resolve({
                error: 'Missing email or username'
            });
        }

        if (!pwd) {
            return Promise.resolve({
                error: 'Missing password'
            });
        }

        this.session.email = email;

        return fetch(
            `${ReqRes.API_URL}${ReqRes.ENDPOINT_REGISTER}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email,
                    password: pwd
                })
            }
        ).then(response => response.json());
    }

    onRegister(data) {

        if (!data || data.error) {
            return `ERROR_REGISTER. ${data?.error}`;
        }

        this.session.userId = data.id;
        this.session.token = data.token;
    }

    login(email,pwd) {

        if (!email) {
            return Promise.resolve({
                error:'Missing email or username'
            });
        }

        if (!pwd) {
            return Promise.resolve({
                error:'Missing password'
            });
        }

        this.session.email = email;

        return fetch(
            `${ReqRes.API_URL}${ReqRes.ENDPOINT_LOGIN}`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email,
                    password:pwd
                })
            }
        ).then(response => response.json());
    }

    onLogin(data){

        if(!data || data.error){
            return `ERROR_LOGIN. ${data?.error}`;
        }

        this.session.token=data.token;
    }

    getUserList(page = 1, perPage = 6){

        return fetch(
            `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`,
            {
                method:'GET'
            }
        ).then(response => response.json());
    }

}

