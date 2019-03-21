import Header from "./base/components/Header";
import SignInPage from "./authentication/components/SignInPage";
import SignUpPage from "./authentication/components/SignUpPage";
import Home from "./base/components/Home";
import Auth from "./modules/Auth";


const routes = {
  // base component (wrapper for the whole application).
  component: Header,
  childRoutes: [
    {
      path: '/',
      component:Home
    },

    {
      path: '/signIn',
      component: SignInPage
    },

    {
      path: '/signUp',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        Auth.removeStorage();

        // change the current URL to /
        replace('/');
      }
    }



  ]
};

export default routes;
