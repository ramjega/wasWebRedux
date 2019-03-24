import Auth from '../modules/Auth';

const workerSource = {

  createWorker: function (vairables) {
    return new Promise((resolve, reject) => {
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/create/worker');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
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

  fetchWorkers: function () {
    return new Promise((resolve, reject) => {
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('get', '/auth/workers');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(xhr.response.workers)

        } else {

          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          reject(errors);
        }
      });
      xhr.send();

    });

  }

};

export default workerSource;
