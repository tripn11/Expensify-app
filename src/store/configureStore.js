import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //redux devtools help in visualizing the store from the browser, compose allows the running of higher order functions without having to explicitly write them as arguements

export default () => {
  const store = createStore( //creates the store
    combineReducers({ //allows the use of different reducers on one store
      expenses: expensesReducer, //here the paths in the store are created as well as the reducers to be used in that path
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk)) //if we are not using redux devtools then just compose or run the higher order function-middleware. The middleware allows extra redux enhancers such as thunk. Thunk allows the dispatching of functions to the store instead of action object. the functions have the dispatch arguement which then helps it dispatch the actual action
  );

  return store;
};
