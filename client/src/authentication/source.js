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
          // set a message
          // localStorage.setItem('successMessage', xhr.response.message);
          resolve(xhr.response);
          // make a redirect
          // this.context.router.replace('/login');
        } else {
          // failure
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
