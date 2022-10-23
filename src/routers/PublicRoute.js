import React from 'react';
import { connect } from 'react-redux'; //used whenever we want to connect the store to a component
import { Route, Redirect } from 'react-router-dom'; //redirect is only possible here because we passed in the history to router hence it can redirect anything

export const PublicRoute = ({ //could have just passed in props but decided to destructure the props object, the route doesn't need the isAutenticated which would have been passed down if not distructured
  isAuthenticated,
  component: Component, //i want to rename the component prop from the PublicRoute to Component since the route component we want to return also has a prop called component
  ...rest //incase there are other props such as path and exact, pass them in
}) => (
    <Route {...rest} component={(props) => (//the props are not necessary, it works even without adding the props. only see the component if not authenticated, if authenticated, take to /dashboard
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

const mapStateToProps = (state) => ({ // standard function that is first passed to connect which will then bind the state values as props of the component
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
