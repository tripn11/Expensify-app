import React from 'react';
import ReactDOM from 'react-dom'; //used to actually render something in the DOM
import { Provider } from 'react-redux'; //allows the provision of the store as one of the props of the component so that all components in it can have access to the store without passing it in as prop to each of them
import AppRouter, { history } from './routers/AppRouter'; 
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css'; //to set the css to a uniform 0 origin so that all browsers can style the same
import './styles/styles.scss'; //all the styles we've written
import 'react-dates/lib/css/_datepicker.css'; //for the picking of dates
import { firebase } from './firebase/firebase'; //for database and persisting of data and authentication
import LoadingPage from './components/LoadingPage'; 

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid)); //sets the uid at the auth state
    store.dispatch(startSetExpenses()).then(() => {//the function passed to dispatch has access to dispatch and getState as arguements. this sets the current expenses of the user to the current state
      renderApp(); //so that it renders only once when the user first logs in
      if (history.location.pathname === '/') {
        history.push('/dashboard'); //like redirecting to 
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
