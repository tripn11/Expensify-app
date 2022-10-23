import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'; //switch allows the automatic routing depending on the url passed in
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute'; //self made component which returns a route component,functions are added to know which component to pass into the component prop of the route 
import PublicRoute from './PublicRoute';

export const history = createHistory(); //to allow navigation through paths and must be passed in as props of the Router for all paths

const AppRouter = () => (
  <Router history={history}> 
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} /> 
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

//Route without path will display the notfoundpage component

export default AppRouter;
