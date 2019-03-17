import Header from "./components/Header";
import SignInPage from "./components/SignInForm";
import SignUpPage from "./containers/SignUpPage";
import Home from "./components/Home";


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
