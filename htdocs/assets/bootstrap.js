

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const API = axios.create ({
    baseURL: 'http://symfony.docker.localhost/api',
    // params: {
    //     limit: 15
    // },
    defaults: {
        headers: {
            common: {'X-Requested-With': 'XMLHttpRequest'},
            "Content-type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Accept-Encoding": "gzip, deflate",
        },
    }
});
window.API = API;
const APIPrivate = axios.create ({
    baseURL: 'http://symfony.docker.localhost/api',
    // params: {
    //     limit: 15
    // },
    defaults: {
        headers: {
            common: {'X-Requested-With': 'XMLHttpRequest'},
            "Content-type": "application/json",
            "Accept-Encoding": "gzip, deflate",
        },
        withCredentials: true
    }
});
APIPrivate.interceptors.request.use(async (config) => {
    let token =  localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : "NaN";
    return config;
});
window.APIPrivate = APIPrivate;

