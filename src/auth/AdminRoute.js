import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

// Takes a component and the rest of the props as props
// See https://reacttraining.com/react-router/web/example/auth-workflow
const AdminRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {
          props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
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

export default AdminRoute;