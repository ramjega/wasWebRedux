class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static saveUser(user) {
        localStorage.setItem('user', user);
    }

    static selectedWorkerId(workerId) {
        localStorage.setItem('workerId', workerId);
    }

    static getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    static getUserId() {
        return localStorage.getItem('userId');
    }

    static getWorkerId() {
        return localStorage.getItem('workerId');
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    static removeStorage() {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('workerId');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        return localStorage.getItem('token');
    }

}

export default Auth;
