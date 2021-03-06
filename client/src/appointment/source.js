import Auth from '../modules/Auth';

const appointmentSource = {

  createAppointment: function (vairables) {
    return new Promise((resolve, reject) => {
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/createAppointment');
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

};

export default appointmentSource;
