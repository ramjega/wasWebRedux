import Auth from '../modules/Auth';

let authenticationSource = {

  signUp: function (vairables) {
    return new Promise((resolve, reject) => {
     // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/signup');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {

        if (xhr.status === 200) {
          resolve(xhr.response);

        } else {
          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          reject(errors);

        }
      });

      xhr.send(vairables);


    });

  },

  signIn: function (vairables) {
    return new Promise((resolve, reject) => {
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/login');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {

        if (xhr.status === 200) {
          // save the token
          Auth.authenticateUser(xhr.response.token);

          // save the user
          Auth.saveUser(JSON.stringify(xhr.response.user));

          resolve(xhr.response);

        } else {
          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          reject(errors);

        }
      });

      xhr.send(vairables);


    });

  }
};

export default authenticationSource;
