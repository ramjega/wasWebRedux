import Header from "./base/components/Header";
import SignInPage from "./components/SignInForm";
import SignUpPage from "./authentication/SignUpPage";
import Home from "./base/components/Home";


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


  ]
};

export default routes;
