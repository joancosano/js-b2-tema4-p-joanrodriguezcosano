// T4. Trabajo con API
// U3. Peticiones PUT y PATCH con Fetch

class ReqRes {

    // Propiedades estáticas
    static API_URL = 'https://reqres.in/api';

    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';
    static ENDPOINT_USER = '/users/{id}';

    // Sesión
    session = {
        token: null,
        email: null,
        userId: null
    };

    // REGISTER
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password: pwd
                })
            }
        ).then(response => response.json());
    }

    // ON REGISTER
    onRegister(data) {

        if (!data || data.error) {
            return `ERROR_REGISTER. ${data?.error}`;
        }

        this.session.userId = data.id;
        this.session.token = data.token;
    }

    // LOGIN
    login(email, pwd) {

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
            `${ReqRes.API_URL}${ReqRes.ENDPOINT_LOGIN}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password: pwd
                })
            }
        ).then(response => response.json());
    }

    // ON LOGIN
    onLogin(data) {

        if (!data || data.error) {
            return `ERROR_LOGIN. ${data?.error}`;
        }

        this.session.token = data.token;
    }

    // GET USERS
    getUserList(page = 1, perPage = 6) {

        return fetch(
            `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`,
            {
                method: 'GET'
            }
        ).then(response => response.json());
    }

    // PUT
    updateFullUser(
        id,
        email,
        firstName,
        lastName,
        avatarUrl
    ) {

        if (
            !id ||
            !email ||
            !firstName ||
            !lastName ||
            !avatarUrl
        ) {
            return Promise.resolve({
                error: 'Some user fields are missing'
            });
        }

        const endpoint =
            ReqRes.ENDPOINT_USER.replace('{id}', id);

        return fetch(
            `${ReqRes.API_URL}${endpoint}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    avatar: avatarUrl
                })
            }
        ).then(response => response.json());
    }

    // PATCH
    updateUserName(
        id,
        firstName,
        lastName
    ) {

        if (
            !id ||
            !firstName ||
            !lastName
        ) {
            return Promise.resolve({
                error: 'Some user fields are missing'
            });
        }

        const endpoint =
            ReqRes.ENDPOINT_USER.replace('{id}', id);

        return fetch(
            `${ReqRes.API_URL}${endpoint}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName
                })
            }
        ).then(response => response.json());
    }

}

export { ReqRes };