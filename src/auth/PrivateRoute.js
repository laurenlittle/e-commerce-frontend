import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

// Takes a component and the rest of the props as props
// See https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => isAuthenticated() ? (
        <Component {...props} />
      ) : (
         <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
      )
    }

    />

    );
};

export default PrivateRoute;